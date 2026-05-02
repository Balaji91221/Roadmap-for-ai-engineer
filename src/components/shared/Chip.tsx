import { cn } from '@/lib/utils'

const styles: Record<string, string> = {
  purple: 'bg-accent/10 text-accent2 border-accent/25',
  teal: 'bg-teal/10 text-teal border-teal/25',
  amber: 'bg-amber/10 text-amber border-amber/25',
  green: 'bg-green/10 text-green border-green/25',
  coral: 'bg-coral/10 text-coral border-coral/25',
  pink: 'bg-pink/10 text-pink border-pink/25',
  sky: 'bg-sky/10 text-sky border-sky/25',
  rose: 'bg-rose/10 text-rose border-rose/25',
}

export default function Chip({ label, variant }: { label: string; variant: string }) {
  return <span className={cn('chip', styles[variant] ?? styles.purple)}>{label}</span>
}
