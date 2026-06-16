'use client'

import { useEffect, useState } from 'react'
import { PrivateStorageBucket, resolveStorageUrl } from '@/lib/portal/storage'

export function useStorageUrl(bucket: PrivateStorageBucket, storedValue?: string | null) {
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState(Boolean(storedValue))
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function loadUrl() {
            if (!storedValue) {
                setUrl('')
                setLoading(false)
                setError(null)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const resolved = await resolveStorageUrl(bucket, storedValue)
                if (!cancelled) {
                    setUrl(resolved)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load file')
                    setUrl(storedValue.startsWith('http') ? storedValue : '')
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        loadUrl()

        return () => {
            cancelled = true
        }
    }, [bucket, storedValue])

    return { url, loading, error }
}