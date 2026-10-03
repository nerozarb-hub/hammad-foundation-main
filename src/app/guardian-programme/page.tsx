import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { paymentDisclosure, relationshipDisclosure, supportOptions } from "@/config/ecosystem";

export const metadata: Metadata = { title: "Support Programme | Hammad Foundation", description: "Support options for Hammad Foundation through YZ Educational Services.", alternates: { canonical: "/guardian-programme" } };

export default function GuardianProgrammePage() {
  const guardian = supportOptions.find(option => option.id === "guardian-monthly")!;
  const others = supportOptions.filter(option => option.id !== guardian.id);

  return (
    <div className="bg-white">
      <section className="container grid gap-8 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-6">
          <p className="eyebrow">Support programme</p>
          <h1 className="mt-4 max-w-[12ch]">Keep the path to school open.</h1>
          <p className="mt-6 max-w-[55ch] text-lg text-secondary">{relationshipDisclosure} Choose a designation and review the recipient before continuing to PayPro.</p>
          <Link href="/donate" className="btn-brand mt-7">Choose support <ArrowRight size={18} /></Link>
        </div>
        <figure className="lg:col-span-6">
          <div className="art-panel aspect-[1.4] bg-[#E9F8ED] p-4"><Image src="/images/hammad/illustrations/guardian-bridge.webp" width={1448} height={1086} priority sizes="(min-width: 1024px) 48vw, 100vw" alt="Conceptual illustration of a green pathway linking learning materials with an open school door" className="h-full w-full object-contain" /></div>
          <figcaption className="mt-3 text-base text-secondary">Conceptual illustration of continuing support. <Link href="/gallery" className="font-bold text-brand-nero  ">See real school photographs</Link>.</figcaption>
        </figure>
      </section>

      <section className="bg-brand-gray-50 py-16 md:py-24">
        <div className="container max-w-6xl">
          <p className="eyebrow">Guardian support</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <h2 className="max-w-[17ch]">A clear choice for school continuity.</h2>
            <p className="max-w-[52ch] text-lg text-secondary">The Guardian option carries a monthly designation. The current PayPro flow creates one payment; it does not set up an automatic recurring charge.</p>
          </div>
          <Link href={`/donate?support=${guardian.id}`} className="support-card support-card--featured group mt-9 sm:p-9">
            <span className="support-badge bg-white text-[#075e2e]">Featured designation</span>
            <span className="block">
              <strong className="block font-display text-3xl font-extrabold tracking-[-.05em] tabular-nums sm:text-4xl">PKR {guardian.amountPkr.toLocaleString()}</strong>
              <span className="mt-1 block text-lg font-bold">Monthly designation · {guardian.label}</span>
              <span className="mt-3 block max-w-[60ch] text-base">{guardian.description}</span>
            </span>
            <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-white bg-white px-5 py-2 font-bold text-[#075e2e] group-hover:bg-[#e8f3ea]">Select Guardian <ArrowRight size={18} aria-hidden="true" /></span>
          </Link>

          <h3 className="mt-12 text-2xl">Other ways to support</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {others.map(option => <Link key={option.id} href={`/donate?support=${option.id}`} className="support-card group hover:border-brand-nero hover:bg-white">
              <span className="block"><strong className="block font-display text-2xl font-extrabold tabular-nums">PKR {option.amountPkr.toLocaleString()}</strong><span className="mt-1 block text-base font-bold text-secondary">One-time · {option.label}</span><span className="mt-4 block text-base text-secondary">{option.description}</span></span>
              <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e] group-hover:bg-[#e8f3ea]">Select package <ArrowRight size={17} aria-hidden="true" /></span>
            </Link>)}
            <Link href="/donate?support=custom" className="support-card group hover:border-brand-nero hover:bg-white">
              <span className="block"><strong className="block font-display text-2xl font-extrabold">Your amount</strong><span className="mt-1 block text-base font-bold text-secondary">One-time · Custom support</span><span className="mt-4 block text-base text-secondary">Choose an amount and review it before continuing to PayPro.</span></span>
              <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e] group-hover:bg-[#e8f3ea]">Choose an amount <ArrowRight size={17} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="container grid gap-5 py-16 md:grid-cols-[.7fr_1fr] md:py-20">
        <div><p className="eyebrow">Before you pay</p><h2 className="mt-4">The recipient is clear.</h2></div>
        <div className="editorial-card">
          <dl className="divide-y divide-brand-charcoal/10 text-base">
            <div className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]"><dt className="font-bold">Payment recipient</dt><dd>{paymentDisclosure.recipientPublicName}</dd></div>
            <div className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]"><dt className="font-bold">Project designation</dt><dd>{paymentDisclosure.designation}</dd></div>
            <div className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr]"><dt className="font-bold">Next step</dt><dd>PayPro hosts the payment page after you review your details.</dd></div>
          </dl>
          <Link href="/donate" className="link-arrow mt-5">Open support checkout <ArrowRight size={17} /></Link>
        </div>
      </section>
    </div>
  );
}
