'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { clamp01, easeInOut, lerp, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Div 6 · Production AI — requests queue into the server, get batched, and a batch departs to the GPU each cycle.
const SLOT_X = [70, 98, 126, 154]
const QUEUE_Y = 126

export const A_serving: AnimSpec = {
  id: 'A_serving',
  title: 'Batched Inference Serving',
  caption: 'Incoming requests wait in a queue; the server groups them into a batch that runs on the GPU together.',
  draw: (t, { color }) => {
    const { local } = segment(t, 4) // 4 batch cycles per loop
    const filling = clamp01(local / 0.6)
    const filled = Math.round(filling * 4)
    const departing = local > 0.62
    const departP = departing ? easeInOut((local - 0.62) / 0.38) : 0
    const stream = (t * 8) % 1

    return (
      <>
        <Title text="Batched Inference Serving" color={color} />
        <Label x={40} y={108} text="requests" color="var(--color-txt3)" />

        {/* incoming stream */}
        <Edge x1={20} y1={QUEUE_Y} x2={58} y2={QUEUE_Y} color="var(--color-border3)" arrow />
        {!departing && <Dot x={lerp(22, 56, stream)} y={QUEUE_Y} r={3.5} color={color} />}

        {/* queue slots */}
        {SLOT_X.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={QUEUE_Y}
            r={6}
            fill={!departing && i < filled ? color : 'var(--color-surface3)'}
            stroke="var(--color-border2)"
            strokeWidth={1}
          />
        ))}

        <Box x={188} y={92} w={120} h={66} label="Inference" sub="server · batch=4" color={color} active={local > 0.5} />

        {/* batch departs to the GPU */}
        <Edge x1={308} y1={125} x2={344} y2={125} color="var(--color-border3)" arrow />
        <Box x={350} y={98} w={156} h={54} label="GPU compute" color={color} active={departing} />
        {departing && (
          <g transform={`translate(${lerp(250, 372, departP)}, 125)`}>
            <rect x={-16} y={-11} width={32} height={22} rx={5} fill={color} opacity={0.9} style={{ filter: 'url(#animGlow)' }} />
            <text x={0} y={4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fill="#fff">
              ×4
            </text>
          </g>
        )}
      </>
    )
  },
}

export default A_serving
