'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, hash, lerp, tri } from '@/lib/anim/util'
import { Label, Title } from './_primitives'

// Concept · Quantization — high-precision weights snap to a few low-precision buckets.
const N = 12
const X0 = 50
const X1 = 480
const LEVELS = 4
const TOP = 70
const BOT = 180

export const A_quantization: AnimSpec = {
  id: 'A_quantization',
  title: 'Quantization',
  caption: 'Float weights are mapped to a small set of low-precision levels — shrinking the model with minimal loss.',
  draw: (t, { color }) => {
    const q = easeInOut(tri(t)) // 0 = continuous, 1 = quantized
    const bucket = (v: number) => Math.round(v * (LEVELS - 1)) / (LEVELS - 1)

    return (
      <>
        <Title text="Quantization · FP → INT8" color={color} />
        {/* quantization levels */}
        {Array.from({ length: LEVELS }).map((_, l) => {
          const y = lerp(BOT, TOP, l / (LEVELS - 1))
          return <line key={l} x1={X0} y1={y} x2={X1} y2={y} stroke="var(--color-border2)" strokeDasharray="3 5" opacity={0.6} />
        })}
        <Label x={X0 - 8} y={TOP} text="hi" anchor="end" size={9} />
        <Label x={X0 - 8} y={BOT} text="lo" anchor="end" size={9} />

        {Array.from({ length: N }).map((_, i) => {
          const v = hash(i)
          const x = lerp(X0 + 14, X1 - 14, i / (N - 1))
          const y = lerp(lerp(BOT, TOP, v), lerp(BOT, TOP, bucket(v)), q)
          return <circle key={i} cx={x} cy={y} r={6} fill={color} opacity={0.9} />
        })}
        <Label x={265} y={210} text={q > 0.5 ? `${LEVELS} levels · INT8` : 'continuous · FP32'} color={q > 0.5 ? color : 'var(--color-txt3)'} size={11} weight={600} />
      </>
    )
  },
}

export default A_quantization
