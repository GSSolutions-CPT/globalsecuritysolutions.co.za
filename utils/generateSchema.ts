
export const masterBusinessData = {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "SecuritySystemInstaller"],
    "name": "Global Security Solutions",
    "image": [
        "https://globalsecuritysolutions.co.za/logo.png",
        "https://globalsecuritysolutions.co.za/hero-bg.jpg"
    ],
    "url": "https://www.globalsecuritysolutions.co.za/",
    "telephone": "+27629558559",
    "email": "sales@globalsecuritysolutions.co.za",
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
        "latitude": -33.8333,
        "longitude": 18.6500
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
        "https://www.facebook.com/globalsecuritysolutionscpt",
        "https://www.linkedin.com/company/global-security-solutions-cape-town",
        "https://www.instagram.com/globalsecuritysolutions.co.za",
        "https://wa.me/27629558559"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+27629558559",
        "contactType": "customer service",
        "areaServed": "ZA",
        "availableLanguage": "English"
    },
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "EFT"],
    "founders": [
        { "@type": "Person", "name": "Kyle Cass" },
        { "@type": "Person", "name": "Rashaad Steyn" }
    ],
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Western Cape"
    },
    "knowsAbout": [
        "Paradox Security Systems",
        "Hikvision CCTV",
        "Dahua Technology",
        "Nemtek Electric Fencing",
        "Centurion Gate Motors",
        "Biometric Access Control",
        "Smart Home Automation"
    ],
    "potentialAction": {
        "@type": "CommunicateAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "tel:+27629558559"
        },
        "name": "Call for Security Assessment"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Security Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Intruder Detection and Alarm Systems"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "CCTV Surveillance Systems"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Access Control and Intercom Systems"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Electric Fencing and Perimeter Security"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Gate and Garage Automation"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Security Systems Integration"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Emergency Repairs"
                }
            }
        ]
    }
}

export function getBaseSchema() {
    return {
        "@context": "https://schema.org",
        ...masterBusinessData
    }
}
