import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'AI Blog and Tutorials',
  description:
    'Read AI tutorials, club updates, and member insights from the AI Society blog.',
  path: '/blog',
  keywords: ['AI blog', 'machine learning tutorials', 'AI Society posts'],
})

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
