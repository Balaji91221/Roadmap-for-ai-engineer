'use client'

import type { AnimSpec } from '@/lib/anim/types'
import { easeInOut, hash, lerp, tri } from '@/lib/anim/util'
import { Label, Title } from './_primitives'

// Concept · Diffusion — random noise is iteratively denoised into a coherent image, then back.
const COLS = 16
const ROWS = 8
const GX = 90
const GY = 52
const CW = 22
const CH = 19
const CXC = COLS / 2 - 0.5
const CYC = ROWS / 2 - 0.5

export const A_diffusion: AnimSpec = {
  id: 'A_diffusion',
  title: 'Diffusion Models',
  caption: 'Starting from pure noise, the model removes a little noise at each step until an image emerges.',
  draw: (t, { color }) => {
    const d = easeInOut(tri(t)) // 0 = noise, 1 = clean image

    return (
      <>
        <Title text="Diffusion: noise → image" color={color} />
        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => {
            const i = r * COLS + c
            const dist = Math.hypot(c - CXC, (r - CYC) * 1.05)
            const sig = dist < 3.4 ? 1 : 0
            const n = hash(i)
            const fill = sig ? color : 'var(--color-surface3)'
            const opacity = sig ? lerp(n * 0.5 + 0.1, 1, d) : lerp(n * 0.55, 0.06, d)
            return <rect key={i} x={GX + c * CW} y={GY + r * CH} width={CW - 2} height={CH - 2} rx={3} fill={fill} opacity={opacity} />
          }),
        )}
        <Label x={GX} y={GY + ROWS * CH + 16} text={d > 0.5 ? 'denoised' : 'noisy latent'} anchor="start" color="var(--color-txt3)" />
      </>
    )
  },
}

export default A_diffusion
