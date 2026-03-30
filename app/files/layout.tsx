import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Club Files and Resources',
  description:
    'Browse meeting notes, workshop slides, project templates, and shared resources from AI Society.',
  path: '/files',
  keywords: ['AI club resources', 'meeting notes', 'workshop files'],
})

export default function FilesLayout({ children }: { children: ReactNode }) {
  return children
}
