'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { onCircle, pulse, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Title } from './_primitives'

// Div 4 · Agentic AI — a dot cycles think → act → observe; the tool node flashes on "act".
const CX = 225
const CY = 145
const R = 64
const NODES = [
  { label: 'Think', angle: 0 },
  { label: 'Act', angle: 1 / 3 },
  { label: 'Observe', angle: 2 / 3 },
]

export const A_agentloop: AnimSpec = {
  id: 'A_agentloop',
  title: 'The Agent Loop',
  caption: 'An agent repeatedly reasons (think), calls a tool (act), and reads the result (observe).',
  draw: (t, { color }) => {
    const dot = onCircle(t, CX, CY, R)
    const { index: active } = segment(t, 3)
    const toolFlash = pulse(t, 1 / 3, 0.12) // peaks as the dot passes "Act"

    return (
      <>
        <Title text="The Agent Loop" color={color} />

        {/* loop ring */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-border2)" strokeWidth={1.4} strokeDasharray="3 5" />

        {/* node positions */}
        {NODES.map((n, i) => {
          const p = onCircle(n.angle, CX, CY, R)
          return <Box key={i} x={p.x - 42} y={p.y - 17} w={84} h={34} label={n.label} color={color} active={i === active} />
        })}

        {/* tool node, flashes on act */}
        <Edge x1={CX + R + 6} y1={CY + 30} x2={400} y2={120} color="var(--color-border3)" arrow />
        <rect x={400} y={98} width={96} height={48} rx={10} fill={`${color}1A`} stroke={color} strokeWidth={1 + toolFlash * 2.5} opacity={0.5 + toolFlash * 0.5} />
        <text x={448} y={118} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={12} fill="var(--color-txt)">
          Tool
        </text>
        <text x={448} y={132} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={8.5} fill="var(--color-txt3)">
          search · code · API
        </text>

        {/* the cycling cursor */}
        <Dot x={dot.x} y={dot.y} r={6} color={color} glow />
      </>
    )
  },
}

export default A_agentloop
