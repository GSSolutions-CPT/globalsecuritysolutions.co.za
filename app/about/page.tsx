import type { Metadata } from 'next'
import seoData from '@/app/data/seoData.json'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
    title: seoData.coreWebsitePages.find(p => p.page === 'About Us')?.title,
    description: seoData.coreWebsitePages.find(p => p.page === 'About Us')?.description,
}

export default function AboutPage() {
    return <AboutClient />
}
