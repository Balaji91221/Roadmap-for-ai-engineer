'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, onLine, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Div 5 · Advanced Agents — an orchestrator exchanges messages with 3 agents over MCP.
const ORCH = { x: 265, y: 58 }
const AGENTS = [
  { x: 90, y: 190 },
  { x: 265, y: 190 },
  { x: 440, y: 190 },
]

export const A_multiagent: AnimSpec = {
  id: 'A_multiagent',
  title: 'Multi-Agent Orchestration',
  caption: 'A supervisor delegates to specialised agents and collects their results — each link speaks MCP.',
  draw: (t, { color }) => {
    const { index: a, local } = segment(t, AGENTS.length)
    const target = AGENTS[a]
    const msg = local < 0.5 ? onLine(easeInOut(local * 2), ORCH, target) : onLine(easeInOut((local - 0.5) * 2), target, ORCH)

    return (
      <>
        <Title text="Multi-Agent Orchestration" color={color} />

        {/* links + MCP labels */}
        {AGENTS.map((ag, i) => (
          <g key={i}>
            <Edge x1={ORCH.x} y1={ORCH.y + 22} x2={ag.x} y2={ag.y - 22} color={i === a ? color : 'var(--color-border3)'} width={i === a ? 1.8 : 1.2} opacity={i === a ? 1 : 0.6} />
            <Label x={(ORCH.x + ag.x) / 2 + (i === 1 ? 14 : 0)} y={(ORCH.y + ag.y) / 2} text="MCP" color="var(--color-txt3)" size={9} />
          </g>
        ))}

        <Box x={ORCH.x - 60} y={ORCH.y - 22} w={120} h={44} label="Orchestrator" color={color} active />
        {AGENTS.map((ag, i) => (
          <Box key={i} x={ag.x - 50} y={ag.y - 22} w={100} h={44} label={`Agent ${i + 1}`} color={color} active={i === a} />
        ))}

        {/* message in flight */}
        <Dot x={msg.x} y={msg.y} r={5.5} color={color} glow />
      </>
    )
  },
}

export default A_multiagent
