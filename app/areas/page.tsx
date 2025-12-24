import Link from 'next/link'
import locationData from '@/app/data/locationData.json'
import { MapPin } from 'lucide-react'

export const metadata = {
    title: 'Service Areas | Global Security Solutions',
    description: 'We provide expert security installations across the Western Cape. Find your area to learn more about our local services.',
}

export default function AreasIndexPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-24">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Areas We Service</h1>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
                    Global Security Solutions is proud to serve Durbanville, Blouberg, and the greater Western Cape area.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {locationData.map((location) => (
                        <Link
                            key={location.slug}
                            href={`/areas/${location.slug}`}
                            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all flex items-center"
                        >
                            <MapPin className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                            <span className="font-semibold text-slate-800">{location.suburb}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
