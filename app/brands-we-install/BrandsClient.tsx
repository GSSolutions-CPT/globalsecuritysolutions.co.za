'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

export default function BrandsClient({ brands }: { brands: {name: string, src: string, url: string, alt: string}[] }) {
    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto px-4"
        >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
                {brands.map((brand, idx) => (
                    <motion.div
                        key={idx}
                        variants={scaleUp}
                        className="group flex items-center justify-center p-6 md:p-8 bg-brand-navy/60 backdrop-blur-xl rounded-2xl border border-brand-white/10 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:border-brand-electric/30 hover:bg-brand-navy/80 transition-all duration-500 relative ring-1 ring-brand-white/5"
                    >
                        {/* Hover Overlay Link */}
                        <Link
                            href={brand.url}
                            target="_blank"
                            rel="nofollow noopener"
                            className="absolute inset-0 z-20"
                            aria-label={`Visit ${brand.name} website`}
                        />

                        <div className="relative h-12 md:h-16 w-full grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                            <Image
                                src={brand.src}
                                alt={brand.alt}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
