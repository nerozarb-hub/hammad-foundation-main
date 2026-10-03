import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supportOptions } from "@/config/ecosystem";

export function ImpactSection() {
  const guardian = supportOptions.find(option => option.id === "guardian-monthly")!;
  const others = supportOptions.filter(option => option.id !== guardian.id);

  return (
    <section id="impact" className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Ways to support</p>
            <h2 className="mt-4 max-w-[17ch]">Small choices can keep learning moving.</h2>
          </div>
          <p className="max-w-[55ch] text-lg body-muted lg:col-span-5">Choose a monthly designation or a one-time amount. Your selection carries into the PayPro checkout review.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <figure className="lg:col-span-5">
            <div className="art-panel aspect-[1.15] bg-brand-gray-50 p-4 sm:aspect-[1.4] lg:aspect-[1.08]">
              <Image src="/images/hammad/illustrations/support-provides.webp" width={1448} height={1086} sizes="(min-width: 1024px) 40vw, 100vw" alt="Conceptual illustration of books, learning supplies, clothing and a calendar connected by a green line" className="h-full w-full object-contain" />
            </div>
            <figcaption className="mt-4 max-w-md text-base body-muted">Support can be designated for learning materials, essentials, and student care.</figcaption>
          </figure>
          <Link href={`/donate?support=${guardian.id}`} className="support-card support-card--featured group lg:col-span-7 sm:p-8">
            <span className="support-badge bg-white text-[#075e2e]">Featured Guardian designation</span>
            <span className="block">
              <strong className="block font-display text-4xl font-extrabold tracking-[-.05em] tabular-nums sm:text-5xl">PKR {guardian.amountPkr.toLocaleString()}</strong>
              <span className="mt-2 block text-lg font-bold">Monthly designation · {guardian.label}</span>
              <span className="mt-5 block max-w-[55ch] text-base text-white">{guardian.description}</span>
              <span className="mt-2 block text-base text-white">PayPro creates one payment; no automatic recurring charge.</span>
            </span>
            <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-white bg-white px-5 py-2 font-bold text-[#075e2e] transition-colors group-hover:bg-[#e8f3ea]">Select Guardian <ArrowRight size={17} aria-hidden="true" /></span>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {others.map(option => (
            <Link key={option.id} href={`/donate?support=${option.id}`} className="support-card group hover:border-brand-nero hover:bg-brand-gray-50">
              <span className="block">
                <strong className="block font-display text-2xl font-extrabold tabular-nums">PKR {option.amountPkr.toLocaleString()}</strong>
                <span className="mt-1 block text-base font-bold text-secondary">One-time · {option.label}</span>
                <span className="mt-4 block text-base text-secondary">{option.description}</span>
              </span>
              <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e] group-hover:bg-[#e8f3ea]">Select package <ArrowRight size={17} aria-hidden="true" /></span>
            </Link>
          ))}
          <Link href="/donate?support=custom" className="support-card group hover:border-brand-nero hover:bg-brand-gray-50">
            <span className="block">
              <strong className="block font-display text-2xl font-extrabold">Your amount</strong>
              <span className="mt-1 block text-base font-bold text-secondary">One-time · Custom support</span>
              <span className="mt-4 block text-base text-secondary">Choose an amount and review it before continuing to PayPro.</span>
            </span>
            <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e] group-hover:bg-[#e8f3ea]">Choose an amount <ArrowRight size={17} aria-hidden="true" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
