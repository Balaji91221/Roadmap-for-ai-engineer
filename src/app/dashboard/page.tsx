import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Map,
  Zap,
  Layers,
  Calendar,
  Trophy,
  Library,
  TrendingUp,
  Target,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import StatCard from '@/components/shared/StatCard'
import ProgressBar from '@/components/shared/ProgressBar'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal AI mastery command centre',
}

type Quick = { href: string; icon: LucideIcon; title: string; sub: string; color: string }

const QUICK_NAV: Quick[] = [
  { href: '/roadmap', icon: Map, title: 'Roadmap', sub: '84-week flow', color: '#7C6AF7' },
  { href: '/capstones', icon: Trophy, title: 'Capstones', sub: '8 projects', color: '#F59E0B' },
  { href: '/resources', icon: Library, title: 'Resources', sub: 'Curated library', color: '#2DD4BF' },
  { href: '/skills', icon: Zap, title: 'Skills', sub: 'Transfer map', color: '#22C55E' },
  { href: '/phases', icon: Layers, title: 'Phases', sub: 'Learning path', color: '#EC4899' },
  { href: '/ladder', icon: TrendingUp, title: 'Ladder', sub: 'Career bands', color: '#0EA5E9' },
  { href: '/gaps', icon: Target, title: 'Gaps', sub: 'What to fix', color: '#F97316' },
  { href: '/calendar', icon: Calendar, title: 'Calendar', sub: 'Content rhythm', color: '#A594FF' },
]

const WEEKLY_RHYTHM = [
  { day: 'Mon · Tue', title: 'Read & internalize', desc: 'Open the week. Read the intro and the 5 key concepts twice.', accent: '#7C6AF7' },
  { day: 'Wed · Thu', title: 'Study deeply', desc: 'Work through 2 of the curated resources. Take notes in your own words.', accent: '#2DD4BF' },
  { day: 'Fri · Sat', title: 'Ship the project', desc: 'Build the mini project end-to-end. Push to GitHub with a clean README.', accent: '#F59E0B' },
  { day: 'Sunday', title: 'Reflect & post', desc: 'Answer the 3 interview Qs out loud. Share what you learned online.', accent: '#22C55E' },
]

export default function DashboardPage() {
  const totalTopics = WEEKS.length
  const totalDivisions = DIVISIONS.length
  const maxDivisionTopics = Math.max(...DIVISIONS.map((d) => d.topics), 1)
  const totalResources = WEEKS.reduce((acc, w) => acc + w.resources.length, 0)

  const diffCounts = WEEKS.reduce<Record<string, number>>((acc, w) => {
    acc[w.difficulty] = (acc[w.difficulty] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Your AI mastery command centre"
        chips={[
          { label: `${totalTopics} topics`, variant: 'purple' },
          { label: `${totalDivisions} divisions`, variant: 'teal' },
          { label: `${totalResources} resources`, variant: 'amber' },
        ]}
      />
      <PageWrapper>
        {/* HERO STRIP */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated p-6 md:p-8">
          <div className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
          <div className="absolute right-32 -bottom-32 w-[260px] h-[260px] rounded-full bg-teal/10 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-accent2" />
              </div>
              <SectionEyebrow text="Welcome back" />
            </div>
            <h1 className="heading-display text-3xl md:text-5xl text-txt text-balance">
              Zero → Hero<br />
              <span className="bg-gradient-to-r from-accent2 to-teal bg-clip-text text-transparent">AI Engineering Mastery</span>
            </h1>
            <p className="text-[14px] md:text-[15px] text-txt2 mt-4 leading-relaxed max-w-2xl text-pretty">
              {totalTopics}-week curriculum across {totalDivisions} divisions — from ML foundations to production agent
              deployment & DevOps. Every topic includes resources, projects, and interview prep.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href="/roadmap" className="btn-primary">
                Continue learning
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/capstones" className="btn-ghost">
                <Trophy className="w-4 h-4" />
                See capstones
              </Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-6">
          <StatCard num={String(totalTopics)} label="Roadmap topics" sub={`${totalDivisions} divisions · ${totalTopics} weeks`} color="#7C6AF7" />
          <StatCard num={String(diffCounts['beginner'] ?? 0)} label="Beginner topics" sub={`${diffCounts['intermediate'] ?? 0} intermediate`} color="#22C55E" />
          <StatCard num={String((diffCounts['advanced'] ?? 0) + (diffCounts['expert'] ?? 0))} label="Advanced & expert" sub={`${diffCounts['expert'] ?? 0} expert-level`} color="#F43F5E" />
          <StatCard num="₹40L+" label="Target salary band" sub="Senior AI / Platform Engineer" color="#2DD4BF" />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
          {/* DIVISION BREAKDOWN */}
          <div className="xl:col-span-2 rounded-2xl border border-border bg-surface card-elevated p-6">
            <div className="flex items-end justify-between mb-5">
              <div>
                <SectionEyebrow text="Curriculum structure" />
                <h3 className="heading-section text-xl text-txt mt-2">{totalDivisions} divisions, {totalTopics} weeks</h3>
              </div>
              <Link href="/roadmap" className="text-[12px] text-accent2 hover:text-accent flex items-center gap-1 font-medium">
                Open roadmap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {DIVISIONS.map((d) => (
                <Link href={`/roadmap?div=${d.id}`} key={d.id} className="group block">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.color }} />
                      <span className="text-[13px] text-txt font-medium tracking-tight group-hover:text-accent2 transition-colors truncate">
                        Division {d.id} · {d.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-txt3 font-mono tabular-nums shrink-0 ml-3">{d.topics} topics</span>
                  </div>
                  <ProgressBar value={(d.topics / maxDivisionTopics) * 100} color={d.color} height={4} />
                  <p className="text-[11.5px] text-txt3 mt-1.5 line-clamp-1">{d.use}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK NAV */}
          <div className="rounded-2xl border border-border bg-surface card-elevated p-6">
            <div className="flex items-end justify-between mb-5">
              <div>
                <SectionEyebrow text="Quick navigate" />
                <h3 className="heading-section text-xl text-txt mt-2">Jump anywhere</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_NAV.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-xl border border-border p-3 hover:border-border2 hover:-translate-y-0.5 transition-all"
                    style={{ background: `${item.color}08` }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: item.color }} strokeWidth={2} />
                    </div>
                    <p className="font-syne font-bold text-[13px] tracking-tight text-txt mt-2.5 group-hover:text-accent2 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10.5px] text-txt3 mt-0.5">{item.sub}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* WEEKLY RHYTHM */}
        <section className="mt-6 rounded-2xl border border-border bg-surface card-elevated p-6">
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <SectionEyebrow text="For students · Weekly rhythm" />
              <h3 className="heading-section text-xl text-txt mt-2">A cadence that compounds.</h3>
              <p className="text-[13px] text-txt2 mt-1.5">One topic a week. Read, study, ship, reflect — repeat.</p>
            </div>
            <Link href="/" className="text-[12px] text-accent2 hover:text-accent flex items-center gap-1 font-medium">
              Full intro <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {WEEKLY_RHYTHM.map((d, i) => (
              <div key={d.day} className="relative rounded-xl border border-border bg-surface2/40 p-4 overflow-hidden group hover:border-border2 transition-all">
                <span className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${d.accent}, transparent)` }} />
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: d.accent }}>
                  {String(i + 1).padStart(2, '0')} · {d.day}
                </p>
                <p className="font-syne font-bold text-[14px] tracking-tight text-txt mt-2.5">{d.title}</p>
                <p className="text-[12px] text-txt2 mt-1.5 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DIVISION GRID */}
        <section className="mt-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <SectionEyebrow text="The 8 divisions" />
              <h3 className="heading-section text-xl text-txt mt-2">Pick where you are.</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DIVISIONS.map((d) => (
              <Link
                key={d.id}
                href={`/roadmap?div=${d.id}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-0.5 transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-txt3">Div 0{d.id}</p>
                  <span className="font-mono text-[10px] text-txt3 tabular-nums">{d.topics} wks</span>
                </div>
                <p className="font-syne font-bold text-[14px] tracking-tight mt-2.5" style={{ color: d.color }}>{d.name}</p>
                <p className="text-[11.5px] text-txt2 mt-1 leading-relaxed line-clamp-2">{d.use}</p>
                <div className="flex items-center gap-1 mt-3 text-[11px] text-txt3 group-hover:text-accent2 transition-colors">
                  <span>Open weeks</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </PageWrapper>
    </>
  )
}
