'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { Label, Title } from './_primitives'

// Concept · Backpropagation — a forward pass, then the error gradient flows backward to update weights.
const LAYERS = [
  { x: 110, n: 3 },
  { x: 265, n: 4 },
  { x: 420, n: 2 },
]
const yFor = (i: number, n: number) => 100 + (i - (n - 1) / 2) * 40

export const A_backprop: AnimSpec = {
  id: 'A_backprop',
  title: 'Backpropagation',
  caption: 'After a forward pass, the loss gradient propagates backward, nudging each weight to reduce error.',
  draw: (t, { color }) => {
    const forward = t < 0.5
    const phase = forward ? t / 0.5 : (t - 0.5) / 0.5
    // forward sweeps left→right (0..1), backward sweeps right→left
    const sweep = forward ? phase * 2 : (1 - phase) * 2 // 0..2 across the 2 gaps

    return (
      <>
        <Title text="Backpropagation" color={color} />
        <Label x={265} y={42} text={forward ? 'forward pass →' : '← backward · ∇ gradient'} color={forward ? 'var(--color-txt2)' : color} size={11} weight={600} />

        {LAYERS.slice(0, -1).map((L, li) => {
          const N = LAYERS[li + 1]
          const lit = sweep > li && sweep <= li + 1.05
          const stroke = forward ? color : 'var(--color-rose)'
          return (
            <g key={li}>
              {Array.from({ length: L.n }).map((_, i) =>
                Array.from({ length: N.n }).map((_, j) => (
                  <line
                    key={`${i}-${j}`}
                    x1={L.x}
                    y1={yFor(i, L.n)}
                    x2={N.x}
                    y2={yFor(j, N.n)}
                    stroke={lit ? stroke : 'var(--color-border2)'}
                    strokeWidth={lit ? 1.8 : 0.8}
                    opacity={lit ? 0.85 : 0.4}
                  />
                )),
              )}
            </g>
          )
        })}

        {LAYERS.map((L, li) => (
          <g key={li}>
            {Array.from({ length: L.n }).map((_, i) => {
              const active = Math.round(sweep) === li
              return (
                <circle
                  key={i}
                  cx={L.x}
                  cy={yFor(i, L.n)}
                  r={11}
                  fill={active ? (forward ? color : 'var(--color-rose)') : 'var(--color-surface2)'}
                  stroke={active ? (forward ? color : 'var(--color-rose)') : 'var(--color-border3)'}
                  strokeWidth={1.6}
                  style={active ? { filter: 'url(#animGlow)' } : undefined}
                />
              )
            })}
          </g>
        ))}
      </>
    )
  },
}

export default A_backprop
