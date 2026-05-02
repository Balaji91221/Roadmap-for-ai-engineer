'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import FilterTabs from '@/components/shared/FilterTabs'
import WeekCard from '@/components/shared/WeekCard'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'
import { useFilter } from '@/hooks/useFilter'

const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'All levels', dot: '#A1A1AA' },
  { value: 'beginner', label: 'Beginner', dot: '#22C55E' },
  { value: 'intermediate', label: 'Intermediate', dot: '#0EA5E9' },
  { value: 'advanced', label: 'Advanced', dot: '#F97316' },
  { value: 'expert', label: 'Expert', dot: '#A594FF' },
]

export default function RoadmapClient({ calendar = false }: { calendar?: boolean }) {
  const [filter, setFilter] = useFilter('all')
  const [diffFilter, setDiffFilter] = useState('all')
  const [search, setSearch] = useState('')
  const totalWeeks = WEEKS.length

  const filtered = useMemo(() => {
    return WEEKS.filter((w) => {
      const matchDiv = filter === 'all' || String(w.div) === filter
      const matchDiff = diffFilter === 'all' || w.difficulty === diffFilter
      const matchSearch =
        !search ||
        w.topic.toLowerCase().includes(search.toLowerCase()) ||
        w.hook.toLowerCase().includes(search.toLowerCase())
      return matchDiv && matchDiff && matchSearch
    })
  }, [filter, diffFilter, search])

  const hasFilters = filter !== 'all' || diffFilter !== 'all' || !!search

  return (
    <>
      <Topbar
        title={calendar ? 'Content Calendar' : 'Roadmap'}
        subtitle={
          calendar
            ? `${totalWeeks} weekly post strategies`
            : `${DIVISIONS.length} divisions · click any topic to open it`
        }
        chips={
          calendar
            ? [
                { label: `${totalWeeks} posts`, variant: 'purple' },
                { label: `${totalWeeks} weeks`, variant: 'teal' },
              ]
            : [
                { label: `${DIVISIONS.length} divisions`, variant: 'purple' },
                { label: `${totalWeeks} topics`, variant: 'teal' },
              ]
        }
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text={calendar ? 'LinkedIn content system' : 'The complete curriculum'} />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            {calendar
              ? `${totalWeeks} weeks of content strategy.`
              : `${totalWeeks} weeks. ${DIVISIONS.length} divisions. One path.`}
          </h1>
        </div>

        <div className="rounded-xl border border-border bg-surface card-elevated p-3 md:p-4 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-2.5 px-1">
            Division legend · click to filter
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {DIVISIONS.map((d) => {
              const active = filter === String(d.id)
              return (
                <button
                  key={d.id}
                  onClick={() => setFilter(active ? 'all' : String(d.id))}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all ${
                    active
                      ? 'border-border2 bg-surface2 text-txt'
                      : 'border-border bg-surface text-txt2 hover:border-border2 hover:text-txt'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span>{d.name}</span>
                  <span className="font-mono text-[10px] text-txt3 tabular-nums">{d.topics}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-txt3" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search topics, concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-surface border border-border rounded-xl text-[13px] text-txt placeholder:text-txt3 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-txt3 hover:text-txt"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <FilterTabs
            options={[
              { value: 'all', label: 'All divisions' },
              ...DIVISIONS.map((d) => ({ value: String(d.id), label: `Div ${d.id}` })),
            ]}
            value={filter}
            onChange={setFilter}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-txt3 mr-1">
            <SlidersHorizontal className="w-3 h-3" /> Difficulty
          </span>
          {DIFFICULTY_OPTIONS.map((o) => {
            const active = diffFilter === o.value
            return (
              <button
                key={o.value}
                onClick={() => setDiffFilter(o.value)}
                className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11.5px] font-medium transition-all ${
                  active
                    ? 'bg-accent/10 text-accent2 border-accent/30'
                    : 'bg-surface text-txt3 border-border hover:border-border2 hover:text-txt2'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: o.dot }} />
                {o.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-mono text-txt3 tabular-nums">
            Showing <span className="text-txt">{filtered.length}</span> of {totalWeeks} topics
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setFilter('all')
                setDiffFilter('all')
                setSearch('')
              }}
              className="text-[11px] text-txt3 hover:text-txt transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 stagger">
          {filtered.map((w) => (
            <WeekCard key={w.week} week={w} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-surface/40 p-12 text-center">
            <p className="text-[14px] text-txt2">No topics match your filters.</p>
            <p className="text-[12px] text-txt3 mt-1">Try broadening your search or clearing the difficulty filter.</p>
          </div>
        )}
      </PageWrapper>
    </>
  )
}
