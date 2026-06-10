'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, hash, lerp } from '@/lib/anim/util'
import { Dot, Label, Title } from './_primitives'

// Concept · Embeddings — tokens move from scattered positions into meaning-based clusters.
const ITEMS = [
  { label: 'king', cluster: 0 },
  { label: 'queen', cluster: 0 },
  { label: 'prince', cluster: 0 },
  { label: 'apple', cluster: 1 },
  { label: 'mango', cluster: 1 },
  { label: 'banana', cluster: 1 },
  { label: 'run', cluster: 2 },
  { label: 'jump', cluster: 2 },
]
const CLUSTERS = [
  { x: 150, y: 95 },
  { x: 390, y: 110 },
  { x: 260, y: 185 },
]

export const A_embeddings: AnimSpec = {
  id: 'A_embeddings',
  title: 'Embeddings',
  caption: 'Words become vectors; training pulls semantically similar items close together in the space.',
  draw: (t, { color }) => {
    const p = easeInOut(t)
    return (
      <>
        <Title text="Embedding Space" color={color} />
        <rect x={70} y={44} width={420} height={176} rx={12} fill="var(--color-surface2)" stroke="var(--color-border2)" />

        {ITEMS.map((it, i) => {
          const sx = 90 + hash(i) * 380
          const sy = 56 + hash(i + 50) * 150
          const c = CLUSTERS[it.cluster]
          const tx = c.x + (hash(i + 9) - 0.5) * 50
          const ty = c.y + (hash(i + 17) - 0.5) * 44
          const x = lerp(sx, tx, p)
          const y = lerp(sy, ty, p)
          const hue = it.cluster === 0 ? color : it.cluster === 1 ? 'var(--color-green)' : 'var(--color-sky)'
          return (
            <g key={i}>
              <Dot x={x} y={y} r={5} color={hue} />
              <Label x={x + 8} y={y + 3} text={it.label} anchor="start" size={9} color="var(--color-txt2)" />
            </g>
          )
        })}
      </>
    )
  },
}

export default A_embeddings
