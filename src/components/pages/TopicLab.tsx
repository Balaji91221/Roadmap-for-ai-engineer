'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Circle,
  Hammer,
  Target,
  ExternalLink,
  FileText,
  GraduationCap,
  PlayCircle,
  BookMarked,
  Wrench,
  ScrollText,
  Sparkles,
  FlaskConical,
  type LucideIcon,
} from 'lucide-react'
import { Week } from '@/lib/types'
import { getDivisionColor, getDivisionName } from '@/lib/utils'
import { WEEKS } from '@/lib/data/weeks'
import { useProgress } from '@/contexts/ProgressContext'
import VisualLab from '@/components/shared/VisualLab'
import SelfCheck from '@/components/shared/SelfCheck'
import { conceptAnimForWeek, conceptAnimForSubtopic } from '@/lib/anim/concept-map'
import { getPlaygroundFor } from '@/components/playground'

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  course: GraduationCap,
  docs: FileText,
  video: PlayCircle,
  book: BookMarked,
  tool: Wrench,
  paper: ScrollText,
}

const LEVEL_RE = /\s*\((Beginner|Intermediate|Advanced|Expert)\)/
const cleanName = (s: string) => s.replace(LEVEL_RE, '').trim()
const levelOf = (s: string) => s.match(LEVEL_RE)?.[1] ?? null

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'var(--color-green)',
  Intermediate: 'var(--color-sky)',
  Advanced: 'var(--color-coral)',
  Expert: 'var(--color-accent2)',
}

export default function TopicLab({ week }: { week: Week }) {
  const divColor = getDivisionColor(week.div)
  const { hydrated, isCompleted, toggle } = useProgress()
  const completed = isCompleted(week.week)

  const [active, setActive] = useState<'overview' | number>('overview')
  const [rightTab, setRightTab] = useState<'viz' | 'play'>('viz')

  const activeSubtopic = typeof active === 'number' ? week.subtopics[active] : null
  const conceptAnim = activeSubtopic ? conceptAnimForSubtopic(activeSubtopic.name, week) : conceptAnimForWeek(week)
  const activeLabel = activeSubtopic ? cleanName(activeSubtopic.name) : 'Overview'
  const Playground = getPlaygroundFor(activeSubtopic ? activeSubtopic.name : week.topic, conceptAnim.id)
  const showPlay = Playground && rightTab === 'play'

  const prevWeek = WEEKS.find((w) => w.week === week.week - 1) ?? null
  const nextWeek = WEEKS.find((w) => w.week === week.week + 1) ?? null

  const lessons: { key: 'overview' | number; label: string; level: string | null; body: string }[] = [
    { key: 'overview', label: 'The big idea', level: null, body: week.hook },
    ...week.subtopics.map((s, i) => ({ key: i, label: cleanName(s.name), level: levelOf(s.name), body: s.detail })),
  ]

  return (
    <section className="animate-slide-up">
      {/* breadcrumb */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <Link href="/roadmap" className="inline-flex items-center gap-1.5 text-[12.5px] text-txt2 hover:text-txt transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to roadmap
        </Link>
        <div className="text-[11px] font-mono text-txt3 tabular-nums">Week {week.week} of {WEEKS.length}</div>
      </div>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 md:p-8 mb-6">
        <div className="absolute -right-24 -top-24 w-[320px] h-[320px] rounded-full opacity-[0.12] blur-3xl pointer-events-none" style={{ background: divColor }} />
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-2xl">{week.icon}</span>
              <Link href={`/roadmap?div=${week.div}`} className="chip hover:opacity-80 transition-opacity" style={{ background: `${divColor}10`, borderColor: `${divColor}40`, color: divColor }}>
                Week {week.week} · {getDivisionName(week.div)}
              </Link>
              <span className="chip border-border bg-surface2 text-txt3">~{Math.round(week.effort * 8)}h</span>
            </div>
            <h1 className="heading-display text-3xl md:text-4xl text-txt text-balance">{week.topic}</h1>
            <p className="text-txt2 text-[14px] mt-3.5 max-w-2xl leading-relaxed text-pretty">{week.intro}</p>
          </div>
          <button
            onClick={() => toggle(week.week)}
            disabled={!hydrated}
            aria-pressed={completed}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all disabled:opacity-50 ${
              completed ? 'text-white' : 'border border-border2 bg-surface2 text-txt2 hover:text-txt hover:border-border3'
            }`}
            style={completed ? { background: divColor, boxShadow: `0 8px 24px -8px ${divColor}` } : undefined}
          >
            {completed ? <Check className="w-4 h-4" strokeWidth={2.5} /> : <Circle className="w-4 h-4" />}
            {completed ? 'Completed' : 'Mark complete'}
          </button>
        </div>
      </div>

      {/* SPLIT SCREEN */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-6 lg:gap-8 items-start">
        {/* LEFT — explanation */}
        <div className="order-2 lg:order-1 min-w-0">
          <p className="eyebrow mb-3">Walkthrough · pick a step to visualise it</p>
          <div className="space-y-2.5">
            {lessons.map((l) => {
              const on = active === l.key
              return (
                <div key={String(l.key)} className={`rounded-xl border transition-all ${on ? 'border-border2 bg-surface' : 'border-border bg-surface/40 hover:border-border2'}`}>
                  <button
                    onClick={() => setActive(l.key)}
                    className="w-full flex items-center gap-3 text-left px-4 py-3"
                    aria-expanded={on}
                  >
                    <span className="w-6 h-6 shrink-0 rounded-md flex items-center justify-center text-[11px] font-mono font-bold" style={{ background: on ? divColor : 'var(--color-surface3)', color: on ? '#fff' : 'var(--color-txt3)' }}>
                      {l.key === 'overview' ? '★' : (l.key as number) + 1}
                    </span>
                    <span className={`flex-1 text-[14px] font-medium ${on ? 'text-txt' : 'text-txt2'}`}>{l.label}</span>
                    {l.level && (
                      <span className="chip text-[9px]" style={{ borderColor: `${LEVEL_COLORS[l.level]}40`, color: LEVEL_COLORS[l.level], background: `${LEVEL_COLORS[l.level]}12` }}>
                        {l.level}
                      </span>
                    )}
                  </button>
                  {on && (
                    <div className="px-4 pb-4 pt-0 animate-fade-in">
                      <p className="text-txt2 text-[14px] leading-relaxed text-pretty">{l.body}</p>
                      <p className="lg:hidden text-[11px] text-txt3 mt-3 font-mono">↑ visualization above reflects this step</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* KEY CONCEPTS */}
          <h3 className="heading-section text-lg text-txt mt-8 mb-3">Key concepts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {week.keyConcepts.map((c, i) => (
              <div key={i} className="flex gap-3 items-start p-3.5 rounded-xl border border-border bg-surface card-elevated">
                <span className="font-mono text-[11px] text-txt3 tabular-nums shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-txt2 text-[13px] leading-relaxed">{c}</p>
              </div>
            ))}
          </div>

          {/* SELF CHECK */}
          <div className="mt-8">
            <SelfCheck questions={week.interviewQs} color={divColor} />
          </div>

          {/* BUILD PROJECT */}
          <div className="mt-6 rounded-2xl border border-border bg-surface card-elevated p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Hammer className="w-5 h-5 text-amber" strokeWidth={1.75} />
              <h3 className="heading-section text-lg text-txt">Build it</h3>
            </div>
            <div className="p-4 bg-surface2/40 border-l-2 rounded-r-xl" style={{ borderColor: divColor }}>
              <p className="text-txt2 leading-relaxed text-[14px] whitespace-pre-wrap">{week.miniProject}</p>
            </div>
          </div>

          {/* RESOURCES */}
          <h3 className="heading-section text-lg text-txt mt-8 mb-3">Deep-dive resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {week.resources.map((r, i) => {
              const Icon = RESOURCE_ICONS[r.type] || FileText
              return (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3.5 bg-surface card-elevated border border-border rounded-xl hover:border-border2 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-accent2" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-bold text-txt truncate group-hover:text-accent2 transition-colors">{r.title}</p>
                    <p className="text-[9.5px] text-txt3 uppercase font-mono tracking-widest mt-0.5">{r.type}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-txt3 group-hover:text-accent2 transition-colors shrink-0" strokeWidth={1.75} />
                </a>
              )
            })}
          </div>

          {/* PREV / NEXT */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevWeek ? (
              <Link href={`/roadmap/${prevWeek.week}`} className="group rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 transition-all">
                <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 flex items-center gap-1.5"><ArrowLeft className="w-3 h-3" /> Previous</p>
                <p className="font-syne font-bold text-[13px] text-txt mt-1.5 group-hover:text-accent2 transition-colors">W{prevWeek.week}. {prevWeek.topic}</p>
              </Link>
            ) : <div />}
            {nextWeek ? (
              <Link href={`/roadmap/${nextWeek.week}`} className="group rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 transition-all sm:text-right">
                <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 flex items-center gap-1.5 sm:justify-end">Next <ArrowRight className="w-3 h-3" /></p>
                <p className="font-syne font-bold text-[13px] text-txt mt-1.5 group-hover:text-accent2 transition-colors">W{nextWeek.week}. {nextWeek.topic}</p>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* RIGHT — sticky live visualization */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-6">
          <div className="flex items-center justify-between mb-3 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: divColor }} />
              <p className="eyebrow truncate">Visualising · {activeLabel}</p>
            </div>
            {Playground && (
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface2 border border-border shrink-0">
                <button onClick={() => setRightTab('viz')} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${rightTab === 'viz' ? 'bg-surface3 text-txt' : 'text-txt3 hover:text-txt2'}`}>
                  Visualize
                </button>
                <button onClick={() => setRightTab('play')} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${rightTab === 'play' ? 'bg-surface3 text-txt' : 'text-txt3 hover:text-txt2'}`}>
                  <FlaskConical className="w-3 h-3" /> Playground
                </button>
              </div>
            )}
          </div>

          {showPlay && Playground ? (
            <Playground color={divColor} />
          ) : (
            <VisualLab key={conceptAnim.id} anim={conceptAnim} color={divColor} />
          )}

          <p className="text-[12px] text-txt3 mt-3 leading-relaxed">{conceptAnim.caption}</p>

          {week.liveExample && (
            <div className="mt-4 rounded-xl border border-border bg-surface card-elevated p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-2">{week.liveExample.title}</p>
              <pre className="text-[11.5px] text-txt2 leading-relaxed whitespace-pre-wrap font-mono max-h-48 overflow-y-auto">{week.liveExample.tabs[0]?.content}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
