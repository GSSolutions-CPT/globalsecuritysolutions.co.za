import { supabase } from "@/utils/supabase/client";
import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

// Revalidate every 60 seconds to improve performance while keeping data fresh
export const revalidate = 60

export const metadata: Metadata = {
    title: 'Project Gallery | Real Security Installations Cape Town | Global Security Solutions',
    description: 'Featured premium security projects: Chere Botha School, luxury estates in Hout Bay & Constantia, wine farms, commercial premises. Owner-supervised CCTV, fencing & access control.',
    alternates: {
        canonical: 'https://www.globalsecuritysolutions.co.za/projects',
    },
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

    return <ProjectsClient projects={projects} />
}



