import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/_next/image/'],
      disallow: [
        '/private/',
        '/admin/',
        '/portal/',
        '/_next/static/',
      ],
    },
    sitemap: 'https://globalsecuritysolutions.co.za/sitemap.xml',
  }
}
