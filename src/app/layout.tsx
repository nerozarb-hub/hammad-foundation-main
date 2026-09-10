import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { siteUrls } from "@/config/ecosystem";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrls.hammad),
  title: { default: "Hammad Foundation", template: "%s | Hammad Foundation" },
  description: "Hammad Foundation is a school project of YZ Educational Services with a mission-facing school and community experience.",
  alternates: { canonical: "/" },
  openGraph: { title: "Hammad Foundation", description: "A school project of YZ Educational Services with a clear support and payment route.", type: "website", url: siteUrls.hammad },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "Hammad Foundation", url: siteUrls.hammad, publisher: { "@type": "Organization", name: "YZ Educational Services", url: siteUrls.yz } };
  return <html lang="en"><body className="relative min-h-screen bg-white font-sans text-brand-charcoal antialiased selection:bg-brand-nero selection:text-white"><a href="#main-content" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
