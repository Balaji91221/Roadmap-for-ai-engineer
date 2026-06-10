'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, lerp, onLine } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Div 7 · Agent Deployment — traffic split shifts from 95/5 to 50/50 as the canary proves itself.
const SPLIT = { x: 128, y: 130 }
const V1 = { x: 385, y: 84 }
const V2 = { x: 385, y: 176 }

export const A_canary: AnimSpec = {
  id: 'A_canary',
  title: 'Canary Deployment',
  caption: 'Traffic shifts gradually from the stable version (v1) to the canary (v2) while metrics are watched.',
  draw: (t, { color }) => {
    const e = easeInOut(t)
    const v2 = lerp(0.05, 0.5, e)
    const v1 = 1 - v2
    const barH = 120
    const barY = 70
    const v1H = v1 * barH

    const flow = (t * 2) % 1
    const d1 = onLine(easeInOut(flow), SPLIT, V1)
    const d2 = onLine(easeInOut((flow + 0.5) % 1), SPLIT, V2)

    return (
      <>
        <Title text="Canary Deployment" color={color} />

        <Box x={16} y={108} w={74} h={44} label="Traffic" color={color} active />
        <Edge x1={90} y1={130} x2={118} y2={130} color="var(--color-border3)" arrow />

        {/* split bar (v1 stable on top, v2 canary on bottom) */}
        <rect x={120} y={barY} width={16} height={barH} rx={8} fill="var(--color-surface3)" />
        <rect x={120} y={barY} width={16} height={v1H} rx={8} fill="var(--color-green)" />
        <rect x={120} y={barY + v1H} width={16} height={barH - v1H} rx={8} fill={color} />

        {/* routes */}
        <Edge x1={SPLIT.x + 8} y1={SPLIT.y - 6} x2={V1.x - 60} y2={V1.y} color="var(--color-green)" width={1.6} opacity={0.5 + v1 * 0.5} />
        <Edge x1={SPLIT.x + 8} y1={SPLIT.y + 6} x2={V2.x - 60} y2={V2.y} color={color} width={1.6} opacity={0.4 + v2 * 0.6} />

        <Box x={V1.x - 60} y={V1.y - 24} w={130} h={48} label="v1 · stable" color="var(--color-green)" active />
        <Box x={V2.x - 60} y={V2.y - 24} w={130} h={48} label="v2 · canary" color={color} active />

        <Label x={V1.x + 80} y={V1.y + 2} text={`${Math.round(v1 * 100)}%`} color="var(--color-green)" anchor="start" size={13} weight={700} />
        <Label x={V2.x + 80} y={V2.y + 2} text={`${Math.round(v2 * 100)}%`} color={color} anchor="start" size={13} weight={700} />

        <Dot x={d1.x} y={d1.y} r={4} color="var(--color-green)" />
        <Dot x={d2.x} y={d2.y} r={4} color={color} />
      </>
    )
  },
}

export default A_canary
