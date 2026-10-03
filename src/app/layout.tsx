import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { siteUrls } from "@/config/ecosystem";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrls.hammad),
  title: { default: "Hammad Foundation", template: "%s | Hammad Foundation" },
  description: "Hammad Foundation helps people access education and supports a school community in Lahore. YZ Educational Services operates the school project and receives payments.",
  alternates: { canonical: "/" },
  openGraph: { title: "Hammad Foundation", description: "Helping people access education, with a Lahore school community and a clear support route.", type: "website", url: siteUrls.hammad },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "WebSite", name: "Hammad Foundation", url: siteUrls.hammad, publisher: { "@type": "Organization", name: "YZ Educational Services", url: siteUrls.yz } };
  return <html lang="en"><body className="relative min-h-screen bg-brand-sand font-sans text-brand-charcoal antialiased selection:bg-brand-nero selection:text-white"><a href="#main-content" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
