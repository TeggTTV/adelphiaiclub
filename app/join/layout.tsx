import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Join AI Society',
  description:
    'Join AI Society to build practical AI skills, collaborate on projects, and attend exclusive workshops.',
  path: '/join',
  keywords: ['join AI club', 'Adelphi student organizations', 'AI community'],
})

export default function JoinLayout({ children }: { children: ReactNode }) {
  return children
}
