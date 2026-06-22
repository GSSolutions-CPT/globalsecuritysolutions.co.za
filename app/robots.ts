import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/portal/',
          '/api/',
          '/_next/static/',
        ],
      },
    ],
    sitemap: 'https://globalsecuritysolutions.co.za/sitemap.xml',
  }
}
