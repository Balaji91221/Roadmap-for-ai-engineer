import { cn } from '@/lib/utils'

export default function Callout({
  variant,
  children,
  className,
}: {
  variant: 'accent' | 'teal' | 'amber' | 'green'
  children: React.ReactNode
  className?: string
}) {
  const styles = {
    accent: 'border-accent/40 bg-accent/8',
    teal: 'border-teal/40 bg-teal/8',
    amber: 'border-amber/40 bg-amber/8',
    green: 'border-green/40 bg-green/8',
  }
  return (
    <div className={cn('border-l-2 rounded-r-lg px-4 py-3 text-sm text-txt2 leading-relaxed', styles[variant], className)}>
      {children}
    </div>
  )
}
