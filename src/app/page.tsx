import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Hammer,
  Target,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'

export const metadata: Metadata = {
  title: 'Home',
  description: 'A complete 84-week, zero-to-hero AI Engineering curriculum. Eight divisions, deep-dive resources, hands-on capstones, and interview prep — built for serious students.',
}

type Promise = { icon: LucideIcon; title: string; desc: string }

const PROMISES: Promise[] = [
  { icon: BookOpen, title: 'Curated curriculum', desc: 'Every week ships with 5 key concepts, 3–4 vetted resources, a hands-on project, and 3 interview questions. No filler.' },
  { icon: Hammer, title: 'Build, don\'t just read', desc: 'Eight division capstones force you to ship — RAG systems, multi-agent platforms, full AI infrastructure on Kubernetes.' },
  { icon: Target, title: 'Interview ready', desc: 'Real questions you would face for AI Engineer, ML Engineer, GenAI, and AI Platform roles. Practice as you learn.' },
  { icon: TrendingUp, title: 'Career aligned', desc: 'Salary ladder, gap analysis, and skill transfer mapping — so you know exactly what to learn next and why.' },
]

const STUDENT_FLOW = [
  { step: '01', title: 'Start with the Roadmap', desc: 'Open the 84-week roadmap and pick your division. Filter by difficulty if you are new.', href: '/roadmap', cta: 'Open roadmap' },
  { step: '02', title: 'Study a topic deeply', desc: 'Click any week — read the intro, master the 5 key concepts, follow the deep-dive resources.', href: '/roadmap', cta: 'Browse topics' },
  { step: '03', title: 'Ship the mini project', desc: 'Every topic ends with a build. Push it to GitHub, write a README, share what you learned.', href: '/capstones', cta: 'See projects' },
  { step: '04', title: 'Prepare for interviews', desc: 'Practice the 3 interview questions per topic. Use the career ladder to target the right level.', href: '/ladder', cta: 'View ladder' },
]

const ROLES = [
  'AI Engineer', 'ML Engineer', 'GenAI Engineer', 'AI Platform Engineer',
  'MLOps Engineer', 'Senior AI Engineer', 'AI Architect', 'DevOps for AI',
]

export default function HomePage() {
  const totalTopics = WEEKS.length
  const totalDivisions = DIVISIONS.length
  const totalResources = WEEKS.reduce((acc, w) => acc + w.resources.length, 0)
  const totalProjects = totalTopics + totalDivisions
  const totalInterviewQs = WEEKS.reduce((acc, w) => acc + w.interviewQs.length, 0)

  return (
    <>
      <Topbar
        title="Learn Everything"
        subtitle="Zero → Hero AI Engineering · A complete student curriculum"
        chips={[
          { label: `${totalDivisions} divisions`, variant: 'purple' },
          { label: `${totalTopics} weeks`, variant: 'teal' },
          { label: `${totalProjects} projects`, variant: 'amber' },
        ]}
      />
      <PageWrapper>
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface card-elevated">
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
            <div className="absolute -left-20 -top-20 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -right-32 top-32 w-[400px] h-[400px] rounded-full bg-teal/12 blur-3xl" />
            <div className="absolute right-0 -bottom-32 w-[400px] h-[400px] rounded-full bg-pink/10 blur-3xl" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative px-6 md:px-12 py-12 md:py-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent2" />
              <span className="font-mono text-[11px] tracking-wide text-accent2">v1.0 · Built for serious students</span>
            </div>

            <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl text-txt max-w-4xl text-balance">
              Become the AI Engineer<br />
              <span className="bg-gradient-to-r from-accent2 via-accent to-teal bg-clip-text text-transparent">companies actually hire.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-txt2 leading-relaxed max-w-2xl text-pretty">
              An end-to-end, {totalTopics}-week curriculum across {totalDivisions} divisions — from ML foundations
              to production-grade agent systems and full AI infrastructure. Every topic enriched with curated resources,
              a hands-on project, and real interview questions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/roadmap" className="btn-primary">
                Start the {totalTopics}-week roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/dashboard" className="btn-ghost">
                Open the dashboard
              </Link>
              <Link href="/capstones" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 text-[13px] text-txt2 hover:text-txt transition-colors">
                See the {totalDivisions} capstones
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Hero stats inline */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl bg-border overflow-hidden border border-border max-w-3xl">
              {[
                { num: totalTopics, label: 'Weekly topics' },
                { num: totalResources, label: 'Resources' },
                { num: totalProjects, label: 'Projects' },
                { num: totalInterviewQs, label: 'Interview Qs' },
              ].map((s) => (
                <div key={s.label} className="bg-surface px-4 py-4">
                  <p className="font-syne font-extrabold text-2xl text-txt tracking-tight tabular-nums">{s.num}</p>
                  <p className="text-[11px] text-txt3 mt-1 font-mono uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <SectionEyebrow text="Why this curriculum" />
              <h2 className="heading-section text-3xl md:text-4xl text-txt mt-3">
                Built for students who actually ship.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROMISES.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="group rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-px transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                      <Icon className="w-5 h-5 text-accent2" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-syne font-bold text-base tracking-tight text-txt">{p.title}</h3>
                      <p className="text-[13px] text-txt2 mt-1.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* DIVISIONS */}
        <section className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <SectionEyebrow text="The 8 divisions" />
              <h2 className="heading-section text-3xl md:text-4xl text-txt mt-3">From foundations to production.</h2>
              <p className="text-[14px] text-txt2 mt-2 max-w-2xl">A linear progression — every division builds on the last. Click any to open its weeks and capstone.</p>
            </div>
            <Link href="/roadmap" className="text-[12.5px] text-accent2 hover:text-accent flex items-center gap-1 font-medium">
              View full roadmap <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DIVISIONS.map((d) => (
              <Link
                key={d.id}
                href={`/roadmap?div=${d.id}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-5 hover:border-border2 hover:-translate-y-0.5 transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }} />
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] blur-2xl pointer-events-none group-hover:opacity-[0.12] transition-opacity"
                  style={{ background: d.color, transform: 'translate(40%, -40%)' }} />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-txt3">Division 0{d.id}</p>
                    <span className="font-mono text-[10px] text-txt3 tabular-nums">{d.topics} wks</span>
                  </div>
                  <p className="font-syne font-bold text-[16px] tracking-tight mt-3" style={{ color: d.color }}>{d.name}</p>
                  <p className="text-[12.5px] text-txt2 mt-1.5 leading-relaxed">{d.use}</p>
                  {d.capstone && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-txt3 mb-1">Capstone</p>
                      <p className="text-[11.5px] text-txt2 line-clamp-2 leading-snug">{d.capstone.name}</p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* HOW TO USE */}
        <section className="mt-16">
          <div className="mb-6">
            <SectionEyebrow text="How to use this platform" />
            <h2 className="heading-section text-3xl md:text-4xl text-txt mt-3">Your first four steps.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {STUDENT_FLOW.map((s) => (
              <div key={s.step} className="group relative rounded-xl border border-border bg-surface card-elevated p-5 hover:border-accent/30 hover:-translate-y-0.5 transition-all">
                <div className="absolute top-4 right-4 font-syne font-extrabold text-4xl text-txt3/15 group-hover:text-accent/20 transition-colors">
                  {s.step}
                </div>
                <h3 className="font-syne font-bold text-base tracking-tight text-txt pr-12">{s.title}</h3>
                <p className="text-[13px] text-txt2 mt-2 leading-relaxed">{s.desc}</p>
                <Link href={s.href} className="inline-flex items-center gap-1 mt-4 text-[12px] font-semibold text-accent2 hover:text-accent transition-colors">
                  {s.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* TARGET ROLES */}
        <section className="mt-16">
          <div className="mb-6">
            <SectionEyebrow text="Target roles" />
            <h2 className="heading-section text-3xl md:text-4xl text-txt mt-3">What you can become.</h2>
            <p className="text-[14px] text-txt2 mt-2 max-w-2xl">The curriculum maps to the highest-paying AI roles in the market right now.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-surface text-[12.5px] text-txt2 hover:border-accent/40 hover:text-txt transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green" strokeWidth={2} />
                {r}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/15 via-surface to-teal/10 px-6 md:px-10 py-10 md:py-12">
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <SectionEyebrow text="Ready when you are" />
              <h3 className="heading-section text-2xl md:text-3xl text-txt mt-3">Pick a division and start this week.</h3>
              <p className="text-[14px] text-txt2 mt-3 leading-relaxed">
                Bookmark the dashboard, set a one-week pace, ship the mini project before moving on.
                <span className="text-txt"> Consistency &gt; intensity.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/roadmap" className="btn-primary">
                Open the roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/phases" className="btn-ghost">
                <Layers className="w-4 h-4" />
                View phases
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-txt3" />
            <p className="text-[11px] text-txt3 font-mono">{totalTopics} weeks · {totalDivisions} divisions · {totalProjects} projects · Built for students</p>
          </div>
          <div className="flex flex-wrap gap-5 text-[12px] text-txt3">
            <Link href="/dashboard" className="hover:text-txt transition-colors">Dashboard</Link>
            <Link href="/skills" className="hover:text-txt transition-colors">Skills transfer</Link>
            <Link href="/gaps" className="hover:text-txt transition-colors">Gap analysis</Link>
            <Link href="/calendar" className="hover:text-txt transition-colors">Content calendar</Link>
          </div>
        </footer>
      </PageWrapper>
    </>
  )
}
