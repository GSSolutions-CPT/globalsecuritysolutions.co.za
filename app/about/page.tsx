import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import seoData from '@/app/data/seoData.json'
import { Shield, Zap, Award, BookOpen, ArrowRight } from 'lucide-react'
import { Counter } from '@/components/Counter'

export const metadata: Metadata = {
    title: seoData.coreWebsitePages.find(p => p.page === 'About Us')?.title,
    description: seoData.coreWebsitePages.find(p => p.page === 'About Us')?.description,
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Reusing hero-bg.jpg if available, else fallback to gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-blue-950/0 z-10" />
                    <Image
                        src="/page-heroes/about-hero.png"
                        alt="Global Security Solutions Operations and Monitoring Center Cape Town"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 pt-20">
                    <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Est. 2015
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                            More Than Just <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Security Installers</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                            We are your strategic partners in safety. Founded on Cape Town soil, we understand the local landscape and the unique challenges our clients face.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-20">

                {/* Mission & Vision Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 md:mb-32">
                    <div className="prose prose-lg text-slate-600">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Our Mission</h2>
                        <p className="leading-relaxed mb-6 text-lg">
                            To provide high-performance security solutions that combine reliability, advanced technology, and expert workmanship.
                            We believe that every home and business deserves a security system that just works, 24/7.
                        </p>
                        <p className="leading-relaxed mb-6">
                            Global Security Solutions was born out of a frustration with sub-par workmanship and &quot;ghost&quot; installers who vanish after the job is done.
                            We set out to change the narrative by building a company rooted in accountability and long-term relationships.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 not-prose">
                            <Link href="/contact" className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                                Get Protected
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Leadership Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-[2.5rem] rotate-3 opacity-50 transform translate-x-4"></div>
                        <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Leadership Team</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center group p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className="relative w-16 h-16 mr-6 flex-shrink-0">
                                        <Image
                                            src="/kyle_cass_headshot.jpg"
                                            alt="Kyle Cass - Owner Global Security Solutions Cape Town"
                                            fill
                                            className="rounded-full object-cover object-top shadow-md group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Kyle Cass</h4>
                                        <p className="text-blue-600 font-medium text-sm mb-2">Owner & Founder</p>
                                        <p className="text-slate-500 text-sm leading-snug">Hands-on supervision ensuring every project meets our rigorous standards.</p>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-100"></div>

                                <div className="flex items-center group p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div className="relative w-16 h-16 mr-6 flex-shrink-0">
                                        <Image
                                            src="/rashaad_steyn_headshot.jpg"
                                            alt="Rashaad Steyn - COO Global Security Solutions"
                                            fill
                                            className="rounded-full object-cover object-top shadow-md group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">Rashaad Steyn</h4>
                                        <p className="text-blue-600 font-medium text-sm mb-2">Chief Operating Officer</p>
                                        <p className="text-slate-500 text-sm leading-snug">Overseeing operational excellence and strategic growth.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Accredited & Certified</h2>
                        <p className="text-slate-500 mt-2">We are authorized installers for the world's leading security brands.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* We use existing brand logos here */}
                        <Image src="/brand-hikvision.png" alt="Hikvision Certified Installer Badge Cape Town" width={120} height={60} className="object-contain h-12 w-auto" />
                        <Image src="/brand-ajax.png" alt="Ajax Systems Authorized Dealer Badge" width={120} height={60} className="object-contain h-12 w-auto" />
                        <Image src="/brand-paradox.png" alt="Paradox Security Systems Certified Partner" width={120} height={60} className="object-contain h-12 w-auto" />
                        <Image src="/brand-nemtek.png" alt="Nemtek Electric Fencing Certified Installer" width={120} height={60} className="object-contain h-12 w-auto" />
                        <Image src="/brand-centurion.png" alt="Centurion Gate Motors Accredited Installer" width={120} height={60} className="object-contain h-12 w-auto" />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 mb-20 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10 border-b md:border-b-0 md:border-r border-slate-800/50">
                        <div className="text-center p-4">
                            <Counter end={10} label="Years Experience" />
                        </div>
                        <div className="text-center p-4">
                            <Counter end={500} label="Projects Completed" />
                        </div>
                        <div className="text-center p-4">
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">100%</div>
                            <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Quality Guarantee</div>
                        </div>
                        <div className="text-center p-4">
                            <Counter end={24} label="Hour Support" />
                        </div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Core Values</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Why We Are Different</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                <Award className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Quality First</h3>
                            <p className="text-slate-600 leading-relaxed">
                                We refuse to cut corners. From using solid copper cabling to premium brackets, we use materials that last.
                            </p>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                <Zap className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Rapid Response</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Security issues can&apos;t wait. Our agile team ensures installations and critical repairs happen when you need them tailored.
                            </p>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                                <BookOpen className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Education Focused</h3>
                            <p className="text-slate-600 leading-relaxed">
                                A system is only as good as its user. We take the time to train you thoroughly on how to use your security effectively.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Ready to work with a team that cares?</h2>
                        <p className="text-blue-100 mb-8 text-lg">Contact us today for a free consultation and let&apos;s discuss your security strategy.</p>
                        <Link href="/contact" className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
                            Get in Touch
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
