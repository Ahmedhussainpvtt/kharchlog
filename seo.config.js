/**
 * Kharch Log — SEO source of truth.
 * Run: npm run seo:kharch   (or npm run seo)
 * Wired into: scripts/update-website.ps1
 */
module.exports = {
  site: {
    name: 'Kharch Log',
    origin: 'https://kharchlog.com',
    locale: 'en_IN',
    language: 'en-IN',
    themeColor: '#0F2A43',
    defaultTitle: 'Kharch Log — Best Free Expense Tracker for Android India',
    titleTemplate: '%s | Kharch Log',
    defaultDescription:
      'Daily expense tracker for India: UPI & bank SMS auto-capture, Google Sheets sync, no bank login. Lifetime ₹149.',
    defaultOgImage: 'https://kharchlog.com/og-image.jpg',
    favicon: 'https://kharchlog.com/favicon.png',
    twitterCard: 'summary_large_image',
    author: 'Kharch Log',
  },

  organization: {
    '@type': 'Organization',
    '@id': 'https://kharchlog.com/#organization',
    name: 'Kharch Log',
    url: 'https://kharchlog.com/',
    logo: 'https://kharchlog.com/logo.png',
    email: 'easypeezetools@gmail.com',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Easy Peeze Tools',
      url: 'https://easypeeze.com/',
    },
    sameAs: ['https://easypeeze.com/'],
  },

  robots: {
    extra: [
      'User-agent: *',
      'Allow: /',
      'Disallow: /pay/',
      '',
      'Sitemap: https://kharchlog.com/sitemap.xml',
      '',
    ].join('\n'),
  },

  excludeFromSitemap: ['/pay/'],
  skipPaths: [],

  defaults: {
    changefreq: 'monthly',
    priority: 0.5,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },

  pages: {
    '/': {
      title:
        'Kharch Log — Best Free Expense Tracker for Android India | UPI SMS + Google Sheets | ₹149 Lifetime',
      description:
        'Best free-to-try expense tracker for Android in India. UPI & bank SMS auto-capture, no bank login, daily kharch in your Google Sheet. Lifetime ₹149 — not Form 16 / tax software.',
      changefreq: 'weekly',
      priority: 1.0,
      schemaType: 'WebSite',
    },
    '/features/': {
      title: 'Features — SMS capture, Sheets sync, reports',
      description: 'Kharch Log features: bank SMS auto-capture, review inbox, Google Sheets sync, reports, and share invoice.',
      priority: 0.9,
      changefreq: 'monthly',
    },
    '/pricing/': {
      title: 'Pricing — ₹149 lifetime',
      description: 'Kharch Log lifetime unlock ₹149 (or $2 USD via Easy Peeze PayPal). No subscription.',
      priority: 0.8,
    },
    '/blog/': {
      title: 'Blog — expense tracking tips for India',
      description: 'Guides on UPI tracking, SMS expense capture, weekly reviews, and lifetime vs subscription apps.',
      priority: 0.9,
      changefreq: 'weekly',
    },
    '/faq/': {
      title: 'FAQ — Kharch Log',
      description: 'Common questions about SMS permissions, Google Sheets, pricing, and privacy.',
      priority: 0.8,
      schemaType: 'FAQPage',
    },
    '/install/': {
      title: 'Install Kharch Log APK',
      description: 'Download and install the Kharch Log Android APK safely — signed releases from kharchlog.com.',
      priority: 0.9,
    },
    '/glossary/': {
      title: 'Glossary — expense tracking terms',
      description: 'Short definitions for UPI expense tracking, bank SMS, daily kharch, and related terms.',
      priority: 0.7,
    },
    '/about/': {
      title: 'About Kharch Log',
      description: 'Kharch Log is an Android expense tracker by Easy Peeze Tools — SMS + Sheets, built for India.',
      priority: 0.7,
    },
    '/contact/': {
      title: 'Contact Kharch Log',
      description: 'Support for Kharch Log — email easypeezetools@gmail.com.',
      priority: 0.5,
      changefreq: 'yearly',
    },
    '/pay/': {
      noindex: true,
      sitemap: false,
    },
  },
};
