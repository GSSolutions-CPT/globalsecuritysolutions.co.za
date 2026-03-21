'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import seoData from '@/app/data/seoData.json'
import { ArrowRight, CheckCircle2, Search, FileText, Wrench, HeadphonesIcon } from 'lucide-react'

const toSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
}

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

export function ServicesClient() {
    return (
        <div className="min-h-screen bg-brand-white font-sans selection:bg-brand-electric selection:text-brand-navy">

            {/* Hero Section */}
            <section className="relative bg-brand-navy text-brand-white py-16 md:py-24 flex items-center overflow-hidden border-b border-brand-steel/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-electric/10 blur-[150px] mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
                
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/30 z-10" />
                    <Image
                        src="/page-heroes/services-hero.png"
                        alt="Security Services"
                        fill
                        className="object-cover opacity-30 mix-blend-luminosity"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 md:px-8 text-center pt-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/30 text-brand-electric text-xs md:text-sm font-black tracking-widest uppercase mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                            <span>Complete Protection</span>
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight drop-shadow-md">
                            World-Class <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel">Security Services</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-brand-steel sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
                            From residential homes to industrial estates, we design systems that protect what matters most with unwavering reliability.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
                {/* Services Grid */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
                >
                    {seoData.primaryServicePages.map((service, idx) => (
                        <motion.div variants={fadeInUp} key={service.page} className="h-full">
                            <Link
                                href={`/services/${toSlug(service.page)}`}
                                className="group relative bg-brand-navy rounded-[1.5rem] p-6 shadow-xl shadow-brand-navy/10 border border-brand-steel/20 hover:border-brand-electric/50 transition-all duration-500 overflow-hidden flex flex-col items-center text-center h-full focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                                <div className="w-16 h-16 mb-4 relative mx-auto bg-brand-white/5 rounded-2xl border border-brand-white/10 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner z-10">
                                    {service.iconPath ? (
                                        <Image
                                            src={service.iconPath}
                                            alt={`${service.page} icon`}
                                            width={32}
                                            height={32}
                                            className="object-contain brightness-[100] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-brand-electric/50" />
                                    )}
                                </div>

                                <h2 className="text-lg md:text-xl font-bold text-brand-white mb-2 group-hover:text-brand-electric transition-colors tracking-tight relative z-10">
                                    {service.page}
                                </h2>

                                <p className="text-brand-steel text-xs leading-relaxed flex-grow mb-6 font-light relative z-10">
                                    {service.description}
                                </p>

                                <span className="inline-flex mt-auto items-center text-brand-navy font-bold text-xs uppercase tracking-wider bg-brand-white px-5 py-2.5 rounded-full w-fit group-hover:bg-brand-electric group-hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all relative z-10">
                                    Learn More
                                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Process Section */}
                <div className="mb-16">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeInUp}
                        className="text-center mb-8"
                    >
                        <span className="text-brand-electric font-black tracking-[0.2em] uppercase text-xs mb-2 block">Our Workflow</span>
                        <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tighter">How We Work</h2>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        {[
                            { icon: Search, title: "1. Assessment", text: "We visit your site to identify vulnerabilities." },
                            { icon: FileText, title: "2. Design", text: "We propose a tailored solution and explicit quote." },
                            { icon: Wrench, title: "3. Installation", text: "Our certified team installs neatly and permanently." },
                            { icon: HeadphonesIcon, title: "4. Support", text: "We provide training and rapid ongoing maintenance." }
                        ].map((step, i) => (
                            <motion.div variants={fadeInUp} key={i} className="text-center relative group">
                                {/* Connector Line (Desktop) */}
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-brand-steel/30 -z-10 group-hover:bg-brand-electric transition-colors" />
                                )}
                                <div className="w-16 h-16 mx-auto bg-brand-navy border border-brand-steel/20 rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_30px_-10px_rgba(10,25,47,0.5)] group-hover:scale-110 group-hover:border-brand-electric/50 transition-all z-10 relative overflow-hidden">
                                     <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <step.icon className="w-7 h-7 text-brand-electric relative z-10" />
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-1 tracking-tight">{step.title}</h3>
                                <p className="text-brand-slate text-sm font-medium">{step.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Content Block / Value Prop */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                    className="bg-brand-navy rounded-[2rem] p-8 md:p-12 text-brand-white relative overflow-hidden shadow-2xl border border-brand-steel/20"
                >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-electric/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Why Professional Security Matters</h2>
                            <p className="text-brand-steel mb-6 text-sm md:text-base font-light leading-relaxed">
                                In today&apos;s world, off-the-shelf solutions aren&apos;t enough. Criminals are highly sophisticated, and your defense architecture needs to be stronger to match.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Layered defense vectors (Perimeter + Internal)",
                                    "Professional grade, tamper-proof hardware",
                                    "Native integration with armed response units"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center text-brand-white font-medium text-sm">
                                        <div className="bg-brand-white/10 p-1 rounded-full mr-3 border border-brand-white/20">
                                            <CheckCircle2 className="w-4 h-4 text-brand-electric" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-brand-white/5 backdrop-blur-md p-8 rounded-[1.5rem] border border-brand-steel/10 shadow-inner">
                            <h3 className="text-xl font-bold text-brand-white mb-6 tracking-tight">Common Questions</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-black text-brand-electric tracking-widest uppercase text-[10px] mb-2">What is the best system for a home?</h4>
                                    <p className="text-brand-steel text-xs leading-relaxed font-light">A layered approach. Start with perimeter beams or electric fencing, followed by an internal physical core and visual verification.</p>
                                </div>
                                <div>
                                    <h4 className="font-black text-brand-electric tracking-widest uppercase text-[10px] mb-2">Do you install during load shedding?</h4>
                                    <p className="text-brand-steel text-xs leading-relaxed font-light">Absolutely. We also specialize natively in solar and battery backup architectures to ensure your security grid never goes offline.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}
