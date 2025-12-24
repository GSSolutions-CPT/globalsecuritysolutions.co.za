import blogData from '@/app/data/blogData.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { Metadata } from 'next'
import { supabase } from '@/utils/supabase/client'

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
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            {/* Header */}
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title, href: '#' }]} />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center justify-between border-b border-slate-200 pb-8 mb-8">
                    <div className="flex items-center text-slate-500">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-3">•</span>
                        <span>Global Security Solutions</span>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                        <Share2 className="w-5 h-5 mr-2" /> Share
                    </button>
                </div>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-lg max-w-none text-slate-700 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                    {post.content.map((block: any, index: number) => {
                        if (block.type === 'heading') {
                            return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{block.text}</h2>
                        }
                        if (block.type === 'list') {
                            return (
                                <ul key={index} className="list-disc pl-5 space-y-2 mb-6">
                                    {/* @ts-ignore - simplistic type check for example */}
                                    {block.items?.map((item: string, i: number) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )
                        }
                        // Default to paragraph
                        return <p key={index} className="mb-6 leading-relaxed">{block.text}</p>
                    })}
                </article>

                {/* Call to Action */}
                <div className="mt-12 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Need help with your security?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        We can implement the advice in this article for you. Get a free assessment today.
                    </p>
                    <Link href="/contact" className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors">
                        Get a Free Quote &rarr;
                    </Link>
                </div>
            </div>
        </div>
    )
}
