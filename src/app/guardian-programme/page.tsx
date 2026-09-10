import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { paymentDisclosure, relationshipDisclosure, supportOptions, siteUrls } from "@/config/ecosystem";

export const metadata: Metadata = {
  title: "Support Programme | Hammad Foundation",
  description: "Support options for Hammad Foundation through YZ Educational Services.",
  alternates: { canonical: "/guardian-programme" },
};

export default function GuardianProgrammePage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">Support programme</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">Support Hammad Foundation through YZ</h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">{relationshipDisclosure} Support options are presented by YZ Educational Services so the recipient and Hammad Foundation designation are clear before payment.</p>
        </div>

        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-12 shadow-2xl mb-12">
          <div className="flex items-center gap-3 mb-5"><ShieldCheck className="text-brand-nero" size={28} /><h2 className="text-2xl md:text-3xl font-black">Payment identity</h2></div>
          <p className="text-white/75 leading-relaxed">{paymentDisclosure.statement} Hammad Foundation does not collect card details or issue payment confirmations on this site.</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-widest text-white/50">Recipient</p><p className="mt-2 font-bold">{paymentDisclosure.recipient}</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-xs uppercase tracking-widest text-white/50">Designation</p><p className="mt-2 font-bold">{paymentDisclosure.designation}</p></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-brand-charcoal">Available support options</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {supportOptions.map((option) => (
              <div key={option.id} className="rounded-2xl border border-brand-charcoal/10 bg-brand-gray-50 p-6">
                <CheckCircle2 className="text-brand-nero" size={22} />
                <h3 className="mt-4 font-black text-brand-charcoal">{option.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/65">{option.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={`${siteUrls.yz}/donate?project=hammad-foundation`} className="btn-brand inline-flex h-14 items-center justify-center gap-2 rounded-xl px-8 text-sm font-black">Open YZ support page <ArrowRight size={18} /></a>
          </div>
        </div>

        <div className="text-center text-sm text-brand-charcoal/60">
          <p>Questions about the school project? Contact the school team. Questions about a payment? Contact YZ using the transaction details shown on the YZ page.</p>
          <Link href="/transparency" className="mt-4 inline-flex font-black text-brand-nero hover:underline">View transparency information →</Link>
        </div>
      </div>
    </div>
  );
}
