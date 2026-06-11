'use client'

import { useState } from 'react'
import { RotateCcw, StepForward, FastForward } from 'lucide-react'

const W = 420
const H = 300
const PAD = 38
const PADR = 14
const W0 = -0.5
const W1 = 6.5
const WMIN = 3
const A = 0.45
const LMAX = 6.6

const loss = (w: number) => A * (w - WMIN) ** 2 + 0.6
const grad = (w: number) => 2 * A * (w - WMIN)
const xToPx = (w: number) => PAD + ((w - W0) / (W1 - W0)) * (W - PAD - PADR)
const yToPx = (l: number) => H - PAD - (Math.min(l, LMAX) / LMAX) * (H - PAD - PADR)

/** 1-D gradient descent: tune the learning rate and watch the steps converge — or diverge. */
export default function GradientDescentLab({ color }: { color: string }) {
  const [w, setW] = useState(0.4)
  const [lr, setLr] = useState(0.15)
  const [hist, setHist] = useState<number[]>([0.4])

  const step = (from: number) => from - lr * grad(from)
  const doStep = () => {
    setHist((h) => [...h, w].slice(-24))
    setW(Math.max(W0 - 1, Math.min(W1 + 1, step(w))))
  }
  const runMany = () => {
    let cur = w
    const acc: number[] = []
    for (let i = 0; i < 15; i++) {
      acc.push(cur)
      cur = step(cur)
    }
    setHist((h) => [...h, ...acc].slice(-24))
    setW(Math.max(W0 - 1, Math.min(W1 + 1, cur)))
  }
  const reset = () => {
    setW(0.4)
    setHist([0.4])
  }

  const curve = Array.from({ length: 60 }, (_, i) => {
    const ww = W0 + (i / 59) * (W1 - W0)
    return `${i === 0 ? 'M' : 'L'} ${xToPx(ww).toFixed(1)} ${yToPx(loss(ww)).toFixed(1)}`
  }).join(' ')

  const diverging = Math.abs(w - WMIN) > 3.5

  return (
    <div className="rounded-2xl border border-border2 glass overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block w-full h-auto" role="img" aria-label="Gradient descent playground">
        <line x1={PAD} y1={12} x2={PAD} y2={H - PAD} stroke="var(--color-border2)" />
        <line x1={PAD} y1={H - PAD} x2={W - PADR} y2={H - PAD} stroke="var(--color-border2)" />
        <text x={10} y={20} fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-txt3)">loss ↑</text>
        <text x={W - PADR} y={H - PAD + 22} textAnchor="end" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-txt3)">weight w →</text>

        <path d={curve} fill="none" stroke="var(--color-border3)" strokeWidth={2} />
        <line x1={xToPx(WMIN)} y1={12} x2={xToPx(WMIN)} y2={H - PAD} stroke="var(--color-green)" strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />

        {/* trail */}
        {hist.map((hw, i) => (
          <circle key={i} cx={xToPx(hw)} cy={yToPx(loss(hw))} r={3} fill={color} opacity={0.18 + (i / hist.length) * 0.5} />
        ))}
        {/* steps */}
        {hist.length > 0 && (
          <line x1={xToPx(hist[hist.length - 1])} y1={yToPx(loss(hist[hist.length - 1]))} x2={xToPx(w)} y2={yToPx(loss(w))} stroke={color} strokeWidth={1.4} strokeDasharray="2 3" opacity={0.6} />
        )}
        <circle cx={xToPx(w)} cy={yToPx(loss(w))} r={7} fill={diverging ? 'var(--color-rose)' : color} stroke="var(--color-bg)" strokeWidth={2} />
      </svg>

      <div className="px-4 py-3 border-t border-border bg-surface/60 space-y-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-txt3">learning rate · {lr.toFixed(2)}{lr > 1.05 && <span className="text-rose"> (unstable)</span>}</span>
          <input type="range" min={0.02} max={1.3} step={0.01} value={lr} onChange={(e) => setLr(Number(e.target.value))} className="w-full h-1 mt-1.5" style={{ accentColor: color }} />
        </label>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="font-mono text-[12px] text-txt2 flex gap-3">
            <span>w <span className="text-txt font-bold tabular-nums">{w.toFixed(2)}</span></span>
            <span>loss <span className="text-txt font-bold tabular-nums">{loss(w).toFixed(2)}</span></span>
            <span className="text-txt3">∇ {grad(w).toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={doStep} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold text-white" style={{ background: color }}>
              <StepForward className="w-3.5 h-3.5" /> Step
            </button>
            <button onClick={runMany} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all text-[11.5px]">
              <FastForward className="w-3.5 h-3.5" /> Run ×15
            </button>
            <button onClick={reset} aria-label="Reset" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-[11px] text-txt3 leading-relaxed">
          Each step moves <span className="font-mono">w ← w − lr·∇loss</span>. Small rates crawl; push the rate past ~1.1 and the steps overshoot and diverge.
        </p>
      </div>
    </div>
  )
}
