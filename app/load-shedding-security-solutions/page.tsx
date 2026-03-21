import dynamic from 'next/dynamic'
import React from 'react'
import { Metadata } from 'next'
import { Battery, Zap, Sun, AlertTriangle, CheckCircle2, Power } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

import seoData from '@/app/data/seoData.json'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Load Shedding Security Solutions")

export const metadata: Metadata = {
    title: pageData?.title || 'Load Shedding Security | Battery Backups Cape Town',
    description: pageData?.description || 'Keep your security running during power outages.',
}

export default function LoadSheddingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-navy text-white selection:bg-brand-electric selection:text-brand-navy">

            <PageHero
                align="center"
                badgeIcon={<Zap className="w-4 h-4 text-brand-navy" />}
                badgeText="Power Intelligence"
                title="Security That Never Sleeps"
                subtitle="Load shedding is a reality. A security system that turns off when the lights go out is just a decoration. We keep you protected 24/7."
                bgImage="/page-heroes/load-shedding-hero.png"
                pbClass="pb-[220px]"
            />

            {/* Main Content Area */}
            <div className="relative z-30 -mt-32 pb-24">
                <div className="container mx-auto px-4">

                    {/* Solution Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        <div className="bg-brand-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-white/10 text-center hover:-translate-y-2 transition-transform duration-300 ring-1 ring-brand-white/5 group hover:border-yellow-400/30">
                            <div className="bg-yellow-400/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-yellow-400/20 transition-colors duration-300 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                                <Battery className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-white mb-4">Lithium Backup</h3>
                            <p className="text-brand-steel leading-relaxed font-light">
                                Swap out old lead-acid batteries for advanced LiFePO4 cells. They charge 5x faster, last 10x longer, and completely resist frequent cycling degradation.
                            </p>
                        </div>

                        <div className="bg-brand-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-white/10 text-center hover:-translate-y-2 transition-transform duration-300 ring-1 ring-brand-white/5 group hover:border-orange-400/30">
                            <div className="bg-orange-400/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-400/20 transition-colors duration-300 shadow-[0_0_15px_rgba(251,146,60,0.1)]">
                                <Sun className="w-10 h-10 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-white mb-4">Solar Integration</h3>
                            <p className="text-brand-steel leading-relaxed font-light">
                                Take your high-drain electric fences and gate motors off the grid entirely. Dedicated solar matrices ensure your perimeter is active during Stage 8.
                            </p>
                        </div>

                        <div className="bg-brand-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-white/10 text-center hover:-translate-y-2 transition-transform duration-300 ring-1 ring-brand-white/5 group hover:border-brand-electric/30">
                            <div className="bg-brand-electric/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-electric/20 transition-colors duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                                <Power className="w-10 h-10 text-brand-electric drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
                            </div>
                            <h3 className="text-2xl font-bold text-brand-white mb-4">Smart Management</h3>
                            <p className="text-brand-steel leading-relaxed font-light">
                                We algorithmically integrate with your inverter to prioritize core security loads, ensuring perimeter cameras stay rendering while non-essentials gracefully drop.
                            </p>
                        </div>
                    </div>

                    {/* Educational Section & CTA */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold uppercase tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                <span>The Risk Factor</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-brand-white tracking-tight leading-tight">
                                Why Standard Security <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 filter drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">Fatally Fails</span>
                            </h2>
                            <p className="text-xl text-brand-steel/90 font-light leading-relaxed">
                                Most commercial alarm systems deploy with basic lead-acid batteries designated strictly for occasional outages.
                                With daily shedding cycles, these batteries suffer deep sulfation and fail completely within months, leaving you exposed.
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-start gap-6 p-6 bg-brand-white/5 backdrop-blur-md rounded-2xl border border-brand-white/10 shadow-sm group hover:border-brand-electric/30 transition-colors">
                                    <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-white text-xl mb-2">The LiFePO4 Guarantee</h4>
                                        <p className="text-brand-steel font-light leading-relaxed">Our upgrades rely exclusively on premium Lithium arrays capable of thousands of deep cycles, fully recharging in under 120 minutes.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 p-6 bg-brand-white/5 backdrop-blur-md rounded-2xl border border-brand-white/10 shadow-sm group hover:border-brand-electric/30 transition-colors">
                                    <div className="bg-green-500/20 p-3 rounded-xl flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-white text-xl mb-2">Gate Motor Preservation</h4>
                                        <p className="text-brand-steel font-light leading-relaxed">Low voltage violently damages motors. We inject rapid voltage stabilizers and isolated backups to prevent immediate motor burnout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dark CTA Form */}
                        <div className="bg-brand-navy p-8 md:p-12 rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden relative border border-brand-white/10 ring-1 ring-white/5">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-electric/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-6 text-brand-white tracking-tight">Initialize Power Upgrade</h3>
                                <p className="text-brand-steel text-lg font-light mb-10 leading-relaxed">
                                    Get an exact quote for a load-shedding resilient infrastructure upgrade. From critical battery hot-swaps to high-density solar integration.
                                </p>
                                <div className="bg-brand-navy/80 p-6 md:p-8 rounded-[2rem] backdrop-blur-md border border-brand-white/10 shadow-inner">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
