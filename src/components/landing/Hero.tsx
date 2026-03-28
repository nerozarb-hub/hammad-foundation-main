"use client";

import { useGeoLocation } from "@/hooks/useGeoLocation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
    const { location, isLoading } = useGeoLocation();

    return (
        <section className="relative pt-16 pb-20 bg-white shadow-md">
            <div className="container relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                
                {/* Left: Copy */}
                <div className="flex-[1.1] text-left">
                    <h1 className="text-[32px] lg:text-[48px] font-[900] tracking-tight text-brand-charcoal leading-[1.1] mb-6">
                        You made it in{" "}
                        <span id="user-city" className="text-brand-nero">{isLoading ? "Houston" : location.city}</span>.<br />
                        Now make it possible for someone in Lahore.
                    </h1>

                    <div className="space-y-4 mb-8">
                        <p className="text-lg font-[800] text-brand-charcoal leading-snug">
                            Overseas Pakistanis are sponsoring 500 students at $30/month.<br />
                            <span className="text-brand-nero">124 students secured. 376 waiting for their Guardian.</span>
                        </p>
                        <p className="text-base text-brand-charcoal/60 leading-relaxed max-w-xl">
                            You don&rsquo;t &ldquo;donate to a cause.&rdquo; You sponsor{" "}
                            <span className="font-bold text-brand-charcoal">YOUR student</span>. You get their name, photo, and weekly progress.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white rounded-2xl p-6 mb-8 border border-brand-charcoal/5 shadow-card">
                        <p className="text-xs font-black text-brand-charcoal/40 uppercase tracking-[0.15em] mb-4">
                            For less than Netflix + Spotify:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {[
                                { text: "Full", bold: "tuition", rest: "paid on time" },
                                { text: "Daily hot", bold: "lunch", rest: "" },
                                { text: "All school", bold: "supplies", rest: "" },
                                { text: "Uniform & shoes", bold: "", rest: "" },
                                { text: "Healthcare & checkups", bold: "", rest: "" },
                                { text: "Weekly WhatsApp", bold: "updates", rest: "" },
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[18px] text-brand-charcoal">
                                    <CheckCircle2 className="w-6 h-6 text-brand-nero shrink-0" />
                                    <span>
                                        {item.text}{" "}
                                        {item.bold && <span className="font-black">{item.bold}</span>}{" "}
                                        {item.rest}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 pt-4 border-t border-brand-charcoal/10 text-base text-brand-charcoal/70 italic">
                            You don&rsquo;t &ldquo;donate to a cause.&rdquo; You raise{" "}
                            <span className="font-black text-brand-charcoal not-italic">YOUR student</span>{" "}
                            from 4th grade &rarr; University.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-full sm:w-auto">
                            <Link
                                href="#donate"
                                className="btn-brand w-full sm:w-auto h-16 text-lg px-10 flex flex-col items-center justify-center leading-tight"
                            >
                                <span className="font-black">BECOME A GUARDIAN &rarr; $30/MONTH</span>
                                <span className="text-[11px] opacity-75 font-medium mt-0.5">(First update in 48 hours)</span>
                            </Link>
                        </div>
                        <Link
                            href="#proof"
                            className="w-full sm:w-auto h-16 flex items-center justify-center border-2 border-brand-charcoal rounded-xl text-brand-charcoal hover:bg-brand-charcoal hover:text-white text-base font-black transition-all px-8"
                        >
                            I&rsquo;m Skeptical &rarr; Show Me Receipts
                        </Link>
                    </div>
                </div>

                {/* Right: Image + overlay card */}
                <div className="flex-1 w-full max-w-lg relative">
                    <div className="aspect-[4/5] bg-white relative overflow-hidden rounded-2xl shadow-lg border border-brand-charcoal/5">
                        <img
                            src="https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=800"
                            alt="Hammad Foundation Classroom"
                            className="w-full h-full object-cover"
                        />

                        {/* Progress overlay */}
                        <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal text-white rounded-xl p-5">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Impact</p>
                                    <p className="text-2xl font-[900] leading-none">
                                        24.8% <span className="text-xs text-white/50 font-medium">Funded</span>
                                    </p>
                                </div>
                                <p className="text-xs font-black text-brand-nero">124 / 500</p>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                                <div
                                    className="h-full bg-brand-nero rounded-full"
                                    style={{ width: "24.8%" }}
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-[900] text-brand-nero">
                                    ⚠️ URGENT: 53 spots left for 2025-2026
                                </p>
                                <p className="text-[11px] text-white/50 font-medium">
                                    After June, they wait another year—or quit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
