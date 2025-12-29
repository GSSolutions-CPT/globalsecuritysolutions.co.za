"use client"

import { usePathname } from 'next/navigation'
import seoData from '@/app/data/seoData.json'
import locationData from '@/app/data/locationData.json'
import blogData from '@/app/data/blogData.json'
import faqData from '@/app/data/faqData.json'

export function JsonLd() {
    const pathname = usePathname()

    // --- 1. Master LocalBusiness Data (Base) ---
    const masterBusinessData = {
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

    let finalSchema: any = {
        "@context": "https://schema.org",
        ...masterBusinessData
    }

    // --- 2. Helper Functions ---
    const toSlug = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim()

    // --- 3. Route Logic ---

    // A. FAQ Page
    if (pathname === '/faq') {
        // @ts-ignore
        const faqEntities = faqData.flatMap(cat => cat.questions.map(q => ({
            "@type": "Question",
            "name": q.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.a
            }
        })))

        finalSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqEntities
        }
    }

    // B. Service Pages (/services/...)
    else if (pathname?.startsWith('/services/')) {
        const slug = pathname.split('/').pop()
        const service = seoData.primaryServicePages.find(s => toSlug(s.page) === slug) ||
            seoData.sectorSolutions.find(s => toSlug(s.page) === slug)

        if (service) {
            finalSchema = {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": service.title, // or service.page
                "description": service.description,
                "provider": {
                    ...masterBusinessData
                },
                "serviceType": service.page,
                "areaServed": masterBusinessData.areaServed
            }
        }
    }

    // C. Area Pages (/areas/...)
    else if (pathname?.startsWith('/areas/')) {
        const slug = pathname.split('/').pop()
        const location = locationData.find(l => l.slug === slug)

        if (location) {
            // Keep specific instructions: Provider details intact, only change areaServed
            finalSchema = {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": location.h1 || `Security Services in ${location.suburb}`,
                "description": location.description,
                "provider": {
                    ...masterBusinessData,
                    // address: masterBusinessData.address // Keeps Durbanville address
                },
                "areaServed": {
                    "@type": "City",
                    "name": location.suburb
                }
            }
        }
    }

    // D. Blog Pages (/blog/...)
    else if (pathname?.startsWith('/blog/')) {
        const slug = pathname.split('/').pop()
        // Try find in static data first
        const post = blogData.find(p => p.slug === slug)

        if (post) {
            finalSchema = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "image": post.coverImage ? `https://globalsecuritysolutions.co.za${post.coverImage}` : undefined,
                "datePublished": new Date(post.date).toISOString().split('T')[0], // Approximation
                "author": {
                    "@type": "Organization",
                    "name": "Global Security Solutions"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Global Security Solutions",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://globalsecuritysolutions.co.za/logo.png"
                    }
                },
                "description": post.excerpt
            }
        }
    }

    // E. Projects Pages
    else if (pathname?.startsWith('/projects')) {
        if (pathname === '/projects') {
            finalSchema = {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "Security Installation Projects",
                "description": "View our recent security installation projects across Cape Town.",
                "provider": { ...masterBusinessData }
            }
        } else {
            finalSchema = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Security Installation Project",
                "author": {
                    "@type": "Organization",
                    "name": "Global Security Solutions"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Global Security Solutions",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://globalsecuritysolutions.co.za/logo.png"
                    }
                }
            }
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchema) }}
        />
    )
}
