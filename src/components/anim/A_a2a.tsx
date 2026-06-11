'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, onLine, segment } from '@/lib/anim/util'
import { Box, Edge, Label, Title } from './_primitives'

// Concept · A2A — two peer agents exchange task cards directly (horizontal agent-to-agent comms).
const A = { x: 120, y: 130 }
const B = { x: 410, y: 130 }

export const A_a2a: AnimSpec = {
  id: 'A_a2a',
  title: 'Agent-to-Agent (A2A)',
  caption: 'A2A lets independent agents delegate work to each other by passing structured task cards.',
  draw: (t, { color }) => {
    const { index, local } = segment(t, 2)
    // 0: A sends task card to B; 1: B returns the result to A
    const card = index === 0 ? onLine(easeInOut(local), A, B) : onLine(easeInOut(local), B, A)
    const sending = index === 0

    return (
      <>
        <Title text="Agent-to-Agent (A2A)" color={color} />
        <Edge x1={A.x + 56} y1={A.y} x2={B.x - 56} y2={B.y} color="var(--color-border3)" dash="5 5" />
        <Label x={265} y={108} text="A2A · task card" color="var(--color-txt3)" size={10} />

        <Box x={A.x - 58} y={A.y - 30} w={116} h={60} label="Agent A" sub="planner" color={color} active={sending} />
        <Box x={B.x - 58} y={B.y - 30} w={116} h={60} label="Agent B" sub="researcher" color={color} active={!sending} />

        {/* the task card in flight */}
        <g transform={`translate(${card.x}, ${card.y})`}>
          <rect x={-20} y={-13} width={40} height={26} rx={4} fill={color} opacity={0.92} style={{ filter: 'url(#animGlow)' }} />
          <rect x={-13} y={-7} width={26} height={3} rx={1.5} fill="#fff" opacity={0.85} />
          <rect x={-13} y={-1} width={18} height={3} rx={1.5} fill="#fff" opacity={0.6} />
          <rect x={-13} y={5} width={22} height={3} rx={1.5} fill="#fff" opacity={0.6} />
        </g>
        <Label x={265} y={178} text={sending ? 'delegate →' : '← result'} color={color} size={10} />
      </>
    )
  },
}

export default A_a2a
