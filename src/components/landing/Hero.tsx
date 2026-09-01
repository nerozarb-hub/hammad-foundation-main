"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, ShieldAlert, Sparkles, FileText } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";

interface HeroProps {
    onSelectPlan?: (planId: string) => void;
}

export function Hero({ onSelectPlan }: HeroProps) {
    const { city } = useGeoLocation();

    return (
        <section className="relative pt-12 pb-20 md:py-24 bg-white shadow-sm overflow-hidden">
            <div className="container relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                {/* Left copy column */}
                <div className="flex-[1.15] text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-nero/10 border border-brand-nero/20 text-brand-nero text-xs font-black uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="animate-pulse" />
                        1-to-1 Direct Student Sponsorship
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-[900] tracking-tight text-brand-charcoal leading-[1.08] mb-6">
                        You made it in <span className="text-brand-nero">{city || "Houston"}</span>.<br />
                        Now make it possible for someone in Lahore.
                    </h1>

                    <div className="space-y-4 mb-8">
                        <p className="text-lg md:text-xl font-[800] text-brand-charcoal leading-snug">
                            Overseas Pakistanis are sponsoring 500 students at $30/month.<br />
                            <span className="text-brand-nero">124 students secured. 376 waiting for their Guardian.</span>
                        </p>
                        <p className="text-base text-brand-charcoal/70 leading-relaxed max-w-xl font-medium">
                            You don&apos;t donate to an abstract overhead fund. You sponsor <strong className="font-black text-brand-charcoal">YOUR student</strong>. You get their name, photo, and weekly WhatsApp progress videos directly from Lahore.
                        </p>
                    </div>

                    {/* Cost breakdown card */}
                    <div className="bg-brand-gray-50 rounded-2xl p-6 md:p-8 mb-8 border border-brand-charcoal/5 shadow-sm">
                        <p className="text-xs font-black text-brand-charcoal/50 uppercase tracking-[0.15em] mb-4">
                            For less than Netflix + Spotify ($30/month):
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                            {[
                                { text: "Full tuition paid on time", highlight: "tuition" },
                                { text: "Daily hot cooked lunch", highlight: "lunch" },
                                { text: "All textbooks & stationery", highlight: "supplies" },
                                { text: "2 Uniform sets & school shoes", highlight: "shoes" },
                                { text: "Routine healthcare checkups", highlight: "healthcare" },
                                { text: "Weekly WhatsApp video updates", highlight: "updates" },
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm md:text-base text-brand-charcoal font-semibold">
                                    <CheckCircle2 className="w-5 h-5 text-brand-nero shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 pt-4 border-t border-brand-charcoal/10 text-sm text-brand-charcoal/70 italic font-medium">
                            You don&apos;t just fund a classroom. You raise <strong className="font-black text-brand-charcoal not-italic">YOUR student</strong> from 4th grade to University graduation.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (onSelectPlan) {
                                    onSelectPlan("monthly");
                                } else {
                                    const element = document.getElementById("donate");
                                    element?.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="btn-brand h-16 text-base md:text-lg px-8 sm:px-10 flex flex-col items-center justify-center leading-tight shadow-[0_4px_14px_0_rgba(15,157,88,0.39)] hover:shadow-[0_6px_20px_0_rgba(15,157,88,0.45)]"
                        >
                            <span className="font-black">BECOME A GUARDIAN &rarr; $30/MONTH</span>
                            <span className="text-[11px] opacity-80 font-semibold mt-0.5">(First video update in 48 hours)</span>
                        </button>

                        <a
                            href="#proof"
                            className="h-16 flex items-center justify-center border-2 border-brand-charcoal rounded-xl text-brand-charcoal hover:bg-brand-charcoal hover:text-white text-sm md:text-base font-black transition-all px-8 text-center"
                        >
                            I&apos;m Skeptical &rarr; Show Me Receipts
                        </a>
                    </div>
                </div>

                {/* Right Image & Impact Meter Card */}
                <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
                    <div className="aspect-[4/5] bg-brand-charcoal relative overflow-hidden rounded-3xl shadow-2xl border border-brand-charcoal/10">
                        <img
                            src="https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=800"
                            alt="Hammad Foundation Classroom in Lahore"
                            className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/30 to-transparent"></div>

                        {/* Overlay Card */}
                        <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/95 backdrop-blur-md text-white rounded-2xl p-6 border border-white/10 shadow-xl">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">
                                        Live Campaign Progress
                                    </p>
                                    <p className="text-2xl md:text-3xl font-[900] leading-none">
                                        24.8% <span className="text-xs text-white/60 font-medium">Funded</span>
                                    </p>
                                </div>
                                <p className="text-sm font-black text-brand-nero">
                                    124 / 500 Students
                                </p>
                            </div>

                            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-3.5">
                                <div className="h-full bg-brand-nero rounded-full transition-all duration-1000" style={{ width: "24.8%" }} />
                            </div>

                            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/10">
                                <p className="text-xs font-[900] text-amber-400 flex items-center gap-1.5">
                                    <ShieldAlert size={14} />
                                    53 spots left for 2025-2026 school year
                                </p>
                                <p className="text-[11px] text-white/70 font-medium">
                                    After June, these children wait another full year—or drop out.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
