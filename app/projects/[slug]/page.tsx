
import { supabase } from "@/utils/supabase/client"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'
import ProjectClient from './ProjectClient'

// Revalidate every minute
export const revalidate = 60

type Props = {
    params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single()

    return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const project = await getProject(slug)

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
    const { slug } = await params
    const project = await getProject(slug)

    if (!project) {
        notFound()
    }

    return <ProjectClient project={project} />
}
