import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ShieldCheck, ArrowRight, CheckCircle2, ArrowDown, ExternalLink } from "lucide-react";
import { siteUrls } from "@/config/ecosystem";

export const metadata: Metadata = {
  title: "How We Are Structured | Hammad Foundation & YZ Educational Services",
  description: "Detailed institutional architecture: the operational partnership between Hammad Foundation and YZ Educational Services (Pvt) Ltd.",
  alternates: { canonical: "/how-we-are-structured" },
};

export default function HowWeAreStructuredPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Institutional Architecture
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            How We Are Structured
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">
            Clear boundaries, corporate accountability, and direct on-the-ground execution. How Hammad Foundation and YZ Educational Services operate together.
          </p>
        </div>

        {/* 2 Entity Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Hammad Foundation Card */}
          <div className="bg-white p-8 rounded-3xl border border-brand-charcoal/10 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-nero bg-brand-nero/10 px-3 py-1 rounded-full">
                On-The-Ground Initiative
              </span>
              <h2 className="text-2xl font-[900] text-brand-charcoal">
                Hammad Foundation
              </h2>
              <p className="text-sm text-brand-charcoal/70 font-medium leading-relaxed">
                The community education initiative operating <strong>Hammad Foundation Girls High School</strong> on Barki Road, Lahore.
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-brand-charcoal/5 text-xs md:text-sm font-semibold text-brand-charcoal">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>500+ Active Female Students</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>BISE Lahore Board Code: LHR-09</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Daily Hot Lunch &amp; Free Bus Fleet</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>18 Certified Full-Time Teachers</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-brand-charcoal/10 mt-6">
              <p className="text-xs font-bold text-brand-charcoal/50">
                Focus: Student learning, welfare, nutrition, and daily school operations.
              </p>
            </div>
          </div>

          {/* YZ Educational Services Card */}
          <div className="bg-brand-charcoal text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-brand-nero bg-brand-nero/20 px-3 py-1 rounded-full">
                Corporate &amp; Governance Umbrella
              </span>
              <h2 className="text-2xl font-[900] text-white">
                YZ Educational Services (Pvt) Ltd
              </h2>
              <p className="text-sm text-white/70 font-medium leading-relaxed">
                An incorporated private company limited by shares registered with the Securities and Exchange Commission of Pakistan (SECP).
              </p>
              <ul className="space-y-2.5 pt-4 border-t border-white/10 text-xs md:text-sm font-semibold text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>SECP Registration CUIN: 0326364</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Institutional Banking &amp; PayPro Gateway</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Commercial Invoicing &amp; Audited Data Room</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>12+ Years Corporate Track Record</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-white/10 mt-6">
              <a
                href={siteUrls.yz}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-brand-nero hover:underline"
              >
                Visit YZ Educational Services Corporate Portal <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Why this structure protects donors */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm space-y-6 text-brand-charcoal text-sm md:text-base font-medium leading-relaxed mb-16">
          <h2 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight">
            Why This Structure Protects Donors &amp; Students
          </h2>
          <p>
            In Pakistan, informal community initiatives often face immense administrative hurdles with international payment processing, corporate banking verifications, and compliance reporting.
          </p>
          <p>
            By establishing this strategic partnership, <strong>YZ Educational Services (Private) Limited</strong> provides the rigorous legal, financial, and technological infrastructure necessary to process global credit card and local PayPro payments securely. 
          </p>
          <div className="p-6 bg-brand-gray-50 rounded-2xl border border-brand-charcoal/10 space-y-2">
            <h3 className="font-black text-brand-charcoal text-base">Key Operational Guarantees:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-brand-charcoal/80">
              <li>Payments are processed through regulated banking channels with official commercial descriptors.</li>
              <li>100% of funds allocated for student sponsorships go directly to school campus operational costs.</li>
              <li>Financial records and receipts are scanned and archived into the public data room for continuous auditability.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-nero text-white rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight">
            Support Our Students with Full Confidence
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base font-medium">
            Join 124 Guardians providing direct tuition and hot meals to students in Lahore.
          </p>
          <div className="pt-2">
            <Link
              href="/#donate"
              className="btn-brand h-14 px-8 bg-white text-brand-charcoal hover:bg-white/95 rounded-2xl font-black text-sm md:text-base inline-flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              Become a Guardian &rarr; $30/mo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
