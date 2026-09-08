"use client";

import { CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";

interface HeroProps {
    onSelectPlan?: (planId: string) => void;
}

export function Hero({ onSelectPlan }: HeroProps) {
    const { city } = useGeoLocation();

    return (
        <section className="relative pt-12 pb-20 md:py-24 bg-white shadow-sm overflow-hidden">
            <div className="container relative z-10 flex w-full flex-col gap-12 xl:flex-row xl:gap-16 items-center">
                {/* Left copy column */}
                <div className="min-w-0 flex-[1.15] text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-nero/10 border border-brand-nero/20 text-brand-nero text-xs font-black uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="animate-pulse" />
                        1-to-1 Direct Student Sponsorship
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-[900] tracking-tight text-brand-charcoal leading-[1.08] mb-6">
                        You made it in <span className="text-brand-nero">{city || "Houston"}</span>.<br />
                        Now make it possible for someone in Lahore.
                    </h1>

                    <div className="space-y-4 mb-8">
                        <p className="text-lg md:text-xl font-[800] text-brand-charcoal leading-snug">
                            Overseas Pakistanis are sponsoring 500 students at $30/month.<br />
                            <span className="text-brand-nero">124 students secured. 376 waiting for their Guardian.</span>
                        </p>
                        <p className="text-base text-brand-charcoal/70 leading-relaxed max-w-xl font-medium">
                            You don&apos;t donate to an abstract overhead fund. You sponsor <strong className="font-black text-brand-charcoal">YOUR student</strong>. You get their name, photo, and weekly WhatsApp progress videos directly from Lahore.
                        </p>
                    </div>

                    {/* Cost breakdown card */}
                    <div className="bg-brand-gray-50 rounded-2xl p-6 md:p-8 mb-8 border border-brand-charcoal/5 shadow-sm">
                        <p className="text-xs font-black text-brand-charcoal/50 uppercase tracking-[0.15em] mb-4">
                            For less than Netflix + Spotify ($30/month):
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                            {[
                                { text: "Full tuition paid on time", highlight: "tuition" },
                                { text: "Daily hot cooked lunch", highlight: "lunch" },
                                { text: "All textbooks & stationery", highlight: "supplies" },
                                { text: "2 Uniform sets & school shoes", highlight: "shoes" },
                                { text: "Routine healthcare checkups", highlight: "healthcare" },
                                { text: "Weekly WhatsApp video updates", highlight: "updates" },
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm md:text-base text-brand-charcoal font-semibold">
                                    <CheckCircle2 className="w-5 h-5 text-brand-nero shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 pt-4 border-t border-brand-charcoal/10 text-sm text-brand-charcoal/70 italic font-medium">
                            You don&apos;t just fund a classroom. You raise <strong className="font-black text-brand-charcoal not-italic">YOUR student</strong> from 4th grade to University graduation.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
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
                            className="btn-brand min-h-16 h-auto w-full sm:w-auto sm:min-w-[18rem] max-w-full px-6 sm:px-8 py-3 text-base md:text-lg flex flex-col items-center justify-center leading-tight text-center shadow-[0_4px_14px_0_rgba(15,157,88,0.39)] hover:shadow-[0_6px_20px_0_rgba(15,157,88,0.45)]"
                        >
                            <span className="font-black leading-tight">BECOME A GUARDIAN &rarr; $30/MONTH</span>
                            <span className="mt-1 text-[11px] leading-snug opacity-80 font-semibold">First video update in 48 hours</span>
                        </button>

                        <a
                            href="#proof"
                            className="min-h-16 h-auto w-full sm:w-auto sm:min-w-[13rem] max-w-full px-6 py-3 flex items-center justify-center border-2 border-brand-charcoal rounded-xl text-brand-charcoal hover:bg-brand-charcoal hover:text-white text-sm md:text-base font-black leading-tight transition-all text-center"
                        >
                            <span className="hidden sm:inline">I&apos;m Skeptical &rarr; Show Me Receipts</span>
                            <span className="sm:hidden">Show Me Receipts</span>
                        </a>
                    </div>
                </div>

                {/* Right Image & Impact Meter Card */}
                <div className="relative min-w-0 w-full max-w-md flex-1 lg:max-w-lg">
                    <div className="aspect-[4/5] bg-brand-charcoal relative overflow-hidden rounded-3xl shadow-2xl border border-brand-charcoal/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(15,157,88,0.42),transparent_34%),linear-gradient(145deg,#15221b_0%,#0c0f13_72%)]" />
                        <div className="absolute inset-0 flex flex-col justify-between p-7 pb-48 md:p-9 md:pb-52 text-white">
                            <div className="flex items-start justify-between gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">Hammad Foundation School</span>
                                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70">Lahore</span>
                            </div>
                            <div className="max-w-[15rem]">
                                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-nero">Your student. Your proof.</p>
                                <p className="text-3xl font-black leading-[1.05] tracking-tight md:text-4xl">A direct line from your phone to a classroom.</p>
                                <div className="mt-7 h-px w-16 bg-brand-nero" />
                                <p className="mt-4 text-sm leading-relaxed text-white/65">Tuition, lunch, school supplies, and weekly updates—one clear monthly commitment.</p>
                            </div>
                        </div>

                        {/* Overlay Card */}
                        <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/95 backdrop-blur-md text-white rounded-2xl p-6 border border-white/10 shadow-xl">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">
                                        Live Campaign Progress
                                    </p>
                                    <p className="text-2xl md:text-3xl font-[900] leading-none">
                                        24.8% <span className="text-xs text-white/60 font-medium">Funded</span>
                                    </p>
                                </div>
                                <p className="text-sm font-black text-brand-nero">
                                    124 / 500 Students
                                </p>
                            </div>

                            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-3.5">
                                <div className="h-full bg-brand-nero rounded-full transition-all duration-1000" style={{ width: "24.8%" }} />
                            </div>

                            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/10">
                                <p className="text-xs font-[900] text-amber-400 flex items-center gap-1.5">
                                    <ShieldAlert size={14} />
                                    53 sponsorship places remain
                                </p>
                                <p className="text-[11px] text-white/70 font-medium">
                                    Every place keeps one student in school this year.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
