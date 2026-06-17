'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, Camera } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const fadeInUp: Variants = {
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
                bgImage="/page-heroes/gallery-hero.jpg"
                pbClass="pb-48"
            />

            <div className="container mx-auto px-4 -mt-32 relative z-30 pb-8">
                <Breadcrumbs items={[{ label: 'Project Gallery', href: '/projects' }]} />
                {projects.length === 0 && (
                    <div className="mb-12">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-brand-navy tracking-tighter mb-3">Featured Security Installations</h2>
                            <p className="text-brand-slate max-w-2xl mx-auto text-sm md:text-base">Every project is owner-supervised by Kyle Cass. We deliver neat, reliable, integrated systems with full client training and handover. Here are representative examples of our work across Cape Town and the Western Cape.</p>
                        </div>

                        {/* Static Rich Case Studies for SEO & Proof (shown when DB is empty or as supplement) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Chere Botha School, Bellville (Oak Glen)",
                                    category: "Schools & Education",
                                    desc: "Major security overhaul for this special-needs school. Delivered IP CCTV network, biometric access control at key points, and rapid-response alarm integration with full site coverage.",
                                    outcome: "Total safety for students and staff. Controlled access, remote monitoring capability, and a strong deterrent. Professional installation supporting a secure learning environment.",
                                    services: "IP CCTV, Biometric Access Control, Alarm Integration"
                                },
                                {
                                    title: "Luxury Residence, Hout Bay",
                                    category: "Residential",
                                    desc: "Premium multi-camera IP CCTV with smartphone app control and AI analytics, electric perimeter fencing, and integrated intruder alarm system with off-grid backup.",
                                    outcome: "24/7 remote visibility for owners. Strong physical + electronic perimeter. Clean, professional installation with full handover training.",
                                    services: "IP CCTV + AI, Electric Fencing, Smart Alarms"
                                },
                                {
                                    title: "Family Home, Durbanville",
                                    category: "Residential",
                                    desc: "Complete layered security: full HD CCTV coverage, biometric gate access control, smart alarm system with battery backup and mobile notifications.",
                                    outcome: "Parents gained complete peace of mind with live views and controlled convenient access. Reliable performance through load shedding.",
                                    services: "CCTV, Biometric Access, Alarm + Backup"
                                },
                                {
                                    title: "Commercial Office Premises, Somerset West",
                                    category: "Commercial",
                                    desc: "Enterprise-grade biometric access control with intercom, high-resolution IP CCTV across parking and internal areas, plus alarm integration for the business.",
                                    outcome: "Precise access logging, high-quality incident footage, and a professional reassuring environment for staff and clients.",
                                    services: "Access Control, IP CCTV, Alarm Integration"
                                },
                                {
                                    title: "Gated Estate, Northern Suburbs",
                                    category: "Estates",
                                    desc: "Perimeter electric fencing upgrade, ANPR/LPR overview cameras, centralised access control and alarm monitoring integration for the body corporate.",
                                    outcome: "Significantly improved perimeter integrity, streamlined resident and visitor management, and reliable evidence-grade surveillance.",
                                    services: "Electric Fencing, LPR CCTV, Access Control"
                                },
                                {
                                    title: "Wine Farm, Stellenbosch Area",
                                    category: "Agricultural / Estate",
                                    desc: "Strategic perimeter protection with electric fencing and detection, long-range CCTV covering vineyards, cellars and access roads, plus remote monitoring setup.",
                                    outcome: "Protection of high-value assets with minimal visual impact. Owners monitor operations and security securely from anywhere.",
                                    services: "Perimeter Fencing, Long-Range CCTV, Remote Monitoring"
                                }
                            ].map((project, index) => (
                                <div key={index} className="group block bg-brand-navy rounded-3xl overflow-hidden shadow-sm border border-brand-white/10 ring-1 ring-brand-white/5">
                                    <div className="p-6 md:p-8">
                                        <div className="text-xs font-black text-brand-electric uppercase tracking-widest mb-2">{project.category}</div>
                                        <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-electric transition-colors tracking-tight">{project.title}</h3>
                                        <p className="text-brand-steel text-sm leading-relaxed mb-4 font-light">{project.desc}</p>
                                        <div className="text-xs uppercase tracking-widest text-brand-electric mb-1">Key Services</div>
                                        <p className="text-brand-white/80 text-sm mb-4 font-medium">{project.services}</p>
                                        <div className="text-xs uppercase tracking-widest text-brand-electric mb-1">Outcome</div>
                                        <p className="text-brand-steel text-sm leading-relaxed font-light">{project.outcome}</p>
                                    </div>
                                    <div className="border-t border-brand-white/10 px-6 py-4 bg-brand-navy/50">
                                        <Link href="/contact" className="text-brand-electric text-sm font-bold hover:text-white inline-flex items-center gap-1">
                                            Discuss a similar project <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8 text-sm text-brand-slate">
                            Real projects delivered with owner supervision, professional training, and reliable results. 
                            <Link href="/contact" className="text-brand-electric font-bold ml-1 hover:underline">Request your free security assessment →</Link>
                        </div>
                    </div>
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
