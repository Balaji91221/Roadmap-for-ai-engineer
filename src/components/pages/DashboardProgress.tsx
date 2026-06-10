'use client'

import Link from 'next/link'
import { Flame, CheckCircle2, Trophy } from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { DIVISIONS } from '@/lib/data/divisions'
import { WEEKS } from '@/lib/data/weeks'
import SectionEyebrow from '@/components/shared/SectionEyebrow'
import ProgressRing from '@/components/shared/ProgressRing'
import ActivityHeatmap from '@/components/shared/ActivityHeatmap'
import ProgressControls from '@/components/shared/ProgressControls'

export default function DashboardProgress() {
  const { hydrated, overallPct, completedCount, streak, furthestWeek, divisionProgress, completionsByDay } =
    useProgress()

  const totalWeeks = WEEKS.length
  const furthest = WEEKS.find((w) => w.week === furthestWeek)

  return (
    <section className="mt-6 rounded-2xl border border-border bg-surface card-elevated p-6">
      <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
        <div>
          <SectionEyebrow text="Your progress" />
          <h3 className="heading-section text-xl text-txt mt-2">Track your journey.</h3>
          <p className="text-[13px] text-txt2 mt-1.5">
            Mark weeks complete as you finish them — saved to this browser.
          </p>
        </div>
        <ProgressControls />
      </div>

      {!hydrated ? (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
          <div className="h-[120px] rounded-xl bg-surface2/40 animate-pulse-glow" />
          <div className="h-[120px] rounded-xl bg-surface2/40 animate-pulse-glow" />
        </div>
      ) : (
        <>
          {/* TOP: overall ring + headline stats */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="flex items-center gap-5">
              <ProgressRing pct={overallPct} size={96} stroke={8}>
                <div>
                  <p className="font-syne font-extrabold text-2xl text-txt tabular-nums leading-none">{overallPct}%</p>
                  <p className="text-[9px] font-mono text-txt3 uppercase tracking-widest mt-1">done</p>
                </div>
              </ProgressRing>
              <div className="space-y-2.5">
                <Stat
                  icon={<CheckCircle2 className="w-4 h-4 text-green" strokeWidth={2} />}
                  value={`${completedCount} / ${totalWeeks}`}
                  label="weeks completed"
                />
                <Stat
                  icon={<Flame className="w-4 h-4 text-coral" strokeWidth={2} />}
                  value={streak === 0 ? 'No streak' : `${streak} day${streak === 1 ? '' : 's'}`}
                  label="current streak"
                />
                <Stat
                  icon={<Trophy className="w-4 h-4 text-amber" strokeWidth={2} />}
                  value={furthest ? `Week ${furthest.week}` : '—'}
                  label={furthest ? furthest.topic : 'nothing completed yet'}
                />
              </div>
            </div>

            {/* Activity heatmap */}
            <div className="rounded-xl border border-border bg-surface2/30 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-3">Activity · last 6 months</p>
              <ActivityHeatmap data={completionsByDay} />
            </div>
          </div>

          {/* Per-division rings */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-txt3 mb-4">Progress by division</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {DIVISIONS.map((d) => {
                const p = divisionProgress(d.id)
                return (
                  <Link
                    key={d.id}
                    href={`/roadmap?div=${d.id}`}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-3 hover:border-border2 hover:-translate-y-0.5 transition-all"
                    title={`${d.name} — ${p.done}/${p.total}`}
                  >
                    <ProgressRing pct={p.pct} size={56} stroke={5} color={d.color}>
                      <span className="font-syne font-bold text-[12px] tabular-nums" style={{ color: d.color }}>
                        {p.pct}%
                      </span>
                    </ProgressRing>
                    <span className="text-[10px] text-txt3 font-mono">Div {d.id}</span>
                    <span className="text-[10.5px] text-txt2 text-center leading-tight line-clamp-1 group-hover:text-txt transition-colors">
                      {d.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-7 h-7 rounded-lg bg-surface2 border border-border flex items-center justify-center shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-syne font-bold text-[14px] text-txt leading-none tabular-nums">{value}</p>
        <p className="text-[11px] text-txt3 mt-0.5 truncate">{label}</p>
      </div>
    </div>
  )
}
