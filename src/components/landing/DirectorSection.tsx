"use client";

import { MessageCircle, Phone, ArrowRight } from "lucide-react";

export function DirectorSection() {
    return (
        <section className="py-20 md:py-28 bg-brand-blue shadow-sm border-t border-brand-charcoal/5">
            <div className="container">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
                    {/* Director Photo Card */}
                    <div className="flex-shrink-0 w-full max-w-sm relative">
                        <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-charcoal/10 relative">
                            <img
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/7b5f254b-7a49-4fe7-bd18-98bbcc1aab83/Screenshot-2026-02-14-at-6.32.51-AM-1771032790996.png?width=1200&height=1500&resize=contain"
                                alt="Sir Ali Choudhary - Director of Hammad Foundation"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                                <p className="text-xl font-[900] mb-0.5">Sir Ali Choudhary</p>
                                <p className="text-xs font-bold text-brand-nero uppercase tracking-widest">
                                    Director &amp; Educational Leader
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Story Content */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-nero/10 rounded-full mb-4 border border-brand-nero/20">
                                <span className="w-2 h-2 bg-brand-nero rounded-full animate-pulse"></span>
                                <p className="text-xs font-black text-brand-nero uppercase tracking-widest">
                                    Director&apos;s Direct Message
                                </p>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal leading-tight tracking-tight">
                                Built By Someone On The Ground, <br />
                                <span className="text-brand-nero italic">Not a Career NGO Executive</span>
                            </h2>
                        </div>

                        <div className="space-y-4 text-base md:text-lg leading-relaxed text-brand-charcoal/70 font-medium">
                            <p>
                                &ldquo;I am not a corporate charity worker. I don&apos;t spend my days hosting black-tie galas or applying for donor grants. I live and work right here on Barki Road, Lahore. <strong className="text-brand-charcoal font-black">I see these kids and their families every single morning.</strong>&rdquo;
                            </p>
                            <p>
                                Too many brilliant children are forced onto factory floors or brick kilns simply because their parents could not afford Rs. 3,000 ($10) in school fees for that month.
                            </p>
                            <div className="p-5 bg-white rounded-2xl border-l-4 border-brand-nero border border-brand-charcoal/5 shadow-sm text-brand-charcoal text-base font-bold italic">
                                &ldquo;Why should a child&apos;s entire destiny be crushed over the price of a takeout meal? Because of $10 to $30 a month.&rdquo;
                            </div>
                            <p>
                                So we built <strong className="text-brand-charcoal font-black">Hammad Foundation School</strong> as a direct matching bridge. We match you—a Pakistani abroad with $30/month to spare—with a verified student here in Lahore who needs that lifeline. No middleman cuts. Direct videos, direct receipts.
                            </p>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start">
                            <a
                                href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20read%20your%20story%20on%20the%20website%20and%20want%20to%20help."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-brand h-14 px-8 text-sm font-black rounded-xl inline-flex items-center gap-2.5 shadow-lg hover:shadow-xl"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                TEXT SIR ALI CHOUDHARY ON WHATSAPP
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
