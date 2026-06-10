'use client'

import { useEffect, useRef } from 'react'
import DetailPanel from '@/components/shared/DetailPanel'
import { WEEKS } from '@/lib/data/weeks'

export default function WeekDetailOverlay({ week, onClose }: { week: number; onClose: () => void }) {
  const weekItem = WEEKS.find((w) => w.week === week)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      lastFocused.current?.focus?.()
    }
  }, [onClose])

  if (!weekItem) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Week ${weekItem.week}: ${weekItem.topic}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-3xl overflow-y-auto bg-bg border-l border-border2 p-5 md:p-8 shadow-2xl focus:outline-none"
      >
        <DetailPanel week={weekItem} onClose={onClose} />
      </div>
    </div>
  )
}
