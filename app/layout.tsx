import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AOSInit } from "@/components/AOSInit";
import { cn } from "@/utils/cn";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Security System Installations Cape Town | Global Security Solutions",
  description: "Expert security system installations in Cape Town. We offer alarms, CCTV, and electric fencing. Get a free quote today from Global Security Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("min-h-screen bg-background font-sans antialiased", montserrat.variable)}>
        <AOSInit />
        <Header />
        <main className="flex-grow min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
