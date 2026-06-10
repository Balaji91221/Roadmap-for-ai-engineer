'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { tri } from '@/lib/anim/util'
import { Box, Edge, Label, Title } from './_primitives'

// Concept · Fine-tuning (LoRA) — the base model stays frozen while a small adapter trains.
export const A_finetune: AnimSpec = {
  id: 'A_finetune',
  title: 'Fine-tuning · LoRA',
  caption: 'The large base model is frozen; only a small low-rank adapter is trained, cheaply specialising it.',
  draw: (t, { color }) => {
    return (
      <>
        <Title text="Fine-tuning (LoRA)" color={color} />

        {/* frozen base model */}
        <rect x={50} y={66} width={210} height={120} rx={12} fill="var(--color-surface2)" stroke="var(--color-border2)" strokeWidth={1.4} />
        <text x={155} y={120} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-txt)">
          Base LLM
        </text>
        <text x={155} y={140} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-sky)">
          ❄ frozen
        </text>

        <Edge x1={260} y1={126} x2={300} y2={126} color="var(--color-border3)" arrow />

        {/* trainable adapter */}
        <Box x={300} y={90} w={150} h={74} label="LoRA adapter" color={color} active />
        {Array.from({ length: 8 }).map((_, i) => {
          const r = Math.floor(i / 4)
          const c = i % 4
          const a = 0.25 + 0.7 * tri(t + i * 0.11)
          return <rect key={i} x={312 + c * 32} y={132 + r * 16} width={26} height={11} rx={2} fill={color} opacity={a} />
        })}

        {/* gradient flows only into the adapter */}
        <Edge x1={375} y1={210} x2={375} y2={166} color={color} width={1.6} arrow />
        <Label x={375} y={224} text="∇ train adapter only" color={color} size={10} />
      </>
    )
  },
}

export default A_finetune
