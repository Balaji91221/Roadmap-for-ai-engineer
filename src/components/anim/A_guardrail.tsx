'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, onLine, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Concept · Guardrails — inputs pass a safety filter; safe ones are allowed, unsafe ones blocked.
const IN = { x: 70, y: 125 }
const FILTER = { x: 250, y: 125 }
const ALLOW = { x: 440, y: 78 }
const BLOCK = { x: 440, y: 172 }

export const A_guardrail: AnimSpec = {
  id: 'A_guardrail',
  title: 'Guardrails',
  caption: 'A safety layer inspects each request, letting safe ones through and blocking unsafe or malicious ones.',
  draw: (t, { color }) => {
    const { index, local } = segment(t, 2)
    const safe = index === 0 // alternate safe / unsafe
    const p = easeInOut(local)
    const dest = safe ? ALLOW : BLOCK
    const dot = p < 0.5 ? onLine(p * 2, IN, FILTER) : onLine((p - 0.5) * 2, FILTER, dest)
    const decided = p >= 0.5

    return (
      <>
        <Title text="Safety Guardrails" color={color} />
        <Edge x1={IN.x + 40} y1={IN.y} x2={FILTER.x - 44} y2={FILTER.y} color="var(--color-border3)" />
        <Edge x1={FILTER.x + 44} y1={FILTER.y - 6} x2={ALLOW.x - 56} y2={ALLOW.y} color="var(--color-green)" opacity={0.5} />
        <Edge x1={FILTER.x + 44} y1={FILTER.y + 6} x2={BLOCK.x - 56} y2={BLOCK.y} color="var(--color-rose)" opacity={0.5} />

        <Box x={IN.x - 40} y={IN.y - 22} w={80} h={44} label="Input" color={color} active />
        <Box x={FILTER.x - 44} y={FILTER.y - 28} w={88} h={56} label="Filter" sub="policy" color={color} active />
        <Box x={ALLOW.x - 56} y={ALLOW.y - 20} w={112} h={40} label="✓ Allowed" color="var(--color-green)" active={decided && safe} />
        <Box x={BLOCK.x - 56} y={BLOCK.y - 20} w={112} h={40} label="✕ Blocked" color="var(--color-rose)" active={decided && !safe} />

        <Label x={IN.x} y={IN.y - 32} text={safe ? 'safe prompt' : 'injection ⚠'} color={safe ? 'var(--color-green)' : 'var(--color-rose)'} size={9} />
        <Dot x={dot.x} y={dot.y} r={5.5} color={safe ? 'var(--color-green)' : 'var(--color-rose)'} glow />
      </>
    )
  },
}

export default A_guardrail
