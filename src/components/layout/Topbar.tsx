import { cn } from '@/lib/utils'

type Variant = 'purple' | 'teal' | 'amber' | 'green' | 'coral' | 'pink' | 'sky' | 'rose'

const styles: Record<Variant, string> = {
  purple: 'bg-accent/10 text-accent2 border-accent/25',
  teal: 'bg-teal/10 text-teal border-teal/25',
  amber: 'bg-amber/10 text-amber border-amber/25',
  green: 'bg-green/10 text-green border-green/25',
  coral: 'bg-coral/10 text-coral border-coral/25',
  pink: 'bg-pink/10 text-pink border-pink/25',
  sky: 'bg-sky/10 text-sky border-sky/25',
  rose: 'bg-rose/10 text-rose border-rose/25',
}

export default function Topbar({
  title,
  subtitle,
  chips = [],
}: {
  title: string
  subtitle: string
  chips?: Array<{ label: string; variant: Variant }>
}) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-bg/85 backdrop-blur-xl border-b border-border px-4 md:px-6 flex items-center justify-between gap-4">
      <div className="min-w-0 flex items-center gap-3">
        <h2 className="font-syne font-bold text-[15px] tracking-tight text-txt whitespace-nowrap">{title}</h2>
        <span className="text-txt3 text-xs select-none">/</span>
        <p className="text-[12.5px] text-txt2 truncate">{subtitle}</p>
      </div>
      {chips.length > 0 && (
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          {chips.map((c) => (
            <span key={c.label} className={cn('chip', styles[c.variant])}>
              {c.label}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}
