import type { Metadata } from 'next'
import Link from 'next/link'
import blogData from '@/app/data/blogData.json'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Security Blog | Global Security Solutions',
    description: 'Read the latest news and tips on home and business security in Cape Town.',
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">Security Insights</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    Expert advice, industry news, and practical tips to keep your property safe.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogData.map(post => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="h-48 bg-slate-200 relative overflow-hidden">
                                <img
                                    src={post.coverImage || '/blog/placeholder.jpg'}
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
