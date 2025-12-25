import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AOSInit } from "@/components/AOSInit";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/utils/cn";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://globalsecuritysolutions.co.za'),
  title: {
    default: "Security System Installations Cape Town | Global Security Solutions",
    template: "%s | Global Security Solutions",
  },
  description: "Expert security system installations in Cape Town. We offer alarms, CCTV, and electric fencing. Get a free quote today from Global Security Solutions.",
  openGraph: {
    title: "Security System Installations Cape Town | Global Security Solutions",
    description: "Expert security system installations in Cape Town. We offer alarms, CCTV, and electric fencing. Get a free quote today from Global Security Solutions.",
    url: 'https://globalsecuritysolutions.co.za',
    siteName: 'Global Security Solutions',
    images: [
      {
        url: 'https://globalsecuritysolutions.co.za/nav-logo-final.png', // Default OG Image
        width: 1200,
        height: 630,
        alt: 'Global Security Solutions',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Global Security Solutions | Cape Town Security Experts",
    description: "Expert security system installations in Cape Town. Alarms, CCTV, and electric fencing.",
    images: ['/nav-logo-final.png'],
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
        <JsonLd />
        <AOSInit />
        <Header />
        <main className="flex-grow min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
