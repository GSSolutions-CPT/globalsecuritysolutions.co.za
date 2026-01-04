import React from 'react'
import { Metadata } from 'next'
import { CheckCircle2, Bot, CalendarDays, ArrowRight, ShieldCheck, HardHat, Camera, UploadCloud, Sparkles, Star } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import seoData from '@/app/data/seoData.json'
import Link from 'next/link'
import Image from 'next/image'

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Free Security Audit")

export const metadata: Metadata = {
    title: pageData?.title || 'Free Security Audit | Global Security Solutions',
    description: pageData?.description || 'Book a free security assessment.',
}

export default function FreeAuditPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">

            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 z-10" />
                    <Image
                        src="/hero-bg.jpg"
                        alt="Free Security Audit"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Professional Assessment</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                        Identify Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Vulnerabilities</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
                        Don&apos;t wait for a break-in to find out where your security is weak. Choose how you want to be assessed.
                    </p>
                </div>
            </section>

            {/* Assessment Choice Section */}
            <div className="relative z-30 -mt-20 pb-20">
                <div className="container mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">

                        {/* Option 1: AI Assessment */}
                        <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border border-slate-800">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <Bot className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Instant AI Assessment</h3>
                                <p className="text-slate-400 mb-8 min-h-[50px]">
                                    Upload a photo or answer 5 simple questions to get an instant, customized security strategy.
                                </p>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" /> No waiting (Instant Results)
                                    </li>
                                    <li className="flex items-center text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" /> Upload Property Photos
                                    </li>
                                </ul>

                                <Link
                                    href="/ai-security-advisor"
                                    className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all"
                                >
                                    Start AI Audit <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Option 2: On-Site Audit */}
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                    <HardHat className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Expert On-Site Audit</h3>
                                <p className="text-slate-500 mb-8 min-h-[50px]">
                                    Book a certified technician to physically inspect your premises and measure for installation.
                                </p>

                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center text-sm text-slate-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Physical Measurement
                                    </li>
                                    <li className="flex items-center text-sm text-slate-600">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Blind Spot Identification
                                    </li>
                                </ul>

                                <a
                                    href="#book-form"
                                    className="inline-flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl transition-all"
                                >
                                    Book Technician <CalendarDays className="w-4 h-4 ml-2" />
                                </a>
                            </div>
                        </div>


                    </div>

                    {/* AI Audit Process Steps */}
                    <div className="mb-24">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4 block">Simple & Effective</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">How the AI Audit Works</h2>
                            <p className="text-xl text-slate-600">Get a comprehensive security breakdown in minutes, without a technician visiting your home.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: "01", title: "Snap", desc: "Take photos of your perimeter, gates, and key entry points.", icon: Camera },
                                { step: "02", title: "Upload", desc: "Submit them to our secure AI analyzer via the portal.", icon: UploadCloud },
                                { step: "03", title: "Analyze", desc: "Receive a detailed threat report and quote instantly.", icon: Sparkles }
                            ].map((s, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black text-slate-200 leading-none -mt-4 -mr-4 group-hover:scale-110 transition-transform">{s.step}</div>
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <s.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{s.title}</h3>
                                    <p className="text-slate-600 relative z-10">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial Section */}
                    <div className="mb-24 bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white sm:flex items-center gap-12">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] opacity-10" />

                        <div className="relative z-10 shrink-0 mb-8 sm:mb-0">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 overflow-hidden relative mx-auto sm:mx-0">
                                <Image
                                    src="/assets/images/testimonial_sarah_jenkins_v1.png"
                                    alt="Sarah Jenkins"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="relative z-10 text-center sm:text-left">
                            <div className="flex gap-1 justify-center sm:justify-start text-yellow-500 mb-6">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                            </div>
                            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-slate-200">
                                &quot;I was skeptical about an AI audit, but it spotted a blind spot near my garage that two previous companies missed. The team installed a camera there the next day.&quot;
                            </blockquote>
                            <div>
                                <h4 className="font-bold text-lg text-white">Sarah Jenkins</h4>
                                <p className="text-slate-400 text-sm">Homeowner, Constantia</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form Section */}
                    <div id="book-form" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-12 border-t border-slate-200">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">What We Check On-Site</h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    Our technicians don&apos;t just look at the walls; we look for the path of least resistance that a criminal would take.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-600 mr-4 shrink-0">
                                        <span className="font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Perimeter Weakness</h4>
                                        <p className="text-sm text-slate-600">We test fence tension, wall height, and gate motor anti-lift brackets.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-600 mr-4 shrink-0">
                                        <span className="font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Lighting & Visibility</h4>
                                        <p className="text-sm text-slate-600">Identifying dark corners where cameras would be blinded or intruders hidden.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-600 mr-4 shrink-0">
                                        <span className="font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Interior Layers</h4>
                                        <p className="text-sm text-slate-600">Checking sensor placement to ensure pet-friendly compliance and trap-zones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Request Site Visit</h3>
                            <ContactForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
