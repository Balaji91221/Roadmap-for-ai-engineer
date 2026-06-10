'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { segment } from '@/lib/anim/util'
import { Box, Label, Title } from './_primitives'

// Concept · Chain-of-Thought — the model reveals intermediate reasoning steps before the answer.
const STEPS = ['① 23 × 17 = 23 × 10 + 23 × 7', '② = 230 + 161', '③ = 391']

export const A_cot: AnimSpec = {
  id: 'A_cot',
  title: 'Chain-of-Thought',
  caption: 'Prompting the model to reason step by step improves accuracy on multi-step problems.',
  draw: (t, { color }) => {
    const { index } = segment(t, STEPS.length + 1)

    return (
      <>
        <Title text="Chain-of-Thought" color={color} />
        <Box x={30} y={44} w={210} h={40} label="Prompt: 23 × 17 = ?" color={color} active />

        {STEPS.map((s, i) => (
          <g key={i} opacity={index > i ? 1 : 0.16}>
            <rect x={30} y={98 + i * 34} width={350} height={28} rx={7} fill="var(--color-surface2)" stroke={index > i ? 'var(--color-border3)' : 'var(--color-border2)'} />
            <Label x={42} y={116 + i * 34} text={s} anchor="start" color="var(--color-txt2)" size={11} />
          </g>
        ))}

        <g opacity={index >= STEPS.length ? 1 : 0.16}>
          <rect x={300} y={196} width={170} height={40} rx={9} fill={`${color}1A`} stroke={color} strokeWidth={1.8} />
          <text x={385} y={221} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={13} fill="var(--color-txt)">
            Answer: 391
          </text>
        </g>
      </>
    )
  },
}

export default A_cot
