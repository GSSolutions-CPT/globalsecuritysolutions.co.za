'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    if (!items || items.length === 0) return null

    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 w-full overflow-hidden">
                <li className="inline-flex items-center flex-shrink-0">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center min-w-0">
                        <ChevronRight className="w-4 h-4 text-slate-400 mx-1 flex-shrink-0" />
                        {index === items.length - 1 ? (
                            <span className="ml-1 text-sm font-bold text-slate-800 truncate block max-w-[200px] md:max-w-none">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="ml-1 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors truncate block max-w-[150px] md:max-w-none">
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
