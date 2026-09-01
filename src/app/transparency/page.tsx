import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle2, Lock, Eye, Download, MessageCircle } from "lucide-react";
import { TransparencyGrid } from "@/components/landing/TransparencyGrid";

export const metadata: Metadata = {
  title: "Transparency & Governance | Hammad Foundation",
  description: "Official legal registrations, BISE Lahore accreditation, FBR tax status, and open-book financial records for Hammad Foundation.",
  alternates: { canonical: "/transparency" },
};

export default function TransparencyPage() {
  const credentials = [
    {
      title: "SECP Legal Registration",
      number: "CUIN / Reg: 0192839",
      body: "Securities and Exchange Commission of Pakistan",
      desc: "Incorporated and operating under official regulatory oversight.",
    },
    {
      title: "BISE Lahore Accreditation",
      number: "School Code: LHR-09",
      body: "Board of Intermediate & Secondary Education",
      desc: "Fully accredited Matriculation high school examination center.",
    },
    {
      title: "FBR Tax Compliance",
      number: "NTN: 827364-1",
      body: "Federal Board of Revenue, Pakistan",
      desc: "100% Zakat-eligible education welfare fund.",
    },
    {
      title: "Operational & Payment Gateway",
      number: "CUIN: 0326364",
      body: "YZ Educational Services (Pvt) Ltd",
      desc: "SECP-registered corporate entity managing secure payment processing.",
    },
  ];

  const pillars = [
    {
      title: "100% Direct Impact Allocation",
      desc: "Every single dollar received through student sponsorships is allocated strictly to school operations: student tuition, teacher payroll, fresh hot lunches, textbooks, and free bus transit.",
    },
    {
      title: "Monthly Scanned Proof & Receipts",
      desc: "We log and scan all supplier and school invoices—from textbook purchases to cafeteria flour and cooking oil—maintaining a real-time audited ledger.",
    },
    {
      title: "Weekly Direct WhatsApp Videos",
      desc: "Guardians receive direct, unfiltered video clips and examination report cards of their sponsored student rather than generic marketing brochures.",
    },
    {
      title: "Open-Door Campus Policy",
      desc: "Our campus doors on Barki Road, Lahore are open to all donors and community members Monday through Saturday without requiring prior formal notice.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Open-Book Accountability
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            Radical Transparency
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">
            We believe that charities must prove every dollar. Here are our legal registrations, academic accreditations, and operational standards.
          </p>
        </div>

        {/* Credentials 4-Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {credentials.map((c, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-brand-charcoal/10 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-brand-nero uppercase tracking-widest">
                  {c.title}
                </span>
                <ShieldCheck className="text-brand-nero w-5 h-5" />
              </div>
              <h3 className="text-xl font-[900] text-brand-charcoal">
                {c.number}
              </h3>
              <p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider">
                {c.body}
              </p>
              <p className="text-xs md:text-sm text-brand-charcoal/70 pt-2 border-t border-brand-charcoal/5 leading-relaxed font-medium">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 4 Pillars of Open Operations */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight mb-8 text-center">
            Our 4 Core Transparency Commitments
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-nero/10 text-brand-nero flex items-center justify-center font-black text-xs shrink-0">
                    0{i + 1}
                  </div>
                  <h3 className="font-black text-brand-charcoal text-base md:text-lg">{p.title}</h3>
                </div>
                <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-medium pl-11">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time financial log component */}
        <TransparencyGrid />

        {/* Director Contact Box */}
        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6 mt-16">
          <h3 className="text-2xl md:text-3xl font-[900] tracking-tight">
            Have Questions About Any Record?
          </h3>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base font-medium">
            Contact Director Sir Ali Choudhary directly on WhatsApp. We provide scanned source records, bank statements, and live classroom verification upon request.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20have%20questions%20about%20the%20foundation's%20transparency%20records."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand h-14 px-8 text-sm font-black rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={18} /> Message Sir Ali Directly
            </a>
            <Link
              href="/how-we-are-structured"
              className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold inline-flex items-center justify-center border border-white/20 transition-colors"
            >
              View Ecosystem Structure &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
