'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Camera } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

interface Project {
    id: string;
    slug?: string;
    image_url: string | null;
    title: string;
    category: string;
    desc: string;
    description: string;
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
    return (
        <div className="bg-brand-white min-h-screen font-sans">
            <PageHero
                align="center"
                title="Our Work"
                subtitle="Explore our portfolio of precision security installations across Cape Town's residential and commercial sectors."
                bgImage="/page-heroes/gallery-hero.png"
                pbClass="pb-48"
            />

            <div className="container mx-auto px-4 -mt-32 relative z-30 pb-8">
                {projects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12 bg-brand-navy rounded-3xl shadow-xl border border-brand-steel/20"
                    >
                        <div className="w-20 h-20 bg-brand-white/5 text-brand-electric rounded-full flex items-center justify-center mx-auto mb-6">
                            <Camera className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-white mb-2">Portfolio Updating...</h3>
                        <p className="text-brand-steel max-w-md mx-auto mb-8">
                            We are currently curating our latest project images. Please check back soon or follow us on social media for recent updates.
                        </p>
                        <Link href="/contact" className="inline-flex items-center text-brand-electric font-bold hover:text-white transition-colors">
                            Request a Portfolio PDF <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </motion.div>
                )}

                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, i) => (
                        <motion.div key={project.id || i} variants={fadeInUp}>
                            <Link
                                href={`/projects/${project.slug || project.id || '#'}`}
                                className="group block bg-brand-navy rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-brand-white/10 ring-1 ring-brand-white/5 relative"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-brand-navy/50">
                                    {project.image_url ? (
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-brand-steel bg-brand-navy border-b border-brand-white/5">
                                            <Camera className="w-12 h-12 mb-2 opacity-20" />
                                            <span className="text-xs font-medium uppercase tracking-widest opacity-40">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-brand-white flex items-center justify-between">
                                        <span className="text-sm font-semibold tracking-wide">View Case Study</span>
                                        <div className="w-8 h-8 rounded-full bg-brand-electric/20 backdrop-blur-md border border-brand-electric/50 flex items-center justify-center text-brand-electric">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 bg-brand-navy relative">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-steel/20 to-transparent"></div>
                                    <div className="text-xs font-black text-brand-electric uppercase tracking-widest mb-3 drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                                        {project.category || 'Installation'}
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-electric transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-brand-steel text-sm leading-relaxed line-clamp-3 mb-2 font-light">
                                        {project.desc || project.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 lg:mt-24 max-w-5xl mx-auto bg-brand-navy border border-brand-electric/30 rounded-[2.5rem] p-8 md:p-16 text-center text-brand-white relative overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.1)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-[100px] -mr-32 -mt-12 mix-blend-screen pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-electric/10 rounded-full blur-[100px] -ml-32 -mb-12 mix-blend-screen pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Installation Excellence</h2>
                        <p className="text-lg md:text-xl text-brand-steel mb-8 leading-relaxed max-w-3xl mx-auto font-light">
                            Every project in this gallery represents our commitment to neat cabling, strategic camera positioning, and robust system integration.
                            We don&apos;t just install; we engineer peace of mind.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center bg-brand-electric text-brand-navy hover:bg-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:-translate-y-1"
                        >
                            Start Your Project
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
