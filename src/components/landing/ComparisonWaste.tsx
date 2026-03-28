"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ComparisonWaste() {
    const items = [
        { label: "Netflix", price: "$15.99" },
        { label: "Spotify", price: "$10.99" },
        { label: "That gym membership you never use", price: "$29" },
        { label: "DoorDash fees last week", price: "$35" },
        { label: "Coffee shop runs", price: "$30" },
        { label: "Amazon Prime", price: "$14.99" },
        { label: "That app subscription you forgot to cancel", price: "$9.99" },
    ];

    return (
        <section className="py-16 bg-white shadow-sm">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-[44px] font-black text-brand-charcoal leading-[1.15] tracking-tight mb-4">
                            You Already Spend $30/Month on Stuff You Forget About
                        </h2>
                        <p className="text-[11px] font-black text-brand-charcoal/30 uppercase tracking-[0.3em]">
                            A typical bank statement in the West:
                        </p>
                    </div>

                    {/* Bank statement card */}
                    <div className="bg-brand-gray-50 rounded-2xl p-4 border border-brand-charcoal/5 mb-14 relative shadow-md">
                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-charcoal text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                            Auto-Pay Active
                        </div>
                        <div className="bg-white rounded-xl p-6 space-y-0">
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between gap-4 py-4 border-b border-brand-charcoal/5 last:border-0 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-7 h-7 rounded-lg bg-brand-charcoal/5 flex items-center justify-center text-xs font-bold text-brand-charcoal/40 group-hover:bg-brand-nero/10 group-hover:text-brand-nero transition-colors">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm font-bold text-brand-charcoal/70">{item.label}</p>
                                    </div>
                                    <p className="text-sm font-black text-brand-charcoal/30 group-hover:text-brand-red transition-colors">
                                        {item.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Emotional payoff */}
                    <div className="text-center space-y-8">
                        <h3 className="text-2xl lg:text-3xl font-black text-brand-charcoal tracking-tight">
                            Now imagine spending $30 on something you&rsquo;ll{" "}
                            <span className="text-brand-nero">NEVER forget.</span>
                        </h3>
                        <p className="text-base text-brand-charcoal/60 leading-relaxed max-w-3xl mx-auto">
                            Every Friday, your phone buzzes.{" "}
                            <span className="font-black text-brand-charcoal">WhatsApp video from Lahore.</span> A 10-year-old saying:{" "}
                            <span className="text-brand-nero font-black italic">
                                &ldquo;Thank you Uncle. I got 95% in Math this term.&rdquo;
                            </span>
                        </p>

                        <p className="text-xl lg:text-2xl font-black text-brand-charcoal tracking-tight">
                            Which $30 do you remember when you&rsquo;re 70?
                        </p>
                        <Button size="lg" className="h-14 px-10 text-base font-black" asChild>
                            <Link href="#donate">I&rsquo;D RATHER INVEST IN A FUTURE DOCTOR</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
