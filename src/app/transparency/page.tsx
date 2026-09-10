import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { TransparencyGrid } from "@/components/landing/TransparencyGrid";

export const metadata: Metadata = {
  title: "Transparency & Governance | Hammad Foundation",
  description:
    "Understand Hammad Foundation's relationship with YZ Educational Services, payment identity, evidence standards, and public accountability commitments.",
  alternates: { canonical: "/transparency" },
};

const commitments = [
  {
    title: "Relationship before claims",
    description:
      "Hammad Foundation is presented as a school project of YZ Educational Services. Claims about registration, tax status, or charitable status are not published without supporting evidence.",
  },
  {
    title: "Payment identity before payment",
    description:
      "Support is routed to YZ Educational Services, with Hammad Foundation shown as the designated project before the donor continues.",
  },
  {
    title: "Evidence before publication",
    description:
      "Programme updates should retain a source owner, event date, evidence location, safeguarding review, and review date before publication.",
  },
  {
    title: "Privacy and safeguarding",
    description:
      "Learner stories, images, receipts, and personal information require appropriate consent and should never be used as unverified proof of impact.",
  },
];

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="rounded-full bg-brand-nero/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero">
            Public accountability
          </span>
          <h1 className="mt-4 text-4xl font-[900] leading-tight tracking-tight text-brand-charcoal md:text-5xl lg:text-6xl">
            Clear structure. Evidence-led updates.
          </h1>
          <p className="mt-6 text-lg font-medium leading-relaxed text-brand-charcoal/70 md:text-xl">
            Hammad Foundation is a school project of YZ Educational Services. This
            page explains what is verified, who handles payments, and how public
            information should be reviewed.
          </p>
        </div>

        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {[
            ["Project relationship", "Hammad Foundation", "School project of YZ Educational Services"],
            ["Payment recipient", "YZ Educational Services", "Y.Z Educational Services (Private) Limited"],
            ["Project designation", "Hammad Foundation", "Shown before a donor continues to payment"],
            ["Corporate record", "CUIN 0326364", "SECP incorporation record for YZ Educational Services"],
          ].map(([label, value, description]) => (
            <div key={label} className="space-y-3 rounded-3xl border border-brand-charcoal/10 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-brand-nero">
                  {label}
                </span>
                <ShieldCheck className="h-5 w-5 text-brand-nero" />
              </div>
              <h2 className="text-xl font-[900] text-brand-charcoal">{value}</h2>
              <p className="border-t border-brand-charcoal/5 pt-2 text-sm font-medium leading-relaxed text-brand-charcoal/70">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-3xl border border-brand-charcoal/10 bg-white p-8 shadow-sm md:p-12">
          <h2 className="mb-8 text-center text-2xl font-[900] tracking-tight text-brand-charcoal md:text-3xl">
            Our transparency commitments
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {commitments.map((commitment, index) => (
              <div key={commitment.title} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-nero/10 text-xs font-black text-brand-nero">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-black text-brand-charcoal md:text-lg">
                    {commitment.title}
                  </h3>
                </div>
                <p className="pl-11 text-sm font-medium leading-relaxed text-brand-charcoal/70">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <TransparencyGrid />

        <div className="mt-16 space-y-6 rounded-3xl bg-brand-charcoal p-8 text-center text-white shadow-xl md:p-12">
          <h2 className="text-2xl font-[900] tracking-tight md:text-3xl">
            Have a question about a record or update?
          </h2>
          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-white/70 md:text-base">
            Contact the Hammad Foundation team for programme questions, then use
            YZ Educational Services for payment-recipient and transaction questions.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <a
              href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20have%20a%20question%20about%20Hammad%20Foundation%20records."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand inline-flex h-14 items-center justify-center gap-2 rounded-xl px-8 text-sm font-black shadow-lg"
            >
              <MessageCircle size={18} /> Contact the school team
            </a>
            <Link
              href="/how-we-are-structured"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              View the structure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
