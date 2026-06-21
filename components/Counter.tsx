'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
    end: number
    duration?: number
    label: string
    suffix?: string
}

export function Counter({ end, duration = 2000, label, suffix = "+" }: CounterProps) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (!isInView) return

        let startTime: number | null = null
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = currentTime - startTime

            if (progress < duration) {
                const percentage = progress / duration
                // Ease out quart
                const ease = 1 - Math.pow(1 - percentage, 4)
                setCount(Math.floor(end * ease))
                requestAnimationFrame(animate)
            } else {
                setCount(end)
            }
        }

        requestAnimationFrame(animate)
    }, [end, duration, isInView])

    return (
        <div ref={ref} className="text-center">
            <div className="text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-white via-brand-electric to-brand-electric drop-shadow-lg tracking-tighter mb-2">
                {count}{suffix}
            </div>
            <div className="text-[10px] lg:text-xs uppercase tracking-[0.15em] text-brand-steel font-bold">
                {label}
            </div>
        </div>
    )
}

