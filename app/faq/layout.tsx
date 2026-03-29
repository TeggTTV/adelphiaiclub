import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Get answers to common questions about membership, meetings, events, and participation in Adelphi AI Society.',
  path: '/faq',
  keywords: ['AI club FAQ', 'Adelphi membership questions', 'student tech club info'],
})

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children
}
