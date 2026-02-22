import { ArrowLeft, ArrowRight, Camera } from 'lucide-react'
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import seoData from '@/app/data/seoData.json'
import type { Metadata } from 'next'

// Revalidate every 60 seconds to improve performance while keeping data fresh
export const revalidate = 60

const pageData = seoData.trustAndSupportPages.find(p => p.page === "Project Gallery")

export const metadata: Metadata = {
    title: pageData?.title || 'Project Gallery | Global Security Solutions',
    description: pageData?.description || 'View our recent security installations in Cape Town.',
}

async function getProjects() {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    return data || []
}

export default async function ProjectsPage() {
    const projects = await getProjects() || []

    return (
        <div className="bg-slate-50 min-h-screen font-sans">

            {/* Premium Hero Section */}
            <section className="relative bg-slate-950 text-white min-h-[60vh] flex items-center overflow-hidden pb-64">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-blue-950/10 z-10" />
                    <Image
                        src="/page-heroes/gallery-hero.png"
                        alt="Security Installations Portfolio"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>

                <div className="container relative z-20 mx-auto px-4 text-center">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <h1
                        className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
                        data-aos="fade-up"
                        suppressHydrationWarning
                    >
                        Our Work
                    </h1>
                    <p
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        suppressHydrationWarning
                    >
                        Explore our portfolio of precision security installations across Cape Town&apos;s residential and commercial sectors.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-24 relative z-30 pb-24">

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100">
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Camera className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Portfolio Updating...</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            We are currently curating our latest project images. Please check back soon or follow us on social media for recent updates.
                        </p>
                        <Link href="/contact" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                            Request a Portfolio PDF <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: { id: string, slug?: string, image_url: string | null, title: string, category: string, desc: string, description: string }, i: number) => (
                        <Link
                            key={project.id || i}
                            href={`/projects/${project.slug || project.id || '#'}`}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            suppressHydrationWarning
                            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                {project.image_url ? (
                                    <Image
                                        src={project.image_url}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                                        <Camera className="w-12 h-12 mb-2 opacity-20" />
                                        <span className="text-xs font-medium uppercase tracking-widest opacity-40">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-white flex items-center justify-between">
                                    <span className="text-sm font-semibold">View Case Study</span>
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                                    {project.category || 'Installation'}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                    {project.desc || project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA / Standards */}
                <div className="mt-20 lg:mt-32 max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Installation Excellence</h2>
                        <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Every project in this gallery represents our commitment to neat cabling, strategic camera positioning, and robust system integration.
                            We don&apos;t just install; we engineer peace of mind.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Start Your Project
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}



