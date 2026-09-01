"use client";

import { X, Check } from "lucide-react";

export function Comparison() {
    return (
        <section className="py-20 md:py-24 bg-brand-gray-50 border-t border-brand-charcoal/5">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Perspective &amp; Math
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4">
                        $30 in Houston vs. $30 in Lahore
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                    {/* Western Cost Column */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl border border-brand-charcoal/10 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-xs font-black text-brand-charcoal/50 uppercase tracking-[0.2em] mb-6">
                                In Houston, London, or Dubai:
                            </h3>
                            <ul className="space-y-4 mb-6">
                                {[
                                    "2 Starbucks Frappuccinos + tip",
                                    "1 quick takeout lunch at Chipotle",
                                    "Standard Netflix or Spotify subscription",
                                    "DoorDash delivery fee & service charge",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3.5 text-base font-bold text-brand-charcoal/60"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                            <X className="w-4 h-4 text-brand-red" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-xs font-semibold text-brand-charcoal/40 italic pt-4 border-t border-brand-charcoal/10">
                            (Spent and forgotten within 48 hours)
                        </p>
                    </div>

                    {/* Lahore Impact Column */}
                    <div className="bg-brand-nero p-8 md:p-10 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-xs font-black text-white/60 uppercase tracking-[0.2em] mb-6">
                                In Barki Road, Lahore:
                            </h3>
                            <ul className="space-y-4 mb-6">
                                {[
                                    "Full 30-day primary school tuition",
                                    "Fresh cooked daily hot lunch every day",
                                    "All school textbooks, notebooks & uniform",
                                    "Real path out of generational poverty",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3.5 text-base font-bold text-white"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-xs font-bold text-white/80 italic pt-4 border-t border-white/10">
                            (A child remembers your name and kindness forever)
                        </p>
                    </div>
                </div>

                <p className="text-center mt-12 text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight">
                    Which $30 changes a lifetime?
                </p>
            </div>
        </section>
    );
}
