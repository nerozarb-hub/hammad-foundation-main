"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, MessageSquareQuote } from "lucide-react";

export function SocialProof() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const target = 124;
        const duration = 1800;
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
            quote: "I spent $35 at Starbucks last week without thinking. This $30/month pays an entire month of tuition and lunch for my student. The weekly WhatsApp video made it real.",
            author: "Dr. Ahmed Tariq",
            location: "Houston, TX",
            role: "Cardiologist & Active Guardian",
        },
        {
            quote: "My children in London have every educational opportunity imaginable. A bright child in Lahore deserves the exact same fighting chance. Best recurring payment I make.",
            author: "Sara Mansoor",
            location: "London, UK",
            role: "Software Consultant",
        },
        {
            quote: "No galas, no corporate bureaucracy. I get direct WhatsApp clips from Sir Ali and report cards from my sponsored student. You can feel the real human impact.",
            author: "Ali Khan",
            location: "Dubai, UAE",
            role: "Financial Analyst",
        },
    ];

    const recentSecured = [
        { name: "Ayesha (Grade 6)", time: "2 minutes ago", city: "Houston, TX" },
        { name: "Hassan (Grade 4)", time: "8 minutes ago", city: "London, UK" },
        { name: "Zainab (Grade 7)", time: "14 minutes ago", city: "Dubai, UAE" },
    ];

    return (
        <section id="proof" className="py-20 md:py-24 bg-white shadow-sm border-t border-brand-charcoal/5">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Guardian Community
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-4">
                        124 Guardians From Houston, London &amp; Dubai Already Said Yes.
                    </h2>
                    <p className="text-base text-brand-charcoal/60 font-medium">
                        Real Pakistani diaspora professionals sponsoring students 1-on-1 with complete visibility.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-brand-gray-50 p-8 rounded-2xl border border-brand-charcoal/5 shadow-sm hover:shadow-md hover:border-brand-nero/30 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <MessageSquareQuote className="w-8 h-8 text-brand-nero/30 mb-4" />
                                <p className="text-sm md:text-base font-medium text-brand-charcoal leading-relaxed mb-6 italic">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>
                            <div className="pt-4 border-t border-brand-charcoal/10">
                                <p className="text-sm font-bold text-brand-charcoal">
                                    {t.author}
                                </p>
                                <p className="text-xs font-semibold text-brand-nero">
                                    {t.location} &bull; <span className="text-brand-charcoal/50">{t.role}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Live counter card */}
                <div className="max-w-4xl mx-auto bg-brand-charcoal rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <CheckCircle2 className="w-36 h-36" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                                <span className="text-xs font-[800] uppercase tracking-[0.2em] text-white/60">
                                    Real-Time Student Tracker
                                </span>
                            </div>
                            <h3 className="text-5xl font-[900] leading-none mb-3">
                                {count} / 500
                            </h3>
                            <p className="text-sm md:text-base font-bold text-white/60 mb-6">
                                Students Secured Across 8 Countries &bull; 376 Still Waiting
                            </p>
                            <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-nero rounded-full transition-all duration-1000"
                                    style={{ width: `${(count / 500) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Recent Activity Ticker */}
                        <div className="w-full md:w-72 space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">
                                Recent Sponsorships
                            </p>
                            {recentSecured.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10"
                                >
                                    <div className="w-8 h-8 rounded-full bg-brand-nero/20 flex items-center justify-center text-brand-nero shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-white leading-snug">
                                            Just secured: {item.name}
                                        </p>
                                        <p className="text-[10px] text-white/50">
                                            {item.city} &bull; {item.time}
                                        </p>
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
