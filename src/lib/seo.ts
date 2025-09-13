import { Metadata } from 'next';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  nofollow = false,
}: SEOConfig = {}): Metadata {
  const baseUrl = 'https://adelphiaisociety.vercel.app';
  
  const defaultKeywords = [
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
    'Hackathons'
  ];

  const allKeywords = [...defaultKeywords, ...keywords];
  
  const seoTitle = title ? `${title} | Adelphi AI Society` : 'Adelphi AI Society';
  const seoDescription = description || 'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University. Join our community of students and faculty exploring artificial intelligence through workshops, hackathons, and guest speakers.';
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: allKeywords,
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: 'Adelphi AI Society',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Pre-configured SEO for common pages
export const pageSEO = {
  home: generateSEO({
    title: 'Home',
    description: 'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University. Join our community of students and faculty exploring artificial intelligence.',
    canonical: '/',
  }),
  
  events: generateSEO({
    title: 'Upcoming Events',
    description: 'Join us for exciting workshops, guest speakers, and hands-on experiences in artificial intelligence. Discover upcoming AI events at Adelphi University.',
    keywords: ['AI events', 'workshops', 'hackathons', 'guest speakers', 'machine learning workshops'],
    canonical: '/events',
  }),
  
  board: generateSEO({
    title: 'Board Members',
    description: 'Meet the brilliant minds driving innovation and fostering AI education at Adelphi University. Get to know our dedicated board members.',
    keywords: ['board members', 'leadership', 'AI education leaders', 'student leaders'],
    canonical: '/board',
  }),
  
  about: generateSEO({
    title: 'About Us',
    description: 'Learn about Adelphi AI Society\'s mission to empower minds and shape futures through artificial intelligence education and innovation.',
    keywords: ['about', 'mission', 'AI education', 'artificial intelligence society'],
    canonical: '/about',
  }),
  
  contact: generateSEO({
    title: 'Contact Us',
    description: 'Get in touch with Adelphi AI Society. Join our community or learn more about our AI education initiatives.',
    keywords: ['contact', 'join', 'membership', 'AI community'],
    canonical: '/contact',
  }),
};

export default generateSEO;
