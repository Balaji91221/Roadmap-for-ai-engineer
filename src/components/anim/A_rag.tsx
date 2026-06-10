'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { clamp01, easeInOut, onLine, pulse, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Div 3 · Generative AI — query → embedder → vector DB (top-k highlight) → LLM → answer travels back.
const WP = [
  { x: 53, y: 122 },
  { x: 150, y: 122 },
  { x: 266, y: 122 },
  { x: 381, y: 122 },
  { x: 475, y: 122 },
]
const DOC_Y = [96, 118, 140, 162]
const TOPK = [0, 2]

export const A_rag: AnimSpec = {
  id: 'A_rag',
  title: 'Retrieval-Augmented Generation',
  caption: 'A query is embedded, the top-k matching documents are retrieved, then the LLM grounds its answer on them.',
  draw: (t, { color }) => {
    const travel = clamp01(t / 0.85)
    const { index, local } = segment(travel, 4)
    const dot = onLine(easeInOut(local), WP[index], WP[index + 1])
    const retrieved = pulse(t, 0.45, 0.18)
    const returning = t > 0.85
    const retP = returning ? (t - 0.85) / 0.15 : 0

    return (
      <>
        <Title text="Retrieval-Augmented Generation" color={color} />

        {/* pipeline edges */}
        <Edge x1={88} y1={122} x2={108} y2={122} color="var(--color-border3)" arrow />
        <Edge x1={190} y1={122} x2={208} y2={122} color="var(--color-border3)" arrow />
        <Edge x1={322} y1={122} x2={344} y2={122} color="var(--color-border3)" arrow />
        <Edge x1={418} y1={122} x2={436} y2={122} color="var(--color-border3)" arrow />

        <Box x={18} y={100} w={70} h={44} label="Query" color={color} active={index === 0} />
        <Box x={110} y={100} w={80} h={44} label="Embed" sub="→ vector" color={color} active={index === 1} />

        {/* vector DB with documents; top-k highlight on retrieval */}
        <rect x={210} y={70} width={112} height={108} rx={10} fill="var(--color-surface2)" stroke={retrieved > 0.3 ? color : 'var(--color-border2)'} strokeWidth={retrieved > 0.3 ? 2 : 1.2} />
        <Label x={266} y={86} text="Vector DB" color="var(--color-txt2)" size={10} weight={600} />
        {DOC_Y.map((y, i) => {
          const hot = TOPK.includes(i)
          return (
            <rect
              key={i}
              x={222}
              y={y}
              width={88}
              height={13}
              rx={3}
              fill={hot ? color : 'var(--color-surface3)'}
              opacity={hot ? 0.3 + retrieved * 0.7 : 0.6}
            />
          )
        })}

        <Box x={344} y={100} w={72} h={44} label="LLM" color={color} active={index === 3} />
        <Box x={436} y={100} w={78} h={44} label="Answer" color={color} active={returning} />

        {/* answer travels back to the user */}
        <path d={`M 475 150 Q 266 214 53 150`} fill="none" stroke="var(--color-border3)" strokeWidth={1.3} strokeDasharray="4 5" opacity={0.5} />
        {returning &&
          (() => {
            const p = easeInOut(retP)
            // quadratic bezier point along the return arc
            const x = (1 - p) * (1 - p) * 475 + 2 * (1 - p) * p * 266 + p * p * 53
            const y = (1 - p) * (1 - p) * 150 + 2 * (1 - p) * p * 214 + p * p * 150
            return <Dot x={x} y={y} r={5} color={color} glow />
          })()}

        {!returning && <Dot x={dot.x} y={dot.y} r={5} color={color} glow />}
      </>
    )
  },
}

export default A_rag
