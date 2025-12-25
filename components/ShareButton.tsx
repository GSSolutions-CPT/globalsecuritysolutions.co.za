'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export function ShareButton({ title, url }: { title: string, url?: string }) {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        const shareData = {
            title: title,
            text: `Check out this article: ${title}`,
            url: url || (typeof window !== 'undefined' ? window.location.href : '')
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
            } catch (err) {
                console.log('Error sharing', err)
            }
        } else {
            // Fallback to copy clipboard
            try {
                await navigator.clipboard.writeText(shareData.url)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error('Failed to copy', err)
            }
        }
    }

    return (
        <button
            onClick={handleShare}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full"
        >
            {copied ? <Check className="w-5 h-5 mr-2" /> : <Share2 className="w-5 h-5 mr-2" />}
            {copied ? 'Copied!' : 'Share'}
        </button>
    )
}
