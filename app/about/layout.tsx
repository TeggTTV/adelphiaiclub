import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'About Adelphi AI Society',
  description:
    'Learn the mission, values, and student-led culture behind Adelphi University\'s Artificial Intelligence Society.',
  path: '/about',
  keywords: ['About Adelphi AI Society', 'Student AI club mission', 'Adelphi University AI'],
})

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
