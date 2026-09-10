"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import { siteUrls } from "@/config/ecosystem";

export function Hero() {
    return (
        <section className="relative pt-12 pb-20 md:py-24 bg-white shadow-sm overflow-hidden">
            <div className="container relative z-10 flex w-full flex-col gap-12 xl:flex-row xl:gap-16 items-center">
                {/* Left copy column */}
                <div className="min-w-0 flex-[1.15] text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-nero/10 border border-brand-nero/20 text-brand-nero text-xs font-black uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="animate-pulse" />
                        School project of YZ Educational Services
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-[900] tracking-tight text-brand-charcoal leading-[1.08] mb-6">
                        A clear school project.<br />
                        A clearer way to support it.
                    </h1>

                    <div className="space-y-4 mb-8">
                        <p className="text-lg md:text-xl font-[800] text-brand-charcoal leading-snug">
                            Hammad Foundation is a school project of YZ Educational Services.
                        </p>
                        <p className="text-base text-brand-charcoal/70 leading-relaxed max-w-xl font-medium">
                            Hammad communicates the school and community experience. Support is selected here, then payment continues through YZ with the recipient and project designation shown before you continue.
                        </p>
                    </div>

                    {/* Cost breakdown card */}
                    <div className="bg-brand-gray-50 rounded-2xl p-6 md:p-8 mb-8 border border-brand-charcoal/5 shadow-sm">
                        <p className="text-xs font-black text-brand-charcoal/50 uppercase tracking-[0.15em] mb-4">
                            Support options can be designated for:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                            {[
                                { text: "School continuity and learning support", highlight: "learning" },
                                { text: "Books and student essentials", highlight: "essentials" },
                                { text: "Guardian community communication", highlight: "community" },
                                { text: "Programme updates when verified", highlight: "updates" },
                                { text: "Support designated through YZ", highlight: "payment" },
                                { text: "Public accountability information", highlight: "evidence" },
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm md:text-base text-brand-charcoal font-semibold">
                                    <CheckCircle2 className="w-5 h-5 text-brand-nero shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 pt-4 border-t border-brand-charcoal/10 text-sm text-brand-charcoal/70 italic font-medium">
                            No payment is confirmed on this site. YZ shows the recipient and Hammad Foundation designation before any payment begins.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <a
                            href={`${siteUrls.yz}/donate?project=hammad-foundation`}
                            className="btn-brand min-h-16 h-auto w-full sm:w-auto sm:min-w-[18rem] max-w-full px-6 sm:px-8 py-3 text-base md:text-lg flex flex-col items-center justify-center leading-tight text-center shadow-[0_4px_14px_0_rgba(15,157,88,0.39)] hover:shadow-[0_6px_20px_0_rgba(15,157,88,0.45)]"
                        >
                            <span className="font-black leading-tight">CHOOSE SUPPORT THROUGH YZ &rarr;</span>
                            <span className="mt-1 text-[11px] leading-snug opacity-80 font-semibold">Recipient and designation shown before payment</span>
                        </a>

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
                                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-brand-nero">Mission-facing project</p>
                                <p className="text-3xl font-black leading-[1.05] tracking-tight md:text-4xl">A direct line to the school project.</p>
                                <div className="mt-7 h-px w-16 bg-brand-nero" />
                                <p className="mt-4 text-sm leading-relaxed text-white/65">School information stays on Hammad Foundation. Support and payment identity stay clear through YZ.</p>
                            </div>
                        </div>

                        {/* Overlay Card */}
                        <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/95 backdrop-blur-md text-white rounded-2xl p-6 border border-white/10 shadow-xl">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">
                                        Support route
                                    </p>
                                    <p className="text-2xl md:text-3xl font-[900] leading-none">
                                        Through YZ <span className="text-xs text-white/60 font-medium">Educational Services</span>
                                    </p>
                                </div>
                                <p className="text-sm font-black text-brand-nero">Hammad designation</p>
                            </div>

                            <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/10">
                                <p className="text-xs font-[900] text-brand-nero flex items-center gap-1.5">
                                    <CheckCircle2 size={14} />
                                    Payment recipient: YZ Educational Services
                                </p>
                                <p className="text-[11px] text-white/70 font-medium">
                                    Designated project: Hammad Foundation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
