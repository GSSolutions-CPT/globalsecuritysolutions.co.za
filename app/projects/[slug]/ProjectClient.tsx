'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
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

export default function ProjectClient({ project }: { project: any }) {
    return (
        <div className="bg-brand-white min-h-screen font-sans selection:bg-brand-electric selection:text-brand-navy">
            <PageHero
                align="left"
                title={project.title}
                subtitle={project.description || "A deep dive into our custom security engineering and implementation."}
                bgImage={project.image_url || "/page-heroes/gallery-hero.png"}
                pbClass="pb-48"
                badgeText="Featured Case Study"
            />

            <div className="container mx-auto px-4 -mt-32 relative z-30 pb-16">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="bg-brand-navy rounded-[2.5rem] shadow-2xl border border-brand-steel/20 overflow-hidden ring-1 ring-brand-white/5"
                >
                    {/* Visual Evidence Area */}
                    <div className="bg-brand-navy/50 p-1 md:p-2 border-b border-brand-steel/20">
                        {/* Before Gallery */}
                        {((project.before_gallery && project.before_gallery.length > 0) || project.before_image_url) && (
                            <motion.div variants={fadeInUp} className="mb-2 rounded-2xl overflow-hidden border border-brand-white/10">
                                <div className="bg-brand-slate/20 backdrop-blur-md border-b border-brand-white/10 text-brand-white text-xs font-black px-6 py-3 uppercase tracking-widest flex items-center shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-brand-steel mr-3"></span>
                                    Before Transformation
                                </div>
                                <div className={`grid gap-1 bg-brand-navy ${project.before_gallery && project.before_gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                    {project.before_gallery ? (
                                        project.before_gallery.map((img: string, i: number) => (
                                            <div key={i} className="relative aspect-video w-full bg-brand-navy/80 hover:opacity-90 transition-opacity cursor-crosshair">
                                                <Image src={img} alt={`${project.title} - Before ${i + 1}`} fill className="object-cover mix-blend-luminosity hover:mix-blend-normal opacity-70 transition-all duration-500" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="relative aspect-video w-full bg-brand-navy/80 hover:opacity-90 transition-opacity cursor-crosshair">
                                            <Image src={project.before_image_url!} alt={`${project.title} - Before`} fill className="object-cover mix-blend-luminosity hover:mix-blend-normal opacity-70 transition-all duration-500" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* After Gallery */}
                        <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.05)] border border-brand-electric/20">
                            <div className="bg-brand-electric/10 backdrop-blur-md border-b border-brand-electric/20 text-brand-electric text-xs font-black px-6 py-3 uppercase tracking-widest flex items-center">
                                <span className="w-2 h-2 rounded-full bg-brand-electric shadow-[0_0_8px_rgba(0,229,255,0.8)] mr-3 animate-pulse"></span>
                                Completed Installation
                            </div>
                            <div className={`grid gap-1 bg-brand-navy ${project.after_gallery && project.after_gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                {project.after_gallery ? (
                                    project.after_gallery.map((img: string, i: number) => (
                                        <div key={i} className="relative aspect-video w-full bg-brand-navy">
                                            <Image src={img} alt={`${project.title} - After ${i + 1}`} fill className="object-cover" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative aspect-video w-full bg-brand-navy">
                                        <Image src={project.image_url || ''} alt={`${project.title} - After`} fill className="object-cover" priority />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Metadata and Content */}
                    <div className="p-8 md:p-12 lg:p-16 relative">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-electric/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
                        
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-10 relative z-10">
                            {project.category && (
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-electric/10 border border-brand-electric/30 text-brand-electric text-sm font-bold uppercase tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                                    <Tag className="w-4 h-4 mr-2" />
                                    {project.category}
                                </span>
                            )}
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-steel/10 border border-brand-steel/20 text-brand-steel text-sm font-medium backdrop-blur-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(project.created_at).toLocaleDateString()}
                            </span>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="prose prose-lg prose-invert max-w-3xl relative z-10">
                            <h2 className="text-3xl font-black text-brand-white mb-6 tracking-tight">Project Overview</h2>
                            <div className="text-brand-steel leading-relaxed font-light p-6 rounded-2xl bg-brand-navy/80 border border-brand-white/5 shadow-inner">
                                <p className="whitespace-pre-wrap m-0">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                        
                        <motion.div variants={fadeInUp} className="mt-12 flex justify-start relative z-10">
                            <Link 
                                href="/projects" 
                                className="inline-flex items-center justify-center gap-2 bg-brand-steel/10 hover:bg-brand-electric text-brand-white hover:text-brand-navy border border-brand-steel/20 hover:border-transparent px-8 py-3 rounded-full font-bold transition-all shadow-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:-translate-y-0.5"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Return to Gallery
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
