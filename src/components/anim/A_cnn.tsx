'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { hash, segment } from '@/lib/anim/util'
import { Label, Title } from './_primitives'

// Concept · CNN — a kernel slides over the input, producing one feature-map cell per position.
const IN = 6 // input grid 6x6
const OUT = 4 // feature map 4x4 (valid conv, k=3)
const GX = 40
const GY = 64
const C = 26
const FX = 360
const FY = 76
const FC = 30

export const A_cnn: AnimSpec = {
  id: 'A_cnn',
  title: 'Convolution (CNN)',
  caption: 'A small kernel slides across the image; each position produces one value in the feature map.',
  draw: (t, { color }) => {
    const { index } = segment(t, OUT * OUT)
    const or = Math.floor(index / OUT)
    const oc = index % OUT

    return (
      <>
        <Title text="Convolution" color={color} />
        <Label x={GX} y={54} text="input" anchor="start" />
        {/* input grid */}
        {Array.from({ length: IN }).map((_, r) =>
          Array.from({ length: IN }).map((_, c) => {
            const n = 0.15 + hash(r * IN + c) * 0.5
            const inWindow = r >= or && r < or + 3 && c >= oc && c < oc + 3
            return (
              <rect
                key={`${r}-${c}`}
                x={GX + c * C}
                y={GY + r * C}
                width={C - 2}
                height={C - 2}
                rx={3}
                fill={inWindow ? color : 'var(--color-surface3)'}
                opacity={inWindow ? 0.55 : n}
              />
            )
          }),
        )}
        {/* kernel outline */}
        <rect x={GX + oc * C - 1} y={GY + or * C - 1} width={C * 3} height={C * 3} rx={4} fill="none" stroke={color} strokeWidth={2.5} />

        {/* arrow */}
        <text x={300} y={GY + 3 * C} fontSize={20} fill="var(--color-txt3)">→</text>

        {/* feature map */}
        <Label x={FX} y={64} text="feature map" anchor="start" />
        {Array.from({ length: OUT }).map((_, r) =>
          Array.from({ length: OUT }).map((_, c) => {
            const done = r * OUT + c <= index
            const isCur = r === or && c === oc
            return (
              <rect
                key={`${r}-${c}`}
                x={FX + c * FC}
                y={FY + r * FC}
                width={FC - 3}
                height={FC - 3}
                rx={3}
                fill={done ? color : 'var(--color-surface3)'}
                opacity={isCur ? 1 : done ? 0.5 : 0.15}
                stroke={isCur ? color : 'none'}
                strokeWidth={isCur ? 2 : 0}
              />
            )
          }),
        )}
      </>
    )
  },
}

export default A_cnn
