import blogData from '@/app/data/blogData.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, BookOpen } from 'lucide-react'
import { ShareButton } from '@/components/ShareButton'
import { ScrollProgress } from '@/components/ScrollProgress'
// import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { supabase } from '@/utils/supabase/client'
import Image from "next/image"

// Helper to find post
const getPost = async (slug: string) => {
    // 1. Try Supabase
    const { data: dbPost } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (dbPost) {
        return {
            title: dbPost.title,
            slug: dbPost.slug,
            date: new Date(dbPost.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: dbPost.excerpt,
            coverImage: dbPost.cover_image_url,
            content: dbPost.content // Assuming JSON/Array structure match
        }
    }

    // 2. Fallback to Local
    return blogData.find(p => p.slug === slug)
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params
    const post = await getPost(params.slug)
    if (!post) return {}

    return {
        title: `${post.title} | Security Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            images: post.coverImage ? [post.coverImage] : []
        }
    }
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans">
            <ScrollProgress />

            {/* Minimal Header */}
            <div className="bg-slate-900 text-white pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-white mb-6 text-sm font-semibold uppercase tracking-wide transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
                    <div className="flex items-center text-slate-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{post.date}</span>
                        <span className="mx-3">•</span>
                        <span>Global Security Solutions</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10">
                {/* Cover Image */}
                {post.coverImage && (
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-white/20 relative aspect-video bg-slate-200 mb-10">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content Container */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8 text-sm">
                        <div className="flex gap-4">
                            <span className="hidden md:inline text-slate-400">Published in Security Tips</span>
                        </div>
                        <div className="flex gap-2">
                            <ShareButton title={post.title} />
                        </div>
                    </div>

                    <article className="prose prose-lg prose-slate max-w-none text-slate-700 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 prose-img:rounded-xl">
                        {post.content.map((block: { type: string, text?: string, items?: string[] }, index: number) => {
                            if (block.type === 'heading') {
                                return <h2 key={index} className="flex items-center mt-10 mb-4 text-2xl"><BookOpen className="w-6 h-6 mr-3 text-blue-500" />{block.text}</h2>
                            }
                            if (block.type === 'list') {
                                return (
                                    <ul key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 list-none space-y-3 mb-6 my-6">
                                        {block.items?.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                            // Default to paragraph
                            return <p key={index} className="mb-6 leading-relaxed">{block.text}</p>
                        })}
                    </article>

                    {/* Call to Action */}
                    <div className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <h3 className="text-2xl font-bold mb-4 relative z-10">Need help with your security?</h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                            We can implement the advice in this article for you. Our technical teams operate across the Western Cape.
                        </p>
                        <Link href="/contact" className="inline-flex relative z-10 bg-white text-blue-600 font-bold py-4 px-8 rounded-full hover:bg-blue-50 transition-all shadow-lg hover:translate-y-[-2px]">
                            Get a Local Quote &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
