'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  LayoutDashboard,
  Map,
  Trophy,
  Library,
  Zap,
  Target,
  Layers,
  TrendingUp,
  Calendar,
  Flame,
  ListChecks,
  Building2,
  PenLine,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { WEEKS } from '@/lib/data/weeks'
import { DIVISIONS } from '@/lib/data/divisions'

type Item = { icon: LucideIcon; label: string; href: string; badge?: string | number }
type Group = { section: string; items: Item[] }

export default function Sidebar() {
  const pathname = usePathname()
  const totalWeeks = WEEKS.length
  const totalDivisions = DIVISIONS.length

  const groups: Group[] = [
    {
      section: 'Platform',
      items: [
        { icon: Home, label: 'Home', href: '/' },
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      ],
    },
    {
      section: 'Curriculum',
      items: [
        { icon: Map, label: 'Roadmap', href: '/roadmap', badge: totalWeeks },
        { icon: Trophy, label: 'Capstones', href: '/capstones', badge: totalDivisions },
        { icon: Library, label: 'Resources', href: '/resources' },
        { icon: Layers, label: 'Phases', href: '/phases', badge: 5 },
      ],
    },
    {
      section: 'Career',
      items: [
        { icon: Zap, label: 'Skills Transfer', href: '/skills', badge: 4 },
        { icon: Target, label: 'Gap Analysis', href: '/gaps', badge: 6 },
        { icon: TrendingUp, label: 'Career Ladder', href: '/ladder', badge: 6 },
      ],
    },
    {
      section: 'Content',
      items: [
        { icon: Calendar, label: 'Calendar', href: '/calendar', badge: totalWeeks },
        { icon: Flame, label: 'Trending', href: '/trending', badge: 8 },
        { icon: ListChecks, label: 'Daily Themes', href: '/daily', badge: 7 },
        { icon: Building2, label: 'Pillars', href: '/pillars', badge: 5 },
        { icon: PenLine, label: 'Hooks', href: '/hooks', badge: 8 },
      ],
    },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-16 lg:w-56 bg-surface/80 backdrop-blur-xl border-r border-border overflow-y-auto">
      <div className="px-3 lg:px-4 py-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent3 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden lg:block min-w-0">
            <p className="font-syne font-extrabold text-[14px] leading-none text-txt tracking-tight">Learn Everything</p>
            <p className="font-mono text-[9px] text-txt3 mt-1 leading-none">AI Mastery · v1.0</p>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <div className="flex-1">
            <p className="font-mono text-[9px] text-txt3 uppercase tracking-widest">Curriculum</p>
            <p className="font-syne font-bold text-[11px] text-txt mt-0.5">{totalDivisions} divs · {totalWeeks} wks</p>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-glow" />
        </div>
      </div>

      <nav className="p-2 lg:p-3 space-y-5">
        {groups.map((group) => (
          <div key={group.section}>
            <p className="hidden lg:block font-mono text-[9px] text-txt3 uppercase tracking-[0.18em] mb-2 px-2">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center justify-center lg:justify-start gap-2.5 rounded-lg px-2.5 py-2 border border-transparent',
                      'hover:bg-surface2 hover:border-border',
                      active && 'bg-accent/12 border-accent/25 text-accent2 hover:bg-accent/15',
                    )}
                  >
                    {active && (
                      <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-accent" />
                    )}
                    <Icon
                      className={cn(
                        'w-4 h-4 shrink-0 transition-colors',
                        active ? 'text-accent2' : 'text-txt2 group-hover:text-txt',
                      )}
                      strokeWidth={1.75}
                    />
                    <span
                      className={cn(
                        'hidden lg:inline text-[12.5px] font-medium tracking-tight',
                        active ? 'text-accent2' : 'text-txt2 group-hover:text-txt',
                      )}
                    >
                      {item.label}
                    </span>
                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          'hidden lg:inline ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-md',
                          active ? 'bg-accent/20 text-accent2' : 'bg-surface3 text-txt3',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="hidden lg:block sticky bottom-0 mt-auto p-3 bg-gradient-to-t from-surface via-surface to-transparent">
        <div className="rounded-lg border border-border bg-surface2/40 p-3">
          <p className="font-mono text-[9px] text-txt3 uppercase tracking-widest">For students</p>
          <p className="font-syne font-bold text-[12px] text-txt mt-1 leading-snug">Pace yourself.<br />One week at a time.</p>
        </div>
      </div>
    </aside>
  )
}
