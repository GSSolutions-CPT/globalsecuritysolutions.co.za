"use client"

import { useState } from 'react'
import { Plus, Minus, Search, MessageCircle, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import faqData from '@/app/data/faqData.json'

// Note: Revalidating purely static JSON data isn't necessary unless using fetch, but safe to leave or remove.
// For client component, we rely on import.

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("General")
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const categories = faqData.map(c => c.category)

    // Filter questions based on category AND search
    const activeData = faqData.find(c => c.category === activeCategory)

    // If searching, search EVERYTHING. If not, show active category.
    let displayQuestions = activeData?.questions || []
    let isSearchMode = false

    if (searchQuery.length > 2) {
        isSearchMode = true
        displayQuestions = faqData.flatMap(cat =>
            cat.questions
                .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(q => ({ ...q, categoryName: cat.category })) // Attach category for context
        )
    }

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="bg-slate-50 min-h-screen font-sans pb-20">

            {/* Premium Hero */}
            <section className="relative bg-slate-950 text-white py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm mx-auto">
                        <HelpCircle className="w-4 h-4" />
                        <span>Support Center</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        How can we help?
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                        Find answers to common questions about our security installations, warranties, and services.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 overflow-hidden p-2 focus-within:bg-white/20 focus-within:border-white/30 transition-all">
                            <Search className="w-5 h-5 text-slate-400 ml-4" />
                            <input
                                type="text"
                                placeholder="Search e.g. 'Battery life' or 'Load shedding'"
                                className="w-full bg-transparent text-white placeholder-slate-400 px-4 py-3 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10 relative z-30">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Desktop Sidebar / Mobile Horizontal Scroll */}
                    <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2 hidden lg:block">Categories</h3>
                            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-hide">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => { setActiveCategory(cat); setSearchQuery(""); setOpenIndex(null); }}
                                        className={`flex items-center whitespace-nowrap px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${activeCategory === cat && !searchQuery
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'text-slate-600 hover:bg-slate-50'
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
                        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[500px]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {isSearchMode ? `Search Results for "${searchQuery}"` : activeCategory}
                                </h2>
                                {!isSearchMode && <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{displayQuestions.length} Questions</span>}
                            </div>

                            {displayQuestions.length === 0 ? (
                                <div className="text-center py-20 text-slate-500">
                                    <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p>No questions found.</p>
                                    <button onClick={() => setSearchQuery("")} className="text-blue-600 font-bold mt-2 hover:underline">Clear Search</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {displayQuestions.map((item: any, i) => (
                                        <div
                                            key={i}
                                            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === i ? 'border-blue-200 bg-blue-50/30' : 'border-slate-100 hover:border-blue-100'}`}
                                        >
                                            <button
                                                onClick={() => toggleAccordion(i)}
                                                className="w-full flex items-center justify-between p-6 text-left"
                                            >
                                                <div className="pr-4">
                                                    {isSearchMode && <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 block">{item.categoryName}</span>}
                                                    <h3 className={`text-lg font-bold transition-colors ${openIndex === i ? 'text-blue-600' : 'text-slate-900'}`}>{item.q}</h3>
                                                </div>
                                                <div className={`p-2 rounded-full transition-colors flex-shrink-0 ${openIndex === i ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                </div>
                                            </button>
                                            <div
                                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-blue-100/50 mt-2">
                                                        {item.a}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Still stuck? CTA */}
                        <div className="mt-8 bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-xl">
                            <div className="flex items-center mb-6 md:mb-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Still need help?</h3>
                                    <p className="text-slate-400">Can&apos;t find the answer you&apos;re looking for? Chat to our team.</p>
                                </div>
                            </div>
                            <Link href="/contact" className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
