export default function StatCard({
  num,
  label,
  sub,
  color,
  trend,
}: {
  num: string
  label: string
  sub: string
  color: string
  trend?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface card-elevated p-4 hover:border-border2 hover:-translate-y-px transition-all duration-200 group">
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div className="flex items-start justify-between">
        <p className="font-syne font-extrabold text-2xl tracking-tight" style={{ color }}>
          {num}
        </p>
        {trend && (
          <span className="font-mono text-[10px] text-txt3 tabular-nums">{trend}</span>
        )}
      </div>
      <p className="text-[13px] font-medium text-txt mt-2">{label}</p>
      <p className="text-[11px] text-txt3 mt-0.5">{sub}</p>
    </div>
  )
}
