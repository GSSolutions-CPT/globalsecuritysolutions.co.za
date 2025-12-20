'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import Image from 'next/image'

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveDropdown(null)
        } else {
            setActiveDropdown(name)
        }
    }

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/services', label: 'Services' },
        { href: '/services#sectors', label: 'Solutions by Sector' },
        { href: '/contact', label: 'Contact Us' },
        {
            label: 'More',
            dropdown: [
                { href: '/load-shedding-security-solutions', label: 'Load Shedding Solutions' },
                { href: '/free-security-audit', label: 'Free Security Audit' },
                { href: '/ai-security-advisor', label: 'AI Security Advisor' },
                { href: '/areas', label: 'Areas We Serve' },
                { href: '/projects', label: 'Project Gallery' },
                { href: '/blog', label: 'Security Blog' },
                { href: '/faq', label: 'FAQ' },
            ]
        },
    ]

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}


            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/nav-logo.png"
                            alt="Global Security Solutions"
                            width={400}
                            height={130}
                            className="h-32 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex space-x-6 items-center">
                        {navItems.map((item, idx) => (
                            <div key={idx} className="relative group">
                                {item.dropdown ? (
                                    <button className="flex items-center text-gray-700 hover:text-blue-900 font-medium transition-colors py-2">
                                        {item.label} <ChevronDown className="w-4 h-4 ml-1" />
                                    </button>
                                ) : (
                                    <Link href={item.href!} className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                                        {item.label}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.dropdown && (
                                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-64">
                                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2">
                                            {item.dropdown.map((subItem, subIdx) => (
                                                <Link
                                                    key={subIdx}
                                                    href={subItem.href}
                                                    className={`block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 ${subItem.highlight ? 'font-bold text-blue-600 border-t border-gray-100 mt-2 pt-3' : 'text-gray-600'}`}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
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
                        className="lg:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-screen overflow-y-auto pb-20">
                    <nav className="flex flex-col p-4 space-y-2">
                        {navItems.map((item, idx) => (
                            <div key={idx}>
                                {item.dropdown ? (
                                    <div>
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-900 font-medium py-2 border-b border-gray-50"
                                        >
                                            {item.label}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                        {activeDropdown === item.label && (
                                            <div className="bg-slate-50 pl-4 py-2 space-y-2">
                                                {item.dropdown.map((subItem, subIdx) => (
                                                    <Link
                                                        key={subIdx}
                                                        href={subItem.href}
                                                        className="block text-sm text-gray-600 hover:text-blue-700 py-1"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className="block text-gray-700 hover:text-blue-900 font-medium py-2 border-b border-gray-50"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link
                                href="/contact"
                                className="block w-full bg-red-600 text-white px-5 py-3 rounded-md hover:bg-red-700 text-center font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
