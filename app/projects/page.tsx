import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import seoData from '@/app/data/seoData.json'
import type { Metadata } from 'next'

// Revalidate every minute
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

    // Placeholder projects if DB is empty for demo/UI reskin verification
    const allProjects = projects.length > 0 ? projects : [
        // ... (keep logic simple, maybe no placeholders or just minimal)
        { title: "Chere Botha School", category: "Commercial", desc: "Access Control & Hikvision Installation", image_url: null },
        { title: "35 on Rose", category: "HOA / Estate", desc: "Large-scale Security Upgrade", image_url: null },
        { title: "Salus and Demos", category: "Residential", desc: "Premium Access Control System", image_url: null },
        { title: "Durbanville Estate", category: "Residential", desc: "Electric Fencing & Alarms", image_url: null },
        { title: "Blouberg Office Park", category: "Commercial", desc: "CCTV Surveillance Network", image_url: null },
        { title: "Stellenbosch Farm", category: "Agricultural", desc: "Perimeter Beams & Monitoring", image_url: null },
    ]

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Recent Projects</h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                        See our quality workmanship and recent installations across Cape Town.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 relative z-20">
                {projects.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-[2.5rem] shadow-sm">
                        <p className="text-slate-500">No projects loaded yet. Check back soon!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: any, i: number) => (
                        <Link
                            key={project.id || i}
                            href={`/projects/${project.id || '#'}`}
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full border border-slate-50 relative"
                        >
                            {/* Accent */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-blue-600 rounded-br-[4rem] z-20 shadow-lg -translate-x-2 -translate-y-2" />
                            <div className="absolute top-6 left-6 z-30 text-white font-bold text-xs uppercase tracking-wider">Project</div>

                            <div className="relative h-64 w-full overflow-hidden">
                                {project.image_url ? (
                                    <Image
                                        src={project.image_url}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            </div>

                            <div className="p-8 flex flex-col flex-grow relative">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h2>
                                <p className="text-blue-600 font-semibold text-sm mb-4 uppercase tracking-wide">{project.category || 'Security Installation'}</p>
                                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{project.desc || project.description}</p>
                                <span className="mt-auto text-slate-900 font-bold text-sm flex items-center group-hover:gap-2 transition-all">
                                    View Project Case Study <ArrowRight className="w-4 h-4 ml-2" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* SEO Content: Installation Standards */}
                <div className="mt-20 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Installation Standards</h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Every project in our gallery represents our commitment to excellence. We don't just "install and leave."
                        We ensure neat cabling, strategic camera positioning for maximum coverage, and full system integration.
                        Whether it's a small residential alarm or a massive commercial estate, our <strong>quality control standards</strong> remain the same.
                    </p>
                    <Link href="/contact" className="text-blue-600 font-bold hover:underline text-lg">
                        Start Your Project Today &rarr;
                    </Link>
                </div>
            </div>
        </div>
    )
}
