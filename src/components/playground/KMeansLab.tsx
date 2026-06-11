'use client'

import { useMemo, useState } from 'react'
import { RotateCcw, Play, Shuffle } from 'lucide-react'
import { hash } from '@/lib/anim/util'

const W = 420
const H = 300
const PAD = 24
const DOM = 10
const K = 3

type Pt = { x: number; y: number }
const BLOBS: Pt[] = [{ x: 3, y: 3 }, { x: 7, y: 4 }, { x: 5, y: 7.5 }]
const POINTS: Pt[] = Array.from({ length: 33 }, (_, i) => {
  const b = BLOBS[i % 3]
  return {
    x: Math.max(0.4, Math.min(9.6, b.x + (hash(i) - 0.5) * 2.6)),
    y: Math.max(0.4, Math.min(9.6, b.y + (hash(i + 200) - 0.5) * 2.6)),
  }
})
const INIT: Pt[] = [{ x: 2, y: 6.5 }, { x: 5, y: 2 }, { x: 8.2, y: 6 }]

const xToPx = (x: number) => PAD + (x / DOM) * (W - PAD * 2)
const yToPx = (y: number) => H - PAD - (y / DOM) * (H - PAD * 2)

/** k-means clustering: each "Iterate" runs one assign→update step of Lloyd's algorithm. */
export default function KMeansLab({ color }: { color: string }) {
  const [cents, setCents] = useState<Pt[]>(INIT)
  const [iter, setIter] = useState(0)
  const COLORS = [color, 'var(--color-green)', 'var(--color-sky)']

  const assign = useMemo(
    () =>
      POINTS.map((p) => {
        let best = 0
        let bd = Infinity
        cents.forEach((c, k) => {
          const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2
          if (d < bd) {
            bd = d
            best = k
          }
        })
        return best
      }),
    [cents],
  )

  const iterate = () => {
    const sums = Array.from({ length: K }, () => ({ x: 0, y: 0, n: 0 }))
    POINTS.forEach((p, i) => {
      const k = assign[i]
      sums[k].x += p.x
      sums[k].y += p.y
      sums[k].n++
    })
    setCents((prev) => prev.map((c, k) => (sums[k].n ? { x: sums[k].x / sums[k].n, y: sums[k].y / sums[k].n } : c)))
    setIter((n) => n + 1)
  }
  const randomize = () => {
    setCents(Array.from({ length: K }, () => ({ x: 1 + Math.random() * 8, y: 1 + Math.random() * 8 })))
    setIter(0)
  }
  const reset = () => {
    setCents(INIT)
    setIter(0)
  }

  return (
    <div className="rounded-2xl border border-border2 glass overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block w-full h-auto" role="img" aria-label="k-means clustering playground">
        <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} rx={8} fill="var(--color-surface2)" stroke="var(--color-border)" />
        {POINTS.map((p, i) => (
          <circle key={i} cx={xToPx(p.x)} cy={yToPx(p.y)} r={4.5} fill={COLORS[assign[i]]} opacity={0.85} />
        ))}
        {cents.map((c, k) => (
          <g key={k}>
            <circle cx={xToPx(c.x)} cy={yToPx(c.y)} r={11} fill="none" stroke={COLORS[k]} strokeWidth={2} opacity={0.5} />
            <rect x={xToPx(c.x) - 6} y={yToPx(c.y) - 6} width={12} height={12} fill={COLORS[k]} stroke="var(--color-bg)" strokeWidth={2} transform={`rotate(45 ${xToPx(c.x)} ${yToPx(c.y)})`} />
          </g>
        ))}
      </svg>
      <div className="px-4 py-3 border-t border-border bg-surface/60 flex items-center justify-between flex-wrap gap-2">
        <span className="font-mono text-[12px] text-txt2">iteration <span className="text-txt font-bold tabular-nums">{iter}</span> · k = {K}</span>
        <div className="flex items-center gap-2">
          <button onClick={iterate} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold text-white" style={{ background: color }}>
            <Play className="w-3.5 h-3.5" /> Iterate
          </button>
          <button onClick={randomize} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all text-[11.5px]">
            <Shuffle className="w-3.5 h-3.5" /> Randomize
          </button>
          <button onClick={reset} aria-label="Reset" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <p className="px-4 pb-3 text-[11px] text-txt3 leading-relaxed">
        Each iteration reassigns every point to its nearest centroid, then moves each centroid to the mean of its
        cluster. Watch it converge in a few steps.
      </p>
    </div>
  )
}
