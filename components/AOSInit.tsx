'use client'

import { useEffect } from 'react'

export const AOSInit = () => {
    useEffect(() => {
        // Defer AOS initialization until after the page is idle
        const initAOS = async () => {
            const [AOS] = await Promise.all([
                import('aos').then(m => m.default),
                import('aos/dist/aos.css'),
            ])

            AOS.init({
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                duration: 800,
            })
        }

        // Use requestIdleCallback for non-critical animation library
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => initAOS(), { timeout: 2000 })
        } else {
            setTimeout(initAOS, 1500)
        }
    }, [])

    return null
}
