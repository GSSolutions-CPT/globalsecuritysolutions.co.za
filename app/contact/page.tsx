import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'Contact Global Security Solutions | Free Risk Assessment Cape Town',
    description: 'Call/WhatsApp 062 955 8559 or email Kyle@globalsecuritysolutions.co.za. Book your free on-site risk assessment and quote. Durbanville HQ serving Cape Town & Western Cape.',
    alternates: {
        canonical: 'https://www.globalsecuritysolutions.co.za/contact',
    },
}

export const contactFormJsonLd = {
  "@context": "https://www.w3.org/ns/webmcp",
  "@type": "Form",
  "isPartOf": { "@id": "https://www.globalsecuritysolutions.co.za/contact#webpage" },
  "name": "Security Contact Form",
  "description": "Customer request form for security quotes, CCTV, alarms, maintenance and site visits.",
  "url": "/contact",
  "capabilities": ["quote", "maintain", "audit", "contact"],
  "intents": ["request_quote", "request_maintenance", "general_inquiry"],
  "fields": [
    { "name": "name", "label": "Name", "required": true },
    { "name": "phone", "label": "Phone", "required": true, "type": "tel" },
    { "name": "email", "label": "Email", "required": true, "type": "email" },
    { "name": "suburb", "label": "Suburb / Area", "required": false },
    { "name": "service", "label": "Service Interested In", "required": true }
  ]
}

export default function ContactPage() {
    return (
        <>
            <Script
                id="contact-form-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFormJsonLd) }}
            />
            <ContactClient />
        </>
    )
}
