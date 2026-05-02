export default function ProgressBar({
  value,
  color,
  height = 6,
}: {
  value: number
  color: string
  height?: number
}) {
  const width = Math.max(0, Math.min(100, value))
  return (
    <div
      className="w-full rounded-full bg-surface3 overflow-hidden relative"
      style={{ height }}
    >
      <div
        className="h-full transition-all duration-500 ease-out rounded-full"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          boxShadow: `0 0 12px -2px ${color}66`,
        }}
      />
    </div>
  )
}
