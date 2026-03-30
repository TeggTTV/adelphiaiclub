import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'AI Events and Workshops',
  description:
    'Explore upcoming AI Society workshops, competitions, and community events open to students.',
  path: '/events',
  keywords: ['AI events', 'Adelphi workshops', 'student tech events'],
})

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children
}
