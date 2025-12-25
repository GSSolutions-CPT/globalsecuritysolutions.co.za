'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const AOSInit = () => {
    useEffect(() => {
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
