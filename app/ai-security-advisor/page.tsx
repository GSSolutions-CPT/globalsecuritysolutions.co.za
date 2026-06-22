import type { Metadata } from 'next'
import AIAdvisorClient from './AIAdvisorClient'

export const metadata: Metadata = {
    title: 'AI Security Advisor | Personalised Security Recommendations Cape Town',
    description: 'Use our intelligent security assessment tool to get custom recommendations for alarm systems, CCTV cameras, and electric fencing in seconds.',
    alternates: {
        canonical: 'https://www.globalsecuritysolutions.co.za/ai-security-advisor',
    },
}

export default function AIAdvisorPage() {
    return <AIAdvisorClient />
}
