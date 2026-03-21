"use client"

import { useState } from 'react'
import { Plus, Minus, Search, MessageCircle, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import faqData from '@/app/data/faqData.json'
import { PageHero } from '@/components/PageHero'

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("General")
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const categories = Array.from(new Set(faqData.map(c => c.category)))

    const activeData = faqData.find(c => c.category === activeCategory)
    let displayQuestions = activeData?.questions || []
    let isSearchMode = false

    if (searchQuery.length > 2) {
        isSearchMode = true
        displayQuestions = faqData.flatMap(cat =>
            cat.questions
                .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(q => ({ ...q, categoryName: cat.category }))
        )
    }

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="bg-brand-white min-h-screen font-sans pb-8">
            <PageHero
                align="center"
                badgeIcon={<HelpCircle className="w-4 h-4" />}
                badgeText="Support Center"
                title="How can we help?"
                subtitle="Find answers to common questions about our security installations, warranties, and services."
                bgImage="/page-heroes/faq-hero.png"
                pbClass="pb-[220px]"
            />

            <div className="container mx-auto px-4 -mt-40 relative z-30">
                {/* Search Bar Floating Over Hero */}
                <div className="max-w-2xl mx-auto relative group mb-16">
                    <div className="absolute inset-0 bg-brand-electric/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center bg-brand-navy/60 backdrop-blur-2xl rounded-full border border-brand-white/20 overflow-hidden p-2 focus-within:bg-brand-navy/80 focus-within:border-brand-electric/50 transition-all shadow-xl ring-1 ring-brand-white/5">
                        <Search className="w-6 h-6 text-brand-electric ml-6 drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]" />
                        <input
                            type="text"
                            placeholder="Search e.g. 'Battery life' or 'Load shedding'"
                            className="w-full bg-transparent text-brand-white placeholder-brand-steel/60 px-6 py-4 outline-none text-lg font-light"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

            <div className="container mx-auto px-4 -mt-10 relative z-30">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Desktop Sidebar / Mobile Horizontal Scroll */}
                    <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-brand-steel/20 overflow-hidden">
                            <h3 className="text-xs font-bold text-brand-steel uppercase tracking-widest mb-4 px-2 hidden lg:block">Categories</h3>
                            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-hide">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => { setActiveCategory(cat); setSearchQuery(""); setOpenIndex(null); }}
                                        className={`flex items-center whitespace-nowrap px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${activeCategory === cat && !searchQuery
                                            ? 'bg-brand-electric text-white shadow-md'
                                            : 'text-brand-slate hover:bg-brand-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4">
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-brand-steel/20 min-h-[500px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-brand-navy">
                                    {isSearchMode ? `Search Results for "${searchQuery}"` : activeCategory}
                                </h2>
                                {!isSearchMode && <span className="text-sm text-brand-steel bg-brand-steel/20 px-3 py-1 rounded-full">{displayQuestions.length} Questions</span>}
                            </div>

                            {displayQuestions.length === 0 ? (
                                <div className="text-center py-16 text-brand-steel bg-brand-navy/5 rounded-[2rem] border border-brand-steel/10">
                                    <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
                                    <p className="text-xl font-light">No corresponding questions found.</p>
                                    <button onClick={() => setSearchQuery("")} className="text-brand-electric font-bold mt-4 hover:underline">Clear Active Search</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {displayQuestions.map((item: { q: string; a: string; categoryName?: string }, i) => (
                                        <div
                                            key={i}
                                            className={`border rounded-2xl transition-all duration-300 overflow-hidden bg-white ${openIndex === i ? 'border-brand-electric/40 shadow-[0_5px_30px_rgba(0,229,255,0.05)]' : 'border-brand-steel/20 hover:border-brand-electric/20 hover:shadow-md'}`}
                                        >
                                            <button
                                                onClick={() => toggleAccordion(i)}
                                                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                                            >
                                                <div className="pr-6">
                                                    {isSearchMode && <span className="text-xs text-brand-electric font-bold uppercase tracking-widest mb-2 block bg-brand-electric/10 inline-block px-3 py-1 rounded-full">{item.categoryName}</span>}
                                                    <h3 className={`text-xl font-bold transition-colors leading-tight ${openIndex === i ? 'text-brand-electric' : 'text-brand-navy group-hover:text-brand-electric'}`}>{item.q}</h3>
                                                </div>
                                                <div className={`p-3 rounded-full transition-all flex-shrink-0 ${openIndex === i ? 'bg-brand-electric text-brand-navy transform rotate-180 shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-brand-steel/10 text-brand-steel group-hover:bg-brand-electric/20 group-hover:text-brand-electric'}`}>
                                                    {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                </div>
                                            </button>
                                            
                                            <AnimatePresence>
                                                {openIndex === i && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <div className="px-6 md:px-8 pb-8 pt-2 text-brand-slate text-lg font-light leading-relaxed border-t border-brand-steel/10 mt-2 bg-brand-white/50">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Still stuck? CTA */}
                        <div className="mt-8 bg-brand-navy rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-xl">
                            <div className="flex items-center mb-6 md:mb-0">
                                <div className="w-12 h-12 bg-brand-electric rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Still need help?</h3>
                                    <p className="text-brand-steel">Can&apos;t find the answer you&apos;re looking for? Chat to our team.</p>
                                </div>
                            </div>
                            <Link href="/contact" className="bg-white text-brand-navy px-6 py-3 rounded-full font-bold hover:bg-brand-electric/10 transition-colors whitespace-nowrap">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
