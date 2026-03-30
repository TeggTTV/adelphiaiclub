import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'AI Society',
		template: '%s | AI Society',
	},
	description:
		'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University. Join our community of students and faculty exploring artificial intelligence through workshops, hackathons, and guest speakers.',
	keywords: [
		'Adelphi University',
		'AI Society',
		'Artificial Intelligence',
		'Machine Learning',
		'Student Organization',
		'AI Education',
		'Technology Club',
		'Computer Science',
		'Innovation',
		'Workshops',
		'Hackathons',
	],
	authors: [{ name: 'AI Society' }],
	creator: 'AI Society',
	publisher: 'AI Society',
	metadataBase: new URL('https://adelphiaisociety.vercel.app'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://adelphiaisociety.vercel.app',
		title: 'AI Society',
		description:
			'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University. Join our community of students and faculty exploring artificial intelligence.',
		siteName: 'AI Society',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'AI Society - Empowering Minds, Shaping Futures',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'AI Society',
		description:
			'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University.',
		images: ['/og-image.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code', // Replace with actual verification code
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link
					rel="icon"
					href="/TRANSPARENT ICON.png"
					type="image/png"
				/>
				<link rel="apple-touch-icon" href="/TRANSPARENT ICON.png" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="theme-color" content="#3B82F6" />
				<meta name="msapplication-TileColor" content="#3B82F6" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<CookieConsent />
				<Analytics />
				<GoogleAnalytics
					gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}
				/>
			</body>
		</html>
	);
}
