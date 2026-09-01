import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { siteUrls } from "@/config/ecosystem";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrls.hammad),
  title: { default: "Hammad Foundation", template: "%s | Hammad Foundation" },
  description: "A Lahore education initiative supported operationally by YZ Educational Services.",
  alternates: { canonical: "/" },
  openGraph: { title: "Hammad Foundation", description: "A Lahore education initiative supported operationally by YZ Educational Services.", type: "website", url: siteUrls.hammad },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "Hammad Foundation", url: siteUrls.hammad, publisher: { "@type": "Organization", name: "YZ Educational Services", url: siteUrls.yz } };
  return <html lang="en"><body className={cn(inter.variable, "relative min-h-screen bg-white font-sans text-brand-charcoal antialiased selection:bg-brand-nero selection:text-white")}><a href="#main-content" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
