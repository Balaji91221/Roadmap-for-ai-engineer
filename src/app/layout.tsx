import type { Metadata } from 'next'
import { DM_Mono, DM_Sans, Syne } from 'next/font/google'
import Sidebar from '@/components/layout/Sidebar'
import { ProgressProvider } from '@/contexts/ProgressContext'
import './globals.css'

const syne = Syne({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-syne' })
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })
const sans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: { default: 'Learn Everything — AI Engineering Mastery', template: '%s · Learn Everything' },
  description: '84-week Zero to Hero AI Engineering curriculum. Eight divisions, curated resources, hands-on capstones, and interview prep — built for serious students.',
  keywords: ['AI engineering', 'machine learning roadmap', 'GenAI curriculum', 'agentic AI', 'LLM engineering', 'student curriculum'],
  authors: [{ name: 'Learn Everything' }],
  openGraph: {
    title: 'Learn Everything — AI Engineering Mastery',
    description: '84 weeks · 8 divisions · Curated resources · Capstones · Interview prep',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Learn Everything — AI Engineering Mastery' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${mono.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="bg-bg text-txt min-h-screen font-sans">
        <ProgressProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-16 lg:ml-56 min-w-0">{children}</div>
          </div>
        </ProgressProvider>
      </body>
    </html>
  )
}
