import Link from 'next/link'
import blogData from '@/app/data/blogData.json'
import { Calendar, ArrowRight } from 'lucide-react'
import { supabase } from '@/utils/supabase/client'

export const metadata = {
    title: 'Security Blog | Global Security Solutions',
    description: 'Read the latest news and tips on home and business security in Cape Town.',
}

export const revalidate = 60

async function getPosts() {
    // 1. Fetch from Supabase
    const { data: dbPosts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    // 2. Format DB posts to match schema
    const formattedDbPosts = (dbPosts || []).map((p: any) => ({
        slug: p.slug,
        title: p.title,
        date: new Date(p.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }),
        excerpt: p.excerpt,
        coverImage: p.cover_image_url || '/blog/placeholder.jpg',
        content: p.content // Passed through but not used in index
    }))

    // 3. Merge with local data (DB posts first)
    // Filter out duplicates if any slugs collide
    const existingSlugs = new Set(formattedDbPosts.map((p: any) => p.slug))
    const uniqueLocalPosts = blogData.filter(p => !existingSlugs.has(p.slug))

    return [...formattedDbPosts, ...uniqueLocalPosts]
}

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">Security Insights</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    Expert advice, industry news, and practical tips to keep your property safe.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="h-48 bg-slate-200 relative overflow-hidden">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-4">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Article</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center text-slate-400 text-sm mb-3">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {post.date}
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <span className="text-blue-600 font-bold text-sm flex items-center group-hover:underline">
                                    Read Full Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
