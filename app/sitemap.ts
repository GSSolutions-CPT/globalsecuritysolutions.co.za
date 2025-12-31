import { MetadataRoute } from 'next'
import seoData from '@/app/data/seoData.json'
import locationData from '@/app/data/locationData.json'

const BASE_URL = 'https://globalsecuritysolutions.co.za'

const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export default function sitemap(): MetadataRoute.Sitemap {
    // Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/blog',
        '/faq',
        '/projects',
        '/free-security-audit',
        '/load-shedding-security-solutions',
        '/warranty-and-support',
        '/services',
        '/sectors',
        '/ai-security-advisor',
        '/areas',
        '/privacy-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic Services
    const services = seoData.primaryServicePages.map((service) => ({
        url: `${BASE_URL}/services/${toSlug(service.page)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic Sectors
    const sectors = seoData.sectorSolutions.map((service) => ({
        url: `${BASE_URL}/sectors/${toSlug(service.page)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic Areas
    const areas = locationData.map((location) => ({
        url: `${BASE_URL}/areas/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...services, ...sectors, ...areas]
}
