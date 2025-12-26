import Link from 'next/link'
import { Calendar, ArrowRight, User, ArrowLeft, BookOpen, Clock } from 'lucide-react'
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
        <div className="bg-slate-50 min-h-screen font-sans">

            {/* Premium Hero Section */}
            <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm mx-auto">
                        <BookOpen className="w-4 h-4" />
                        <span>Security Knowledge Hub</span>
                    </div>

                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
                        data-aos="fade-up"
                        suppressHydrationWarning
                    >
                        Insights & News
                    </h1>
                    <p
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        suppressHydrationWarning
                    >
                        Expert advice, crime trend updates, and practical tips to keep your Cape Town property safe and secure.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-30 pb-24">
                {posts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Yet</h3>
                        <p className="text-slate-500">Check back soon for the latest insights.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: BlogPost, i: number) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug || '#'}`}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            suppressHydrationWarning
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full border border-slate-100"
                        >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                {post.featured_image ? (
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <BookOpen className="w-12 h-12 opacity-50" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center text-xs font-semibold text-blue-600 mb-4 uppercase tracking-wider space-x-3">
                                    <span className="flex items-center text-slate-500"><Calendar className="w-3 h-3 mr-1" /> {new Date(post.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    {post.author && <span className="flex items-center text-slate-500 border-l border-slate-200 pl-3"><User className="w-3 h-3 mr-1" /> {post.author}</span>}
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">{post.title}</h2>
                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">{post.excerpt || 'Read the full article for more insights on security solutions.'}</p>
                                <span className="mt-auto text-slate-900 font-bold text-sm flex items-center transition-all group-hover:text-blue-600">
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
