import type { Metadata } from 'next'
import { SectorsClient } from './SectorsClient'

export const metadata: Metadata = {
    title: 'Security Sectors | Global Security Solutions',
    description: 'Specialized security solutions for residential, commercial, industrial, agricultural, and estate sectors in Cape Town.',
}

export default function SectorsPage() {
    return <SectorsClient />
}
