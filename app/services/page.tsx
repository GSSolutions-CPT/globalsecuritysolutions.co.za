import type { Metadata } from 'next'
import { ServicesClient } from './ServicesClient'

export const metadata: Metadata = {
    title: 'Security Services Cape Town | Alarms, CCTV, Electric Fencing & Access Control',
    description: 'Premium certified security installations in Cape Town: Smart alarms (Ajax, Paradox), 4K IP CCTV (Hikvision), Nemtek electric fencing, biometric access control. Free risk assessment.',
    alternates: {
        canonical: 'https://www.globalsecuritysolutions.co.za/services',
    },
}


export default function ServicesIndexPage() {
    return <ServicesClient />
}
