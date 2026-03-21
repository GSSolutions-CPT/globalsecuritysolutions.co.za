import dynamic from 'next/dynamic'
import React from 'react'
import { Metadata } from 'next'
import { ShieldCheck, Wrench, PhoneCall } from 'lucide-react'
import { PageHero } from '@/components/PageHero'

import seoData from '@/app/data/seoData.json'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Warranty and Support")

export const metadata: Metadata = {
    title: pageData?.title || 'Warranty and Support | Global Security Solutions',
    description: pageData?.description || 'Learn about our installation warranties and after-sales support.',
}

export default function WarrantyPage() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-navy selection:bg-brand-electric selection:text-brand-navy">
            <PageHero
                align="center"
                badgeIcon={<ShieldCheck className="w-4 h-4" />}
                badgeText="Guaranteed Protection"
                title="Warranty & Support"
                subtitle="Our commitment to your security doesn't end after installation. Explore our comprehensive cover and maintenance tiers."
                bgImage="/page-heroes/faq-hero.png" // using existing generic hero image
                pbClass="pb-[200px]"
            />

            <div className="container mx-auto px-4 -mt-32 relative z-30 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-brand-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-white/10 text-center hover:-translate-y-2 transition-transform duration-300 ring-1 ring-brand-white/5 group hover:border-brand-electric/30">
                        <div className="bg-brand-electric/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-electric/20 transition-colors duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                            <ShieldCheck className="w-10 h-10 text-brand-electric" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-white mb-4">1-Year Installation Warranty</h3>
                        <p className="text-brand-steel leading-relaxed font-light">We guarantee our strict workmanship. If any installation fault occurs within 12 months, we fix it rapidly for free.</p>
                    </div>
                    <div className="bg-brand-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-white/10 text-center hover:-translate-y-2 transition-transform duration-300 ring-1 ring-brand-white/5 group hover:border-brand-electric/30">
                        <div className="bg-brand-electric/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-electric/20 transition-colors duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                            <Wrench className="w-10 h-10 text-brand-electric" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-white mb-4">Manufacturer Warranty</h3>
                        <p className="text-brand-steel leading-relaxed font-light">All hardware comes with full enterprise manufacturer warranties, ranging strictly from 1 to 5 years depending on the brand.</p>
                    </div>
                    <div className="bg-brand-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-brand-white/10 text-center hover:-translate-y-2 transition-transform duration-300 ring-1 ring-brand-white/5 group hover:border-brand-electric/30">
                        <div className="bg-brand-electric/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-electric/20 transition-colors duration-300 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                            <PhoneCall className="w-10 h-10 text-brand-electric" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-white mb-4">Lifetime Support</h3>
                        <p className="text-brand-steel leading-relaxed font-light">As a high-priority GSS client, you get lifetime phone and remote support for basic troubleshooting and system architecture advice.</p>
                    </div>
                </div>

                <div className="bg-brand-navy rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-brand-white/5 overflow-hidden mb-16 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-electric/5 via-transparent to-transparent pointer-events-none" />
                    <div className="p-8 md:p-16 relative">
                        <h2 className="text-3xl md:text-5xl font-black text-brand-white mb-6 tracking-tight">Maintenance <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric filter drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Contracts</span></h2>
                        <p className="text-brand-steel/80 mb-10 text-xl font-light leading-relaxed max-w-3xl">
                            Prevention is better than cure. Our automated maintenance contracts ensure your security system is always fully operational.
                            Regular algorithmic checks prevent false alarms and ensure your battery backups are primed for Stage 6 load shedding.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 bg-brand-white/5 border border-brand-white/10 p-8 rounded-3xl backdrop-blur-md">
                                <h4 className="text-xl font-bold text-brand-electric mb-3 uppercase tracking-widest text-sm">Basic Maintenance</h4>
                                <p className="text-lg text-brand-steel font-light leading-relaxed">Annual system checkup, firmware updates, and comprehensive battery cycle testing.</p>
                            </div>
                            <div className="flex-1 bg-brand-white/5 border border-brand-white/10 p-8 rounded-3xl backdrop-blur-md ring-1 ring-brand-electric/20 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
                                <h4 className="text-xl font-bold text-brand-electric mb-3 uppercase tracking-widest text-sm">Comprehensive</h4>
                                <p className="text-lg text-brand-steel font-light leading-relaxed">Quarterly localized inspections, deep-cleaning, priority queue call-outs, and zero-day patch integration.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl mx-auto">
                    <h3 className="text-3xl font-black text-center mb-10 text-brand-white tracking-tight">Request Service Dispatch</h3>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
