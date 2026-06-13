import type { Metadata } from 'next'
import { SectorsClient } from './SectorsClient'

export const metadata: Metadata = {
    title: 'Security Solutions by Sector | Residential, Farms, Estates, Schools & Commercial Cape Town',
    description: 'Bespoke security for Durbanville homes, Stellenbosch farms, Cape Town estates, schools and businesses. Owner-managed, load-shedding ready, certified installations.',
    alternates: {
        canonical: 'https://globalsecuritysolutions.co.za/sectors',
    },
}


export default function SectorsPage() {
    return <SectorsClient />
}
