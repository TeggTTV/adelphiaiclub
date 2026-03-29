import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Adelphi AI Society',
  description:
    'Reach out to Adelphi AI Society for partnerships, questions, collaborations, or event opportunities.',
  path: '/contact',
  keywords: ['contact Adelphi AI Society', 'AI club email', 'student collaboration'],
})

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
