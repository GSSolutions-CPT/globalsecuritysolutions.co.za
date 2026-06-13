import type { Metadata } from 'next'
import LinksClient from './LinksClient'

export const metadata: Metadata = {
    title: 'Links | Global Security Solutions',
    description: 'Connect with Global Security Solutions on social media, WhatsApp, or visit our website.',
    alternates: {
        canonical: 'https://globalsecuritysolutions.co.za/links',
    },
}

export default function LinksPage() {
    return <LinksClient />
}
