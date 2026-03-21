'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Target, Zap } from 'lucide-react'
import seoData from '../data/seoData.json'
import { ContactForm } from '@/components/ContactForm'

const toSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()
}

const getSectorIcon = (sector: string) => {
    switch (sector) {
        case 'Residential Security':
            return <Image src="/icons/residential-security.png" alt={sector} width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
        case 'Commercial Security':
            return <Image src="/icons/commercial-security.png" alt="Commercial" width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
        case 'Industrial Security':
            return <Image src="/icons/industrial-security.png" alt="Industrial" width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
        case 'Estate Security Management':
            return <Image src="/icons/estate-security.png" alt={sector} width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
        case 'Farm Security Systems':
            return <Image src="/icons/farm-security-v2.png" alt={sector} width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
        case 'Schools & Education':
            return <Image src="/icons/education-security.png" alt={sector} width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
        default:
            return <Image src="/icons/commercial-security.png" alt={sector} width={64} height={64} className="w-16 h-16 object-contain mb-4 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] brightness-[100] group-hover:scale-110 transition-transform duration-500 relative z-10" />
    }
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

export function SectorsClient() {
    const sectors = [
        "Residential Security",
        "Commercial Security",
        "Industrial Security",
        "Farm Security Systems",
        "Estate Security Management",
        "Schools & Education"
    ]

    return (
        <div className="flex flex-col min-h-screen bg-brand-white font-sans selection:bg-brand-electric selection:text-brand-navy">

            {/* Hero Section */}
            <section className="relative bg-brand-navy text-brand-white py-16 md:py-24 flex items-center overflow-hidden border-b border-brand-steel/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-electric/10 blur-[150px] mix-blend-screen pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
                
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/30 z-10" />
                    <Image
                        src="/page-heroes/sectors-hero.png"
                        alt="Security Solutions"
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
                            <ShieldCheck className="w-3.5 h-3.5 text-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)] rounded-full" />
                            <span>Industry Specific Solutions</span>
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight drop-shadow-md">
                            Security Tailored to <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-steel">Your Environment</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="text-brand-steel sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
                            We understand that a farm requires different protection than a retail store.
                            Our sector-specific approach ensures you get the exact defense architecture your property needs.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">

                {/* Sector Grid */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                >
                    {sectors.map((sector, index) => {
                        const slug = toSlug(sector)
                        const seoItem = seoData.sectorSolutions.find(item =>
                            item.page === sector ||
                            item.title.includes(sector) ||
                            (sector.includes('Commercial') && item.page.includes('Commercial')) ||
                            (sector.includes('Farms') && item.page.includes('Farm')) ||
                            (sector.includes('Estates') && item.page.includes('Estate')) ||
                            (sector.includes('Schools') && item.page.includes('Schools'))
                        )

                        return (
                            <motion.div variants={fadeInUp} key={index} className="h-full">
                                <Link
                                    href={`/sectors/${slug}`}
                                    className="bg-brand-navy p-6 md:p-8 rounded-[1.5rem] shadow-[0_10px_30px_-15px_rgba(10,25,47,0.5)] hover:shadow-2xl hover:shadow-brand-electric/10 transition-all duration-500 flex flex-col items-center text-center group border border-brand-steel/20 relative overflow-hidden h-full focus-within:ring-2 focus-within:ring-brand-electric focus-within:outline-none"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-white/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none" />

                                    <div className="relative z-10 w-full flex flex-col items-center flex-grow">
                                        <div className="bg-brand-white/5 p-4 rounded-full border border-brand-white/10 mb-6 shadow-inner relative overflow-hidden">
                                            <div className="absolute inset-0 bg-brand-electric/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            {getSectorIcon(sector)}
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-brand-white mb-3 group-hover:text-brand-electric transition-colors tracking-tight">
                                            {sector}
                                        </h3>

                                        <p className="text-brand-steel text-xs leading-relaxed line-clamp-3 mb-8 font-light flex-grow">
                                            {seoItem ? seoItem.description : 'Specialized protection for this sector.'}
                                        </p>

                                        <span className="mt-auto inline-flex items-center text-brand-navy font-bold uppercase tracking-wider text-[10px] bg-brand-white px-5 py-2.5 rounded-full group-hover:bg-brand-electric group-hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] transition-all">
                                            Explore Solutions <ArrowRight className="w-3.5 h-3.5 ml-2" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Why Specialization Matters */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                    <motion.div variants={fadeInUp} className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tighter">
                            Why One Size <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-navy">Doesn&apos;t</span> Fit All
                        </h2>
                        <p className="text-brand-slate text-sm md:text-base leading-relaxed font-medium">
                            Generic security companies install the exact same blueprint everywhere. We know that threat intelligence profiles differ fundamentally between sectors. Our specialized approach means:
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4 group cursor-default">
                                <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-steel/20 text-brand-electric flex items-center justify-center shrink-0 shadow-inner group-hover:bg-brand-electric group-hover:text-brand-navy transition-colors">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-navy text-lg tracking-tight">Focused Risk Assessment</h4>
                                    <p className="text-brand-slate text-sm">We audit for precise, sector-specific vulnerabilities that generalists entirely miss.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group cursor-default">
                                <div className="w-12 h-12 rounded-xl bg-brand-navy border border-brand-steel/20 text-brand-electric flex items-center justify-center shrink-0 shadow-inner group-hover:bg-brand-electric group-hover:text-brand-navy transition-colors">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-navy text-lg tracking-tight">Optimized Hardware Architecture</h4>
                                    <p className="text-brand-slate text-sm">Industrial grids need heavy ruggedized gear; bespoke homes need sleek aesthetics. We deploy accordingly.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <div className="bg-brand-navy rounded-[2rem] p-8 md:p-12 text-brand-white relative overflow-hidden shadow-2xl border border-brand-steel/20">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-electric/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black tracking-tight mb-4 drop-shadow-md">Ready for an Expert Opinion?</h3>
                                <p className="text-brand-steel mb-8 text-xs font-light">
                                    Stop guessing with your defense perimeter. Get a professional intelligence assessment tailored strictly to your industry.
                                </p>
                                <div className="bg-brand-white/5 p-4 rounded-2xl backdrop-blur-md border border-brand-steel/10 shadow-inner">
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </div>
    )
}
