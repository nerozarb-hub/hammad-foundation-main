"use client";

import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface RealityCheckProps {
    onSelectPlan?: (planId: string) => void;
}

export function RealityCheck({ onSelectPlan }: RealityCheckProps) {
    const cycleSteps = [
        "Age 10: Parent cannot afford $10 tuition -> Student drops out",
        "Age 14: Sent to work long shifts in informal factory labor",
        "Age 20: Married young, first child born into identical poverty",
        "Generations: Cycle repeats perpetually without an exit ramp",
    ];

    return (
        <section className="py-20 md:py-24 bg-brand-charcoal text-white relative shadow-xl overflow-hidden">
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-brand-red animate-pulse" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-red">
                            Urgent Reality Check
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-white leading-[1.1] tracking-tight mb-10">
                        What happens if you <span className="text-white/40">just close</span> this page?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-5 text-base leading-relaxed text-white/70">
                            <p>If you close this tab and forget about it:</p>
                            <p className="text-white text-xl font-bold">
                                A 10-year-old in Lahore{" "}
                                <span className="font-black underline decoration-brand-red decoration-4 underline-offset-4">
                                    drops out permanently next term.
                                </span>
                            </p>
                            <p>
                                Not because they lack brilliance. Not because they don&apos;t want to learn. But because their family cannot afford the monthly books and fees.
                            </p>
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/10 italic text-white/90 text-sm font-medium">
                                &ldquo;This isn&apos;t emotional drama. This is harsh economic arithmetic.&rdquo;
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-black text-brand-nero uppercase tracking-widest">
                                    The Generational Poverty Trap:
                                </p>
                                {cycleSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                        <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs font-black shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-xs sm:text-sm font-bold text-white/90">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-sm md:text-base font-bold text-brand-nero mb-4">
                                    Your $30/month breaks this cycle for one child forever.
                                </p>
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
                                    className="btn-brand w-full h-14 text-sm md:text-base font-black rounded-xl flex items-center justify-center gap-2"
                                >
                                    STOP THE CYCLE &mdash; BECOME A GUARDIAN <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
