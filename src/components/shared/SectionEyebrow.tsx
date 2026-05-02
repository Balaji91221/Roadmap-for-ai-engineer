export default function SectionEyebrow({ text }: { text: string }) {
  return (
    <p className="eyebrow inline-flex items-center gap-2">
      <span className="w-4 h-px bg-accent/60" />
      <span>{text}</span>
    </p>
  )
}
