import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Week } from '@/lib/types'
import { getDivisionColor, getDivisionName, getDifficultyColor } from '@/lib/utils'

export default function WeekCard({ week }: { week: Week }) {
  const diff = getDifficultyColor(week.difficulty)
  const divColor = getDivisionColor(week.div)
  const effort = Math.round(week.effort * 2)

  return (
    <Link
      href={`/roadmap/${week.week}`}
      className="group relative block text-left bg-surface border border-border rounded-xl p-4 cursor-pointer overflow-hidden hover:border-border2 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
        style={{ background: `linear-gradient(90deg, ${divColor}, ${divColor}66, transparent)` }}
      />
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] blur-2xl pointer-events-none transition-opacity group-hover:opacity-[0.12]"
        style={{ background: divColor, transform: 'translate(40%, -40%)' }}
      />

      <div className="relative flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] text-txt3 tracking-wide">
          W{String(week.week).padStart(2, '0')}
          <span className="mx-1.5 text-txt3/50">·</span>
          <span style={{ color: divColor }}>{getDivisionName(week.div)}</span>
        </p>
        <span
          className="text-[9px] font-semibold font-mono px-1.5 py-0.5 rounded uppercase tracking-wide"
          style={{ background: diff.bg, color: diff.text }}
        >
          {diff.label}
        </span>
      </div>

      <div className="relative mt-3 flex items-start gap-2.5">
        <span className="text-2xl shrink-0 leading-none">{week.icon}</span>
        <h4 className="font-syne font-bold text-[14px] tracking-tight leading-snug text-txt group-hover:text-accent2 transition-colors line-clamp-2">
          {week.topic}
        </h4>
      </div>

      <p className="relative text-[12px] text-txt2 mt-2.5 leading-relaxed line-clamp-2">{week.hook}</p>

      <div className="relative flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-txt3 font-mono">effort</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="w-[3px] h-3 rounded-sm transition-colors"
                style={{ background: i < effort ? divColor : 'rgba(255,255,255,0.08)' }}
              />
            ))}
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-txt3 group-hover:text-accent2 transition-colors">
          Open
          <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
        </span>
      </div>
    </Link>
  )
}
