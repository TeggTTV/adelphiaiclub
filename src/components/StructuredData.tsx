'use client';

import { usePathname } from 'next/navigation';

interface StructuredDataProps {
  type?: 'organization' | 'event' | 'person' | 'webpage';
  data?: Record<string, any>;
}

const StructuredData = ({ type = 'organization', data = {} }: StructuredDataProps) => {
  const pathname = usePathname();
  
  const getStructuredData = () => {
    const baseUrl = 'https://adelphiaisociety.vercel.app';
    
    if (type === 'organization') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Adelphi AI Society',
        alternateName: 'Adelphi Artificial Intelligence Society',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: 'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University. Student organization focused on artificial intelligence education, workshops, and innovation.',
        foundingDate: '2024',
        areaServed: {
          '@type': 'Place',
          name: 'Adelphi University'
        },
        parentOrganization: {
          '@type': 'EducationalOrganization',
          name: 'Adelphi University',
          url: 'https://www.adelphi.edu'
        },
        memberOf: {
          '@type': 'EducationalOrganization',
          name: 'Adelphi University'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'General Inquiries',
          email: 'info@adelphiaisociety.com'
        },
        sameAs: [
          'https://www.instagram.com/adelphiaisociety',
          'https://www.linkedin.com/company/adelphi-ai-society',
          'https://twitter.com/adelphiaisociety'
        ],
        location: {
          '@type': 'Place',
          name: 'Adelphi University',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1 South Ave',
            addressLocality: 'Garden City',
            addressRegion: 'NY',
            postalCode: '11530',
            addressCountry: 'US'
          }
        },
        ...data
      };
    }
    
    if (type === 'webpage') {
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title || 'Adelphi AI Society',
        description: data.description || 'Empowering Minds, Shaping Futures: AI Education and Innovation at Adelphi University',
        url: `${baseUrl}${pathname}`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Adelphi AI Society',
          url: baseUrl
        },
        about: {
          '@type': 'Organization',
          name: 'Adelphi AI Society'
        },
        ...data
      };
    }
    
    if (type === 'event') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: data.name || 'Adelphi AI Society Event',
        description: data.description || 'Join us for an exciting AI-focused event',
        startDate: data.startDate,
        endDate: data.endDate,
        location: {
          '@type': 'Place',
          name: data.locationName || 'Adelphi University',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '1 South Ave',
            addressLocality: 'Garden City',
            addressRegion: 'NY',
            postalCode: '11530',
            addressCountry: 'US'
          }
        },
        organizer: {
          '@type': 'Organization',
          name: 'Adelphi AI Society',
          url: baseUrl
        },
        ...data
      };
    }
    
    return data;
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
};

export default StructuredData;
