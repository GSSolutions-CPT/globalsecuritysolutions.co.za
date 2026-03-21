import type { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
    title: 'All Security Services | Global Security Solutions',
    description: 'Explore our full range of security services including Alarms, CCTV, Electric Fencing, and Access Control in Cape Town.',
}

export default function ServicesIndexPage() {
    return <ServicesClient />
}
