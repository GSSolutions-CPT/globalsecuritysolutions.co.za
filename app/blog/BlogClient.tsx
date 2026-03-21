"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { Calendar, ArrowRight, User, BookOpen } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

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

interface BlogClientProps {
    posts: BlogPost[]
    categories: string[]
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredPosts = activeCategory === "All"
        ? posts
        : posts.filter(p => (p.category || "General") === activeCategory)

    return (
        <div className="bg-brand-white min-h-screen font-sans">
            {/* Premium Hero Section */}
            <PageHero
                align="center"
                title="Insights & News"
                subtitle="Expert advice, crime trend updates, and practical tips to keep your Cape Town property safe and secure."
                bgImage="/page-heroes/blog-hero.png"
                badgeIcon={<BookOpen className="w-4 h-4" />}
                badgeText="Security Knowledge Hub"
                pbClass="pb-64"
            />

            <div className="container mx-auto px-4 -mt-40 relative z-30 pb-16">
                {/* Category Filter Moved Here */}
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-16 bg-brand-navy/80 p-4 rounded-3xl backdrop-blur-md border border-brand-white/10 shadow-2xl">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-500 ${activeCategory === cat
                                ? 'bg-brand-electric text-brand-navy shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-105 ring-1 ring-brand-electric'
                                : 'bg-brand-navy text-brand-steel/70 hover:bg-brand-white/5 hover:text-brand-white border border-brand-steel/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-[2.5rem] shadow-sm border border-brand-steel/20">
                        <div className="w-16 h-16 bg-brand-steel/20 text-brand-steel rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-navy mb-2">No Articles Found</h3>
                        <p className="text-brand-steel">Try selecting a different category.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post: BlogPost, i: number) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug || '#'}`}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="bg-brand-navy rounded-[2rem] overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full border border-brand-white/5 ring-1 ring-brand-white/5"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-navy">
                                {post.featured_image ? (
                                    <Image
                                        src={post.featured_image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-brand-steel border-b border-brand-white/10">
                                        <BookOpen className="w-12 h-12 opacity-20" />
                                    </div>
                                )}

                                {post.category && (
                                    <div className="absolute top-4 left-4 bg-brand-electric/20 backdrop-blur-md border border-brand-electric/50 text-brand-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider z-10 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                                        {post.category}
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent opacity-80 transition-opacity duration-300 pointer-events-none" />
                            </div>

                            <div className="p-8 flex flex-col flex-grow bg-brand-navy relative">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-steel/20 to-transparent"></div>
                                <div className="flex items-center text-xs font-bold text-brand-electric mb-4 uppercase tracking-wider space-x-3 drop-shadow-[0_0_5px_rgba(0,229,255,0.3)]">
                                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(post.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    {post.author && <span className="flex items-center border-l border-brand-electric/30 pl-3"><User className="w-3 h-3 mr-1" /> {post.author}</span>}
                                </div>
                                <h2 className="text-xl font-black text-brand-white mb-4 group-hover:text-brand-electric transition-colors line-clamp-2 leading-tight tracking-tight drop-shadow-sm">{post.title}</h2>
                                <p className="text-brand-steel text-sm leading-relaxed line-clamp-3 mb-8 flex-grow font-light">{post.excerpt || 'Read the full article for more insights on security solutions.'}</p>
                                <span className="mt-auto text-brand-white font-bold text-sm flex items-center transition-all group-hover:text-brand-electric">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
