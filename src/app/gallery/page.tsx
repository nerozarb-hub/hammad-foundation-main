import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "School Photo Gallery",
  description: "See school photographs and clearly labeled illustrative campaign artwork from Hammad Foundation in Lahore.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-brand-gray-50 py-16 md:py-24">
        <div className="container">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-brand-nero"><Camera size={16} aria-hidden="true" /> School photos and campaign artwork</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <h1 className="max-w-3xl text-5xl sm:text-6xl">Inside the school day.</h1>
            <p className="max-w-xl text-base leading-relaxed text-brand-charcoal/68 sm:text-lg">Explore photographs of school life alongside the campaign illustrations created for Hammad Foundation and its education project.</p>
          </div>
          <p className="mt-7 max-w-3xl border-l-2 border-brand-nero pl-4 text-base body-muted">Each image is labeled as a school photograph or an illustration. Illustrative campaign scenes are conceptual artwork and do not document specific students, events, or school days.</p>
        </div>
      </section>
      <section className="container py-12 md:py-20" aria-label="School photographs and illustrative campaign artwork"><GalleryGrid /></section>
      <section className="bg-[#E9F8ED] py-14 md:py-20"><div className="container flex flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><p className="eyebrow">Be part of the work</p><h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">The school is here. Your support helps it keep going.</h2></div><Link href="/donate" className="btn-brand shrink-0">Support the school <ArrowRight size={17} aria-hidden="true" /></Link></div></section>
    </div>
  );
}
