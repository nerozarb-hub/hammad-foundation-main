"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-white overflow-hidden border-b border-brand-charcoal/5">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column: Emotion & Mission */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-nero/10 border border-brand-nero/20 text-brand-nero text-xs font-black uppercase tracking-wider mb-6">
              <Sparkles size={14} className="animate-pulse" />
              <span>Barki Road Campus · Lahore</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-[900] tracking-tight text-brand-charcoal leading-[1.08] mb-6">
              Empowering Girls in Lahore Through Free Quality Education.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-brand-charcoal/75 leading-relaxed font-medium mb-8 max-w-2xl">
              Hammad Foundation School provides 180+ underprivileged students on Barki Road with daily hot nutrition, uniforms, textbooks, and primary-to-matriculation schooling—with 376 bright girls currently on our waiting list.
            </p>

            {/* Primary Action Area */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/donate"
                  className="btn-brand min-h-14 sm:min-h-16 px-8 py-4 text-base md:text-lg font-black rounded-2xl flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl transition-all"
                >
                  <span>Support the School Now</span>
                  <ArrowRight size={20} />
                </Link>

                <a
                  href="#impact"
                  className="min-h-14 sm:min-h-16 px-6 py-4 rounded-2xl border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white text-sm md:text-base font-black flex items-center justify-center transition-all text-center"
                >
                  View Impact Packages ↓
                </a>
              </div>

              {/* Compact Persistent Trust Badge Near CTA */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-sand/80 border border-brand-charcoal/10 text-brand-charcoal text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-nero shrink-0" />
                <span>
                  Support received by <strong className="font-bold">YZ Educational Services</strong> · Designated for <strong className="font-bold">Hammad Foundation</strong>
                </span>
              </div>
            </div>

            {/* Scannable Micro-Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-brand-charcoal/10 text-xs text-brand-charcoal/70 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                <span>100% Direct Student Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                <span>PayPro 256-bit Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                <span>SECP CUIN 0326364 Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant Authentic School Photography */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-brand-charcoal/10 bg-brand-charcoal">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200"
                alt="Students studying inside classroom at Hammad Foundation Girls High School Lahore"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-transparent to-black/20" />

              {/* Real-time Impact Overlay Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Barki Road Campus, Lahore
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-nero text-white text-[11px] font-black uppercase tracking-wider shadow">
                  180+ Students
                </span>
              </div>

              {/* Bottom Quote / Student Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-brand-charcoal/95 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-nero/20 text-brand-nero flex items-center justify-center shrink-0">
                    <Heart size={20} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand-nero">
                      The Mission in Practice
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5 leading-snug">
                      &ldquo;Every rupee gives a girl in Lahore books, a desk, a daily meal, and an escape from generational poverty.&rdquo;
                    </p>
                    <p className="text-[11px] text-white/60 mt-1 font-medium">
                      Sir Ali Choudhary · School Director
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
