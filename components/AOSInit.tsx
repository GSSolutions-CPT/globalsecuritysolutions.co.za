'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const AOSInit = () => {
    useEffect(() => {
        setTimeout(() => {
            AOS.init({
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                duration: 1000,
            })
        }, 100)
    }, [])

    return null
}
