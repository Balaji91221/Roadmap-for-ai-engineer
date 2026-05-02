'use client'

import { useState } from 'react'
import { BookOpen, Hammer, Users, Clock, IndianRupee, User } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import Callout from '@/components/shared/Callout'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { PHASES } from '@/lib/data/phases'
import { cn } from '@/lib/utils'

function tagStyle(tag: string, phaseColor: string) {
  if (tag.includes('ADVANTAGE') || tag.includes('SUPERPOWER'))
    return { background: '#22C55E15', color: '#22C55E', borderColor: '#22C55E40' }
  if (tag === 'FAST TRACK')
    return { background: '#0EA5E915', color: '#0EA5E9', borderColor: '#0EA5E940' }
  return { background: `${phaseColor}15`, color: phaseColor, borderColor: `${phaseColor}40` }
}

const TABS = [
  { id: 'curriculum' as const, label: 'Curriculum', icon: BookOpen },
  { id: 'projects' as const, label: 'Projects', icon: Hammer },
  { id: 'roles' as const, label: 'Target roles', icon: Users },
]

export default function PhasesClient() {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [secIdx, setSecIdx] = useState(0)
  const [itemIdx, setItemIdx] = useState(0)
  const [tab, setTab] = useState<'curriculum' | 'projects' | 'roles'>('curriculum')

  const phase = PHASES[phaseIdx]
  const section = phase.sections[secIdx]
  const item = section.items[itemIdx]

  return (
    <>
      <Topbar
        title="Learning Phases"
        subtitle="Your structured transition path"
        chips={[{ label: `${PHASES.length} phases`, variant: 'purple' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Five phases · One transition" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            From learner to senior AI engineer.
          </h1>
        </div>

        {/* PHASE TABS */}
        <div className="flex gap-1.5 flex-wrap mb-5 p-1.5 rounded-xl bg-surface border border-border">
          {PHASES.map((p, i) => {
            const active = phaseIdx === i
            return (
              <button
                key={p.id}
                onClick={() => {
                  setPhaseIdx(i)
                  setSecIdx(0)
                  setItemIdx(0)
                  setTab('curriculum')
                }}
                className="px-3.5 py-2 rounded-lg text-[12px] font-syne font-semibold tracking-tight transition-all"
                style={
                  active
                    ? { background: `${p.color}15`, color: p.color, boxShadow: `0 0 0 1px ${p.color}30` }
                    : { color: 'var(--color-txt3)' }
                }
              >
                <span className="font-mono text-[10px] mr-1.5 opacity-70">0{p.id}</span>
                {p.title}
              </button>
            )
          })}
        </div>

        {/* PHASE HEADER */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 mb-6">
          <div
            className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full opacity-[0.1] blur-3xl pointer-events-none"
            style={{ background: phase.color }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-syne font-extrabold text-lg"
                style={{ background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}40` }}
              >
                0{phase.id}
              </div>
              <div className="min-w-0">
                <h1 className="font-syne font-bold text-2xl tracking-tight text-txt">{phase.title}</h1>
                <p className="text-[13px] text-txt2 mt-0.5">{phase.sub}</p>
              </div>
            </div>
            {phase.note && (
              <div className="mt-4 px-4 py-3 rounded-lg border border-accent/30 bg-accent/8 text-[12.5px] italic text-accent2">
                {phase.note}
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-[11.5px] text-txt2">
                <Clock className="w-3 h-3 text-txt3" /> {phase.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-[11.5px] text-txt2">
                <IndianRupee className="w-3 h-3 text-txt3" /> {phase.salary}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-[11.5px] text-txt2">
                <User className="w-3 h-3 text-txt3" /> {phase.level}
              </span>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="flex gap-1.5 mb-5 p-1.5 rounded-xl bg-surface border border-border w-fit">
          {TABS.map((t) => {
            const active = tab === t.id
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all',
                  active ? 'bg-accent/15 text-accent2' : 'text-txt3 hover:text-txt hover:bg-surface2',
                )}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'curriculum' && (
          <div className="grid grid-cols-1 xl:grid-cols-[200px_220px_1fr] gap-3">
            <div className="space-y-1">
              {phase.sections.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => {
                    setSecIdx(i)
                    setItemIdx(0)
                  }}
                  className={cn(
                    'w-full text-left p-3 rounded-xl border transition-all',
                    secIdx === i
                      ? 'bg-accent/8 border-accent/30'
                      : 'border-border bg-surface hover:border-border2',
                  )}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-txt3">Section</p>
                  <p className="font-syne font-bold text-[13px] text-txt mt-1.5 leading-snug">{s.title}</p>
                  <p className="text-[10.5px] text-txt3 mt-1">{s.items.length} topics</p>
                </button>
              ))}
            </div>
            <div className="space-y-1">
              {section.items.map((it, i) => (
                <button
                  key={it.name}
                  onClick={() => setItemIdx(i)}
                  className={cn(
                    'w-full text-left p-2.5 rounded-lg border transition-all',
                    itemIdx === i
                      ? 'bg-surface2 border-border2'
                      : 'border-border bg-surface hover:border-border2',
                  )}
                >
                  <span className="chip" style={tagStyle(it.tag, phase.color)}>
                    {it.tag}
                  </span>
                  <p className="text-[12px] text-txt mt-1.5 font-medium tracking-tight">{it.name}</p>
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-surface card-elevated p-6">
              <div className="flex gap-3 items-start">
                <span className="w-1 rounded-full self-stretch" style={{ background: phase.color }} />
                <div className="min-w-0">
                  <h3 className="font-syne font-bold text-xl tracking-tight text-txt">{item.name}</h3>
                  <span className="chip mt-2" style={tagStyle(item.tag, phase.color)}>
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="mt-5 bg-surface2/40 border border-border rounded-xl p-4 text-[13.5px] leading-relaxed text-txt2">
                {item.depth}
              </div>
              <div
                className="mt-3 border-l-2 rounded-r-lg px-4 py-3 italic text-[12.5px] text-txt2"
                style={{ borderColor: phase.color, background: `${phase.color}10` }}
              >
                {item.why}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mt-5 mb-2">Resources</p>
              <div className="space-y-1.5">
                {item.resources.map((r) => (
                  <div key={r} className="bg-surface2/40 border border-border rounded-lg px-3 py-2 text-[13px] text-txt2">
                    <span style={{ color: phase.color }}>›</span> {r}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phase.projects.map((pr, i) => (
              <div key={pr.name} className="rounded-2xl border border-border bg-surface card-elevated overflow-hidden">
                <div
                  className="px-5 py-4 border-b border-border"
                  style={{ background: `${phase.color}08` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-syne font-extrabold text-[13px]"
                      style={{ background: `${phase.color}15`, color: phase.color, border: `1px solid ${phase.color}30` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-syne font-bold text-[14px] tracking-tight text-txt">{pr.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[13px] text-txt2 leading-relaxed mb-4">{pr.desc}</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-txt3 mb-1.5">Tech stack</p>
                  <p className="text-[12.5px] font-medium" style={{ color: phase.color }}>{pr.stack}</p>
                  <Callout variant="teal" className="mt-4">{pr.impact}</Callout>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {phase.roles.map((r) => (
              <div
                key={r}
                className="rounded-xl px-4 py-4 text-[13.5px] font-syne font-bold tracking-tight border"
                style={{ background: `${phase.color}10`, borderColor: `${phase.color}30`, color: phase.color }}
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </PageWrapper>
    </>
  )
}
