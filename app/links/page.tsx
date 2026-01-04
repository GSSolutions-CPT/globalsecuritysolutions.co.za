'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Globe, MessageCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';

const links = [
    {
        title: 'Visit our Website',
        url: '/',
        icon: Globe,
        color: 'bg-blue-600 hover:bg-blue-700',
        description: 'Explore our full range of security solutions',
    },
    {
        title: 'WhatsApp Us',
        url: 'https://wa.me/27629558559',
        icon: MessageCircle,
        color: 'bg-green-500 hover:bg-green-600',
        description: 'Chat directly with our support team',
    },
    {
        title: 'Call Us Now',
        url: 'tel:+27629558559',
        icon: Phone,
        color: 'bg-slate-700 hover:bg-slate-800',
        description: 'Immediate assistance: 062 955 8559',
    },
    {
        title: 'Like us on Facebook',
        url: 'https://www.facebook.com/globalsecuritysolutionscpt',
        icon: Facebook,
        color: 'bg-[#1877F2] hover:bg-[#166fe5]',
    },
    {
        title: 'Follow us on Instagram',
        url: 'https://www.instagram.com/globalsecuritysolutionscpt',
        icon: Instagram,
        color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90',
    },
    {
        title: 'Connect on LinkedIn',
        url: 'https://www.linkedin.com/company/global-security-solutions-cape-town',
        icon: Linkedin,
        color: 'bg-[#0077b5] hover:bg-[#006fa3]',
    },
    {
        title: 'Email Sales',
        url: 'mailto:sales@globalsecuritysolutions.co.za',
        icon: Mail,
        color: 'bg-slate-600 hover:bg-slate-700',
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

export default function LinksPage() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 z-10"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md z-10 flex flex-col items-center"
            >
                {/* Profile / Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-white p-2 shadow-xl ring-4 ring-blue-500/30 overflow-hidden">
                        <Image
                            src="/nav-logo-final.png" // Using the nav logo as it seemed appropriate
                            alt="Global Security Solutions"
                            fill
                            className="object-contain p-1"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Global Security Solutions
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 max-w-[80%] mx-auto">
                        Expert Security System Installations in Cape Town
                    </p>
                </motion.div>

                {/* Links Section */}
                <div className="w-full space-y-4">
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            variants={itemVariants}
                            href={link.url}
                            target={link.url.startsWith('/') || link.url.startsWith('mailto') || link.url.startsWith('tel') ? undefined : '_blank'}
                            rel={link.url.startsWith('/') || link.url.startsWith('mailto') || link.url.startsWith('tel') ? undefined : 'noopener noreferrer'}
                            className={cn(
                                "relative group w-full flex items-center p-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden",
                                link.color
                            )}
                        >
                            {/* Shine Effect */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

                            <div className="mr-4 p-2 bg-white/20 rounded-lg backdrop-blur-sm shrink-0">
                                <link.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-grow text-left">
                                <h3 className="font-bold text-white text-base md:text-lg">{link.title}</h3>
                                {link.description && (
                                    <p className="text-white/80 text-xs md:text-sm">{link.description}</p>
                                )}
                            </div>
                            <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                        </motion.a>
                    ))}
                </div>

                {/* Footer Section */}
                <motion.div variants={itemVariants} className="mt-12 text-center text-slate-500 text-xs">
                    <p>&copy; {currentYear} Global Security Solutions.</p>
                    <Link href="/" className="hover:text-blue-400 transition-colors mt-2 inline-block">
                        globalsecuritysolutions.co.za
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
