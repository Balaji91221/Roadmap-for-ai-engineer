'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, lerp } from '@/lib/anim/util'
import { Box, Dot, Edge, Label, Title } from './_primitives'

// Div 1 · ML Foundations — labeled data flows into a model; the decision boundary adjusts each loop.
const TRAIN = [
  { x: 388, y: 178, pos: true },
  { x: 404, y: 162, pos: true },
  { x: 392, y: 150, pos: true },
  { x: 470, y: 92, pos: false },
  { x: 486, y: 104, pos: false },
  { x: 474, y: 78, pos: false },
]

export const A_supervised: AnimSpec = {
  id: 'A_supervised',
  title: 'Supervised Learning',
  caption: 'Labeled examples flow into a model that fits a decision boundary separating the two classes.',
  draw: (t, { color }) => {
    const e = easeInOut(t)
    const angle = lerp(0.18, -0.62, e) // boundary rotates from a poor fit to a good fit
    const cx = 437
    const cy = 130
    const L = 78
    const dx = Math.cos(angle) * L
    const dy = Math.sin(angle) * L
    const stream = (t * 3) % 1

    return (
      <>
        <Title text="Supervised Learning" color={color} />

        {/* incoming labeled data */}
        <Label x={86} y={60} text="labeled data" />
        {[
          { x: 40, y: 80, pos: true },
          { x: 70, y: 110, pos: false },
          { x: 50, y: 140, pos: true },
          { x: 85, y: 165, pos: false },
          { x: 38, y: 185, pos: true },
        ].map((p, i) => (
          <Dot key={i} x={p.x} y={p.y} r={5} color={p.pos ? color : 'var(--color-txt3)'} />
        ))}

        {/* data -> model */}
        <Edge x1={110} y1={130} x2={196} y2={130} color="var(--color-border3)" width={1.5} arrow />
        <Dot x={lerp(112, 194, stream)} y={130} r={3.5} color={color} />

        <Box x={198} y={102} w={108} h={56} label="Model" sub="fit(X, y)" color={color} active />

        {/* model -> plot */}
        <Edge x1={306} y1={130} x2={356} y2={130} color="var(--color-border3)" width={1.5} arrow />

        {/* plot with moving boundary */}
        <rect x={360} y={56} width={152} height={150} rx={10} fill="var(--color-surface2)" stroke="var(--color-border2)" />
        <Label x={436} y={72} text="decision boundary" color="var(--color-txt3)" size={9} />
        <line x1={cx - dx} y1={cy - dy} x2={cx + dx} y2={cy + dy} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        {TRAIN.map((p, i) => (
          <Dot key={i} x={p.x} y={p.y} r={5} color={p.pos ? color : 'var(--color-txt3)'} />
        ))}
      </>
    )
  },
}

export default A_supervised
