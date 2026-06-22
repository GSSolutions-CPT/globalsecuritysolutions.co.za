import { MetadataRoute } from 'next'
import seoData from '@/app/data/seoData.json'
import locationData from '@/app/data/locationData.json'
import blogData from '@/app/data/blogData.json'
import { supabase } from '@/utils/supabase/client'

const BASE_URL = 'https://globalsecuritysolutions.co.za'

const toSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static Routes (ordered by importance)
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}`,                                   lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
        { url: `${BASE_URL}/services`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${BASE_URL}/contact`,                           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${BASE_URL}/free-security-audit`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${BASE_URL}/about`,                             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/blog`,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/faq`,                               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/projects`,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/brands-we-install`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/areas`,                             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/sectors`,                           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/ai-security-advisor`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
        { url: `${BASE_URL}/load-shedding-security-solutions`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/warranty-and-support`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/privacy-policy`,                    lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
        { url: `${BASE_URL}/terms-of-service`,                  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.4 },
        { url: `${BASE_URL}/links`,                             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ]

    // Dynamic Service Pages
    const services: MetadataRoute.Sitemap = seoData.primaryServicePages.map((service) => ({
        url: `${BASE_URL}/services/${toSlug(service.page)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }))

    // Dynamic Sector Pages
    const sectors: MetadataRoute.Sitemap = seoData.sectorSolutions.map((sector) => ({
        url: `${BASE_URL}/sectors/${toSlug(sector.page)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    // Dynamic Area Pages
    const areas: MetadataRoute.Sitemap = locationData.map((location) => ({
        url: `${BASE_URL}/areas/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    // Dynamic Blog Posts
    const blogPosts: MetadataRoute.Sitemap = blogData.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    // Dynamic Projects from Supabase
    let projectRoutes: MetadataRoute.Sitemap = []
    try {
        const { data: projects } = await supabase
            .from('projects')
            .select('slug, created_at')

        projectRoutes = projects?.map((project) => ({
            url: `${BASE_URL}/projects/${project.slug}`,
            lastModified: new Date(project.created_at),
            changeFrequency: 'weekly',
            priority: 0.8,
        })) || []
    } catch {
        projectRoutes = []
    }

    return [...staticRoutes, ...services, ...sectors, ...areas, ...blogPosts, ...projectRoutes]
}
