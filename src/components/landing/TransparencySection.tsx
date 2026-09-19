"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ChevronDown, ChevronUp, ExternalLink, MessageCircle, Building2 } from "lucide-react";

export function TransparencySection() {
  const [expanded, setExpanded] = useState(false);

  const corporateFacts = [
    {
      label: "Project Relationship",
      value: "Hammad Foundation",
      sub: "A named school project of YZ Educational Services",
    },
    {
      label: "Payment Identity",
      value: "YZ Educational Services",
      sub: "Payments received by YZ and designated for Hammad Foundation",
    },
    {
      label: "SECP Corporate Record",
      value: "CUIN 0326364",
      sub: "SECP registration for YZ Educational Services (Private) Limited",
    },
    {
      label: "Evidence Standard",
      value: "Review Before Publication",
      sub: "All claims, updates, receipts, and learner media require supporting evidence",
    },
  ];

  const evidenceRegister = [
    {
      title: "Project updates",
      description: "School and programme updates published after internal review and verification.",
    },
    {
      title: "Payment records",
      description: "All transaction records handled and stored securely through YZ Educational Services.",
    },
    {
      title: "Source evidence",
      description: "Supporting documents and vendor receipts retained by the responsible operator.",
    },
    {
      title: "Safeguarding review",
      description: "Learner media and student profiles reviewed and consented prior to publication.",
    },
  ];

  return (
    <section id="transparency" className="py-20 md:py-28 bg-brand-gray-50 border-t border-brand-charcoal/5">
      <div className="container max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-4 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Institutional Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-3">
            Clear Governance &amp; Verified Records
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/70 font-medium">
            Hammad Foundation communicates the mission-facing school project. YZ Educational Services provides the parent operating and payment layer.
          </p>
        </div>

        {/* Clean 4-Item Corporate Governance Card */}
        <div className="bg-white rounded-3xl border border-brand-charcoal/10 p-8 sm:p-10 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {corporateFacts.map((fact) => (
              <div
                key={fact.label}
                className="p-5 rounded-2xl bg-brand-gray-50/80 border border-brand-charcoal/5 space-y-1"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/50">
                  {fact.label}
                </p>
                <p className="text-lg font-black text-brand-charcoal">{fact.value}</p>
                <p className="text-xs font-medium leading-relaxed text-brand-charcoal/70">
                  {fact.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-brand-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-brand-charcoal/70">
              <Building2 size={16} className="text-brand-nero" />
              <span>Campus: Opposite Garrison Shooting Gallery, Barki Road, Lahore</span>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 font-bold text-brand-nero hover:underline cursor-pointer"
            >
              <span>{expanded ? "Hide Evidence Register" : "View Full Evidence Register"}</span>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Expandable Register */}
          {expanded && (
            <div className="mt-6 pt-6 border-t border-brand-charcoal/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {evidenceRegister.map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-brand-charcoal/10 bg-white flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-nero/10 text-brand-nero flex items-center justify-center shrink-0 mt-0.5">
                    <FileText size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-charcoal">{item.title}</p>
                    <p className="text-[11px] text-brand-charcoal/70 leading-relaxed mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compact Hotline Callout */}
        <div className="bg-brand-charcoal rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-widest text-brand-nero mb-1">
              Direct Inquiries
            </p>
            <h3 className="text-xl sm:text-2xl font-[900] tracking-tight text-white">
              Questions About Records or Campus Visits?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
              Contact the school team on Barki Road for campus arrangements or text Sir Ali Choudhary directly.
            </p>
          </div>

          <a
            href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20have%20a%20question%20about%20Hammad%20Foundation%20records."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-brand-nero hover:bg-brand-nero/90 text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow transition-colors"
          >
            <MessageCircle size={17} />
            <span>WhatsApp Campus Team</span>
          </a>
        </div>
      </div>
    </section>
  );
}
