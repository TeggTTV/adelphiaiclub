import type { Metadata } from 'next'

const fallbackSiteUrl = 'https://adelphiaisociety.vercel.app'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || fallbackSiteUrl

export const SITE_NAME = 'Adelphi AI Society'
export const DEFAULT_TITLE = 'Adelphi AI Society'
export const DEFAULT_DESCRIPTION =
  "Adelphi University's Artificial Intelligence Society for builders, researchers, and creators."
export const DEFAULT_OG_IMAGE = '/og-image.png'

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  index?: boolean
}

export function getCanonicalUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, SITE_URL).toString()
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  index = true,
}: PageMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(path)
  const ogImage = image || DEFAULT_OG_IMAGE

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
