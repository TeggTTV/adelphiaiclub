import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EasterEggs } from '@/components/EasterEggs';
import './globals.css';

const siteUrl = 'https://adelphiaisociety.vercel.app';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Adelphi AI Society',
    template: '%s | Adelphi AI Society',
  },
  description: 'Adelphi University\'s Artificial Intelligence Society - Innovate, Create, Explore.',
  applicationName: 'Adelphi AI Society',
  keywords: ['Adelphi University', 'AI', 'Artificial Intelligence', 'Machine Learning', 'Student Club'],
  alternates: {
    canonical: '/',
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
    url: siteUrl,
    siteName: 'Adelphi AI Society',
    title: 'Adelphi AI Society',
    description: 'Adelphi University\'s Artificial Intelligence Society - Innovate, Create, Explore.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adelphi AI Society',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adelphi AI Society',
    description: 'Adelphi University\'s Artificial Intelligence Society - Innovate, Create, Explore.',
    images: ['/og-image.png'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Adelphi AI Society',
  url: siteUrl,
  logo: `${siteUrl}/TRANSPARENT%20LOGO.png`,
  sameAs: ['https://instagram.com/adelphiaisociety_', 'https://github.com/adelphiaisociety'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[color:var(--background)] text-[color:var(--foreground)] font-mono antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <EasterEggs />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

