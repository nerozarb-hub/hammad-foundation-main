import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Hammad Foundation | Sponsor a Student in Lahore, Pakistan",
    description: "Your $30 in Houston/London/Dubai = Their entire future in Lahore. Sponsor a future doctor or engineer today. 100% transparency, direct updates.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.variable, "font-sans antialiased min-h-screen bg-white text-brand-charcoal selection:bg-brand-nero selection:text-white relative")}>
                <Header />
                {children}
                <Footer />
                <FloatingWhatsApp />
            </body>
        </html>
    );
}
