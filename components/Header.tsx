'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SubItem {
    href: string;
    label: string;
    highlight?: boolean;
}

interface NavItem {
    href?: string;
    label: string;
    dropdown?: SubItem[];
}

const navItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/sectors', label: 'Solutions by Sector' },
    { href: '/contact', label: 'Contact Us' },
    {
        label: 'More',
        dropdown: [
            { href: '/brands-we-install', label: 'Brands We Install' },
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

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const pathname = usePathname()

    // Hover state for desktop dropdown
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY
                
                // Determine if we've scrolled past the hero completely to swap colors
                setIsScrolled(currentScrollY > 50)
                
                // Hide header when scrolling down past 300px, show when scrolling up
                if (currentScrollY > lastScrollY && currentScrollY > 300) {
                    setIsVisible(false)
                } else {
                    setIsVisible(true)
                }
                
                setLastScrollY(currentScrollY)
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true })
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    const toggleMobileDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name)
    }

    // Determine base colors depending on scroll state (inverts if we are at the very top of the page on dark hero)
    const navTextColor = isScrolled ? 'text-gray-700 hover:text-brand-navy' : 'text-white/90 hover:text-white drop-shadow-sm'
    const activeNavColor = isScrolled ? 'text-brand-electric font-bold' : 'text-brand-electric font-bold drop-shadow-md'
    const iconColor = isScrolled ? 'text-gray-700' : 'text-white/90'

    return (
        <header 
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out",
                isVisible ? "translate-y-0" : "-translate-y-full",
                isScrolled 
                    ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-gray-200/50 py-3" 
                    : "bg-gradient-to-b from-brand-navy/80 via-brand-navy/30 to-transparent py-6"
            )}
        >
            <div className="container mx-auto px-5 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center relative z-50 group">
                        <div className="w-[140px] h-10"></div>
                        <Image
                            src="/nav-logo-final.png"
                            alt="Global Security Solutions"
                            width={300}
                            height={100}
                            className={cn(
                                "absolute top-[-10px] left-0 h-16 w-auto object-contain max-w-none transition-transform duration-500 group-hover:scale-105 origin-left",
                                !isScrolled && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                            )}
                            priority
                            fetchPriority="high"
                            sizes="(max-width: 768px) 120px, 200px"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-6 items-center">
                        {navItems.map((item, idx) => (
                            <div 
                                key={idx} 
                                className="relative"
                                onMouseEnter={() => item.dropdown && setHoveredDropdown(item.label)}
                                onMouseLeave={() => item.dropdown && setHoveredDropdown(null)}
                            >
                                {item.dropdown ? (
                                    <button className={cn("flex items-center text-sm font-semibold transition-colors py-2 group", 
                                        pathname?.startsWith('/NON-EXISTENT') ? activeNavColor : navTextColor
                                    )}>
                                        {item.label} 
                                        <ChevronDown className={cn("w-4 h-4 ml-1 transition-transform duration-300", hoveredDropdown === item.label && "rotate-180")} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className={cn(
                                            "text-sm font-semibold transition-colors relative py-1",
                                            "after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-brand-electric after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                                            pathname === item.href ? cn(activeNavColor, "after:scale-x-100") : navTextColor
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )}

                                {/* Desktop Dropdown with Framer Motion */}
                                <AnimatePresence>
                                    {item.dropdown && hoveredDropdown === item.label && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2 } }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-64 origin-top"
                                        >
                                            <div className="bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100/50 overflow-hidden ring-1 ring-black/5">
                                                <div className="py-3 uppercase text-[10px] font-black tracking-widest text-brand-steel px-5 border-b border-gray-50 bg-gray-50/50">Explore</div>
                                                <div className="py-2">
                                                    {item.dropdown.map((subItem, subIdx) => (
                                                        <Link
                                                            key={subIdx}
                                                            href={subItem.href}
                                                            className={cn(
                                                                "block px-5 py-2.5 text-sm font-medium transition-all duration-200",
                                                                subItem.highlight 
                                                                    ? "text-brand-electric border-t border-gray-50/50 mt-1 pt-3 bg-brand-electric/5 hover:bg-brand-electric/15 font-bold" 
                                                                    : "text-gray-600 hover:text-brand-navy hover:bg-gray-50/80 hover:pl-6" // hover push effect
                                                            )}
                                                            onClick={() => setHoveredDropdown(null)}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <div className="flex items-center gap-4 pl-4 border-l border-white/20">
                            <Link
                                href="/portal/login"
                                className={cn(
                                    "text-sm font-bold transition-all duration-300 rounded-full px-5 py-2 ring-1 ring-inset active:scale-95",
                                    isScrolled 
                                        ? "text-brand-navy ring-brand-navy border-brand-navy/20 hover:bg-brand-navy hover:text-white" 
                                        : "text-white ring-white/30 hover:bg-white hover:text-brand-navy"
                                )}
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/contact"
                                className="relative group overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white text-sm px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-500/25 transition-all duration-300 active:scale-95 hover:shadow-red-500/40"
                            >
                                {/* Shine Effect */}
                                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-white/20 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                                Get a Quote
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={cn("lg:hidden p-2 rounded-lg transition-colors", iconColor, isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10")}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like ease
                        className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-3xl shadow-2xl border-t border-gray-100 overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 space-y-2 h-full overflow-y-auto pb-40">
                            <div className="text-[10px] font-black uppercase text-brand-steel tracking-[0.2em] mb-4">Menu</div>
                            
                            {navItems.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (idx * 0.05) }}
                                >
                                    {item.dropdown ? (
                                        <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100/50">
                                            <button
                                                onClick={() => toggleMobileDropdown(item.label)}
                                                className="flex items-center justify-between w-full text-left font-bold text-brand-navy p-4"
                                            >
                                                {item.label}
                                                <motion.div animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}>
                                                    <ChevronDown className="w-5 h-5 text-brand-electric" />
                                                </motion.div>
                                            </button>
                                            
                                            <AnimatePresence>
                                                {activeDropdown === item.label && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="bg-white/50"
                                                    >
                                                        <div className="px-5 pb-4 pt-1 flex flex-col space-y-4">
                                                            {item.dropdown.map((subItem, subIdx) => (
                                                                <Link
                                                                    key={subIdx}
                                                                    href={subItem.href}
                                                                    className="text-sm font-medium text-gray-600 hover:text-brand-electric"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            className={cn(
                                                "block font-bold p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 transition-colors",
                                                pathname === item.href || (pathname?.startsWith(item.href!) && item.href !== '/') 
                                                    ? "text-brand-electric ring-1 ring-brand-electric/20 bg-brand-electric/5" 
                                                    : "text-brand-navy hover:bg-gray-100"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pt-8 space-y-4"
                            >
                                <Link
                                    href="/portal/login"
                                    className="block w-full text-brand-navy border-2 border-brand-navy hover:bg-brand-navy hover:text-white px-6 py-4 text-lg rounded-2xl text-center font-bold active:scale-95 duration-200 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Portal Sign In
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block w-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-xl shadow-red-500/20 px-6 py-4 text-lg rounded-2xl text-center font-black active:scale-95 duration-200 transition-transform"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get a Free Quote
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
