import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
    title: 'Contact Global Security Solutions | Free Risk Assessment Cape Town',
    description: 'Call/WhatsApp 062 955 8559 or email Kyle@globalsecuritysolutions.co.za. Book your free on-site risk assessment and quote. Durbanville HQ serving Cape Town & Western Cape.',
    alternates: {
        canonical: 'https://globalsecuritysolutions.co.za/contact',
    },
}


export default function ContactPage() {
    return <ContactClient />
}
