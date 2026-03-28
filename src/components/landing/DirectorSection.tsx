"use client";

import { MessageCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DirectorSection() {
    return (
        <section className="py-16 bg-brand-blue shadow-sm">
            <div className="container">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">

                    {/* Image */}
                    <div className="flex-shrink-0 w-full max-w-sm relative">
                        <div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-lg border border-brand-charcoal/5">
                            <img
                                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/7b5f254b-7a49-4fe7-bd18-98bbcc1aab83/Screenshot-2026-02-14-at-6.32.51-AM-1771032790996.png?width=1200&height=1500&resize=contain"
                                alt="Sir Ali Choudhary - Director"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
                                <p className="text-xl font-black mb-0.5">Sir Ali Choudhary</p>
                                <p className="text-[11px] font-black text-brand-nero uppercase tracking-widest">Director & Educational Leader</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-nero/10 rounded-full mb-4">
                                <span className="w-1.5 h-1.5 bg-brand-nero rounded-full animate-pulse" />
                                <p className="text-[10px] font-black text-brand-nero uppercase tracking-widest">Director&rsquo;s Message</p>
                            </div>
                            <h2 className="text-2xl lg:text-[36px] font-black text-brand-charcoal leading-[1.15] tracking-tight">
                                Built By Someone Who Understands,{" "}
                                <span className="text-brand-nero italic">Not a Career Charity Worker</span>
                            </h2>
                        </div>

                        <div className="space-y-4 text-base leading-relaxed text-brand-charcoal/70">
                            <p>
                                &ldquo;I&rsquo;m not a &lsquo;charity guy.&rsquo; I don&rsquo;t run galas. I don&rsquo;t write grant proposals. I live in Lahore.{" "}
                                <span className="font-black text-brand-charcoal">I see these kids every day.</span>&rdquo;
                            </p>
                            <p>
                                Kids sitting outside schools because their parents couldn&rsquo;t pay Rs. 3,000 ($10) that month. Kids in garment factories sewing clothes for export.
                            </p>
                            <p className="text-brand-charcoal font-black italic border-l-4 border-brand-nero/20 pl-4 py-2 bg-white rounded-r-lg text-sm">
                                &ldquo;I got angry. Why are brilliant kids stuck in poverty while mediocre kids go to university? Because of $10 USD.&rdquo;
                            </p>
                            <p>
                                So I built <span className="text-brand-charcoal font-black">Hammad Foundation School.</span>{" "}
                                <span className="font-black text-brand-nero">It&rsquo;s a matching system.</span> I match you (who has $30/month spare) with a kid (who needs it to escape poverty). No galas. No overhead. No corruption.
                            </p>
                        </div>

                        <Button className="h-12 px-8 gap-3 text-sm" asChild>
                            <a href="https://wa.me/923008099015?text=Salaam Sir Ali! I read your story. I want to help.">
                                <MessageCircle className="w-4 h-4 fill-current" />
                                TEXT SIR ALI CHOUDHARY NOW
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
