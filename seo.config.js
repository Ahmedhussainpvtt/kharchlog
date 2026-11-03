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
      '',
      'Sitemap: https://kharchlog.com/sitemap.xml',
      '',
    ].join('\n'),
  },

  excludeFromSitemap: ['/pay/', '/404.html'],
  skipPaths: ['/lost/'],

  defaults: {
    changefreq: 'monthly',
    priority: 0.5,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },

  pages: {
    '/': {
      title:
        'Kharch Log - UPI & SMS Expense Tracker App for Android India | Google Sheets | ₹149 Lifetime',
      description:
        'Expense tracker for India that logs every UPI and bank SMS in seconds into your own Google Sheet. PhonePe, GPay, Paytm and cash. No bank login, no ads. ₹149 lifetime.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      changefreq: 'weekly',
      priority: 1.0,
      schemaType: 'WebSite',
    },
    '/features/': {
      title: 'Kharch Log Features: UPI SMS Capture, Google Sheets, Credits',
      description: 'All Kharch Log features: UPI and bank SMS auto-capture, Needs review inbox, Google Sheets sync, voice entry, insights, Credits and shareable receipts.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.9,
      changefreq: 'monthly',
    },
    '/features/sms-auto-capture/': {
      title: 'SMS Expense Tracker: Auto-Capture UPI & Bank SMS | Kharch Log',
      description: 'Track expenses automatically from bank and UPI SMS on Android. PhonePe, Google Pay and Paytm payments logged in seconds to your Google Sheet. No bank login.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.8,
    },
    '/features/review-inbox/': {
      title: 'Needs Review Inbox for Bank SMS Expenses | Kharch Log',
      description: "Unclear bank and UPI SMS wait in Kharch Log's Needs review inbox. Approve, edit or reject before they count, so your expense tracker stays accurate.",
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.7,
    },
    '/features/google-sheets-sync/': {
      title: 'Expense Tracker Google Sheets Sync from Android | Kharch Log',
      description: 'An expense tracker in Google Sheets that fills itself. Kharch Log logs UPI SMS, cash and voice entries from Android into a sheet in your own Drive.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.8,
    },
    '/features/manual-voice-entry/': {
      title: 'Manual & Voice Expense Entry App for Android | Kharch Log',
      description: 'Add cash and any expense in seconds by tap or by voice. Kharch Log saves amount, category, payment mode and payee to your own Google Sheet.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.7,
    },
    '/features/reports-insights/': {
      title: 'Spending Reports & Expense Insights by Category | Kharch Log',
      description: 'See where your money went: balance, income and expenses by month, week or year, and spend by category for any date range. Free of spreadsheet work.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.7,
    },
    '/features/share-invoice/': {
      title: 'Share Payment Receipt & PDF Bill with UPI QR | Kharch Log',
      description: 'Share any UPI payment as a clean receipt on WhatsApp, or save a PDF bill with your name, UPI ID and a QR to pay. Built into Kharch Log for Android.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
      priority: 0.7,
    },
    '/features/credits/': {
      title: 'Money Lending Tracker: Track Money Lent & Borrowed | Kharch Log',
      description: 'Track money you lent or borrowed: amount given, money back, still due and due dates, with reminders, WhatsApp nudges and a PDF bill with UPI QR.',
      ogImage: 'https://kharchlog.com/images/app/kl-og-1200.jpg',
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
