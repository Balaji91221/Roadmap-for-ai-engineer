'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { segment } from '@/lib/anim/util'
import { Label, Title } from './_primitives'

// Concept · Neural Network — a signal propagates forward through the layers each loop.
const LAYERS = [
  { x: 95, n: 3, label: 'input' },
  { x: 250, n: 4, label: 'hidden' },
  { x: 405, n: 2, label: 'output' },
]
const yFor = (i: number, n: number) => 95 + (i - (n - 1) / 2) * 42

export const A_neuralnet: AnimSpec = {
  id: 'A_neuralnet',
  title: 'Neural Network',
  caption: 'Inputs flow through weighted connections and activations, layer by layer, to produce an output.',
  draw: (t, { color }) => {
    const { index: active } = segment(t, LAYERS.length)

    return (
      <>
        <Title text="Forward Pass" color={color} />

        {/* edges */}
        {LAYERS.slice(0, -1).map((L, li) => {
          const N = LAYERS[li + 1]
          const lit = active >= li + 1
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
                    stroke={lit ? color : 'var(--color-border2)'}
                    strokeWidth={lit ? 1.4 : 0.8}
                    opacity={lit ? 0.7 : 0.4}
                  />
                )),
              )}
            </g>
          )
        })}

        {/* nodes */}
        {LAYERS.map((L, li) => (
          <g key={li}>
            {Array.from({ length: L.n }).map((_, i) => (
              <circle
                key={i}
                cx={L.x}
                cy={yFor(i, L.n)}
                r={11}
                fill={li === active ? color : 'var(--color-surface2)'}
                stroke={li === active ? color : 'var(--color-border3)'}
                strokeWidth={1.6}
                style={li === active ? { filter: 'url(#animGlow)' } : undefined}
              />
            ))}
            <Label x={L.x} y={205} text={L.label} />
          </g>
        ))}
      </>
    )
  },
}

export default A_neuralnet
