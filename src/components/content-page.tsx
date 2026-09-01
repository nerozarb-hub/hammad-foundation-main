import type { ReactNode } from "react";

export function ContentPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <div className="min-h-screen bg-white py-20"><section className="border-b border-brand-charcoal/10 bg-brand-gray-50/50 px-6 py-20"><div className="mx-auto max-w-5xl"><p className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero">{eyebrow}</p><h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">{title}</h1><p className="mt-7 max-w-3xl text-xl leading-relaxed text-brand-charcoal/60">{intro}</p></div></section><article className="prose prose-lg mx-auto max-w-5xl px-6 py-16 text-brand-charcoal/70">{children}</article></div>;
}
