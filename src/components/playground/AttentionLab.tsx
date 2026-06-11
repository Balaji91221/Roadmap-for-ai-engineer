'use client'

import { useMemo, useState } from 'react'

const W = 420
const H = 300

const TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat']
// 2-D "embeddings" engineered so related tokens attend to each other.
const EMB: [number, number][] = [
  [0.2, 0.92],
  [0.92, 0.3],
  [0.8, -0.25],
  [-0.35, 0.62],
  [0.25, 0.88],
  [0.86, 0.24],
]
const N = TOKENS.length
const X0 = 26
const STEP = 64
const BOXW = 52
const cx = (i: number) => X0 + i * STEP + BOXW / 2

/** Self-attention: pick a query token and see how attention spreads — temperature sharpens or flattens it. */
export default function AttentionLab({ color }: { color: string }) {
  const [q, setQ] = useState(1)
  const [temp, setTemp] = useState(0.5)

  const weights = useMemo(() => {
    const scores = EMB.map(([kx, ky]) => (EMB[q][0] * kx + EMB[q][1] * ky) / Math.max(0.05, temp))
    const mx = Math.max(...scores)
    const exps = scores.map((s) => Math.exp(s - mx))
    const sum = exps.reduce((a, e) => a + e, 0)
    return exps.map((e) => e / sum)
  }, [q, temp])

  return (
    <div className="rounded-2xl border border-border2 glass overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block w-full h-auto" role="img" aria-label="Attention playground">
        {/* attention arcs from query to each token */}
        {TOKENS.map((_, j) => {
          const w = weights[j]
          const qx = cx(q)
          const tx = cx(j)
          const my = 70 - w * 30
          return <path key={j} d={`M ${qx} 132 Q ${(qx + tx) / 2} ${my} ${tx} 132`} fill="none" stroke={color} strokeWidth={1 + w * 9} opacity={0.15 + w * 0.7} strokeLinecap="round" />
        })}

        {/* tokens */}
        {TOKENS.map((tok, i) => (
          <g key={i} className="cursor-pointer" onClick={() => setQ(i)}>
            <rect x={X0 + i * STEP} y={132} width={BOXW} height={32} rx={7} fill={i === q ? `${color}1A` : 'var(--color-surface2)'} stroke={i === q ? color : 'var(--color-border2)'} strokeWidth={i === q ? 2 : 1.2} />
            <text x={cx(i)} y={152} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-txt)">{tok}</text>
            {/* weight bar */}
            <rect x={cx(i) - 16} y={262 - weights[i] * 80} width={32} height={weights[i] * 80} rx={3} fill={color} opacity={0.85} />
            <line x1={cx(i) - 18} y1={262} x2={cx(i) + 18} y2={262} stroke="var(--color-border2)" />
            <text x={cx(i)} y={278} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fill="var(--color-txt3)">{Math.round(weights[i] * 100)}%</text>
          </g>
        ))}
        <text x={X0} y={26} fontFamily="var(--font-mono)" fontSize={11} fill={color}>query: “{TOKENS[q]}” — click a token to change</text>
      </svg>
      <div className="px-4 py-3 border-t border-border bg-surface/60">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-txt3">temperature · {temp.toFixed(2)} {temp < 0.3 ? '(sharp)' : temp > 1.2 ? '(flat)' : ''}</span>
          <input type="range" min={0.1} max={2} step={0.05} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full h-1 mt-1.5" style={{ accentColor: color }} />
        </label>
        <p className="text-[11px] text-txt3 leading-relaxed mt-2">
          Attention = <span className="font-mono">softmax(q·kⱼ / τ)</span>. Low temperature focuses on the best match;
          high temperature spreads attention evenly.
        </p>
      </div>
    </div>
  )
}
