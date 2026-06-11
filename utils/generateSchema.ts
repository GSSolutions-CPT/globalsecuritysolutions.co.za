
export const masterBusinessData = {
    "@type": "LocalBusiness",
    "name": "Global Security Solutions",
    "image": [
        "https://globalsecuritysolutions.co.za/nav-logo-final.png",
        "https://globalsecuritysolutions.co.za/hero-bg.png"
    ],
    "url": "https://www.globalsecuritysolutions.co.za/",
    "telephone": "+27 62 955 8559",
    "email": "Kyle@globalsecuritysolutions.co.za",
    "description": "Owner-managed security system installation company in Durbanville, Cape Town. Established 2015. Kyle Cass personally oversees every professional installation of CCTV, alarms, electric fencing, access control and integrated security solutions across the Western Cape. Hands-on training and complete handover included on every project.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "66 Robyn Rd, Langeberg Ridge",
        "addressLocality": "Durbanville",
        "addressRegion": "Western Cape",
        "postalCode": "7550",
        "addressCountry": "ZA"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": -33.833306,
        "longitude": 18.65
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "13:00"
        }
    ],
    "sameAs": [
        "https://www.facebook.com/gssolutions.co.za",
        "https://www.linkedin.com/company/global-security-solutions-cape-town",
        "https://www.instagram.com/globalsecuritysolutions.co.za",
        "https://wa.me/27629558559"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+27 62 955 8559",
        "contactType": "customer service",
        "areaServed": ["Western Cape", "Cape Town"],
        "availableLanguage": "English"
    },
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "EFT", "Bank Transfer"],
    "founder": [
        {
            "@type": "Person",
            "name": "Kyle Cass",
            "jobTitle": "Owner & Founder",
            "description": "Hands-on owner who personally supervises every security installation to ensure rigorous standards and direct accountability."
        }
    ],
    "employee": [
        {
            "@type": "Person",
            "name": "Rashaad Steyn",
            "jobTitle": "Chief Operating Officer"
        }
    ],
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Western Cape, South Africa"
    },
    "knowsAbout": [
        "Security System Installation",
        "IP CCTV Surveillance",
        "Biometric Access Control",
        "Electric Perimeter Fencing",
        "Smart Alarm Systems",
        "Gate Automation",
        "Security System Integration",
        "Load Shedding Backup Solutions",
        "Perimeter Security Beams"
    ],
    "hasCredential": [
        "Certified installer for Hikvision, AJAX, Paradox, Nemtek, Centurion and leading security brands"
    ],
    "potentialAction": {
        "@type": "CommunicateAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "tel:+27629558559"
        },
        "name": "Call or WhatsApp for Free Security Assessment"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Professional Security System Installation Services",
        "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Alarm System Installation & Monitoring Integration" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IP CCTV & AI Surveillance Systems" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Biometric Access Control & Intercoms" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electric Fencing & Perimeter Security" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gate & Garage Automation" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Security System Integration & Smart Home" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repairs, Upgrades & Maintenance Contracts" } }
        ]
    },
    "slogan": "Owner-managed premium security installations in Cape Town since 2015."
}

export function getBaseSchema() {
    return [
        {
            "@context": "https://schema.org",
            ...masterBusinessData
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Global Security Solutions",
            "url": "https://globalsecuritysolutions.co.za/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://globalsecuritysolutions.co.za/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    ]
}

// Helper for additional page-specific schema (can be expanded)
export function getLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        ...masterBusinessData
    }
}

// Enhanced FAQ schema helper for pages with FAQs
export function getFAQSchema(faqs: Array<{q: string, a: string}>) {
    if (!faqs || faqs.length === 0) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };
}
