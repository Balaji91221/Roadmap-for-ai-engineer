'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { Label, Title } from './_primitives'

// Concept · Autoscaling — replica count tracks incoming load up and down.
const MAX = 5

export const A_autoscale: AnimSpec = {
  id: 'A_autoscale',
  title: 'Autoscaling',
  caption: 'As traffic rises and falls, the orchestrator adds or removes replicas to match demand.',
  draw: (t, { color }) => {
    const load = 0.5 + 0.5 * Math.sin(t * Math.PI * 2)
    const replicas = Math.max(1, Math.round(1 + load * (MAX - 1)))

    // load curve
    const pts = Array.from({ length: 48 }, (_, i) => {
      const x = 60 + (i / 47) * 430
      const l = 0.5 + 0.5 * Math.sin((i / 47) * Math.PI * 2 + t * Math.PI * 2)
      const y = 110 - l * 56
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    }).join(' ')

    return (
      <>
        <Title text="Autoscaling" color={color} />
        <Label x={60} y={48} text="load" anchor="start" />
        <path d={pts} fill="none" stroke={color} strokeWidth={2} />
        <circle cx={490} cy={110 - load * 56} r={4} fill={color} style={{ filter: 'url(#animGlow)' }} />

        <line x1={60} y1={150} x2={490} y2={150} stroke="var(--color-border2)" strokeDasharray="3 4" />
        <Label x={60} y={170} text="replicas" anchor="start" />
        {Array.from({ length: MAX }).map((_, i) => {
          const on = i < replicas
          return (
            <rect
              key={i}
              x={150 + i * 70}
              y={165}
              width={56}
              height={46}
              rx={8}
              fill={on ? `${color}1A` : 'var(--color-surface2)'}
              stroke={on ? color : 'var(--color-border2)'}
              strokeWidth={on ? 1.8 : 1}
              opacity={on ? 1 : 0.4}
            />
          )
        })}
        <Label x={462} y={196} text={`×${replicas}`} color={color} size={14} weight={700} anchor="end" />
      </>
    )
  },
}

export default A_autoscale
