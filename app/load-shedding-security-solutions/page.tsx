import React from 'react'
import { Metadata } from 'next'
import { Battery, Zap, Sun, AlertTriangle, CheckCircle2, Power } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Load Shedding Security Solutions")

export const metadata: Metadata = {
    title: pageData?.title || 'Load Shedding Security | Battery Backups Cape Town',
    description: pageData?.description || 'Keep your security running during power outages.',
}

export default function LoadSheddingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    {/* Abstract background pattern or image */}
                    <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <Zap className="w-4 h-4" />
                        <span>Power Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                        Security That <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Never Sleeps</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        Load shedding is a reality. A security system that turns off when the lights go out is just a decoration. We keep you protected 24/7.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="relative z-30 -mt-20 pb-20">
                <div className="container mx-auto px-4">

                    {/* Solution Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="bg-yellow-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-500 transition-colors duration-300">
                                <Battery className="w-10 h-10 text-yellow-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Lithium Backup</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Swap out old lead-acid batteries for LiFePO4. They charge faster, last longer, and don&apos;t degrade from frequent cycling.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="bg-orange-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                                <Sun className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Solar Integration</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Take your electric fence and gate motor off the grid entirely. Solar kits ensure your perimeter is active even during Stage 6.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                <Power className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Management</h3>
                            <p className="text-slate-600 leading-relaxed">
                                We integrate with your inverter to prioritize security loads, ensuring your CCTV stays recording while non-essentials drop off.
                            </p>
                        </div>
                    </div>

                    {/* Educational Section & CTA */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-wider uppercase text-sm">
                                <AlertTriangle className="w-4 h-4" />
                                <span>The Risk Factor</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                                Why Standard Security <span className="text-red-500">Fails</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Most alarm systems come with basic lead-acid batteries designed for occasional power cuts.
                                With daily load shedding, these batteries never fully recharge, sulfating and failing within months.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">The LiFePO4 Difference</h4>
                                        <p className="text-sm text-slate-600">Our upgrades use Lithium batteries that can handle thousands of cycles and charge in under 2 hours.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">Gate Motor Preservation</h4>
                                        <p className="text-sm text-slate-600">Low voltage damages motors. We install voltage stabilizers and proper battery backups to prevent costly motor burnout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dark CTA Form */}
                        <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden relative text-white">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Power Up Your Security</h3>
                                <p className="text-slate-400 mb-8">
                                    Get a quote for a load-shedding proof upgrade. From simple battery swaps to full solar kits.
                                </p>
                                <div className="bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
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
