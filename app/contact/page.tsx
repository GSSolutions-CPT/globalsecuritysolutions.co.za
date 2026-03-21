import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'
import seoData from '@/app/data/seoData.json'

export const metadata: Metadata = {
    title: seoData.coreWebsitePages.find(p => p.page === 'Contact Us')?.title,
    description: seoData.coreWebsitePages.find(p => p.page === 'Contact Us')?.description,
}

export default function ContactPage() {
    return <ContactClient />
}
