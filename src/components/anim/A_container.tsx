'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { clamp01, easeInOut, lerp, segment } from '@/lib/anim/util'
import { Box, Edge, Label, Title } from './_primitives'

// Concept · Containers — source + deps are packaged into an immutable image, then run anywhere.
const LAYERS = ['app code', 'dependencies', 'runtime', 'base OS']

export const A_container: AnimSpec = {
  id: 'A_container',
  title: 'Containers',
  caption: 'Code and its dependencies are built into one portable image that runs identically on any host.',
  draw: (t, { color }) => {
    const { index, local } = segment(t, LAYERS.length + 2)
    const built = index // how many layers have stacked
    const shipping = index >= LAYERS.length
    const shipP = shipping ? easeInOut(clamp01((index - LAYERS.length + local) / 2)) : 0

    return (
      <>
        <Title text="Containers" color={color} />
        <Label x={70} y={56} text="build image" anchor="start" />
        {/* image layers stacking */}
        {LAYERS.map((l, i) => {
          const on = built > i
          const y = 180 - i * 28
          return (
            <g key={i} opacity={on ? 1 : 0.18}>
              <rect x={70} y={y} width={150} height={24} rx={5} fill={i === 3 ? 'var(--color-surface3)' : `${color}22`} stroke={on ? color : 'var(--color-border2)'} strokeWidth={1.2} />
              <text x={145} y={y + 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={10} fill="var(--color-txt2)">{l}</text>
            </g>
          )
        })}

        <Edge x1={228} y1={130} x2={300} y2={130} color="var(--color-border3)" arrow opacity={shipping ? 1 : 0.3} />

        {/* run on host */}
        <Box x={lerp(320, 360, shipP)} y={104} w={140} h={56} label="🐳 running" sub="any host" color={color} active={shipping} />
        <Label x={390} y={185} text="ship → run anywhere" color="var(--color-txt3)" size={9} />
      </>
    )
  },
}

export default A_container
