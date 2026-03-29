/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://adelphiaisociety.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  autoLastmod: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500', '/api/*', '/blog/admin', '/blog/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/404',
          '/500',
          '/api/*',
          '/_next/*',
          '/blog/admin',
          '/blog/admin/*',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    const customPriorities = {
      '/': 1.0,
      '/events': 0.95,
      '/join': 0.9,
      '/about': 0.8,
      '/projects': 0.85,
      '/blog': 0.8,
      '/eboard': 0.75,
      '/files': 0.65,
      '/faq': 0.7,
      '/contact': 0.7,
    };

    const customChangefreq = {
      '/': 'weekly',
      '/events': 'daily',
      '/blog': 'weekly',
      '/projects': 'weekly',
      '/join': 'monthly',
      '/eboard': 'monthly',
      '/about': 'monthly',
      '/faq': 'monthly',
      '/contact': 'monthly',
    };

    return {
      loc: path,
      changefreq: customChangefreq[path] || config.changefreq,
      priority: customPriorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
