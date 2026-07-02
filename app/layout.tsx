import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ConditionalHeader, ConditionalFooter, ConditionalWhatsApp } from "@/components/ConditionalMarketingUI";
import { AOSInit } from "@/components/AOSInit";
import StructuredData from "@/components/StructuredData";
import { cn } from "@/utils/cn";
import { GoogleAnalytics } from "@next/third-parties/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.globalsecuritysolutions.co.za'),
  alternates: {
    languages: {
      'en-ZA': 'https://www.globalsecuritysolutions.co.za',
    },
  },
  other: {
    'build-version': '2.0.2-BLOG-FIX-JAN14',
  },
  title: {
    default: "CCTV, Electric Fencing & Alarm Installation Cape Town | Global Security Solutions",
    template: "%s | Global Security Solutions",
  },
  description: "Cape Town's trusted owner-managed installer. Certified Nemtek electric fencing, Hikvision AI CCTV, AJAX/Paradox alarms with load shedding backups. Free risk assessment & quote.",
  openGraph: {
    title: {
      default: "Security Installation Cape Town | Electric Fencing, CCTV, Alarms",
      template: "%s | Global Security Solutions",
    },
    description: "Expert security systems for homes, estates & businesses in the Western Cape. Owner-supervised installs by Kyle Cass. Free on-site assessment.",
    url: 'https://www.globalsecuritysolutions.co.za',
    siteName: 'Global Security Solutions',
    images: [
      {
        url: 'https://www.globalsecuritysolutions.co.za/nav-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Global Security Solutions - CCTV & Electric Fencing Installation Cape Town',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: "Global Security Solutions | Cape Town CCTV, Fencing & Alarms",
      template: "%s | Global Security Solutions",
    },
    description: "Professional security installations across Cape Town and Western Cape. Free risk assessment.",
    images: ['https://www.globalsecuritysolutions.co.za/nav-logo-final.png'],
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
      <head>
        <link rel="preload" href="/nav-logo-final.png" as="image" type="image/png" fetchpriority="high" />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm_start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </head>
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

