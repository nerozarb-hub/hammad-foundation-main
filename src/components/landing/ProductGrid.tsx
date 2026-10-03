"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supportOptions } from "@/config/ecosystem";

interface ProductGridProps {
  onSelectPlan?: (planId: string) => void;
}

// Compatibility component for older page imports. Amounts and descriptions
// come from the same approved support configuration as the live checkout.
export function ProductGrid({ onSelectPlan }: ProductGridProps) {
  const options = [...supportOptions].sort((a, b) => Number(b.recurring) - Number(a.recurring));
  return (
    <section id="donate" className="bg-white py-16 md:py-24">
      <div className="container">
        <p className="eyebrow">Ways to support</p>
        <h2 className="mt-4 max-w-[18ch]">Choose the support that feels right.</h2>
        <p className="mt-5 max-w-[60ch] text-lg text-secondary">Each selection shows the amount and designation before you continue to hosted PayPro checkout.</p>
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {options.map(option => {
            const content = <>
              {option.recurring && <span className="support-badge bg-[#e8f3ea] text-[#075e2e]">Featured Guardian</span>}
              <span className="block"><strong className="block font-display text-2xl font-extrabold tabular-nums">PKR {option.amountPkr.toLocaleString()}</strong><span className="mt-1 block font-bold text-secondary">{option.recurring ? "Monthly designation" : "One-time"} · {option.label}</span><span className="mt-4 block text-base text-secondary">{option.description}</span></span>
              <span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e]">Select package <ArrowRight size={17} aria-hidden="true" /></span>
            </>;
            return onSelectPlan
              ? <button key={option.id} type="button" onClick={() => onSelectPlan(option.id)} className="support-card text-left hover:border-brand-nero">{content}</button>
              : <Link key={option.id} href={`/donate?support=${option.id}`} className="support-card hover:border-brand-nero">{content}</Link>;
          })}
          {onSelectPlan
            ? <button type="button" onClick={() => onSelectPlan("custom")} className="support-card text-left hover:border-brand-nero"><span className="block"><strong className="block font-display text-2xl font-extrabold">Your amount</strong><span className="mt-1 block font-bold text-secondary">One-time · Custom support</span><span className="mt-4 block text-base text-secondary">Choose an amount and review it before payment.</span></span><span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e]">Choose an amount <ArrowRight size={17} aria-hidden="true" /></span></button>
            : <Link href="/donate?support=custom" className="support-card hover:border-brand-nero"><span className="block"><strong className="block font-display text-2xl font-extrabold">Your amount</strong><span className="mt-1 block font-bold text-secondary">One-time · Custom support</span><span className="mt-4 block text-base text-secondary">Choose an amount and review it before payment.</span></span><span className="support-card__cta inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-brand-nero px-4 py-2 font-bold text-[#075e2e]">Choose an amount <ArrowRight size={17} aria-hidden="true" /></span></Link>}
        </div>
      </div>
    </section>
  );
}
