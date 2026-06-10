import type { ReactNode } from 'react'

/** Static context handed to every frame. Colors come only from here (`color`) or theme tokens. */
export type AnimCtx = {
  color: string
  W: 530
  H: 250
  reduced: boolean
}

/**
 * A division explainer animation. `draw` is a PURE, DETERMINISTIC function of the loop
 * phase `t` (0..1) — no Date, no random, no internal state — so any `t` always renders
 * the same frame. The `AnimationFrame` player owns timing and accessibility.
 */
export type AnimSpec = {
  id: string
  title: string
  /** One-line plain-English description shown under the animation to explain the concept. */
  caption: string
  draw: (t: number, ctx: AnimCtx) => ReactNode
}

export const ANIM_W = 530 as const
export const ANIM_H = 250 as const
