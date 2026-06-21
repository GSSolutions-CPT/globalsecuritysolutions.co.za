'use client'

import { ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const MarketingBanner = () => {
    // Generate simple particle coordinates for drifting tech particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
    }));

    return (
        <div className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-28 flex items-center overflow-hidden bg-brand-navy min-h-[85vh]">
            
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/75 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent z-10" />
                
                <Image
                    src="/hero-bg-v2.jpg"
                    alt="Security Solutions Cape Town"
                    fill
                    priority={true}
                    fetchPriority="high"
                    quality={75}
                    sizes="100vw"
                    className="object-cover opacity-60 transform scale-105"
                />

                {/* Animated Tech Grid Overlay */}
                <div className="absolute inset-0 tech-grid-bg opacity-20 z-10" />

                {/* Drifting Tech Particles */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            className="absolute rounded-full bg-brand-electric/30"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                width: p.size,
                                height: p.size,
                            }}
                            animate={{
                                y: ['0px', '-100px', '0px'],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: p.delay,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-5 lg:px-8 relative z-20">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-electric/10 border border-brand-electric/25 text-brand-electric text-xs md:text-sm font-bold mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.1)] w-fit"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-electric opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-electric"></span>
                        </span>
                        Cape Town&apos;s #1 Rated Installer
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight"
                    >
                        Premium Security <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric via-brand-steel to-white drop-shadow-[0_0_15px_rgba(0,229,255,0.2)]">System Installations.</span>
                    </motion.h1>

                    {/* Sub-text */}
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-lg lg:text-xl text-brand-slate/90 mb-8 max-w-2xl leading-relaxed"
                    >
                        We secure Cape Town homes and businesses with AI-powered CCTV, smart alarms, electric fencing, and off-grid battery backup solutions.
                        <span className="block mt-2 text-brand-steel text-sm font-semibold flex items-center gap-2">
                            <span className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                            </span>
                            Over 10 years of experience &amp; 500+ satisfied clients.
                        </span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/free-security-audit"
                            className="inline-flex h-13 items-center justify-center rounded-full bg-brand-electric px-8 text-sm font-black text-brand-navy shadow-lg shadow-brand-electric/20 hover:shadow-brand-electric/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            Get Free Audit
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex h-13 items-center justify-center rounded-full border border-brand-steel/40 bg-white/5 px-8 text-sm font-bold text-brand-white hover:bg-white/10 hover:border-brand-electric/50 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            View Services
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Floating Trust Badge */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block absolute bottom-12 right-12 z-20"
            >
                <div className="glass-card-dark p-6 rounded-2xl border border-brand-steel/20 flex items-center gap-5 max-w-xs hover:border-brand-electric/40 duration-300 transition-colors shadow-2xl">
                    <div className="bg-emerald-500/20 p-3 rounded-full border border-emerald-500/30">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-lg leading-tight">Expert Installation</div>
                        <div className="text-brand-steel text-sm font-medium">Certified Technicians</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

