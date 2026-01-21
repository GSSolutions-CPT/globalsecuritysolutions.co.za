
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/utils/supabase/client"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

// Revalidate every minute
export const revalidate = 60

type Props = {
    params: Promise<{ id: string }>
}

async function getProject(id: string) {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

    return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        return {
            title: 'Project Not Found | Global Security Solutions',
        }
    }

    return {
        title: `${project.title} | Global Security Solutions`,
        description: project.description || `View details about our ${project.title} project.`,
    }
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        notFound()
    }

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative bg-slate-950 text-white min-h-[50vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-blue-950/20 z-10" />
                    {project.image_url && (
                        <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover opacity-40 blur-sm"
                            priority
                        />
                    )}
                </div>

                <div className="container relative z-20 mx-auto px-4">
                    <Link href="/projects" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition-colors text-sm font-semibold tracking-wide uppercase">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight max-w-4xl">
                        {project.title}
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-30 pb-24">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Main Images */}
                    {/* Main Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-slate-100">
                        {/* Before Image (if exists) */}
                        {project.before_image_url && (
                            <div className="relative aspect-video w-full group">
                                <Image
                                    src={project.before_image_url}
                                    alt={`${project.title} - Before`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* After / Main Image */}
                        {project.image_url && (
                            <div className={`relative aspect-video w-full ${!project.before_image_url ? 'md:col-span-2' : ''}`}>
                                <Image
                                    src={project.image_url}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.category && (
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-wide">
                                    <Tag className="w-4 h-4 mr-2" />
                                    {project.category}
                                </span>
                            )}
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(project.created_at).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="prose prose-lg prose-slate max-w-none">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Overview</h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
