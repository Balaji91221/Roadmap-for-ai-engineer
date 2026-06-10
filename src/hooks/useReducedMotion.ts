'use client'

import { useEffect, useState } from 'react'

/**
 * Tracks `prefers-reduced-motion`. Defaults to `true` (motion suppressed) until mounted,
 * so animations stay paused during SSR/first paint and only start when we know the user
 * is OK with motion.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
