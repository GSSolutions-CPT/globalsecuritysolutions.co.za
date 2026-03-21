'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface PageHeroProps {
    title: React.ReactNode
    subtitle: string
    badgeText?: string
    badgeIcon?: React.ReactNode
    bgImage: string
    pbClass?: string // To allow pages with overlapping cards to use pb-48
    align?: 'center' | 'left'
}

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

export function PageHero({ 
    title, 
    subtitle, 
    badgeText, 
    badgeIcon, 
    bgImage, 
    pbClass = "pb-16", 
    align = "center" 
}: PageHeroProps) {
    return (
        <section className={`relative bg-brand-navy text-brand-white py-16 md:py-32 flex items-center overflow-hidden border-b border-brand-steel/20 ${pbClass}`}>
            {/* Immersive Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-electric/10 blur-[150px] mix-blend-screen pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 mix-blend-overlay" />
            
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/30 z-10" />
                <Image
                    src={bgImage}
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-30 mix-blend-luminosity"
                    priority
                />
            </div>

            <div className={`container relative z-20 mx-auto px-4 md:px-8 pt-8 ${align === 'center' ? 'text-center' : 'text-left'}`}>
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start max-w-3xl'}`}
                >
                    {badgeText && (
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/30 text-brand-electric text-xs md:text-sm font-black tracking-widest uppercase mb-6 backdrop-blur-md">
                            {badgeIcon ? (
                                badgeIcon
                            ) : (
                                <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_10px_rgba(0,229,255,0.8)]"></span>
                            )}
                            {badgeText}
                        </motion.div>
                    )}
                    
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight drop-shadow-md">
                        {title}
                    </motion.h1>
                    
                    <motion.p variants={fadeInUp} className={`text-brand-steel sm:text-lg leading-relaxed font-light mb-8 ${align === 'center' ? 'max-w-2xl mx-auto' : ''}`}>
                        {subtitle}
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}
