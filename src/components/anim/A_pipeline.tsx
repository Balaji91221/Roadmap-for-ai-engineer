'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, onLine, segment } from '@/lib/anim/util'
import { Box, Dot, Edge, Title } from './_primitives'

// Concept · Data Pipeline — records flow through ingest → clean → features → train.
const STAGES = [
  { label: 'Ingest', sub: 'raw data' },
  { label: 'Clean', sub: 'validate' },
  { label: 'Features', sub: 'transform' },
  { label: 'Train', sub: 'model' },
]
const BW = 112
const GAP = 26
const X0 = 18
const CY = 126
const cx = (i: number) => X0 + i * (BW + GAP) + BW / 2

export const A_pipeline: AnimSpec = {
  id: 'A_pipeline',
  title: 'Data Pipeline',
  caption: 'Data moves through sequential stages — ingest, clean, engineer features, then train — as a pipeline.',
  draw: (t, { color }) => {
    const { index, local } = segment(t, STAGES.length - 1)
    const from = { x: cx(index) + BW / 2 - 8, y: CY }
    const to = { x: cx(index + 1) - BW / 2 + 8, y: CY }
    const packet = onLine(easeInOut(local), from, to)
    const activeBox = local < 0.5 ? index : index + 1

    return (
      <>
        <Title text="Data Pipeline" color={color} />
        {STAGES.slice(0, -1).map((_, i) => (
          <Edge key={i} x1={cx(i) + BW / 2 - 6} y1={CY} x2={cx(i + 1) - BW / 2 + 6} y2={CY} color="var(--color-border3)" arrow />
        ))}
        {STAGES.map((s, i) => (
          <Box key={i} x={X0 + i * (BW + GAP)} y={CY - 32} w={BW} h={64} label={s.label} sub={s.sub} color={color} active={i === activeBox} />
        ))}
        <Dot x={packet.x} y={packet.y} r={5.5} color={color} glow />
      </>
    )
  },
}

export default A_pipeline
