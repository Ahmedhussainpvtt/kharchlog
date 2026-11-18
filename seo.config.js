/**
 * Kharch Log - SEO source of truth.
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
    defaultTitle: 'Kharch Log - Best Free Expense Tracker for Android India',
    titleTemplate: '%s | Kharch Log',
    defaultDescription:
      'Daily expense tracker for India: UPI & bank SMS auto-capture, Google Sheets sync, no bank login. Lifetime ₹149.',
    defaultOgImage: 'https://kharchlog.com/og-image.jpg',
    favicon: 'https://kharchlog.com/favicon.png',
    twitterCard: 'summary_large_image',
    author: 'Kharch Log',
    gtagId: 'G-NDJG1DYZFX',
    amplitudeApiKey: '67d580c08d457990405291aae28f5a41',
  },

  organization: {
    '@type': 'Organization',
    '@id': 'https://kharchlog.com/#organization',
    name: 'Kharch Log',
    url: 'https://kharchlog.com/',
    logo: 'https://kharchlog.com/logo.png',
    email: 'support@easypeeze.com',
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
      'Disallow: /credit',
      '',
      'Sitemap: https://kharchlog.com/sitemap.xml',
      '',
    ].join('\n'),
  },

  excludeFromSitemap: ['/pay/', '/404.html', '/credit', '/credit/'],
  skipPaths: ['/lost/', '/credit', '/credit/'],

  defaults: {
    changefreq: 'monthly',
    priority: 0.5,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },

  pages: {
    '/': {
      title: 'Kharch Log - Best Free Expense Tracker for Android India',
      description:
        'Best free-to-try expense tracker for Android in India. UPI & bank SMS auto-capture, no bank login, daily kharch in your Google Sheet. Lifetime ₹149 - not Form 16 / tax software.',
      changefreq: 'weekly',
      priority: 1.0,
      schemaType: 'WebSite',
      dateModified: '2026-11-18',
    },
    '/features/': {
      title: 'Kharch Log Features: UPI SMS Capture, Google Sheets, Credits',
      description: 'All Kharch Log features: UPI and bank SMS auto-capture, Needs review inbox, Google Sheets sync, voice entry, insights, Credits and shareable receipts.',
      priority: 0.9,
      changefreq: 'monthly',
    },
    '/features/sms-auto-capture/': {
      title: 'SMS Expense Tracker: Auto-Capture UPI & Bank SMS | Kharch Log',
      description:
        'Track expenses automatically from bank and UPI SMS on Android. PhonePe, Google Pay and Paytm payments logged in seconds to your Google Sheet. No bank login.',
      priority: 0.9,
    },
    '/features/review-inbox/': {
      title: 'Needs Review Inbox for Bank SMS Expenses | Kharch Log',
      description:
        "Unclear bank and UPI SMS wait in Kharch Log's Needs review inbox. Approve, edit or reject before they count, so your expense tracker stays accurate.",
      priority: 0.8,
    },
    '/features/google-sheets-sync/': {
      title: 'Google Sheets Expense Tracker Sync | Kharch Log',
      description: 'Every Kharch Log entry becomes a row in your own Google Sheet, with a tab for every month. No bank login, lifetime ₹149.',
      priority: 0.8,
    },
    '/features/manual-voice-entry/': {
      title: 'Manual & Voice Expense Entry | Kharch Log',
      description: 'Add cash and non-SMS spends by tap or voice. Amount, category, payee and notes in one screen.',
      priority: 0.8,
    },
    '/features/reports-insights/': {
      title: 'Spending Reports & Insights | Kharch Log',
      description: 'See expenses and income by category for any week, month or date range in Kharch Log.',
      priority: 0.8,
    },
    '/features/share-invoice/': {
      title: 'Share Payment Receipt & PDF Bill with UPI QR | Kharch Log',
      description:
        'Share any UPI payment as a clean receipt on WhatsApp, or save a PDF bill with your name, UPI ID and a QR to pay. Built into Kharch Log for Android.',
      priority: 0.8,
    },
    '/features/credits/': {
      title: 'Money Lending Tracker: Track Money Lent & Borrowed | Kharch Log',
      description:
        'Track money you lent or borrowed: amount given, money back, still due and due dates, with reminders, WhatsApp nudges and a PDF bill with UPI QR.',
      priority: 0.8,
    },
    '/pricing/': {
      title: 'Pricing - ₹149 lifetime',
      description: 'Kharch Log lifetime unlock ₹149. No subscription. Prices in INR for India.',
      priority: 0.8,
    },
    '/blog/': {
      title: 'Blog - expense tracking tips for India',
      description: 'Guides on UPI tracking, SMS expense capture, weekly reviews, and lifetime vs subscription apps.',
      priority: 0.9,
      changefreq: 'weekly',
    },
    '/faq/': {
      title: 'FAQ - Kharch Log',
      description: 'Common questions about SMS permissions, Google Sheets, pricing, and privacy.',
      priority: 0.8,
      schemaType: 'FAQPage',
    },
    '/play/': {
      title: 'Get Kharch Log on Google Play',
      description: 'Kharch Log is live on Google Play. Install it from the Play Store.',
      noindex: true,
    },
    '/install/': {
      title: 'Install Kharch Log APK',
      description: 'Download and install the Kharch Log Android APK safely - signed releases from kharchlog.com.',
      priority: 0.9,
    },
    '/glossary/': {
      title: 'Glossary - expense tracking terms',
      description: 'Short definitions for UPI expense tracking, bank SMS, daily kharch, and related terms.',
      priority: 0.7,
    },
    '/about/': {
      title: 'About Kharch Log',
      description: 'Kharch Log is an Android expense tracker by Easy Peeze Tools - SMS + Sheets, built for India.',
      priority: 0.7,
    },
    '/contact/': {
      title: 'Contact Kharch Log',
      description: 'Support for Kharch Log - email support@easypeeze.com.',
      priority: 0.5,
      changefreq: 'yearly',
    },
    '/pay/': {
      noindex: true,
      sitemap: false,
    },
  },
};
