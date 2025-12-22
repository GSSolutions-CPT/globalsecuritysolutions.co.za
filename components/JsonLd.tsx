export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Global Security Solutions",
        "image": "https://globalsecuritysolutions.co.za/nav-logo-final.png",
        "telephone": "062 955 8559",
        "email": "sales@globalsecuritysolutions.co.za",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cape Town",
            "addressRegion": "Western Cape",
            "addressCountry": "ZA"
        },
        "url": "https://globalsecuritysolutions.co.za",
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
