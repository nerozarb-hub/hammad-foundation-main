"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function FinalCTA() {
    return (
        <section className="py-20 md:py-32 bg-white shadow-sm relative overflow-hidden border-t border-brand-charcoal/5">
            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">A clear next step</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal leading-tight tracking-tight mt-4 mb-8">Support the school project with the full context</h2>
                    <div className="space-y-6 text-base md:text-lg leading-relaxed text-brand-charcoal/70 mb-12 font-medium">
                        <p>Hammad Foundation is the mission-facing school project. YZ Educational Services is the parent operating and payment entity.</p>
                        <div className="max-w-lg mx-auto bg-brand-charcoal p-6 md:p-8 rounded-3xl text-white text-base md:text-lg leading-relaxed shadow-xl border border-brand-charcoal/10">
                            <div className="flex items-center justify-center gap-2 text-brand-nero font-black text-sm uppercase tracking-widest mb-3"><ShieldCheck size={18} /> Payment identity</div>
                            <p>YZ shows the payment recipient and Hammad Foundation designation before a supporter continues.</p>
                        </div>
                        <p className="text-xl md:text-2xl font-[900] text-brand-charcoal tracking-tight pt-4">Choose a support option on YZ when you are ready.</p>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="https://yzeducationalservices.com/donate?project=hammad-foundation"
                            className="btn-brand w-full sm:w-auto h-16 px-12 text-base md:text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2 mx-auto"
                        >
                            OPEN YZ SUPPORT PAGE <ArrowRight size={20} />
                        </Link>
                        <p className="text-xs font-bold text-brand-charcoal/50">The payment recipient and project designation are shown before payment.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
