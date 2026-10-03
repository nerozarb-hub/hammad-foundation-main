import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return <section className="overflow-hidden bg-white">
    <div className="container grid gap-8 pb-14 pt-10 md:pb-20 md:pt-16 lg:min-h-[620px] lg:grid-cols-12 lg:items-center lg:gap-12">
      <div className="relative z-10 lg:col-span-5">
        <p className="eyebrow flex items-center gap-2"><MapPin size={17} aria-hidden="true" /> Education access · Lahore</p>
        <h1 className="mt-5 max-w-[13ch]">Help make education <span className="text-brand-nero">possible.</span></h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed body-muted">Hammad Foundation helps people obtain an education. Explore the Lahore school community and choose how to support books, uniforms, and everyday learning needs.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/donate" className="btn-brand">Support education <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link href="/our-school" className="btn-outline min-h-12 px-6">Explore the school <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
      <figure className="lg:col-span-7">
        <div className="art-panel flex aspect-[1.15] items-end justify-center bg-[#E9F8ED] px-2 pt-8 sm:aspect-[1.45] lg:aspect-[1.18] lg:px-4">
          <Image src="/images/hammad/illustrations/hero-journey.webp" width={1448} height={1086} priority sizes="(min-width: 1024px) 55vw, 100vw" alt="Conceptual illustration of children following a green path toward an open learning space" className="h-full w-full object-contain object-bottom" />
        </div>
        <figcaption className="mt-3 text-sm body-muted">Conceptual illustration. <Link href="/gallery" className="font-bold text-brand-nero  ">See real photographs from the school</Link>.</figcaption>
      </figure>
    </div>
    <div className="border-y border-brand-charcoal/10 bg-brand-gray-50"><div className="container grid gap-4 py-5 text-base sm:grid-cols-3 sm:items-center sm:gap-8"><p><strong>Barki Road, Lahore</strong><span className="block body-muted">The school community</span></p><p><strong>Books and school essentials</strong><span className="block body-muted">Existing support designations</span></p><Link href="/gallery" className="link-arrow sm:justify-self-end">View the school gallery <ArrowRight size={17} /></Link></div></div>
  </section>;
}
