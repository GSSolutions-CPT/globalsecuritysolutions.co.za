import { supabase } from "@/utils/supabase/client";
import seoData from '@/app/data/seoData.json'
import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

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

    return <ProjectsClient projects={projects} />
}



