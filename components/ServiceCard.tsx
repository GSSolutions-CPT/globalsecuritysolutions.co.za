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
        <div className="glass-card-light p-6 rounded-3xl group cursor-pointer hover:border-brand-electric/40 hover:shadow-[0_10px_30px_rgba(0,229,255,0.05)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-brand-electric/10 border border-brand-electric/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-brand-electric group-hover:border-brand-electric transition-colors duration-300">
                <Icon className="w-5 h-5 text-brand-electric group-hover:text-brand-navy transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-navy group-hover:text-brand-electric transition-colors duration-300 tracking-tight">{title}</h3>
            <p className="text-brand-slate text-sm mb-5 leading-relaxed line-clamp-3 font-medium">{description}</p>
            <Link href={href} className="inline-flex items-center text-brand-electric font-bold text-xs uppercase tracking-wider hover:text-brand-navy transition-colors duration-300 cursor-pointer">
                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
        </div>
    )
}

