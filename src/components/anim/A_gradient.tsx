'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, lerp } from '@/lib/anim/util'
import { Dot, Label, Title } from './_primitives'

// Concept · Gradient Descent — a ball rolls down the loss curve toward the minimum each loop.
const X0 = 60
const X1 = 500
const VX = 300 // vertex x
const VY = 196 // vertex y (minimum)
const A = 0.0022 // curvature
const yAt = (x: number) => VY + A * (x - VX) * (x - VX)

export const A_gradient: AnimSpec = {
  id: 'A_gradient',
  title: 'Gradient Descent',
  caption: 'Each step moves the parameters downhill along the gradient until the loss reaches its minimum.',
  draw: (t, { color }) => {
    const p = easeInOut(t)
    const ballX = lerp(X0 + 8, VX, p)
    const ballY = yAt(ballX)
    const path = Array.from({ length: 40 }, (_, i) => {
      const x = lerp(X0, X1, i / 39)
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${yAt(x).toFixed(1)}`
    }).join(' ')
    // discrete step markers the ball has passed
    const steps = [0.1, 0.25, 0.42, 0.62, 0.85]

    return (
      <>
        <Title text="Gradient Descent" color={color} />
        <Label x={40} y={60} text="loss" anchor="start" />
        <line x1={48} y1={48} x2={48} y2={214} stroke="var(--color-border2)" strokeWidth={1} />
        <line x1={48} y1={214} x2={508} y2={214} stroke="var(--color-border2)" strokeWidth={1} />
        <Label x={500} y={228} text="parameter θ" anchor="end" />

        <path d={path} fill="none" stroke="var(--color-border3)" strokeWidth={2} />
        {steps.map((s, i) => {
          const x = lerp(X0 + 8, VX, easeInOut(s))
          return <circle key={i} cx={x} cy={yAt(x)} r={3} fill={color} opacity={t >= s ? 0.5 : 0.12} />
        })}

        {/* gradient arrow at the ball (tangent direction) */}
        <Dot x={ballX} y={ballY} r={7} color={color} glow />
        <Label x={VX} y={VY + 24} text="minimum" color="var(--color-txt3)" />
      </>
    )
  },
}

export default A_gradient
