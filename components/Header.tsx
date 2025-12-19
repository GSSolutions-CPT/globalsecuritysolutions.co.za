'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { cn } from '@/utils/cn'
import Image from 'next/image'

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/services', label: 'Services' },
        { href: '/areas', label: 'Areas' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="bg-blue-900 text-white py-2 text-sm hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <a href="mailto:sales@globalsecuritysolutions.co.za" className="flex items-center hover:text-blue-200">
                            <Mail className="w-4 h-4 mr-2" /> sales@globalsecuritysolutions.co.za
                        </a>
                        <a href="https://wa.me/27629558559" className="flex items-center hover:text-blue-200">
                            <Phone className="w-4 h-4 mr-2" /> 062 955 8559
                        </a>
                    </div>
                    <div className="font-semibold">Professional Security Installations Cape Town</div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 text-blue-900">
                        <Image src="/logo.png" alt="Global Security Solutions Logo" width={50} height={50} className="w-12 h-12 object-contain" />
                        <span className="text-xl md:text-2xl font-bold tracking-tight">Global Security Solutions</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-blue-900 font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors font-bold shadow-sm"
                        >
                            Get a Quote
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
                    <nav className="flex flex-col p-4 space-y-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-blue-900 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 text-center font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Get a Quote
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
