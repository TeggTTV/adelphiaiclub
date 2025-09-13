'use client';

// Google Analytics event tracking utilities
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Pre-defined event tracking functions
export const trackNavigation = (destination: string) => {
  event({
    action: 'navigation',
    category: 'engagement',
    label: destination,
  });
};

export const trackEventInterest = (eventTitle: string) => {
  event({
    action: 'event_interest',
    category: 'events',
    label: eventTitle,
  });
};

export const trackBoardMemberView = (memberName: string) => {
  event({
    action: 'board_member_view',
    category: 'engagement',
    label: memberName,
  });
};

export const trackSocialClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'social_media',
    label: platform,
  });
};

export const trackContactForm = (action: 'started' | 'completed') => {
  event({
    action: `contact_form_${action}`,
    category: 'contact',
    label: action,
  });
};

export const trackFileDownload = (fileName: string) => {
  event({
    action: 'file_download',
    category: 'downloads',
    label: fileName,
  });
};

// Custom hook for page view tracking
export const usePageTracking = () => {
  if (typeof window !== 'undefined') {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    return handleRouteChange;
  }
  return null;
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
