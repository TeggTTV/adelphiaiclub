import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'E-Board Leadership Team',
  description:
    'Meet the AI Society E-Board, including student leaders driving club events, projects, and growth.',
  path: '/eboard',
  keywords: ['Adelphi AI eboard', 'student leadership', 'AI club officers'],
})

export default function EboardLayout({ children }: { children: ReactNode }) {
  return children
}
