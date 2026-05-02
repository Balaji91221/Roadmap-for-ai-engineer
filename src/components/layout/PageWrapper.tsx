import { cn } from '@/lib/utils'

export default function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className={cn('px-4 md:px-6 lg:px-8 py-6 lg:py-8 max-w-[1400px] mx-auto', className)}>
      {children}
    </main>
  )
}
