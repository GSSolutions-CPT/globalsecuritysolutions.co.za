import { supabase } from '@/lib/portal/supabase'

export const PRIVATE_STORAGE_BUCKETS = {
    PAYMENT_PROOFS: 'payment-proofs',
    RECEIPTS: 'receipts',
    JOB_ATTACHMENTS: 'job-attachments',
    INSTALLATION_PHOTOS: 'installation-photos',
    SITE_PLANS: 'site-plans',
} as const

export type PrivateStorageBucket = typeof PRIVATE_STORAGE_BUCKETS[keyof typeof PRIVATE_STORAGE_BUCKETS]

const DEFAULT_SIGNED_URL_TTL_SECONDS = 60 * 60

export function extractStoragePath(bucket: string, storedValue: string): string {
    if (!storedValue) return ''
    if (!storedValue.startsWith('http')) return storedValue

    const markers = [
        `/object/public/${bucket}/`,
        `/object/sign/${bucket}/`,
        `/object/authenticated/${bucket}/`,
        `/${bucket}/`,
    ]

    for (const marker of markers) {
        const index = storedValue.indexOf(marker)
        if (index !== -1) {
            return storedValue.substring(index + marker.length).split('?')[0]
        }
    }

    return storedValue
}

export async function uploadPrivateFile(
    bucket: PrivateStorageBucket,
    path: string,
    file: File | Blob
): Promise<string> {
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false })
    if (error) throw error
    return path
}

export async function resolveStorageUrl(
    bucket: PrivateStorageBucket,
    storedValue?: string | null,
    expiresIn = DEFAULT_SIGNED_URL_TTL_SECONDS
): Promise<string> {
    if (!storedValue) return ''
    if (storedValue.startsWith('data:')) return storedValue

    const path = extractStoragePath(bucket, storedValue)
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn)

    if (!error && data?.signedUrl) {
        return data.signedUrl
    }

    if (storedValue.startsWith('http')) {
        return storedValue
    }

    throw error || new Error(`Unable to resolve storage URL for ${bucket}/${path}`)
}

export async function deleteStorageFile(
    bucket: PrivateStorageBucket,
    storedValue?: string | null
): Promise<void> {
    if (!storedValue || storedValue.startsWith('data:')) return

    const path = extractStoragePath(bucket, storedValue)
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) throw error
}

export async function openStorageFile(
    bucket: PrivateStorageBucket,
    storedValue: string,
    filename?: string
): Promise<void> {
    const url = await resolveStorageUrl(bucket, storedValue)
    const link = document.createElement('a')
    link.href = url
    if (filename) link.download = filename
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}