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
        {
            label: 'Services',
            dropdown: [
                { href: '/services/residential-security', label: 'Residential Security' },
                { href: '/services/commercial-security', label: 'Commercial Security' },
                { href: '/services/industrial-security', label: 'Industrial & Farm' },
                { href: '/services/alarm-system-installation', label: 'Alarm Systems' },
                { href: '/services/cctv-surveillance-systems', label: 'CCTV Surveillance' },
                { href: '/services/access-control-solutions', label: 'Access Control' },
                { href: '/services/electric-fence-installations', label: 'Electric Fencing' },
                { href: '/services/gate-and-garage-automation', label: 'Gate Automation' },
                { href: '/services', label: 'View All Services', highlight: true },
            ]
        },
        {
            label: 'Areas We Serve',
            dropdown: [
                // Categorized roughly based on list for now, pointing to specific popular suburbs or areas page
                { href: '/areas/durbanville-security-services', label: 'Northern Suburbs (Durbanville)' },
                { href: '/areas/milnerton-security-services', label: 'West Coast (Milnerton/Blouberg)' },
                { href: '/areas/camps-bay-security-services', label: 'Atlantic Seaboard' },
                { href: '/areas/somerset-west-security-services', label: 'Somerset West / Helderberg' },
                { href: '/areas', label: 'View All Areas', highlight: true },
            ]
        },
        {
            label: 'Resources',
            dropdown: [
                { href: '/projects', label: 'Project Gallery' },
                { href: '/load-shedding-security-solutions', label: 'Load Shedding Solutions' },
                { href: '/ai-security-advisor', label: 'AI Security Advisor' },
                { href: '/free-security-audit', label: 'Free Security Audit' },
                { href: '/blog', label: 'Security Blog' },
                { href: '/faq', label: 'FAQ' },
            ]
        },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}
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

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2 text-blue-900">
                        <Image src="/logo.png" alt="Global Security Solutions Logo" width={50} height={50} className="w-12 h-12 object-contain" />
                        <span className="text-xl md:text-2xl font-bold tracking-tight">Global Security Solutions</span>
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
