import blogData from '@/app/data/blogData.json'
import { supabase } from '@/utils/supabase/client'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security Blog | Global Security Solutions',
    description: 'Read the latest news and tips on home and business security in Cape Town.',
}

export const revalidate = 0

interface BlogPost {
    id: string
    slug: string
    title: string
    created_at: string
    excerpt: string | null
    featured_image: string | null
    author: string | null
    category?: string
}

import BlogClient from './BlogClient'

export default async function BlogIndexPage() {
    // 1. Fetch from Supabase
    const { data: dbPosts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    // 2. Format DB posts to match schema
    const formattedDbPosts: BlogPost[] = (dbPosts || []).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        created_at: p.created_at,
        excerpt: p.excerpt,
        featured_image: p.cover_image_url || null,
        author: p.author
    }))

    // 3. Merge with Local Data (Priority to Supabase, but include Local)
    const localPosts: BlogPost[] = blogData.map(p => ({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        created_at: new Date(p.date).toISOString(),
        excerpt: p.excerpt,
        featured_image: p.coverImage || null,
        author: p.author || 'Global Security Team',
        category: p.category || "General"
    }))

    // Combine and sort by date descending
    const posts = [...formattedDbPosts, ...localPosts].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    // 4. Extract unique categories
    const categories = ["All", ...Array.from(new Set(posts.map(p => p.category || "General")))]

    return (
        <BlogClient posts={posts} categories={categories} />
    )
}
