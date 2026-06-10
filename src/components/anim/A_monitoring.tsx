'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { Dot, Label, Title } from './_primitives'

// Concept · Observability — a live latency metric scrolls; crossing the SLO threshold fires an alert.
const N = 56
const X0 = 60
const X1 = 470
const TOP = 56
const BOT = 188
const THRESH = 0.78

function value(i: number, t: number): number {
  const phase = (i / N) * Math.PI * 4 + t * Math.PI * 2 * 3
  const base = 0.42 + 0.16 * Math.sin(phase)
  // a spike that travels across the window
  const bump = ((t * N * 1.0) % (N + 20)) - 10
  const spike = 0.5 * Math.exp(-((i - bump) * (i - bump)) / 10)
  return Math.min(1, base + spike)
}

export const A_monitoring: AnimSpec = {
  id: 'A_monitoring',
  title: 'Observability',
  caption: 'Live metrics are tracked against SLO thresholds; a breach triggers an alert for on-call.',
  draw: (t, { color }) => {
    const yFor = (v: number) => BOT - v * (BOT - TOP)
    const path = Array.from({ length: N }, (_, i) => {
      const x = X0 + (i / (N - 1)) * (X1 - X0)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${yFor(value(i, t)).toFixed(1)}`
    }).join(' ')
    const last = value(N - 1, t)
    const breach = last > THRESH

    return (
      <>
        <Title text="Observability" color={color} />
        <Label x={X0} y={46} text="p95 latency" anchor="start" />
        <rect x={X0} y={TOP} width={X1 - X0} height={BOT - TOP} rx={8} fill="var(--color-surface2)" stroke="var(--color-border2)" />

        {/* SLO threshold */}
        <line x1={X0} y1={yFor(THRESH)} x2={X1} y2={yFor(THRESH)} stroke="var(--color-rose)" strokeWidth={1.2} strokeDasharray="4 4" opacity={0.8} />
        <Label x={X1 - 4} y={yFor(THRESH) - 5} text="SLO" anchor="end" color="var(--color-rose)" size={9} />

        <path d={path} fill="none" stroke={breach ? 'var(--color-rose)' : color} strokeWidth={2} />
        <Dot x={X1} y={yFor(last)} r={4.5} color={breach ? 'var(--color-rose)' : color} glow />

        {breach && (
          <g>
            <rect x={X0 + 8} y={TOP + 8} width={70} height={22} rx={6} fill="rgba(244,63,94,0.15)" stroke="var(--color-rose)" />
            <text x={X0 + 43} y={TOP + 23} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-rose)">
              ⚠ ALERT
            </text>
          </g>
        )}
      </>
    )
  },
}

export default A_monitoring
