"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ComparisonWasteProps {
    onSelectPlan?: (planId: string) => void;
}

export function ComparisonWaste({ onSelectPlan }: ComparisonWasteProps) {
    const expenses = [
        { name: "Netflix Subscription", cost: "$15.99" },
        { name: "Spotify Premium", cost: "$10.99" },
        { name: "Unused Gym Membership", cost: "$29.00" },
        { name: "DoorDash Delivery Fees Last Week", cost: "$35.00" },
        { name: "Two Coffee Shop Runs", cost: "$30.00" },
        { name: "Amazon Prime", cost: "$14.99" },
        { name: "App Subscription You Forgot to Cancel", cost: "$9.99" },
    ];

    return (
        <section className="py-20 md:py-24 bg-white border-t border-brand-charcoal/5">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                            Daily Reality Check
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-3">
                            You Already Spend $30/Month on Things You Forget
                        </h2>
                        <p className="text-xs font-black text-brand-charcoal/40 uppercase tracking-[0.25em]">
                            A typical bank statement in the West:
                        </p>
                    </div>

                    {/* Bank Statement Card */}
                    <div className="bg-brand-gray-50 rounded-3xl p-6 md:p-8 border border-brand-charcoal/10 mb-14 relative shadow-lg">
                        <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-charcoal text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
                            Auto-Pay Active
                        </div>

                        <div className="bg-white rounded-2xl p-6 divide-y divide-brand-charcoal/5 shadow-sm">
                            {expenses.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between gap-4 py-3.5 group hover:bg-brand-gray-50/80 px-3 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-7 h-7 rounded-lg bg-brand-charcoal/5 flex items-center justify-center text-xs font-bold text-brand-charcoal/50 group-hover:bg-brand-nero/10 group-hover:text-brand-nero transition-colors">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm font-bold text-brand-charcoal">
                                            {item.name}
                                        </p>
                                    </div>
                                    <p className="text-sm font-black text-brand-charcoal/40 group-hover:text-brand-red transition-colors">
                                        {item.cost}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center space-y-6 max-w-3xl mx-auto">
                        <h3 className="text-2xl sm:text-3xl font-[900] text-brand-charcoal tracking-tight">
                            Now imagine spending $30 on something you&apos;ll <span className="text-brand-nero">never forget.</span>
                        </h3>
                        <p className="text-base text-brand-charcoal/70 leading-relaxed font-medium">
                            Every month, your WhatsApp buzzes. A 10-year-old student in Lahore sends a direct video: <span className="text-brand-charcoal font-black italic">&ldquo;Thank you Uncle. I scored 94% in Science this term.&rdquo;</span>
                        </p>
                        <p className="text-xl sm:text-2xl font-[900] text-brand-charcoal tracking-tight pt-2">
                            Which $30 do you remember decades from now?
                        </p>
                        <div>
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
                                className="btn-brand h-14 px-10 text-base font-black rounded-2xl shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                            >
                                I&apos;D RATHER INVEST IN A FUTURE DOCTOR <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
