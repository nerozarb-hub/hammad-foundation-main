"use client";

import { X, Check } from "lucide-react";

export function Comparison() {
    return (
        <section className="py-16 bg-brand-gray-50">
            <div className="container">
                <h2 className="text-center text-3xl lg:text-4xl font-[800] text-brand-charcoal tracking-tight mb-12">
                    $30 in Houston vs. $30 in Lahore
                </h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Houston */}
                    <div className="bg-white p-8 rounded-2xl border border-brand-charcoal/5 shadow-sm">
                        <h3 className="text-sm font-[800] text-brand-charcoal/40 uppercase tracking-[0.15em] mb-6">
                            In Houston:
                        </h3>
                        <ul className="space-y-4 mb-6">
                            {[
                                "2 Starbucks orders",
                                "1 lunch at Chipotle",
                                "Netflix subscription",
                                "DoorDash delivery fees",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 text-base font-bold text-brand-charcoal/50"
                                >
                                    <X className="w-5 h-5 text-brand-red shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-brand-charcoal/40 italic">
                            (You forget you spent it)
                        </p>
                    </div>

                    {/* Lahore */}
                    <div className="bg-brand-nero p-8 rounded-2xl text-white shadow-md">
                        <h3 className="text-sm font-[800] text-white/50 uppercase tracking-[0.15em] mb-6">
                            In Lahore:
                        </h3>
                        <ul className="space-y-4 mb-6">
                            {[
                                "Entire month of school tuition",
                                "Lunch every single day",
                                "Books, uniform, supplies",
                                "One step closer to doctor/engineer",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-3 text-base font-bold text-white"
                                >
                                    <Check className="w-5 h-5 text-white shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm font-bold text-white/70 italic">
                            (A kid remembers you forever)
                        </p>
                    </div>
                </div>

                <p className="text-center mt-12 text-2xl font-[800] text-brand-charcoal tracking-tight">
                    Which $30 matters more?
                </p>
            </div>
        </section>
    );
}
