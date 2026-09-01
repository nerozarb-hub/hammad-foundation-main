"use client";

import { useState } from "react";
import { Check, Crown, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { PaymentModal } from "@/components/modals/PaymentModal";

interface ProductGridProps {
    onSelectPlan?: (planId: string) => void;
}

export function ProductGrid({ onSelectPlan }: ProductGridProps) {
    const [selectedModalPlan, setSelectedModalPlan] = useState<string | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("");

    const handleSelect = (planId: string) => {
        if (onSelectPlan) {
            onSelectPlan(planId);
        } else {
            setSelectedModalPlan(planId);
        }
    };

    return (
        <section id="donate" className="py-20 md:py-28 bg-white shadow-sm border-t border-brand-charcoal/5">
            <div className="container">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Choose Your Impact Level
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal mt-4 mb-3 tracking-tight">
                        Direct 1-to-1 Student Sponsorship
                    </h2>
                    <p className="text-brand-charcoal/60 text-base md:text-lg font-medium">
                        Every dollar goes 100% directly to student tuition, nutrition, and school supplies. No admin cuts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {/* Tier 1: $15 The Starter */}
                    <div className="bg-white rounded-3xl p-7 md:p-8 flex flex-col justify-between border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30 transition-all duration-300">
                        <div>
                            <span className="inline-flex items-center gap-1 bg-brand-nero/10 text-brand-nero text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                                The Starter
                            </span>
                            <h4 className="text-xl font-black text-brand-charcoal mb-1">
                                Fund Their Mind
                            </h4>
                            <p className="text-3xl font-black text-brand-nero mb-2">
                                $15 <span className="text-xs text-brand-charcoal/40 uppercase tracking-widest font-bold">one-time</span>
                            </p>
                            <p className="text-xs md:text-sm text-brand-charcoal/60 mb-6 font-medium">
                                Complete set of textbooks + 12 notebooks for the academic year.
                            </p>

                            <ul className="space-y-2.5 mb-8 border-t border-brand-charcoal/5 pt-6">
                                {[
                                    "8 Government-approved Textbooks",
                                    "12 Ruled Notebooks & Registers",
                                    "Full Stationery & Geometry Kit",
                                    "WhatsApp Delivery Photo Receipt",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-brand-charcoal/80">
                                        <Check className="w-4 h-4 text-brand-nero shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSelect("starter")}
                            className="btn-brand w-full h-13 text-sm font-black rounded-xl py-3.5"
                        >
                            Give $15 Once
                        </button>
                    </div>

                    {/* Tier 2: $25 Confidence */}
                    <div className="bg-white rounded-3xl p-7 md:p-8 flex flex-col justify-between border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30 transition-all duration-300">
                        <div>
                            <span className="inline-flex items-center gap-1 bg-brand-nero/10 text-brand-nero text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                                Dignity &amp; Pride
                            </span>
                            <h4 className="text-xl font-black text-brand-charcoal mb-1">
                                Uniform &amp; Shoes
                            </h4>
                            <p className="text-3xl font-black text-brand-nero mb-2">
                                $25 <span className="text-xs text-brand-charcoal/40 uppercase tracking-widest font-bold">one-time</span>
                            </p>
                            <p className="text-xs md:text-sm text-brand-charcoal/60 mb-6 font-medium">
                                Two tailored uniform sets, school bag, and sturdy leather shoes.
                            </p>

                            <ul className="space-y-2.5 mb-8 border-t border-brand-charcoal/5 pt-6">
                                {[
                                    "2 Custom Tailored School Uniforms",
                                    "1 Sturdy Waterproof School Bag",
                                    "Black Leather Shoes & White Socks",
                                    "Before & After Student Photo",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-brand-charcoal/80">
                                        <Check className="w-4 h-4 text-brand-nero shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSelect("uniform")}
                            className="btn-brand w-full h-13 text-sm font-black rounded-xl py-3.5"
                        >
                            Give $25 Once
                        </button>
                    </div>

                    {/* Tier 3: $30/mo GUARDIAN - FEATURED */}
                    <div className="bg-brand-charcoal rounded-3xl p-7 md:p-8 flex flex-col justify-between border-2 border-brand-nero relative shadow-2xl scale-100 lg:scale-105 z-10">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Crown className="w-32 h-32 text-white" />
                        </div>

                        <div>
                            <span className="inline-flex items-center gap-1.5 bg-brand-nero text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 shadow-md">
                                <Sparkles size={12} /> Most Impact
                            </span>
                            <h4 className="text-xl font-black text-white mb-1">
                                Become a Guardian
                            </h4>
                            <p className="text-4xl font-black text-brand-nero mb-2">
                                $30 <span className="text-xs text-white/50 uppercase tracking-widest font-bold">/month</span>
                            </p>
                            <p className="text-xs md:text-sm text-white/70 mb-6 font-medium">
                                Sponsor YOUR assigned student from primary to university.
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                                    <p className="text-[9px] font-black text-brand-nero uppercase tracking-widest mb-2">
                                        You cover:
                                    </p>
                                    <ul className="space-y-1 text-[11px] font-bold text-white/90">
                                        <li>&bull; Full monthly tuition</li>
                                        <li>&bull; Daily hot lunch</li>
                                        <li>&bull; All books &amp; kits</li>
                                        <li>&bull; Health checkups</li>
                                    </ul>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                                    <p className="text-[9px] font-black text-brand-nero uppercase tracking-widest mb-2">
                                        You receive:
                                    </p>
                                    <ul className="space-y-1 text-[11px] font-bold text-white/90">
                                        <li>&bull; Photo + student ID</li>
                                        <li>&bull; Weekly video update</li>
                                        <li>&bull; Term report cards</li>
                                        <li>&bull; Direct WhatsApp line</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => handleSelect("monthly")}
                                className="btn-brand w-full h-14 text-sm md:text-base font-black rounded-xl shadow-lg hover:shadow-xl"
                            >
                                YES, I&apos;LL BE A GUARDIAN
                            </button>
                            <p className="text-center text-[10px] text-white/40 font-bold mt-2.5 uppercase tracking-widest">
                                Cancel Anytime &bull; 100% Transparent
                            </p>
                        </div>
                    </div>

                    {/* Tier 4: Custom Legacy Tier */}
                    <div className="bg-white rounded-3xl p-7 md:p-8 flex flex-col justify-between border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30 transition-all duration-300">
                        <div>
                            <span className="inline-flex items-center gap-1 bg-brand-nero/10 text-brand-nero text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                                Build Legacy
                            </span>
                            <h4 className="text-xl font-black text-brand-charcoal mb-1">
                                Custom Sponsorship
                            </h4>
                            <p className="text-3xl font-black text-brand-nero mb-2">
                                Custom
                            </p>
                            <p className="text-xs md:text-sm text-brand-charcoal/60 mb-6 font-medium">
                                Fund multiple students, a whole classroom, or a campus lab.
                            </p>

                            <ul className="space-y-2 mb-6 border-t border-brand-charcoal/5 pt-6 text-xs md:text-sm font-semibold text-brand-charcoal/80">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-nero shrink-0" />
                                    <span>$360: Full Year for 1 Child</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-nero shrink-0" />
                                    <span>$1,000: STEM Lab Equipment</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-brand-nero shrink-0" />
                                    <span>$3,000: Sponsor a Whole Grade</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-charcoal/50 font-black text-sm">
                                    $
                                </span>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    className="w-full h-12 pl-8 pr-4 rounded-xl border border-brand-charcoal/15 text-sm font-bold text-brand-charcoal focus:border-brand-nero focus:outline-none"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleSelect("custom")}
                                className="w-full h-12 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-xl text-sm font-black transition-all"
                            >
                                Let&apos;s Talk
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedModalPlan && (
                <PaymentModal
                    isOpen={true}
                    supportId={
                        selectedModalPlan === "starter"
                            ? "starter-kit"
                            : selectedModalPlan === "uniform"
                            ? "dignity-uniform"
                            : selectedModalPlan === "monthly"
                            ? "guardian-monthly"
                            : "custom"
                    }
                    onClose={() => setSelectedModalPlan(null)}
                />
            )}
        </section>
    );
}
