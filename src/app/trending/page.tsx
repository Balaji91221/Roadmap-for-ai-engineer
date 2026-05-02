import type { Metadata } from 'next'
import TrendingClient from '@/components/pages/TrendingClient'

export const metadata: Metadata = {
  title: 'Trending | Learn Everything',
  description: 'High-signal AI topics for your content system',
}

export default function TrendingPage() {
  return <TrendingClient />
}
