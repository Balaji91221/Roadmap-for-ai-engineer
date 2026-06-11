'use client'

import { useMemo, useState } from 'react'
import { RotateCcw, Wand2 } from 'lucide-react'
import { hash } from '@/lib/anim/util'

const W = 420
const H = 300
const PAD = 24
const DOM = 10

type Pt = { x: number; y: number; label: 1 | -1 }
const POINTS: Pt[] = [
  ...Array.from({ length: 8 }, (_, i) => ({ x: 3.2 + (hash(i) - 0.5) * 3, y: 6.6 + (hash(i + 9) - 0.5) * 3, label: 1 as const })),
  ...Array.from({ length: 8 }, (_, i) => ({ x: 6.6 + (hash(i + 30) - 0.5) * 3, y: 3.2 + (hash(i + 50) - 0.5) * 3, label: -1 as const })),
].map((p) => ({ ...p, x: Math.max(0.4, Math.min(9.6, p.x)), y: Math.max(0.4, Math.min(9.6, p.y)) }))

const xToPx = (x: number) => PAD + (x / DOM) * (W - PAD * 2)
const yToPx = (y: number) => H - PAD - (y / DOM) * (H - PAD * 2)
const POS = 'var(--color-sky)'
const NEG = 'var(--color-amber)'

/** A single linear classifier: tune the weights (or auto-fit) to separate the two classes. */
export default function PerceptronLab({ color }: { color: string }) {
  const [w1, setW1] = useState(1)
  const [w2, setW2] = useState(-1)
  const [b, setB] = useState(0.5)

  const predict = (p: Pt) => (w1 * p.x + w2 * p.y + b >= 0 ? 1 : -1)
  const acc = useMemo(() => POINTS.filter((p) => predict(p) === p.label).length / POINTS.length, [w1, w2, b])

  const autofit = () => {
    let a = w1, c = w2, d = b
    const lr = 0.05
    for (let epoch = 0; epoch < 6; epoch++) {
      for (const p of POINTS) {
        const pred = a * p.x + c * p.y + d >= 0 ? 1 : -1
        if (pred !== p.label) {
          a += lr * p.label * p.x
          c += lr * p.label * p.y
          d += lr * p.label
        }
      }
    }
    setW1(a)
    setW2(c)
    setB(d)
  }
  const reset = () => {
    setW1(1)
    setW2(-1)
    setB(0.5)
  }

  // boundary endpoints across the domain (handles near-vertical lines via clip)
  const yAt = (x: number) => (Math.abs(w2) < 1e-3 ? 1e4 : -(w1 * x + b) / w2)

  return (
    <div className="rounded-2xl border border-border2 glass overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block w-full h-auto" role="img" aria-label="Perceptron classifier playground">
        <defs>
          <clipPath id="plotClip">
            <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} rx={8} />
          </clipPath>
        </defs>
        <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} rx={8} fill="var(--color-surface2)" stroke="var(--color-border)" />
        <line x1={xToPx(0)} y1={yToPx(yAt(0))} x2={xToPx(DOM)} y2={yToPx(yAt(DOM))} stroke={color} strokeWidth={2.6} strokeLinecap="round" clipPath="url(#plotClip)" />
        {POINTS.map((p, i) => {
          const correct = predict(p) === p.label
          return (
            <circle
              key={i}
              cx={xToPx(p.x)}
              cy={yToPx(p.y)}
              r={5.5}
              fill={p.label === 1 ? POS : NEG}
              stroke={correct ? 'var(--color-bg)' : 'var(--color-rose)'}
              strokeWidth={correct ? 1.5 : 2.5}
            />
          )
        })}
      </svg>
      <div className="px-4 py-3 border-t border-border bg-surface/60 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          {([['w₁', w1, setW1, -3, 3], ['w₂', w2, setW2, -3, 3], ['bias', b, setB, -10, 10]] as const).map(([lab, val, set, mn, mx]) => (
            <label key={lab} className="block">
              <span className="font-mono text-[10px] uppercase tracking-widest text-txt3">{lab} · {val.toFixed(2)}</span>
              <input type="range" min={mn} max={mx} step={0.05} value={val} onChange={(e) => set(Number(e.target.value))} className="w-full h-1 mt-1.5" style={{ accentColor: color }} />
            </label>
          ))}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono text-[12px] text-txt2">accuracy <span className="text-txt font-bold tabular-nums">{Math.round(acc * 100)}%</span></span>
          <div className="flex items-center gap-2">
            <button onClick={autofit} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-semibold text-white" style={{ background: color }}>
              <Wand2 className="w-3.5 h-3.5" /> Auto-fit
            </button>
            <button onClick={reset} aria-label="Reset" className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border text-txt2 hover:text-txt hover:border-border2 transition-all">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="text-[11px] text-txt3 leading-relaxed">
          The line is the decision boundary <span className="font-mono">w₁x + w₂y + b = 0</span>. Misclassified points get
          a red ring. Auto-fit runs the perceptron learning rule.
        </p>
      </div>
    </div>
  )
}
