import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Student AI Projects',
  description:
    'Discover featured projects built by AI Society members across machine learning, web apps, and data science.',
  path: '/projects',
  keywords: ['AI projects', 'student portfolio', 'Adelphi machine learning projects'],
})

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
