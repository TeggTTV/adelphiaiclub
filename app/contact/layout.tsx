import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact AI Society',
  description:
    'Reach out to AI Society for partnerships, questions, collaborations, or event opportunities.',
  path: '/contact',
  keywords: ['contact AI Society', 'AI club email', 'student collaboration'],
})

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
