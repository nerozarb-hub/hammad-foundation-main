"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FinalCTA() {
    return (
        <section className="py-20 bg-white shadow-sm relative">
            <div className="absolute inset-0 bg-brand-nero/[0.02] pointer-events-none" />

            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-[44px] font-black text-brand-charcoal leading-[1.15] tracking-tight mb-8">
                        The Choice Has Always Been Yours
                    </h2>

                    <div className="space-y-6 text-base leading-relaxed text-brand-charcoal/60 mb-12">
                        <p>
                            You can close this tab. Go back to scrolling. Forget about the kid in Lahore. Order DoorDash later (there&rsquo;s your $30).
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-8 bg-brand-charcoal/10" />
                            <p className="font-black text-brand-charcoal uppercase tracking-[0.3em] text-xs">Or.</p>
                            <div className="h-px w-8 bg-brand-charcoal/10" />
                        </div>
                        <p>
                            Click the button below. Spend 90 seconds. Enter your card details.
                        </p>
                        <p className="text-brand-charcoal font-black">
                            And in 48 hours, you get a WhatsApp message:
                        </p>
                        <div className="max-w-lg mx-auto">
                            <p className="bg-brand-charcoal p-6 rounded-2xl text-white font-bold italic text-base leading-relaxed shadow-lg">
                                &ldquo;Salaam! You are now the Guardian of Ayesha, 9 years old. She dreams of being a doctor. Here&rsquo;s her photo.&rdquo;
                            </p>
                        </div>
                        <p className="text-xl font-black text-brand-charcoal tracking-tight">
                            Because you spent <span className="text-brand-nero">$30/month.</span>
                        </p>
                        <p className="text-brand-charcoal font-black text-sm">
                            124 people already said yes. 376 students are still waiting.
                        </p>
                        <p className="text-2xl font-black text-brand-charcoal tracking-tight">
                            Will you be Guardian #125?
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black text-brand-charcoal/40 uppercase tracking-widest">
                            <span>90 Seconds</span>
                            <span>Secure Payment</span>
                            <span>WhatsApp Updates</span>
                        </div>
                        <Button
                            size="lg"
                            className="w-full md:w-auto h-16 px-12 text-lg font-black rounded-2xl shadow-[0_20px_40px_-10px_rgba(15,157,88,0.4)] hover:scale-[1.02] flex flex-col items-center justify-center gap-0.5"
                            asChild
                        >
                            <Link href="#donate">
                                <span>YES &mdash; I&rsquo;LL SPONSOR NOW</span>
                                <span className="text-[10px] font-bold opacity-60">$30/month &bull; Cancel Anytime</span>
                            </Link>
                        </Button>
                        <div>
                            <Link
                                href="#donate"
                                className="inline-block text-sm font-black text-brand-charcoal/40 hover:text-brand-nero underline underline-offset-4 transition-colors uppercase tracking-widest"
                            >
                                I want to start with a one-time gift
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
