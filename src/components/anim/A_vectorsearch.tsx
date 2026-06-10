'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, hash, lerp, tri } from '@/lib/anim/util'
import { Dot, Label, Title } from './_primitives'

// Concept · Vector Search — an expanding radius around the query captures its nearest neighbours.
const QX = 265
const QY = 132
const POINTS = Array.from({ length: 14 }, (_, i) => {
  const x = 70 + hash(i) * 390
  const y = 60 + hash(i + 100) * 150
  return { x, y, d: Math.hypot(x - QX, y - QY) }
})
const NEAREST = [...POINTS].sort((a, b) => a.d - b.d).slice(0, 3)

export const A_vectorsearch: AnimSpec = {
  id: 'A_vectorsearch',
  title: 'Vector Search',
  caption: 'A query is embedded, then the nearest vectors by distance are retrieved as the top-k results.',
  draw: (t, { color }) => {
    const r = lerp(8, 165, easeInOut(tri(t)))

    return (
      <>
        <Title text="Nearest-Neighbour Search" color={color} />
        <rect x={50} y={44} width={440} height={180} rx={12} fill="var(--color-surface2)" stroke="var(--color-border2)" />

        {/* search radius */}
        <circle cx={QX} cy={QY} r={r} fill={`${color}12`} stroke={color} strokeWidth={1.4} strokeDasharray="4 5" />

        {POINTS.map((p, i) => {
          const captured = r >= p.d
          const top = NEAREST.includes(p)
          return (
            <g key={i}>
              {captured && top && <line x1={QX} y1={QY} x2={p.x} y2={p.y} stroke={color} strokeWidth={1.2} opacity={0.6} />}
              <Dot x={p.x} y={p.y} r={captured && top ? 6 : 4} color={captured ? (top ? color : 'var(--color-txt2)') : 'var(--color-txt3)'} />
            </g>
          )
        })}

        <Dot x={QX} y={QY} r={6} color={color} glow />
        <Label x={QX} y={QY - 12} text="query" color={color} size={10} weight={600} />
        <Label x={70} y={214} text="top-k nearest →" anchor="start" />
      </>
    )
  },
}

export default A_vectorsearch
