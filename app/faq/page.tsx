import type { Metadata } from 'next'
import FAQClient from './FAQClient'

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | Global Security Solutions',
    description: 'Find answers to common questions about our security installations, warranties, and services.',
    alternates: {
        canonical: 'https://globalsecuritysolutions.co.za/faq',
    },
}

export default function FAQPage() {
    return <FAQClient />
}
