import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Motif } from "@/components/illustrations/Motif";

const steps = [
  ["01", "books", "Choose your support", "Choose a one-time amount, the Guardian monthly designation, or a custom amount."],
  ["02", "payment", "Pay securely", "Review the recipient and project designation before proceeding to PayPro."],
  ["03", "school", "Receive confirmation", "PayPro and YZ handle the payment record and confirmation route."],
] as const;

export function HowItWorks() {
  return <section id="how-it-works" className="bg-brand-gray-50 py-16 md:py-24"><div className="container"><div className="grid gap-5 md:grid-cols-2 md:items-end"><div><p className="eyebrow">How it works</p><h2 className="mt-4 max-w-[18ch]">Supporting a student is simple.</h2></div><p className="max-w-[55ch] text-lg body-muted">The school experience stays personal while the operating and payment roles remain clear.</p></div><ol className="mt-10 divide-y divide-brand-charcoal/15 border-y border-brand-charcoal/15">{steps.map(([number, motif, title, description]) => <li key={number} className="grid gap-4 py-6 sm:grid-cols-[4rem_3rem_14rem_1fr] sm:items-center"><Motif kind={motif} size={58} /><span className="font-display text-xl font-extrabold tabular-nums text-brand-nero">{number}</span><h3 className="text-xl">{title}</h3><p className="max-w-[55ch] text-base body-muted">{description}</p></li>)}</ol><p className="mt-7 max-w-[70ch] text-base body-muted">Payments are received by YZ Educational Services and designated for Hammad Foundation.</p><Link href="/how-we-are-structured" className="link-arrow mt-3">Understand the Hammad and YZ relationship <ArrowRight size={16} /></Link></div></section>;
}
