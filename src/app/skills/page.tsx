import type { Metadata } from 'next'
import { Star, Zap } from 'lucide-react'
import Topbar from '@/components/layout/Topbar'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import { SKILLS } from '@/lib/data/skills'

export const metadata: Metadata = {
  title: 'Skills Transfer',
  description: 'How your current web development skills map into AI engineering',
}

const ADVANTAGE_COLOR: Record<string, string> = {
  HIGH: '#22C55E',
  'MEDIUM-HIGH': '#F59E0B',
  MEDIUM: '#0EA5E9',
}

export default function SkillsPage() {
  return (
    <>
      <Topbar
        title="Skills Transfer"
        subtitle="How your strengths map to AI engineering"
        chips={[{ label: `${SKILLS.length} skills`, variant: 'green' }]}
      />
      <PageWrapper>
        <div className="mb-6">
          <SectionEyebrow text="Your existing leverage" />
          <h1 className="heading-display text-3xl md:text-4xl text-txt mt-2 text-balance">
            You already know more than you think.
          </h1>
          <p className="text-[14px] text-txt2 mt-2 max-w-2xl">
            Each card maps a skill you already have to direct, high-leverage applications in AI engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {SKILLS.map((skill) => {
            const advColor = ADVANTAGE_COLOR[skill.advantage] ?? '#7C6AF7'
            return (
              <article
                key={skill.skill}
                className="relative overflow-hidden rounded-2xl border border-border bg-surface card-elevated hover:border-border2 transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: skill.color }} />
                <div className="absolute -right-16 -top-16 w-[220px] h-[220px] rounded-full opacity-[0.08] blur-3xl pointer-events-none" style={{ background: skill.color }} />

                <div className="relative p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0"
                      style={{ background: `${skill.color}25`, border: `1px solid ${skill.color}40`, color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-syne font-bold text-lg tracking-tight text-txt">{skill.skill}</h3>
                      <span
                        className="chip mt-2 inline-flex"
                        style={{ background: `${advColor}15`, borderColor: `${advColor}40`, color: advColor }}
                      >
                        <Zap className="w-3 h-3" /> {skill.advantage} advantage
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-2.5">What you already know</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.have.map((h) => (
                        <span key={h} className="px-2.5 py-1 rounded-md text-[11px] font-mono text-txt2 bg-surface2 border border-border">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-border">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-3">How it transfers to AI</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {skill.aiUse.map((u) => (
                        <div
                          key={u.label}
                          className="rounded-lg p-3 border border-border bg-surface2/40 hover:border-border2 transition-all"
                        >
                          <p className="font-syne font-bold text-[12px] tracking-tight" style={{ color: skill.color }}>
                            {u.label}
                          </p>
                          <p className="text-[12px] text-txt2 mt-1 leading-relaxed">{u.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-2.5 px-4 py-3 rounded-lg border border-accent/30 bg-accent/8">
                    <Star className="w-4 h-4 text-accent2 shrink-0 mt-0.5" strokeWidth={1.75} />
                    <p className="text-[12.5px] text-accent2 italic leading-relaxed">{skill.note}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </PageWrapper>
    </>
  )
}
