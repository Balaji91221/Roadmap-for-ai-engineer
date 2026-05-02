import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  FileText,
  PlayCircle,
  BookMarked,
  Wrench,
  ScrollText,
  type LucideIcon,
} from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'
import type { Resource } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Resources Hub',
  description: 'Every curated course, doc, paper, video, book, and tool from the 84-week curriculum — searchable and grouped by type and division.',
}

const TYPE_META: Record<Resource['type'], { icon: LucideIcon; label: string; color: string }> = {
  course: { icon: GraduationCap, label: 'Courses', color: '#7C6AF7' },
  docs: { icon: FileText, label: 'Documentation', color: '#2DD4BF' },
  video: { icon: PlayCircle, label: 'Videos', color: '#EC4899' },
  book: { icon: BookMarked, label: 'Books', color: '#F59E0B' },
  tool: { icon: Wrench, label: 'Tools', color: '#22C55E' },
  paper: { icon: ScrollText, label: 'Papers', color: '#0EA5E9' },
}

type EnrichedResource = Resource & { weekNumber: number; weekTopic: string; divId: number }

export default function ResourcesPage() {
  const all: EnrichedResource[] = WEEKS.flatMap((w) =>
    w.resources.map((r) => ({ ...r, weekNumber: w.week, weekTopic: w.topic, divId: w.div })),
  )

  const grouped = all.reduce<Record<Resource['type'], EnrichedResource[]>>(
    (acc, r) => {
      if (!acc[r.type]) acc[r.type] = []
      acc[r.type].push(r)
      return acc
    },
    { course: [], docs: [], video: [], book: [], tool: [], paper: [] },
  )

  const totals = (Object.keys(grouped) as Resource['type'][]).map((t) => ({ type: t, count: grouped[t].length }))

  return (
    <>
      <Topbar
        title="Resources Hub"
        subtitle="Every curated learning resource from the curriculum"
        chips={[
          { label: `${all.length} resources`, variant: 'teal' },
          { label: `${WEEKS.length} weeks`, variant: 'purple' },
        ]}
      />
      <PageWrapper>
        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 md:p-10">
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-teal/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 bottom-0 w-[260px] h-[260px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-teal/15 border border-teal/25 flex items-center justify-center">
                <BookMarked className="w-3.5 h-3.5 text-teal" />
              </div>
              <SectionEyebrow text="One library to rule them all" />
            </div>
            <h1 className="heading-display text-3xl md:text-5xl text-txt text-balance">
              Curated,<br />
              <span className="bg-gradient-to-r from-teal via-accent2 to-pink bg-clip-text text-transparent">not crowdsourced.</span>
            </h1>
            <p className="text-[14px] md:text-[15px] text-txt2 mt-4 leading-relaxed max-w-3xl text-pretty">
              Every resource here was hand-picked for a specific weekly topic. No filler — just the courses,
              papers, docs, videos, books, and tools that actually move you forward.
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-7">
              {totals.map((t) => {
                const meta = TYPE_META[t.type]
                const Icon = meta.icon
                return (
                  <a
                    key={t.type}
                    href={`#${t.type}`}
                    className="rounded-xl border border-border bg-surface2/50 p-3 text-center hover:border-border2 hover:-translate-y-0.5 transition-all group"
                  >
                    <Icon className="w-4 h-4 mx-auto" style={{ color: meta.color }} strokeWidth={1.75} />
                    <p className="font-syne font-extrabold text-[18px] mt-2 tabular-nums" style={{ color: meta.color }}>{t.count}</p>
                    <p className="text-[9.5px] font-mono text-txt3 uppercase tracking-widest mt-0.5">{meta.label}</p>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* RESOURCE SECTIONS */}
        {(Object.keys(grouped) as Resource['type'][]).map((type) => {
          const items = grouped[type]
          if (items.length === 0) return null
          const meta = TYPE_META[type]
          const Icon = meta.icon
          return (
            <section key={type} id={type} className="mt-12 scroll-mt-24">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <SectionEyebrow text={`Type · ${meta.label.toLowerCase()}`} />
                  <h2 className="heading-section text-2xl text-txt mt-2 flex items-center gap-2.5">
                    <Icon className="w-5 h-5" style={{ color: meta.color }} strokeWidth={1.75} />
                    <span>{meta.label}</span>
                    <span className="text-[13px] text-txt3 font-mono tabular-nums">({items.length})</span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map((r, i) => {
                  const div = DIVISIONS.find((d) => d.id === r.divId)
                  const divColor = div?.color ?? '#7C6AF7'
                  const Wrapper = ({ children }: { children: React.ReactNode }) =>
                    r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="block">
                        {children}
                      </a>
                    ) : (
                      <div>{children}</div>
                    )
                  return (
                    <Wrapper key={`${r.weekNumber}-${i}`}>
                      <article className="h-full relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-0.5 transition-all group">
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.04] blur-2xl pointer-events-none group-hover:opacity-[0.1] transition-opacity"
                          style={{ background: divColor, transform: 'translate(40%, -40%)' }} />

                        <div className="relative flex items-center justify-between gap-2">
                          <span
                            className="chip"
                            style={{ background: `${divColor}10`, borderColor: `${divColor}35`, color: divColor }}
                          >
                            W{r.weekNumber} · {div?.name ?? 'Division'}
                          </span>
                          {r.url ? (
                            <ExternalLink className="w-3.5 h-3.5 text-txt3 group-hover:text-accent2 transition-colors" strokeWidth={1.75} />
                          ) : (
                            <span className="text-[10px] text-txt3 font-mono">offline</span>
                          )}
                        </div>
                        <p className="relative font-syne font-bold text-[13.5px] tracking-tight text-txt mt-3 leading-snug group-hover:text-accent2 transition-colors line-clamp-2">{r.title}</p>
                        <p className="relative text-[11px] text-txt3 mt-2 italic line-clamp-1">For: {r.weekTopic}</p>
                      </article>
                    </Wrapper>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* CTA */}
        <section className="mt-16 rounded-2xl border border-border bg-surface card-elevated p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-syne font-bold text-base tracking-tight text-txt">Missing a resource you love?</p>
            <p className="text-[12.5px] text-txt2 mt-1.5 leading-relaxed max-w-xl">
              The roadmap is opinionated, not exhaustive. Use these as a strong baseline — then go deeper where your role demands it.
            </p>
          </div>
          <Link href="/roadmap" className="btn-primary shrink-0">
            Back to the roadmap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </PageWrapper>
    </>
  )
}
