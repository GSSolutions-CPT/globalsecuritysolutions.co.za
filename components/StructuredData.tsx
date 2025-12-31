export default function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "name": "Global Security Solutions",
        "image": "https://globalsecuritysolutions.co.za/logo.png",
        "url": "https://www.globalsecuritysolutions.co.za/",
        "telephone": "+27629558559",
        "email": "Kyle@globalsecuritysolutions.co.za",
        "description": "Global Security Solutions provides expert security system installations in Durbanville and Western Cape. Certified installers of Paradox alarms, Hikvision CCTV, electric fencing, and access control.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "66 Robyn Rd",
            "addressLocality": "Durbanville",
            "addressRegion": "Western Cape",
            "postalCode": "7550",
            "addressCountry": "ZA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-33.8333",
            "longitude": "18.6500"
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
            "https://www.threads.com/@globalsecuritysolutions.co.za",
            "https://wa.me/27629558559"
        ],
        "priceRange": "R5000.00 - R10 000 000",
        "paymentAccepted": ["Cash", "Credit Card", "EFT"],
        "founders": [
            { "@type": "Person", "name": "Kyle Cass" },
            { "@type": "Person", "name": "Rashaad Steyn" }
        ],
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Western Cape"
        },
        "potentialAction": {
            "@type": "CommunicateAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "tel:+27629558559"
            },
            "name": "Call for Security Assessment"
        }
    };
    return (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />);
}
