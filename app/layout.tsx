import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EasterEggs } from '@/components/EasterEggs';
import { BackgroundAnimation } from '@/components/BackgroundAnimation';
import { AdminDashboardAccess } from '@/components/AdminDashboardAccess';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

// Cabinet Grotesk — Fontshare EULA: free for personal & commercial use
const cabinetGrotesk = localFont({
  src: '../public/fonts/CabinetGrotesk_Complete/Fonts/TTF/CabinetGrotesk-Variable.ttf',
  variable: '--font-cabinet-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Adelphi University',
    'AI Society',
    'Artificial Intelligence Club',
    'Machine Learning',
    'Student Organization',
    'NLP',
    'Data Science',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/TRANSPARENT ICON.png', type: 'image/png', sizes: '192x192' },
      { url: '/TRANSPARENT ICON.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/TRANSPARENT ICON.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  category: 'education',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/TRANSPARENT%20LOGO.png`,
  sameAs: ['https://instagram.com/adelphiaisociety_', 'https://github.com/adelphiaisociety'],
  description: DEFAULT_DESCRIPTION,
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Adelphi University',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrainsMono.variable} ${cabinetGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)] font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <EasterEggs />
          <BackgroundAnimation />
          <AdminDashboardAccess />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

