import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { paymentDisclosure, relationshipDisclosure, siteUrls } from "@/config/ecosystem";

export const metadata: Metadata = {
  title: "Support moved to YZ Educational Services",
  robots: { index: false, follow: false },
};

export default function DonationReturnPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl rounded-3xl border border-brand-charcoal/10 bg-white p-8 text-center shadow-xl md:p-12">
        <p className="text-xs font-black uppercase tracking-widest text-brand-nero">Payment route updated</p>
        <h1 className="mt-4 text-3xl font-black text-brand-charcoal md:text-4xl">Support is completed through YZ</h1>
        <p className="mt-5 text-sm leading-relaxed text-brand-charcoal/70 md:text-base">
          {relationshipDisclosure} {paymentDisclosure.statement} This legacy return page no longer verifies or issues receipts for direct Hammad payments.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`${siteUrls.yz}/donate?project=hammad-foundation`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-3 font-bold text-white hover:bg-brand-nero/90"
          >
            Open YZ support page <ExternalLink size={16} />
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-charcoal/20 px-6 py-3 font-bold text-brand-charcoal hover:bg-brand-gray-50"
          >
            Back to Hammad <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
