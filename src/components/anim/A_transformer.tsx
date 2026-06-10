'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, segment } from '@/lib/anim/util'
import { Box, Label, Title } from './_primitives'

// Div 2 · Deep Learning — the active query token cycles; attention edges to every token animate by weight.
const TOKENS = ['The', 'cat', 'sat', 'on', 'mat']
const N = TOKENS.length
const X0 = 30
const STEP = 96
const BOX_W = 74
const BOX_H = 34
const TOP_Y = 178
const cx = (i: number) => X0 + i * STEP + BOX_W / 2

// Deterministic "learned" attention: each query attends most to one related token.
const TARGET = [2, 4, 1, 2, 1]
function weight(q: number, j: number): number {
  if (j === q) return 0.45
  if (j === TARGET[q]) return 1
  return Math.max(0.12, 0.5 - Math.abs(j - q) * 0.16)
}

export const A_transformer: AnimSpec = {
  id: 'A_transformer',
  title: 'Self-Attention',
  caption: 'Each token (the query) attends to every other token; thicker edges carry more attention weight.',
  draw: (t, { color }) => {
    const { index: q, local } = segment(t, N)
    const grow = easeInOut(local)
    const qx = cx(q)

    return (
      <>
        <Title text="Self-Attention" color={color} />
        <Label x={265} y={52} text={`query: "${TOKENS[q]}"`} color={color} size={11} weight={600} />

        {/* attention edges from the active query to all tokens */}
        {TOKENS.map((_, j) => {
          const w = weight(q, j)
          const tx = cx(j)
          const my = 78 - w * 24
          return (
            <path
              key={j}
              d={`M ${qx} ${TOP_Y} Q ${(qx + tx) / 2} ${my} ${tx} ${TOP_Y}`}
              fill="none"
              stroke={color}
              strokeWidth={1 + w * 4.5}
              opacity={(0.18 + w * 0.7) * grow}
              strokeLinecap="round"
            />
          )
        })}

        {/* token row */}
        {TOKENS.map((tok, i) => (
          <Box key={i} x={X0 + i * STEP} y={TOP_Y} w={BOX_W} h={BOX_H} label={tok} color={color} active={i === q} />
        ))}
      </>
    )
  },
}

export default A_transformer
