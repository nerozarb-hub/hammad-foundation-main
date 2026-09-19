"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShieldCheck } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-brand-charcoal text-white relative overflow-hidden border-t border-brand-charcoal/10">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-nero/20 border border-brand-nero/30 text-brand-nero text-xs font-black uppercase tracking-wider mb-6">
            <Heart size={14} className="fill-current" />
            <span>Protect A Student&apos;s Education Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight leading-tight mb-6">
            Join 124 Guardians Standing Between a Child and the Streets.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            376 bright girls in Lahore are waiting for their school fees, books, and uniforms to be covered before the school year closes. Your support changes a life permanently.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/donate?support=guardian-monthly"
              className="btn-brand w-full sm:w-auto min-h-16 px-10 text-base md:text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Become a Guardian · $30/mo</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/donate"
              className="w-full sm:w-auto min-h-16 px-8 rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 text-sm md:text-base font-black flex items-center justify-center transition-all"
            >
              One-Time Donation ($15 / $25 / Custom)
            </Link>
          </div>

          {/* Compact Trust Note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
            <ShieldCheck size={16} className="text-brand-nero shrink-0" />
            <span>
              Support received by <strong className="text-white">YZ Educational Services</strong> · Designated for <strong className="text-white">Hammad Foundation</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
