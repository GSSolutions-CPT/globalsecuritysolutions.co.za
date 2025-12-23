import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/utils/supabase/client'
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
    const dbProjects = await getProjects()

    // Static fallback projects for demo
    const staticProjects = [
        { title: "Chere Botha School", category: "Commercial", desc: "Access Control & Hikvision Installation", image_url: null },
        { title: "35 on Rose", category: "HOA / Estate", desc: "Large-scale Security Upgrade", image_url: null },
        { title: "Salus and Demos", category: "Residential", desc: "Premium Access Control System", image_url: null },
        { title: "Durbanville Estate", category: "Residential", desc: "Electric Fencing & Alarms", image_url: null },
        { title: "Blouberg Office Park", category: "Commercial", desc: "CCTV Surveillance Network", image_url: null },
        { title: "Stellenbosch Farm", category: "Agricultural", desc: "Perimeter Beams & Monitoring", image_url: null },
    ]

    const allProjects = [...dbProjects, ...staticProjects]

    return (
        <div className="min-h-screen bg-slate-50 py-12 md:py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600">Our Work</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    A showcase of our recent installations across the Western Cape.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProjects.map((p, i) => (
                        <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 h-full flex flex-col">
                            <div className="aspect-video bg-slate-200 relative overflow-hidden">
                                {p.image_url ? (
                                    <img
                                        src={p.image_url}
                                        alt={p.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                                        Project Image
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{p.category}</div>
                            </div>
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{p.desc || p.description}</p>
                            </div>
                        </div>
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
