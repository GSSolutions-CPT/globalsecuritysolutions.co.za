'use client'

import { useEffect } from 'react'
import AOS from 'aos'

export const AOSInit = () => {
    useEffect(() => {
        // Dynamically load CSS to prevent render-blocking
        import('aos/dist/aos.css')

        const timer = setTimeout(() => {
            AOS.init({
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                duration: 1000,
            })
        }, 800)

        return () => clearTimeout(timer)
    }, [])

    return null
}
