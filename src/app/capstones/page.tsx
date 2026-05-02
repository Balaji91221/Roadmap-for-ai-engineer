import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Trophy, CheckCircle2, Layers as LayersIcon, FileCode, Github, Video } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'

export const metadata: Metadata = {
  title: 'Capstones',
  description: 'Eight production-grade capstone projects — one per division. Build the systems hiring managers actually look for.',
}

const DELIVERY_TIPS = [
  { icon: FileCode, title: 'Design doc first', desc: 'Write a one-page design before you code — problem, constraints, success criteria.' },
  { icon: LayersIcon, title: 'MVP, then quality', desc: 'Build the smallest end-to-end version. Iterate on quality, not on scope.' },
  { icon: CheckCircle2, title: 'Observability day one', desc: 'Add logs, traces, and a basic dashboard from the start. You will need them.' },
  { icon: Github, title: 'Polished README', desc: 'Architecture diagram, demo GIF, lessons learned. Make it the first artifact.' },
  { icon: Video, title: '3-min Loom walkthrough', desc: 'Record yourself walking through the system. Share it on LinkedIn.' },
  { icon: Trophy, title: 'Open source it', desc: 'Clean license, roadmap.md for next steps. Treat it like a real product.' },
]

export default function CapstonesPage() {
  const totalDivisions = DIVISIONS.length
  const capstones = DIVISIONS.filter((d) => d.capstone)
  const lastWeekByDiv = DIVISIONS.reduce<Record<number, number>>((acc, d) => {
    const last = WEEKS.filter((w) => w.div === d.id).pop()
    if (last) acc[d.id] = last.week
    return acc
  }, {})

  return (
    <>
      <Topbar
        title="Capstones"
        subtitle={`${totalDivisions} flagship projects — one per division`}
        chips={[
          { label: `${capstones.length} capstones`, variant: 'amber' },
          { label: 'production-grade', variant: 'teal' },
        ]}
      />
      <PageWrapper>
        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 md:p-10">
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-amber/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 bottom-0 w-[260px] h-[260px] rounded-full bg-coral/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-amber/15 border border-amber/25 flex items-center justify-center">
                <Trophy className="w-3.5 h-3.5 text-amber" />
              </div>
              <SectionEyebrow text="Build, don't just learn" />
            </div>
            <h1 className="heading-display text-3xl md:text-5xl text-txt text-balance">
              Eight projects that prove<br />
              <span className="bg-gradient-to-r from-amber via-coral to-pink bg-clip-text text-transparent">you can ship.</span>
            </h1>
            <p className="text-[14px] md:text-[15px] text-txt2 mt-4 leading-relaxed max-w-3xl text-pretty">
              Each division ends with a capstone: a real system you build, deploy, and document. These are the
              artifacts you put on your resume, link from your LinkedIn, and walk through in interviews.
              Stack hints are starting points — adapt to your environment.
            </p>
          </div>
        </section>

        {/* CAPSTONES */}
        <section className="mt-8 space-y-5">
          {capstones.map((d, i) => (
            <article
              key={d.id}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated hover:border-border2 transition-all"
            >
              <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${d.color}, ${d.color}33)` }} />
              <div
                className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none group-hover:opacity-[0.1] transition-opacity"
                style={{ background: d.color, transform: 'translate(30%, -30%)' }}
              />

              <div className="relative p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="chip"
                    style={{ background: `${d.color}10`, borderColor: `${d.color}40`, color: d.color }}
                  >
                    Division 0{d.id} · {d.name}
                  </span>
                  <span className="chip border-border bg-surface2 text-txt3">
                    Capstone 0{i + 1}
                  </span>
                </div>

                <h2 className="font-syne font-bold text-xl md:text-2xl tracking-tight text-txt">{d.capstone!.name}</h2>
                <p className="text-[14px] md:text-[14.5px] text-txt2 mt-3 leading-relaxed max-w-4xl">{d.capstone!.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-7">
                  <div className="lg:col-span-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-3">Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {d.capstone!.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border"
                          style={{ background: `${d.color}10`, borderColor: `${d.color}30`, color: d.color }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-3">Outcomes you ship</p>
                    <ul className="space-y-2">
                      {d.capstone!.outcomes.map((o) => (
                        <li key={o} className="text-[13px] text-txt2 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: d.color }} strokeWidth={2} />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-7 pt-6 border-t border-border">
                  <Link
                    href={`/roadmap?div=${d.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold border transition-all hover:-translate-y-px"
                    style={{ background: `${d.color}12`, borderColor: `${d.color}40`, color: d.color }}
                  >
                    Open Division {d.id} weeks
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {lastWeekByDiv[d.id] && (
                    <span className="text-[11px] text-txt3 font-mono">Unlocks after Week {lastWeekByDiv[d.id]}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* DELIVERY TIPS */}
        <section className="mt-12">
          <div className="mb-6">
            <SectionEyebrow text="How to deliver like a senior engineer" />
            <h3 className="heading-section text-2xl text-txt mt-2">Six rules every capstone should follow.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DELIVERY_TIPS.map((tip, i) => {
              const Icon = tip.icon
              return (
                <div key={tip.title} className="rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent2" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] text-txt3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="font-syne font-bold text-[14px] tracking-tight text-txt">{tip.title}</p>
                  <p className="text-[12.5px] text-txt2 mt-1.5 leading-relaxed">{tip.desc}</p>
                </div>
              )
            })}
          </div>
        </section>
      </PageWrapper>
    </>
  )
}
