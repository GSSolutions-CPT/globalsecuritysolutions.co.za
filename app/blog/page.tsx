import Link from 'next/link'
import { Calendar, ArrowRight, User } from 'lucide-react'
import { supabase } from '@/utils/supabase/client'
import Image from "next/image";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security Blog | Global Security Solutions',
    description: 'Read the latest news and tips on home and business security in Cape Town.',
}

export const revalidate = 60

interface BlogPost {
    id: string
    slug: string
    title: string
    created_at: string
    excerpt: string | null
    featured_image: string | null
    author: string | null
}

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

    const posts = formattedDbPosts

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-slate-900 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Security Insights & News</h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto text-balance">
                        Expert advice, industry updates, and tips to keep your property safe.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                {posts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-[2.5rem] shadow-sm">
                        <p className="text-slate-500">No articles available at the moment. Check back soon!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post: BlogPost, i: number) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug || '#'}`}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full border border-slate-50 relative"
                        >
                            {/* Dog Ear Accent on top of image? Maybe just a corner badge */}
                            <div className="absolute top-0 left-0 w-20 h-20 bg-blue-600 rounded-br-[3.5rem] z-20 shadow-lg -translate-x-2 -translate-y-2" />
                            <div className="absolute top-5 left-5 z-30 text-white font-bold text-xs uppercase tracking-wider">News</div>

                            <div className="relative aspect-video w-full overflow-hidden">
                                {post.featured_image ? (
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/0 transition-colors" />
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center text-sm text-slate-500 mb-4 space-x-4">
                                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-blue-500" /> {new Date(post.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span className="flex items-center"><User className="w-4 h-4 mr-1 text-blue-500" /> {post.author || 'Admin'}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                                <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed flex-grow">{post.excerpt || 'Read the full article for more insights on security solutions.'}</p>
                                <span className="mt-auto text-blue-600 font-bold text-sm flex items-center transition-all">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
