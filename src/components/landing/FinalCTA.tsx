"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Sparkles } from "lucide-react";

interface FinalCTAProps {
    onSelectPlan?: (planId: string) => void;
}

export function FinalCTA({ onSelectPlan }: FinalCTAProps) {
    return (
        <section className="py-20 md:py-32 bg-white shadow-sm relative overflow-hidden border-t border-brand-charcoal/5">
            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Your Decision
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal leading-tight tracking-tight mt-4 mb-8">
                        The Choice Has Always Been Yours
                    </h2>

                    <div className="space-y-6 text-base md:text-lg leading-relaxed text-brand-charcoal/70 mb-12 font-medium">
                        <p>
                            You can close this tab right now. Go back to scrolling. Forget about the child outside the school gate. Order takeout later this evening (there goes the $30).
                        </p>

                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-px w-12 bg-brand-charcoal/15"></div>
                            <p className="font-black text-brand-charcoal uppercase tracking-[0.3em] text-xs">
                                OR
                            </p>
                            <div className="h-px w-12 bg-brand-charcoal/15"></div>
                        </div>

                        <p>
                            Click the button below. Take 90 seconds. Settle your monthly $30 pledge.
                        </p>

                        <div className="max-w-lg mx-auto bg-brand-charcoal p-6 md:p-8 rounded-3xl text-white font-bold italic text-base md:text-lg leading-relaxed shadow-xl border border-brand-charcoal/10">
                            &ldquo;Salaam! You are now the official Guardian of Ayesha, 9 years old. She dreams of becoming a doctor. Here is her welcome photo and first video message.&rdquo;
                        </div>

                        <p className="text-xl md:text-2xl font-[900] text-brand-charcoal tracking-tight pt-4">
                            124 Guardians already said yes. 376 students are waiting.
                        </p>
                        <p className="text-2xl md:text-3xl font-[900] text-brand-nero tracking-tight">
                            Will you be Guardian #125?
                        </p>
                    </div>

                    <div className="space-y-4">
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
                            className="btn-brand w-full sm:w-auto h-16 px-12 text-base md:text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl inline-flex flex-col items-center justify-center leading-tight mx-auto"
                        >
                            <span>YES &mdash; I&apos;LL SPONSOR NOW</span>
                            <span className="text-[11px] font-bold opacity-75">$30/month &bull; Cancel Anytime &bull; First Update in 48h</span>
                        </button>

                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (onSelectPlan) {
                                        onSelectPlan("starter");
                                    } else {
                                        const element = document.getElementById("donate");
                                        element?.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                                className="text-xs font-black text-brand-charcoal/50 hover:text-brand-nero uppercase tracking-widest underline underline-offset-4 transition-colors"
                            >
                                I want to start with a one-time $15 or $25 gift instead
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
