'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, onLine, pulse, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Concept · MCP — a model talks to tools/resources through one standard server (vertical connectivity).
const LLM = { x: 265, y: 52 }
const SERVER = { x: 265, y: 124 }
const TOOLS = [
  { x: 110, label: 'Tool', sub: 'db query' },
  { x: 265, label: 'Tool', sub: 'web search' },
  { x: 420, label: 'Resource', sub: 'files' },
]
const TOOL_Y = 206

export const A_mcp: AnimSpec = {
  id: 'A_mcp',
  title: 'Model Context Protocol',
  caption: 'MCP gives a model one standard way to discover and call external tools, resources, and prompts.',
  draw: (t, { color }) => {
    // request: LLM -> server -> tool -> back
    const seg = segment(t, 4)
    const called = 1 // the tool that gets invoked this loop
    let dot = LLM
    if (seg.index === 0) dot = onLine(easeInOut(seg.local), LLM, SERVER)
    else if (seg.index === 1) dot = onLine(easeInOut(seg.local), SERVER, { x: TOOLS[called].x, y: TOOL_Y })
    else if (seg.index === 2) dot = onLine(easeInOut(seg.local), { x: TOOLS[called].x, y: TOOL_Y }, SERVER)
    else dot = onLine(easeInOut(seg.local), SERVER, LLM)
    const flash = pulse(t, 0.5, 0.12)

    return (
      <>
        <Title text="Model Context Protocol" color={color} />
        <Edge x1={LLM.x} y1={LLM.y + 18} x2={SERVER.x} y2={SERVER.y - 22} color="var(--color-border3)" />
        {TOOLS.map((tl, i) => (
          <Edge key={i} x1={SERVER.x} y1={SERVER.y + 22} x2={tl.x} y2={TOOL_Y - 20} color="var(--color-border3)" />
        ))}

        <Box x={215} y={34} w={100} h={36} label="LLM" color={color} active />
        <Box x={203} y={102} w={124} h={44} label="MCP Server" sub="tools · prompts" color={color} active />
        {TOOLS.map((tl, i) => (
          <Box key={i} x={tl.x - 48} y={TOOL_Y - 20} w={96} h={40} label={tl.label} sub={tl.sub} color={color} active={i === called && flash > 0.3} />
        ))}
        <Label x={SERVER.x + 70} y={120} text="vertical: model ↔ tools" color="var(--color-txt3)" size={9} anchor="start" />
        <Dot x={dot.x} y={dot.y} r={5.5} color={color} glow />
      </>
    )
  },
}

export default A_mcp
