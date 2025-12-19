import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ServiceCardProps {
    title: string
    description: string
    href: string
    icon?: React.ElementType
}

export function ServiceCard({ title, description, href, icon: Icon = ShieldCheck }: ServiceCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100 hover:shadow-xl transition-shadow group">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-600 mb-4 line-clamp-3">{description}</p>
            <Link href={href} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    )
}
