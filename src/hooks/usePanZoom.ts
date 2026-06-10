'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ViewBox = { x: number; y: number; w: number; h: number }
type Pointer = { x: number; y: number }

const ZOOM_MIN = 0.9 // how far you can zoom out (relative to full content)
const ZOOM_MAX = 6

export function usePanZoom(contentW: number, contentH: number) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [vb, setVb] = useState<ViewBox>({ x: 0, y: 0, w: contentW, h: contentH })
  const pointers = useRef<Map<number, Pointer>>(new Map())
  const lastPinchDist = useRef<number | null>(null)
  const dragging = useRef(false)

  const minW = contentW / ZOOM_MAX
  const maxW = contentW / ZOOM_MIN

  const clamp = useCallback(
    (next: ViewBox): ViewBox => {
      const w = Math.min(maxW, Math.max(minW, next.w))
      const h = (w / contentW) * contentH
      let x = next.x
      let y = next.y
      x = w >= contentW ? (contentW - w) / 2 : Math.min(Math.max(x, 0), contentW - w)
      y = h >= contentH ? (contentH - h) / 2 : Math.min(Math.max(y, 0), contentH - h)
      return { x, y, w, h }
    },
    [contentW, contentH, minW, maxW],
  )

  const toContent = useCallback(
    (clientX: number, clientY: number, box: ViewBox) => {
      const rect = svgRef.current?.getBoundingClientRect()
      if (!rect) return { x: box.x + box.w / 2, y: box.y + box.h / 2 }
      return {
        x: box.x + ((clientX - rect.left) / rect.width) * box.w,
        y: box.y + ((clientY - rect.top) / rect.height) * box.h,
      }
    },
    [],
  )

  const zoomAt = useCallback(
    (factor: number, clientX: number, clientY: number) => {
      setVb((prev) => {
        const c = toContent(clientX, clientY, prev)
        const targetW = prev.w / factor
        const nextW = Math.min(maxW, Math.max(minW, targetW))
        const ratio = nextW / prev.w
        return clamp({ x: c.x - (c.x - prev.x) * ratio, y: c.y - (c.y - prev.y) * ratio, w: nextW, h: prev.h * ratio })
      })
    },
    [clamp, toContent, minW, maxW],
  )

  // React's onWheel is passive, so preventDefault() there is a no-op (page would scroll while
  // zooming). Attach a native non-passive listener instead.
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      zoomAt(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX, e.clientY)
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [zoomAt])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) dragging.current = true
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const pts = pointers.current
      if (!pts.has(e.pointerId)) return
      const prevPt = pts.get(e.pointerId)!
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pts.size === 2) {
        // pinch zoom
        const [a, b] = Array.from(pts.values())
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (lastPinchDist.current != null) {
          const factor = dist / lastPinchDist.current
          zoomAt(factor, (a.x + b.x) / 2, (a.y + b.y) / 2)
        }
        lastPinchDist.current = dist
        return
      }

      if (dragging.current) {
        const rect = svgRef.current?.getBoundingClientRect()
        if (!rect) return
        setVb((prev) => {
          const dx = ((e.clientX - prevPt.x) / rect.width) * prev.w
          const dy = ((e.clientY - prevPt.y) / rect.height) * prev.h
          return clamp({ ...prev, x: prev.x - dx, y: prev.y - dy })
        })
      }
    },
    [clamp, zoomAt],
  )

  const endPointer = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) lastPinchDist.current = null
    if (pointers.current.size === 0) dragging.current = false
  }, [])

  const panBy = useCallback(
    (dx: number, dy: number) => setVb((prev) => clamp({ ...prev, x: prev.x + dx, y: prev.y + dy })),
    [clamp],
  )

  const zoomBy = useCallback(
    (factor: number) => {
      const rect = svgRef.current?.getBoundingClientRect()
      const cx = rect ? rect.left + rect.width / 2 : 0
      const cy = rect ? rect.top + rect.height / 2 : 0
      zoomAt(factor, cx, cy)
    },
    [zoomAt],
  )

  const reset = useCallback(() => setVb(clamp({ x: 0, y: 0, w: contentW, h: contentH })), [clamp, contentW, contentH])

  /** Center the viewport on a content-space point (used by keyboard node navigation). */
  const centerOn = useCallback(
    (x: number, y: number) => setVb((prev) => clamp({ ...prev, x: x - prev.w / 2, y: y - prev.h / 2 })),
    [clamp],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = vb.w * 0.08
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          panBy(-step, 0)
          break
        case 'ArrowRight':
          e.preventDefault()
          panBy(step, 0)
          break
        case 'ArrowUp':
          e.preventDefault()
          panBy(0, -step)
          break
        case 'ArrowDown':
          e.preventDefault()
          panBy(0, step)
          break
        case '+':
        case '=':
          e.preventDefault()
          zoomBy(1.2)
          break
        case '-':
        case '_':
          e.preventDefault()
          zoomBy(1 / 1.2)
          break
        case '0':
          e.preventDefault()
          reset()
          break
      }
    },
    [vb.w, panBy, zoomBy, reset],
  )

  const bind = useMemo(
    () => ({
      ref: svgRef,
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerCancel: endPointer,
      onKeyDown,
      style: { touchAction: 'none' as const, cursor: 'grab' },
    }),
    [onPointerDown, onPointerMove, endPointer, onKeyDown],
  )

  return {
    viewBox: `${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`,
    bind,
    zoomBy,
    reset,
    centerOn,
  }
}
