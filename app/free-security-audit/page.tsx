import dynamic from 'next/dynamic'
import React from 'react'
import { Metadata } from 'next'
import { CheckCircle2, Bot, CalendarDays, ArrowRight, ShieldCheck, HardHat } from 'lucide-react'

import seoData from '@/app/data/seoData.json'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    loading: () => <div className="h-96 w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Free Security Audit")

export const metadata: Metadata = {
    title: 'Free Security Risk Assessment Cape Town | Global Security Solutions',
    description: 'Book a no-obligation professional risk assessment or use our instant AI advisor. Identify vulnerabilities and receive a custom quote for alarms, CCTV, fencing and access control.',
}

export default function FreeAuditPage() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-white font-sans">

            {/* Hero Section */}
            <PageHero
                align="center"
                title="Identify Your Vulnerabilities"
                subtitle="Don't wait for a break-in to find out where your security is weak. Choose how you want to be assessed."
                bgImage="/page-heroes/audit-hero.png"
                badgeIcon={<ShieldCheck className="w-4 h-4" />}
                badgeText="Professional Assessment"
                pbClass="pb-40"
            />

            <div className="container mx-auto px-4">
                {/* Breadcrumbs temporarily simplified for build stability */}
                <div className="text-sm text-brand-steel mb-4">Free Security Audit</div>
            </div>

            {/* Assessment Choice Section */}
            <div className="relative z-30 -mt-20 pb-20">
                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">

                        {/* Option 1: AI Assessment */}
                        <div className="bg-brand-navy p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-brand-white/10 ring-1 ring-brand-white/5">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform duration-700 group-hover:scale-150" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-brand-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md border border-brand-white/10 drop-shadow-xl shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Bot className="w-10 h-10 text-brand-electric group-hover:drop-shadow-sm transition-all" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 text-brand-white tracking-tight">Instant AI Assessment</h3>
                                <p className="text-brand-steel mb-8 min-h-16 leading-relaxed text-lg font-light">
                                    Upload a photo or answer 5 simple questions to get an instant, customized security strategy.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center text-brand-steel font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-brand-electric mr-3" /> No waiting (Instant Results)
                                    </li>
                                    <li className="flex items-center text-brand-steel font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-brand-electric mr-3" /> Upload Property Photos
                                    </li>
                                </ul>

                                <Link
                                    href="/ai-security-advisor"
                                    className="inline-flex items-center justify-center w-full bg-brand-electric hover:bg-brand-white text-brand-navy font-black py-4 px-6 rounded-2xl transition-all"
                                >
                                    Start AI Audit <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Option 2: On-Site Audit */}
                        <div className="bg-brand-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-brand-steel/10 ring-1 ring-brand-navy/5">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform duration-700 group-hover:scale-150" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-brand-navy/5 rounded-3xl flex items-center justify-center mb-8 border border-brand-navy/10 group-hover:bg-brand-navy/10 transition-colors">
                                    <HardHat className="w-10 h-10 text-brand-navy" />
                                </div>
                                <h3 className="text-3xl font-black text-brand-navy mb-4 tracking-tight">Expert On-Site Audit</h3>
                                <p className="text-brand-slate mb-8 min-h-16 leading-relaxed text-lg">
                                    Book a certified technician to physically inspect your premises and measure for installation.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center text-brand-navy font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-brand-navy mr-3" /> Physical Measurement
                                    </li>
                                    <li className="flex items-center text-brand-navy font-bold">
                                        <CheckCircle2 className="w-5 h-5 text-brand-navy mr-3" /> Blind Spot Identification
                                    </li>
                                </ul>

                                <a
                                    href="#book-form"
                                    className="inline-flex items-center justify-center w-full bg-brand-navy hover:bg-brand-electric text-brand-white font-black py-4 px-6 rounded-2xl transition-all"
                                >
                                    Book Technician <CalendarDays className="w-5 h-5 ml-2" />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Booking Form Section */}
                    <div id="book-form" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-12 border-t border-brand-steel/40">
                        <div className="space-y-8 mt-12 pl-6 border-l-2 border-brand-steel/20">
                            <div>
                                <h2 className="text-4xl font-black text-brand-navy mb-6 tracking-tight">What We Check On-Site</h2>
                                <p className="text-brand-slate text-lg leading-relaxed mb-8 font-light">
                                    Our technicians don't just look at the walls; we look for the path of least resistance that a criminal would take. Every audit is supervised to the standards set by owner Kyle Cass, with a focus on practical, reliable recommendations and clear handover of findings.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start relative">
                                    <div className="w-12 h-12 rounded-full bg-brand-electric/20 flex items-center justify-center text-brand-electric absolute -left-12 top-0 ring-4 ring-brand-white">
                                        <span className="font-black text-lg">1</span>
                                    </div>
                                    <div className="pl-4">
                                        <h4 className="font-extrabold text-brand-navy text-xl mb-1">Perimeter Weakness</h4>
                                        <p className="text-brand-slate leading-relaxed">We test fence tension, wall height, and gate motor anti-lift brackets.</p>
                                    </div>
                                </div>
                                <div className="flex items-start relative">
                                    <div className="w-12 h-12 rounded-full bg-brand-electric/20 flex items-center justify-center text-brand-electric absolute -left-12 top-0 ring-4 ring-brand-white">
                                        <span className="font-black text-lg">2</span>
                                    </div>
                                    <div className="pl-4">
                                        <h4 className="font-extrabold text-brand-navy text-xl mb-1">Lighting & Visibility</h4>
                                        <p className="text-brand-slate leading-relaxed">Identifying dark corners where cameras would be blinded or intruders hidden.</p>
                                    </div>
                                </div>
                                <div className="flex items-start relative">
                                    <div className="w-12 h-12 rounded-full bg-brand-electric/20 flex items-center justify-center text-brand-electric absolute -left-12 top-0 ring-4 ring-brand-white">
                                        <span className="font-black text-lg">3</span>
                                    </div>
                                    <div className="pl-4">
                                        <h4 className="font-extrabold text-brand-navy text-xl mb-1">Interior Layers</h4>
                                        <p className="text-brand-slate leading-relaxed">Checking sensor placement to ensure pet-friendly compliance and trap-zones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-navy p-8 md:p-12 rounded-3xl shadow-2xl border border-brand-white/10 ring-1 ring-brand-navy relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <h3 className="text-3xl font-black text-brand-white mb-8 tracking-tight relative z-10">Request Site Visit</h3>
                            <div className="relative z-10 p-6 bg-brand-white/5 rounded-2xl border border-brand-white/10 backdrop-blur-md">
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
