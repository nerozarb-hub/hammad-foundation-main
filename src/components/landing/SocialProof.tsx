"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export function SocialProof() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const target = 124;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, []);

    const testimonials = [
        {
            quote: "I spent $35 at Starbucks last week. This is $30/month and changes a life.",
            author: "Dr. Ahmed",
            location: "Houston",
        },
        {
            quote: "My daughter has everything. A kid in Lahore deserves the same chance.",
            author: "Sara M.",
            location: "London",
        },
        {
            quote: "Best $30 I spend every month. I get WhatsApp videos. I see him grow.",
            author: "Ali K.",
            location: "Dubai",
        },
    ];

    const feed = [
        { name: "Ayesha (Grade 6)", time: "2 minutes ago" },
        { name: "Hassan (Grade 4)", time: "8 minutes ago" },
    ];

    return (
        <section id="proof" className="py-16 bg-white shadow-sm">
            <div className="container">
                <h2 className="text-center text-3xl lg:text-4xl font-[800] text-brand-charcoal tracking-tight mb-12">
                    124 Guardians From Houston, London, and Dubai Already Said Yes.
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-brand-gray-50 p-6 rounded-xl border border-brand-charcoal/5 shadow-sm hover:shadow-md hover:border-brand-nero/20 transition-all"
                        >
                            <p className="text-base font-medium text-brand-charcoal leading-relaxed mb-4 italic">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <p className="text-sm font-bold text-brand-charcoal">
                                &mdash; {t.author},{" "}
                                <span className="text-brand-nero">{t.location}</span>
                            </p>
                        </div>
                    ))}
                </div>

                {/* Live counter card */}
                <div className="max-w-3xl mx-auto bg-brand-charcoal rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <CheckCircle2 className="w-24 h-24" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                                <span className="text-[11px] font-[800] uppercase tracking-[0.15em] text-white/50">
                                    Live Updates
                                </span>
                            </div>
                            <h3 className="text-4xl font-[900] leading-none mb-2">
                                {count} / 500
                            </h3>
                            <p className="text-sm font-bold text-white/50 mb-5">
                                Guardians Secured Across 8 Countries
                            </p>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-nero rounded-full transition-all duration-1000"
                                    style={{ width: `${(count / 500) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-64 space-y-3">
                            {feed.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10"
                                >
                                    <div className="w-8 h-8 rounded-full bg-brand-nero/20 flex items-center justify-center text-brand-nero">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">
                                            Just secured: {item.name}
                                        </p>
                                        <p className="text-[10px] text-white/40">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
