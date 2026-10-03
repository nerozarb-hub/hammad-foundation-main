import type { ReactNode } from "react";

export function ContentPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-sand">
      <section className="border-b border-brand-charcoal/10 bg-white py-16 md:py-24">
        <div className="container max-w-5xl">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-nero">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[0.98] tracking-[-0.05em] sm:text-5xl md:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-secondary md:text-xl">{intro}</p>
        </div>
      </section>
      <article className="mx-auto max-w-5xl space-y-6 px-5 py-16 text-base leading-relaxed text-secondary sm:px-8 lg:px-12 md:py-24 [&_a]:font-semibold [&_a]:text-brand-nero [&_a]:bg-brand-gray-100 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-brand-charcoal [&_p]:max-w-3xl">{children}</article>
    </div>
  );
}
