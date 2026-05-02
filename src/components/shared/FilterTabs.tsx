'use client'

import { cn } from '@/lib/utils'

export default function FilterTabs({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string }>
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface border border-border">
      {options.map((o) => {
        const active = value === o.value
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[12px] font-medium tracking-tight transition-all',
              active
                ? 'bg-accent/15 text-accent2 shadow-sm shadow-accent/20'
                : 'text-txt3 hover:text-txt hover:bg-surface2',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
