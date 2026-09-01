import type { Metadata } from "next";
import { ContactSection } from "@/components/landing/ContactSection";
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Visit Us | Hammad Foundation Lahore",
  description: "Contact Sir Ali Choudhary or visit Hammad Foundation Girls High School on Barki Road, Lahore. Phone, WhatsApp, email, and location.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Direct Communication
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            Contact &amp; Visit Campus
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium max-w-2xl">
            We operate with complete open doors. Reach out directly to leadership or visit our high school on Barki Road, Lahore.
          </p>
        </div>

        <ContactSection />
      </div>
    </div>
  );
}
