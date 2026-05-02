'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Target,
  Hammer,
  GraduationCap,
  FileText,
  PlayCircle,
  BookMarked,
  Wrench,
  ScrollText,
  Trophy,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Week, Role } from '@/lib/types'
import { getDivisionName, getDivisionColor } from '@/lib/utils'
import { WEEKS } from '@/lib/data/weeks'
import { DIVISIONS } from '@/lib/data/divisions'

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  course: GraduationCap,
  docs: FileText,
  video: PlayCircle,
  book: BookMarked,
  tool: Wrench,
  paper: ScrollText,
}

function MiniStat({ num, label, sub, color }: { num: string; label: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 transition-all">
      <p className="font-syne font-extrabold text-2xl tracking-tight tabular-nums" style={{ color }}>{num}</p>
      <p className="text-[12.5px] font-medium text-txt mt-1.5">{label}</p>
      <p className="text-[10.5px] text-txt3 mt-0.5">{sub}</p>
    </div>
  )
}

function RoleCard({ role, color }: { role: Role; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface2/40 p-5 hover:border-border2 transition-all">
      <p className="text-[10px] font-mono tracking-widest uppercase mb-2.5" style={{ color }}>{role.title}</p>
      <p className="text-[13px] text-txt2 leading-relaxed">
        {role.desc.split(' ').map((word, i) => {
          const clean = word.replace(/[.,]/g, '').toLowerCase()
          const isHighlight = role.highlights?.includes(clean)
          return (
            <span key={i} className={isHighlight ? 'font-bold text-txt' : ''}>
              {word}{' '}
            </span>
          )
        })}
      </p>
    </div>
  )
}

function LiveExample({ example, color }: { example: { title: string; tabs: { label: string; content: string }[] }; color: string }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="mt-10">
      <h4 className="font-syne font-bold text-lg tracking-tight mb-4 text-txt">{example.title}</h4>
      <div className="rounded-xl border border-border overflow-hidden bg-surface card-elevated">
        <div className="flex border-b border-border bg-surface2/50 overflow-x-auto">
          {example.tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3 text-[12px] font-medium transition-all relative whitespace-nowrap ${
                activeTab === i ? 'text-txt' : 'text-txt3 hover:text-txt2'
              }`}
            >
              {tab.label}
              {activeTab === i && (
                <span className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: color }} />
              )}
            </button>
          ))}
        </div>
        <div className="p-6 bg-surface/20 min-h-[180px]">
          <pre className="text-[13px] text-txt2 leading-relaxed whitespace-pre-wrap font-mono">{example.tabs[activeTab].content}</pre>
        </div>
      </div>
    </div>
  )
}

export default function DetailPanel({ week }: { week: Week }) {
  const [activeView, setActiveView] = useState<'intro' | 'interview' | 'project' | number>('intro')
  const divColor = getDivisionColor(week.div)
  const division = DIVISIONS.find((d) => d.id === week.div)
  const isLastInDiv = WEEKS.filter((w) => w.div === week.div).pop()?.week === week.week

  const prevWeek = WEEKS.find((w) => w.week === week.week - 1) ?? null
  const nextWeek = WEEKS.find((w) => w.week === week.week + 1) ?? null

  const navItems = [
    { label: 'Overview', id: 'intro' as const, icon: null },
    ...week.subtopics.map((s, i) => ({
      label: s.name.replace(/\s*\((Beginner|Intermediate|Advanced|Expert)\)/, '').trim(),
      id: i,
      icon: null,
    })),
    { label: 'Interview Qs', id: 'interview' as const, icon: Target },
    { label: 'Build Project', id: 'project' as const, icon: Hammer },
  ]

  return (
    <section className="animate-slide-up">
      {/* BREADCRUMB / BACK */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-txt2 hover:text-txt transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to roadmap
        </Link>
        <div className="text-[11px] font-mono text-txt3 tabular-nums">
          Week {week.week} of {WEEKS.length}
        </div>
      </div>

      {/* HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 md:p-8 mb-6">
        <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full opacity-[0.08] blur-3xl pointer-events-none" style={{ background: divColor }} />
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-2xl">{week.icon}</span>
              <Link
                href={`/roadmap?div=${week.div}`}
                className="chip hover:opacity-80 transition-opacity"
                style={{ background: `${divColor}10`, borderColor: `${divColor}40`, color: divColor }}
              >
                Week {week.week} · {getDivisionName(week.div)}
              </Link>
            </div>
            <h1 className="heading-display text-3xl md:text-4xl text-txt text-balance">{week.topic}</h1>
            <p className="text-txt2 text-[14px] mt-3.5 max-w-3xl leading-relaxed text-pretty">{week.intro}</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MiniStat num={String(week.subtopics.length)} label="Key concepts" sub="Modules to master" color={divColor} />
        <MiniStat num={String(week.interviewQs.length)} label="Interview Qs" sub="Real prep questions" color="#22C55E" />
        <MiniStat num={`~${Math.round(week.effort * 8)}h`} label="Estimated time" sub="Resource depth" color="#F59E0B" />
        <MiniStat num={week.roi || 'High'} label="ROI" sub="Skill value" color="#7C6AF7" />
      </div>

      {/* NAV PILLS */}
      <div className="flex flex-wrap gap-1.5 mb-6 p-1.5 rounded-xl bg-surface border border-border">
        {navItems.map((item) => {
          const active = activeView === item.id
          const Icon = item.icon
          return (
            <button
              key={String(item.id)}
              onClick={() => setActiveView(item.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                active ? 'bg-accent/15 text-accent2 shadow-sm shadow-accent/20' : 'text-txt3 hover:text-txt hover:bg-surface2'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />}
              {item.label}
            </button>
          )
        })}
      </div>

      {/* CONTENT */}
      <div className="rounded-2xl border border-border bg-surface card-elevated p-6 md:p-8">
        {typeof activeView === 'number' ? (
          <div className="animate-fade-in">
            {(() => {
              const raw = week.subtopics[activeView].name
              const levelMatch = raw.match(/\((Beginner|Intermediate|Advanced|Expert)\)/)
              const level = levelMatch?.[1]
              const name = raw.replace(/\s*\((Beginner|Intermediate|Advanced|Expert)\)/, '').trim()
              const levelColors: Record<string, string> = {
                Beginner: 'bg-green/10 text-green border-green/30',
                Intermediate: 'bg-sky/10 text-sky border-sky/30',
                Advanced: 'bg-coral/10 text-coral border-coral/30',
                Expert: 'bg-accent/10 text-accent2 border-accent/30',
              }
              return (
                <>
                  <span className={`chip ${level ? levelColors[level] : 'border-border bg-surface2 text-txt3'}`}>
                    {level ?? 'Subtopic detail'}
                  </span>
                  <h3 className="heading-section text-2xl text-txt mt-3">{name}</h3>
                  <p className="text-txt2 leading-relaxed text-[15px] mt-4">{week.subtopics[activeView].detail}</p>
                  {week.roles && week.roles.length > 0 && activeView === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                      {week.roles.map((role, ri) => (
                        <RoleCard key={ri} role={role} color={divColor} />
                      ))}
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        ) : activeView === 'interview' ? (
          <div className="animate-fade-in space-y-3">
            <div className="flex items-center gap-2.5 mb-5">
              <Target className="w-5 h-5 text-green" strokeWidth={1.75} />
              <h3 className="heading-section text-2xl text-txt">Interview prep</h3>
            </div>
            {week.interviewQs.map((q, i) => (
              <div key={i} className="p-5 bg-surface2/40 border border-border rounded-xl hover:border-border2 transition-all">
                <p className="text-txt text-[14px] font-medium leading-relaxed">
                  <span className="font-mono text-[11px] mr-3 px-2 py-0.5 rounded bg-green/10 text-green">Q{i + 1}</span>
                  {q}
                </p>
              </div>
            ))}
          </div>
        ) : activeView === 'project' ? (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2.5 mb-5">
              <Hammer className="w-5 h-5 text-amber" strokeWidth={1.75} />
              <h3 className="heading-section text-2xl text-txt">Hands-on build</h3>
            </div>
            <div className="p-6 bg-surface2/30 border-l-2 rounded-r-xl" style={{ borderColor: divColor }}>
              <p className="text-txt2 leading-relaxed text-[15px] whitespace-pre-wrap">{week.miniProject}</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px" style={{ background: divColor }} />
              <p className="eyebrow">Topic overview</p>
            </div>
            <p className="text-txt text-[16px] leading-relaxed text-pretty">{week.hook}</p>
          </div>
        )}
      </div>

      {/* LIVE EXAMPLE */}
      {week.liveExample && <LiveExample example={week.liveExample} color={divColor} />}

      {/* KEY CONCEPTS */}
      <div className="mt-10">
        <h4 className="heading-section text-xl text-txt mb-4">Key concepts to master</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {week.keyConcepts.map((c, i) => (
            <div key={i} className="flex gap-3 items-start p-4 rounded-xl border border-border bg-surface card-elevated hover:border-border2 transition-all group">
              <span className="font-mono text-[11px] text-txt3 tabular-nums shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-txt2 text-[13.5px] leading-relaxed group-hover:text-txt transition-colors">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      <div className="mt-10 pt-8 border-t border-border">
        <h4 className="heading-section text-xl text-txt mb-5">Deep-dive resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {week.resources.map((r, i) => {
            const Icon = RESOURCE_ICONS[r.type] || FileText
            return (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 bg-surface card-elevated border border-border rounded-xl hover:border-border2 hover:-translate-y-0.5 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-accent2" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-txt truncate group-hover:text-accent2 transition-colors">{r.title}</p>
                  <p className="text-[10px] text-txt3 uppercase font-mono tracking-widest mt-0.5">{r.type}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-txt3 group-hover:text-accent2 transition-colors shrink-0" strokeWidth={1.75} />
              </a>
            )
          })}
        </div>
      </div>

      {/* CAPSTONE */}
      {isLastInDiv && division?.capstone && (
        <div className="mt-10 relative overflow-hidden rounded-2xl border-2 border-dashed border-border bg-surface card-elevated p-8 md:p-10 flex flex-col items-center text-center">
          <div className="absolute -right-20 -top-20 w-[260px] h-[260px] rounded-full opacity-[0.1] blur-3xl pointer-events-none" style={{ background: divColor }} />
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-amber/15 border border-amber/30 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-amber" strokeWidth={1.75} />
            </div>
            <p className="eyebrow mb-2">Division {week.div} Capstone Awaits</p>
            <h3 className="heading-section text-xl md:text-2xl text-txt">{division.capstone.name}</h3>
            <p className="text-txt2 text-[13.5px] mt-2 max-w-xl mx-auto leading-relaxed">{division.capstone.description.split('.')[0]}.</p>
            <Link
              href="/capstones"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-white font-semibold text-[13px] hover:scale-[1.02] transition-transform"
              style={{ background: divColor, boxShadow: `0 8px 24px -8px ${divColor}80` }}
            >
              View full capstone requirements
            </Link>
          </div>
        </div>
      )}

      {/* PREV/NEXT */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
        {prevWeek ? (
          <Link
            href={`/roadmap/${prevWeek.week}`}
            className="group rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-0.5 transition-all"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3" />
              Previous week
            </p>
            <p className="font-syne font-bold text-[14px] tracking-tight text-txt mt-1.5 group-hover:text-accent2 transition-colors">
              W{prevWeek.week}. {prevWeek.topic}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {nextWeek ? (
          <Link
            href={`/roadmap/${nextWeek.week}`}
            className="group rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-0.5 transition-all md:text-right"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 flex items-center gap-1.5 md:justify-end">
              Next week
              <ArrowRight className="w-3 h-3" />
            </p>
            <p className="font-syne font-bold text-[14px] tracking-tight text-txt mt-1.5 group-hover:text-accent2 transition-colors">
              W{nextWeek.week}. {nextWeek.topic}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}
