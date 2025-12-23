export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SecurityService",
        "name": "Global Security Solutions",
        "image": "https://globalsecuritysolutions.co.za/nav-logo-final.png",
        "telephone": "062 955 8559",
        "email": "sales@globalsecuritysolutions.co.za",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "66 Robyn Rd",
            "addressLocality": "Durbanville",
            "addressRegion": "Western Cape",
            "postalCode": "7550",
            "addressCountry": "ZA"
        },
        "url": "https://globalsecuritysolutions.co.za",
        "sameAs": [
            "https://www.facebook.com/globalsecuritysolutions.co.za",
            "https://www.instagram.com/globalsecuritysolutions.co.za/",
            "https://www.linkedin.com/company/global-security-solutions-cape-town",
            "https://www.threads.net/@globalsecuritysolutions.co.za",
            "https://gmb.globalsecuritysolutions.co.za"
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "17:00"
        },
        "priceRange": "$$",
        "areaServed": [
            {
                "@type": "City",
                "name": "Cape Town"
            },
            {
                "@type": "City",
                "name": "Durbanville"
            },
            {
                "@type": "City",
                "name": "Stellenbosch"
            }
        ],
        "founders": [
            {
                "@type": "Person",
                "name": "Kyle Cass"
            },
            {
                "@type": "Person",
                "name": "Rashaad Steyn"
            }
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
