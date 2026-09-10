import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { siteUrls } from "@/config/ecosystem";

export const metadata: Metadata = {
  title: "Updates | Hammad Foundation",
  description: "Evidence-led public updates for the Hammad Foundation school project.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">Evidence-led updates</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">School and project updates</h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">Public updates are added when the event, source, privacy review, and publishing owner are clear. This keeps the project record useful without presenting invented activity.</p>
        </div>

        <div className="rounded-3xl border border-brand-charcoal/10 bg-white p-8 shadow-sm md:p-12">
          <CheckCircle2 className="text-brand-nero" size={30} />
          <h2 className="mt-5 text-2xl font-black text-brand-charcoal md:text-3xl">No unverified updates are being displayed</h2>
          <p className="mt-4 leading-relaxed text-brand-charcoal/70">For current school information, contact the Hammad Foundation team. For support records and payment identity, use the YZ Educational Services project and transparency pages.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`${siteUrls.yz}/projects/hammad-foundation`} className="btn-brand inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-black">View YZ project page <ArrowRight size={17} /></a>
            <a href="https://wa.me/923008099015?text=Hello%20Hammad%20Foundation%2C%20I%20would%20like%20to%20ask%20about%20current%20school%20information." target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-brand-charcoal/20 px-6 text-sm font-black text-brand-charcoal hover:bg-brand-gray-50"><MessageCircle size={17} /> Contact the school team</a>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-brand-charcoal/60">
          <Link href="/transparency" className="font-black text-brand-nero hover:underline">View transparency information →</Link>
        </div>
      </div>
    </div>
  );
}
