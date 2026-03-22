import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ConditionalHeader, ConditionalFooter, ConditionalWhatsApp } from "@/components/ConditionalMarketingUI";
import { AOSInit } from "@/components/AOSInit";
import StructuredData from "@/components/StructuredData";
import { cn } from "@/utils/cn";
import Script from "next/script";

import { GoogleAnalytics } from '@next/third-parties/google';

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://globalsecuritysolutions.co.za'),
  alternates: {
    canonical: 'https://globalsecuritysolutions.co.za',
    languages: {
      'en-ZA': 'https://globalsecuritysolutions.co.za',
    },
  },
  other: {
    'build-version': '2.0.2-BLOG-FIX-JAN14',
  },
  title: {
    default: "Premium Security System Installations Cape Town | Global Security Solutions",
    template: "%s | Global Security Solutions",
  },
  description: "Cape Town's trusted security experts. We install AI-powered CCTV, smart alarms, and off-grid security systems. Get a free risk assessment today.",
  openGraph: {
    title: {
      default: "Security System Installations Cape Town | Global Security Solutions",
      template: "%s | Global Security Solutions",
    },
    description: "Expert security system installations in Cape Town. We offer alarms, CCTV, and electric fencing. Get a free quote today from Global Security Solutions.",
    url: 'https://globalsecuritysolutions.co.za',
    siteName: 'Global Security Solutions',
    images: [
      {
        url: 'https://globalsecuritysolutions.co.za/nav-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Global Security Solutions Cape Town',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: "Global Security Solutions | Cape Town Security Experts",
      template: "%s | Global Security Solutions",
    },
    description: "Expert security system installations in Cape Town by certified professionals.",
    images: ['https://globalsecuritysolutions.co.za/nav-logo-final.png'],
    creator: "@globalsecurityza",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("min-h-screen bg-background font-sans antialiased", montserrat.variable)}>
        <GoogleAnalytics gaId="G-LM5YX7EWWH" />
        <StructuredData />
        <AOSInit />
        <ConditionalHeader />
        <main className="flex-grow min-h-screen">
          {children}
        </main>
        <ConditionalFooter />
        <ConditionalWhatsApp />
        <ScrollToTop />
      </body>
    </html>
  );
}
