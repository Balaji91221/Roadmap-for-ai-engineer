'use client'

import { useMemo, useRef, useState } from 'react'
import { RotateCcw, Wand2 } from 'lucide-react'

const W = 420
const H = 300
const PAD = 38
const PADR = 14
const DOMAIN = 10

const INITIAL: { x: number; y: number }[] = [
  { x: 1, y: 2.2 },
  { x: 2.4, y: 2.8 },
  { x: 3.6, y: 4.1 },
  { x: 5, y: 4.6 },
  { x: 6.3, y: 6.3 },
  { x: 7.5, y: 6.9 },
  { x: 8.8, y: 8.4 },
]

const xToPx = (x: number) => PAD + (x / DOMAIN) * (W - PAD - PADR)
const yToPx = (y: number) => H - PAD - (y / DOMAIN) * (H - PAD - PADR)

/** Interactive least-squares playground: drag the data, steer the line, watch the loss respond. */
export default function LinearRegressionLab({ color }: { color: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [points, setPoints] = useState(INITIAL)
  const [m, setM] = useState(0.6)
  const [b, setB] = useState(1.5)
  const dragIdx = useRef<number | null>(null)

  const best = useMemo(() => {
    const n = points.length
    const sx = points.reduce((a, p) => a + p.x, 0)
    const sy = points.reduce((a, p) => a + p.y, 0)
    const sxy = points.reduce((a, p) => a + p.x * p.y, 0)
    const sxx = points.reduce((a, p) => a + p.x * p.x, 0)
    const denom = n * sxx - sx * sx || 1
    const bm = (n * sxy - sx * sy) / denom
    const bb = (sy - bm * sx) / n
    return { m: bm, b: bb }
  }, [points])

  const mse = useMemo(() => {
    const e = points.reduce((a, p) => {
      const pred = m * p.x + b
      return a + (pred - p.y) ** 2
    }, 0)
    return e / points.length
  }, [points, m, b])

  const toData = (clientX: number, clientY: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const sx = ((clientX - rect.left) / rect.width) * W
    const sy = ((clientY - rect.top) / rect.height) * H
    const x = ((sx - PAD) / (W - PAD - PADR)) * DOMAIN
    const y = ((H - PAD - sy) / (H - PAD - PADR)) * DOMAIN
    return { x: Math.max(0, Math.min(DOMAIN, x)), y: Math.max(0, Math.min(DOMAIN, y)) }
  }

  const onMove = (e: React.PointerEvent) => {
    if (dragIdx.current == null) return
    const d = toData(e.clientX, e.clientY)
    setPoints((prev) => prev.map((p, i) => (i === dragIdx.current ? d : p)))
  }

  const lineY = (x: number, mm: number, bb: number) => mm * x + bb

  return (
    <div className="rounded-2xl border border-border2 glass overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        className="block w-full h-auto touch-none select-none"
        onPointerMove={onMove}
        onPointerUp={() => (dragIdx.current = null)}
        onPointerLeave={() => (dragIdx.current = null)}
        role="img"
        aria-label="Interactive linear regression playground"
      >
        {/* grid */}
        {Array.from({ length: 6 }).map((_, i) => {
          const gx = PAD + (i / 5) * (W - PAD - PADR)
          const gy = H - PAD - (i / 5) * (H - PAD - PADR)
          return (
            <g key={i}>
              <line x1={gx} y1={12} x2={gx} y2={H - PAD} stroke="var(--color-border)" strokeWidth={1} />
              <line x1={PAD} y1={gy} x2={W - PADR} y2={gy} stroke="var(--color-border)" strokeWidth={1} />
            </g>
          )
        })}
        <line x1={PAD} y1={12} x2={PAD} y2={H - PAD} stroke="var(--color-border2)" />
        <line x1={PAD} y1={H - PAD} x2={W - PADR} y2={H - PAD} stroke="var(--color-border2)" />

        {/* best-fit (ghost) */}
        <line x1={xToPx(0)} y1={yToPx(lineY(0, best.m, best.b))} x2={xToPx(DOMAIN)} y2={yToPx(lineY(DOMAIN, best.m, best.b))} stroke="var(--color-green)" strokeWidth={1.6} strokeDasharray="5 5" opacity={0.7} />

        {/* user line */}
        <line x1={xToPx(0)} y1={yToPx(lineY(0, m, b))} x2={xToPx(DOMAIN)} y2={yToPx(lineY(DOMAIN, m, b))} stroke={color} strokeWidth={2.6} strokeLinecap="round" />

        {/* residuals + points */}
        {points.map((p, i) => {
          const pred = lineY(p.x, m, b)
          return (
            <g key={i}>
              <line x1={xToPx(p.x)} y1={yToPx(p.y)} x2={xToPx(p.x)} y2={yToPx(pred)} stroke={color} strokeWidth={1} strokeDasharray="2 3" opacity={0.45} />
              <circle
                cx={xToPx(p.x)}
                cy={yToPx(p.y)}
                r={7}
                fill={color}
                stroke="var(--color-bg)"
                strokeWidth={2}
                className="cursor-grab"
                onPointerDown={(e) => {
                  ;(e.target as Element).setPointerCapture?.(e.pointerId)
                  dragIdx.current = i
                }}
              />
            </g>
          )
        })}
        <text x={W - PADR} y={H - PAD + 22} textAnchor="end" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-txt3)">
          feature x →
        </text>
        <text x={10} y={20} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-txt3)">
          y ↑
        </text>
      </svg>

      <div className="px-4 py-3 border-t border-border bg-surface/60 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-txt3">slope · {m.toFixed(2)}</span>
            <input type="range" min={-1} max={2} step={0.01} value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full h-1 mt-1.5" style={{ accentColor: color }} />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-widest text-txt3">intercept · {b.toFixed(2)}</span>
            <input type="range" min={-2} max={6} step={0.01} value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full h-1 mt-1.5" style={{ accentColor: color }} />
          </label>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[12px] text-txt2">
              MSE <span className="text-txt font-bold tabular-nums">{mse.toFixed(3)}</span>
            </span>
            <span className="font-mono text-[10.5px] text-green">— best fit</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setM(best.m)
                setB(best.b)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold text-white"
              style={{ background: color }}
            >
              <Wand2 className="w-3.5 h-3.5" /> Snap to best fit
            </button>
            <button
              onClick={() => {
                setPoints(INITIAL)
                setM(0.6)
                setB(1.5)
              }}
              aria-label="Reset"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all text-[11.5px]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
        <p className="text-[11px] text-txt3 leading-relaxed">
          Drag any point or move the sliders. The dashed green line is the least-squares optimum — try to match it by
          minimising the mean squared error.
        </p>
      </div>
    </div>
  )
}
