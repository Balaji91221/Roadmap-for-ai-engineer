import { WEEKS } from '@/lib/data/weeks'

// Versioned localStorage key — bump suffix + add a migrate() branch on schema change.
export const STORAGE_KEY = 'aieng:progress:v1'
export const PROGRESS_VERSION = 1

/** Persisted shape: week number -> ISO day (YYYY-MM-DD) the week was marked complete. */
export type ProgressState = {
  version: number
  completed: Record<number, string>
}

const VALID_WEEKS = new Set(WEEKS.map((w) => w.week))
const TOTAL_WEEKS = WEEKS.length

export function emptyState(): ProgressState {
  return { version: PROGRESS_VERSION, completed: {} }
}

/** Local-time ISO day (YYYY-MM-DD). App runtime only — never called during SSR-sensitive render. */
export function isoDay(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Validate + coerce an unknown blob (from storage or import) into a clean ProgressState. */
export function migrate(raw: unknown): ProgressState {
  const state = emptyState()
  if (!raw || typeof raw !== 'object') return state
  const obj = raw as Record<string, unknown>
  const completed = obj.completed
  if (completed && typeof completed === 'object') {
    for (const [k, v] of Object.entries(completed as Record<string, unknown>)) {
      const week = Number(k)
      if (VALID_WEEKS.has(week) && typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
        state.completed[week] = v
      }
    }
  }
  return state
}

export function load(): ProgressState {
  if (typeof window === 'undefined') return emptyState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    return migrate(JSON.parse(raw))
  } catch {
    return emptyState()
  }
}

export function save(state: ProgressState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* quota / private mode — non-fatal */
  }
}

export function serialize(state: ProgressState): string {
  return JSON.stringify({ version: PROGRESS_VERSION, completed: state.completed }, null, 2)
}

/** Parse imported JSON. Throws on structurally invalid input so the UI can surface an error. */
export function parse(json: string): ProgressState {
  const data = JSON.parse(json)
  if (!data || typeof data !== 'object' || typeof (data as Record<string, unknown>).completed !== 'object') {
    throw new Error('Invalid progress file: missing "completed" map.')
  }
  return migrate(data)
}

// ---- selectors (pure) ----

export function completedCount(state: ProgressState): number {
  return Object.keys(state.completed).length
}

export function overallPct(state: ProgressState): number {
  return TOTAL_WEEKS === 0 ? 0 : Math.round((completedCount(state) / TOTAL_WEEKS) * 100)
}

export function divisionPct(state: ProgressState, divId: number): { done: number; total: number; pct: number } {
  const total = WEEKS.filter((w) => w.div === divId).length
  const done = WEEKS.filter((w) => w.div === divId && state.completed[w.week]).length
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) }
}

export function furthestCompletedWeek(state: ProgressState): number {
  let max = 0
  for (const k of Object.keys(state.completed)) {
    const week = Number(k)
    if (week > max) max = week
  }
  return max
}

/** Consecutive calendar days with >=1 completion, ending today or yesterday. */
export function currentStreak(state: ProgressState, today: Date = new Date()): number {
  const days = new Set(Object.values(state.completed))
  if (days.size === 0) return 0

  const cursor = new Date(today)
  cursor.setHours(0, 0, 0, 0)
  // Allow the streak to "still be alive" if nothing was done yet today but was yesterday.
  if (!days.has(isoDay(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!days.has(isoDay(cursor))) return 0
  }
  let streak = 0
  while (days.has(isoDay(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Map of ISO-day -> completions on that day (for the activity heatmap). */
export function completionsByDay(state: ProgressState): Record<string, number> {
  const out: Record<string, number> = {}
  for (const day of Object.values(state.completed)) {
    out[day] = (out[day] ?? 0) + 1
  }
  return out
}
