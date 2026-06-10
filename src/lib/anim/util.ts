// Pure timing/geometry helpers for the animation system. No Date / no random — everything
// is a deterministic function of the loop phase `t`.

export const clamp01 = (t: number): number => Math.max(0, Math.min(1, t))

/** Deterministic pseudo-random in [0,1) from an integer seed (NOT Math.random — stays pure). */
export const hash = (n: number): number => {
  const s = Math.sin((n + 1) * 127.1) * 43758.5453
  return s - Math.floor(s)
}

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

/** Smooth ease-in-out (cubic-ish). */
export const easeInOut = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

/** Triangle wave: 0 → 1 → 0 over one period. */
export const tri = (t: number): number => 1 - Math.abs((t % 1) * 2 - 1)

/** Map global phase `t` into `n` equal segments → which segment + local 0..1 progress. */
export function segment(t: number, n: number): { index: number; local: number } {
  const scaled = clamp01(t) * n
  const index = Math.min(n - 1, Math.floor(scaled))
  return { index, local: scaled - index }
}

/** A soft bump that peaks (→1) when `t` passes `center`, within `width`. */
export function pulse(t: number, center: number, width: number): number {
  const d = Math.abs(((t - center + 1.5) % 1) - 0.5) // wrapped distance, 0..0.5
  const dist = 0.5 - d
  return clamp01(1 - Math.min(1, dist / width))
}

/** Point on a circle for a phase `t` (0..1), starting at the top, clockwise. */
export function onCircle(t: number, cx: number, cy: number, r: number): { x: number; y: number } {
  const a = t * Math.PI * 2 - Math.PI / 2
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
}

/** Linear interpolate between two points. */
export function onLine(
  t: number,
  a: { x: number; y: number },
  b: { x: number; y: number },
): { x: number; y: number } {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }
}
