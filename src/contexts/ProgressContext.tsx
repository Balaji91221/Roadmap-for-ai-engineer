'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  ProgressState,
  emptyState,
  load,
  save,
  isoDay,
  serialize,
  parse,
  overallPct,
  divisionPct,
  currentStreak,
  furthestCompletedWeek,
  completionsByDay,
  completedCount,
} from '@/lib/progress'

type ProgressContextValue = {
  /** True only after localStorage has hydrated — guards against SSR/first-paint mismatch. */
  hydrated: boolean
  completed: Record<number, string>
  isCompleted: (week: number) => boolean
  toggle: (week: number) => void
  completedCount: number
  overallPct: number
  divisionProgress: (divId: number) => { done: number; total: number; pct: number }
  streak: number
  furthestWeek: number
  completionsByDay: Record<string, number>
  exportJSON: () => string
  importJSON: (json: string) => void
  reset: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // Start empty on both server and first client render → identical markup, no hydration warning.
  const [state, setState] = useState<ProgressState>(emptyState)
  const [hydrated, setHydrated] = useState(false)
  const didHydrate = useRef(false)

  useEffect(() => {
    setState(load())
    setHydrated(true)
    didHydrate.current = true
  }, [])

  // Persist only after hydration, so the initial empty state never clobbers stored progress.
  useEffect(() => {
    if (didHydrate.current) save(state)
  }, [state])

  const toggle = useCallback((week: number) => {
    setState((prev) => {
      const completed = { ...prev.completed }
      if (completed[week]) delete completed[week]
      else completed[week] = isoDay()
      return { ...prev, completed }
    })
  }, [])

  const importJSON = useCallback((json: string) => {
    setState(parse(json))
  }, [])

  const reset = useCallback(() => setState(emptyState()), [])

  const value = useMemo<ProgressContextValue>(
    () => ({
      hydrated,
      completed: state.completed,
      isCompleted: (week: number) => Boolean(state.completed[week]),
      toggle,
      completedCount: completedCount(state),
      overallPct: overallPct(state),
      divisionProgress: (divId: number) => divisionPct(state, divId),
      streak: currentStreak(state),
      furthestWeek: furthestCompletedWeek(state),
      completionsByDay: completionsByDay(state),
      exportJSON: () => serialize(state),
      importJSON,
      reset,
    }),
    [state, hydrated, toggle, importJSON, reset],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider')
  return ctx
}
