/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://adelphiaisociety.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://adelphiaisociety.vercel.app/server-sitemap.xml', // Optional server-side sitemap
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/404',
          '/500',
          '/api/*',
          '/_next/*',
          '/admin/*'
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
    // Customize URLs and their properties
    const customPriorities = {
      '/': 1.0,
      '/about': 0.8,
      '/events': 0.9,
      '/board': 0.7,
      '/contact': 0.6,
    };

    const customChangefreq = {
      '/': 'daily',
      '/events': 'daily',
      '/board': 'monthly',
      '/about': 'monthly',
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
