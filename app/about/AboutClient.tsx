'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Zap, Award, BookOpen, ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

// Lazy load the Counter component for performance below the fold
const Counter = dynamic(() => import('@/components/Counter').then(mod => mod.Counter), { ssr: false })

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

export function AboutClient() {
    return (
        <div className="min-h-screen bg-brand-white font-sans selection:bg-brand-electric selection:text-brand-navy">
            {/* Hero Section */}
            <section className="relative bg-brand-navy text-brand-white py-16 md:py-24 flex items-center overflow-hidden border-b border-brand-steel/20">
                {/* Immersive Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-electric/10 blur-[150px] mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
                
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/30 z-10" />
                    <Image
                        src="/page-heroes/about-hero.png"
                        alt="Global Security Solutions Operations and Monitoring Center Cape Town"
                        fill
                        className="object-cover opacity-30 mix-blend-luminosity"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 md:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl flex flex-col items-start"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/30 text-brand-electric text-xs md:text-sm font-black tracking-widest uppercase mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                            Est. 2015
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight drop-shadow-md">
                            More Than Just <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel">Security Installers</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-brand-steel sm:text-lg max-w-2xl leading-relaxed font-light">
                            We are your strategic partners in safety. Founded on Cape Town soil, we understand the local landscape and the unique challenges our clients face.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">

                {/* Mission & Vision Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="prose prose-lg"
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black text-brand-navy mb-6 tracking-tighter">Our Mission</motion.h2>
                        <motion.p variants={fadeInUp} className="leading-relaxed mb-4 text-brand-slate text-sm md:text-base font-medium">
                            To provide high-performance security solutions that combine reliability, advanced technology, and expert workmanship.
                            We believe that every home and business deserves a security system that just works, 24/7.
                        </motion.p>
                        <motion.p variants={fadeInUp} className="leading-relaxed mb-8 text-brand-slate text-sm md:text-base font-medium">
                            Global Security Solutions was born out of a frustration with sub-par workmanship and &quot;ghost&quot; installers who vanish after the job is done.
                            We set out to change the narrative by building a company rooted in accountability and long-term relationships.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="not-prose">
                            <Link href="/contact" className="inline-flex items-center text-brand-navy bg-brand-electric px-8 py-3 rounded-full font-bold text-sm hover:bg-brand-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all w-fit">
                                Get Protected
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Leadership Card - Premium Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative bg-brand-navy p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(10,25,47,0.5)] border border-brand-steel/20 overflow-hidden group">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

                            <div className="flex items-center space-x-4 mb-8 relative z-10">
                                <div className="p-3 bg-brand-white/10 backdrop-blur-md rounded-xl border border-brand-white/20 shadow-inner">
                                    <Shield className="w-6 h-6 text-brand-electric" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tighter text-brand-white">Leadership Team</h3>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center p-4 rounded-2xl bg-brand-white/5 border border-brand-steel/10 hover:border-brand-electric/40 hover:bg-brand-white/10 transition-all duration-300">
                                    <div className="relative w-14 h-14 mr-4 flex-shrink-0">
                                        <Image
                                            src="/kyle_cass_headshot.jpg"
                                            alt="Kyle Cass - Owner Global Security Solutions Cape Town"
                                            fill
                                            className="rounded-full object-cover object-top ring-2 ring-brand-steel/30"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-white text-base">Kyle Cass</h4>
                                        <p className="text-brand-electric font-black uppercase tracking-widest text-[10px] mb-1">Owner & Founder</p>
                                        <p className="text-brand-steel text-xs leading-snug font-light">Hands-on supervision ensuring rigorous standards.</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 rounded-2xl bg-brand-white/5 border border-brand-steel/10 hover:border-brand-electric/40 hover:bg-brand-white/10 transition-all duration-300">
                                    <div className="relative w-14 h-14 mr-4 flex-shrink-0">
                                        <Image
                                            src="/rashaad_steyn_headshot.jpg"
                                            alt="Rashaad Steyn - COO Global Security Solutions"
                                            fill
                                            className="rounded-full object-cover object-top ring-2 ring-brand-steel/30"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-white text-base">Rashaad Steyn</h4>
                                        <p className="text-brand-electric font-black uppercase tracking-widest text-[10px] mb-1">Chief Operating Officer</p>
                                        <p className="text-brand-steel text-xs leading-snug font-light">Overseeing operational excellence & growth.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Certifications Section */}
            <section className="py-8 bg-brand-navy border-y border-brand-steel/20 relative isolate overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        className="text-center mb-6"
                    >
                        <h2 className="text-2xl font-black text-brand-white tracking-tighter">Accredited & Certified</h2>
                        <p className="text-brand-steel text-xs mt-1 font-light">Authorized installers for the world&apos;s leading security brands.</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                    >
                        <Image src="/brand-hikvision.png" alt="Hikvision Certified Installer Badge Cape Town" width={100} height={40} className="object-contain h-8 w-auto brightness-0 invert" />
                        <Image src="/brand-ajax.png" alt="Ajax Systems Authorized Dealer Badge" width={100} height={40} className="object-contain h-8 w-auto brightness-0 invert" />
                        <Image src="/brand-paradox.png" alt="Paradox Security Systems Certified Partner" width={100} height={40} className="object-contain h-8 w-auto brightness-0 invert" />
                        <Image src="/brand-nemtek.png" alt="Nemtek Electric Fencing Certified Installer" width={100} height={40} className="object-contain h-8 w-auto brightness-0 invert" />
                        <Image src="/brand-centurion.png" alt="Centurion Gate Motors Accredited Installer" width={100} height={40} className="object-contain h-8 w-auto brightness-0 invert" />
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
                {/* Stats Section */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-brand-navy rounded-[2rem] p-6 md:p-8 mb-16 text-brand-white shadow-2xl shadow-brand-navy/20 relative overflow-hidden border border-brand-steel/20"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-electric/5 via-transparent to-brand-electric/5" />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 divide-x divide-brand-steel/20 border-brand-steel/20">
                        <div className="text-center p-2 flex flex-col items-center justify-center">
                            <Counter end={10} label="Years Experience" />
                        </div>
                        <div className="text-center p-2 flex flex-col items-center justify-center">
                            <Counter end={500} label="Projects Completed" />
                        </div>
                        <div className="text-center p-2 flex flex-col items-center justify-center">
                            <div className="text-3xl md:text-5xl font-black text-brand-electric mb-1 tracking-tighter drop-shadow-md">100%</div>
                            <div className="text-[10px] text-brand-steel font-black uppercase tracking-[0.2em]">Quality Guarantee</div>
                        </div>
                        <div className="text-center p-2 flex flex-col items-center justify-center">
                            <Counter end={24} label="Hour Support" />
                        </div>
                    </div>
                </motion.div>

                {/* Values Grid */}
                <div className="mb-16">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        className="text-center mb-8"
                    >
                        <span className="text-brand-electric font-black tracking-[0.2em] uppercase text-xs mb-2 block">Our Core Values</span>
                        <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tighter">Why We Are Different</h2>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: Award, title: "Quality First", desc: "We refuse to cut corners. From solid copper cabling to premium brackets, we use materials that outlast the harsh Cape Town climate." },
                            { icon: Zap, title: "Rapid Response", desc: "Security compromises can't wait. Our agile technical team ensures critical installations and repairs happen identically when you need them." },
                            { icon: BookOpen, title: "Education Focused", desc: "A system is only as good as its user. We fully parameterize and train you thoroughly on how to use your security effectively, hands-on." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                variants={fadeInUp}
                                whileHover={{ y: -8 }}
                                className="group bg-brand-navy p-6 md:p-8 rounded-[1.5rem] border border-brand-steel/20 shadow-xl shadow-brand-navy/10 hover:border-brand-electric/50 transition-all duration-500 relative overflow-hidden focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="w-12 h-12 bg-brand-white/10 backdrop-blur-md rounded-xl border border-brand-white/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                                    <item.icon className="w-6 h-6 text-brand-electric" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-brand-white tracking-tight relative z-10">{item.title}</h3>
                                <p className="text-brand-steel text-sm leading-relaxed font-light relative z-10">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-brand-navy rounded-[2rem] p-8 md:p-12 text-center text-brand-white relative overflow-hidden border border-brand-electric/30 shadow-[0_0_40px_rgba(0,229,255,0.15)] max-w-4xl mx-auto"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-brand-electric/20 blur-[100px] pointer-events-none mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4 tracking-tighter drop-shadow-md">Ready to secure your peace of mind?</h2>
                        <p className="text-brand-steel mb-8 text-sm md:text-base font-medium">Contact us today for a free consultation and let&apos;s architect your custom security strategy.</p>
                        <Link href="/contact" className="inline-flex items-center text-brand-navy bg-brand-electric px-8 py-3 rounded-full font-bold text-sm hover:bg-brand-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all w-fit">
                            Get in Touch
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
