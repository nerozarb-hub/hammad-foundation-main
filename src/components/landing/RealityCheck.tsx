"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function RealityCheck() {
    return (
        <section className="py-16 bg-brand-charcoal text-white relative shadow-lg">
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-brand-red animate-pulse" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-red">
                            Urgent Reality Check
                        </span>
                    </div>

                    <h2 className="text-3xl lg:text-[44px] font-black text-white leading-[1.15] tracking-tight mb-10">
                        What happens if you <span className="text-white/30">just close</span> this page?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-5 text-base leading-relaxed text-white/60">
                            <p>If this page closes and you forget about it:</p>
                            <p className="text-white text-lg">
                                A 10-year-old in Lahore{" "}
                                <span className="font-black underline decoration-brand-red decoration-4 underline-offset-4">
                                    drops out next month.
                                </span>
                            </p>
                            <p>
                                Not because they&rsquo;re dumb. Not because they don&rsquo;t want to learn. Because their parents can&rsquo;t afford Rs. 3,000 ($10).
                            </p>
                            <p className="bg-white/5 p-5 rounded-xl border border-white/10 italic text-white/80 text-sm">
                                &ldquo;This isn&rsquo;t emotional manipulation. This is math.&rdquo;
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <p className="text-[11px] font-black text-brand-nero uppercase tracking-widest">The Cycle:</p>
                                {[
                                    "Age 10: Drops out to work factory floor",
                                    "Age 15: Married off or stuck in hard labor",
                                    "Age 20: First child born into same cycle",
                                    "Forever: Permanent, generational poverty",
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm font-bold text-white/90">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-base font-bold text-brand-nero mb-4">
                                    Your $30 breaks that cycle. For one kid. Forever.
                                </p>
                                <Button size="lg" className="w-full h-12 text-sm font-black" asChild>
                                    <Link href="#donate">STOP THE CYCLE &mdash; SPONSOR NOW</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
