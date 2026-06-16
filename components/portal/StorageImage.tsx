'use client'

import { PrivateStorageBucket } from '@/lib/portal/storage'
import { useStorageUrl } from '@/lib/portal/use-storage-url'
import { FileText } from 'lucide-react'

interface StorageImageProps {
    bucket: PrivateStorageBucket
    storedValue?: string | null
    alt: string
    className?: string
    fallbackClassName?: string
}

export function StorageImage({
    bucket,
    storedValue,
    alt,
    className,
    fallbackClassName = 'w-full h-full object-cover',
}: StorageImageProps) {
    const { url, loading } = useStorageUrl(bucket, storedValue)

    if (loading) {
        return <div className={`${className || fallbackClassName} bg-muted animate-pulse`} />
    }

    if (!url) {
        return (
            <div className={`${className || fallbackClassName} flex items-center justify-center bg-muted`}>
                <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
        )
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} className={className || fallbackClassName} />
    )
}