'use client'

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
    end: number
    duration?: number
    label: string
}

export function Counter({ end, duration = 2000, label }: CounterProps) {
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
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {count}+
            </div>
            <div className="text-sm uppercase tracking-wider text-slate-500 font-bold">
                {label}
            </div>
        </div>
    )
}
