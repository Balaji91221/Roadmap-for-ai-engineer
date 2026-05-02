'use client'

import { useState } from 'react'

export function useSelectedWeek() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)
  const toggleWeek = (week: number) => setSelectedWeek((prev) => (prev === week ? null : week))
  return [selectedWeek, setSelectedWeek, toggleWeek] as const
}
