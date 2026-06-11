import type { Metadata } from 'next'
import seoData from '@/app/data/seoData.json'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
    title: 'About Global Security Solutions | Owner-Managed Security Experts Cape Town',
    description: 'Founded 2015 by Kyle Cass. 500+ premium installations across the Western Cape. Certified for Hikvision, Ajax, Nemtek, Paradox. Full training, guarantees and load-shedding resilient systems.',
}

export default function AboutPage() {
    return <AboutClient />
}
