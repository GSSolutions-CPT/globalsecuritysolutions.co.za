import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'


interface ServiceCardProps {
    title: string
    description: string
    href: string
    icon?: React.ElementType
}

export function ServiceCard({ title, description, href, icon: Icon = ShieldCheck }: ServiceCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-brand-steel/20 hover:shadow-xl transition-shadow group">
            <div className="w-12 h-12 bg-brand-electric/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-electric transition-colors">
                <Icon className="w-6 h-6 text-brand-electric group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-navy group-hover:text-brand-electric transition-colors">{title}</h3>
            <p className="text-brand-slate mb-4 line-clamp-3">{description}</p>
            <Link href={href} className="inline-flex items-center text-brand-electric font-semibold hover:text-brand-navy transition-colors">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    )
}
