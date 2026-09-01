"use client";

import { UserCheck, Video, Award, ArrowRight } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            num: "01",
            icon: UserCheck,
            title: "Pick Your Student",
            desc: "Select a specific child from our waitlist or choose a sponsorship package. Takes under 90 seconds.",
        },
        {
            num: "02",
            icon: Video,
            title: "First Update in 48 Hours",
            desc: "Receive your student's official welcome photo, background bio, and your first personal WhatsApp greeting.",
        },
        {
            num: "03",
            icon: Award,
            title: "Watch Them Rise",
            desc: "Every month, receive direct tuition receipts, classroom meal photos, and term examination report cards.",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 md:py-24 bg-white border-t border-brand-charcoal/5">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Simple 3-Step Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-3">
                        How Guardian Sponsorship Works
                    </h2>
                    <p className="text-base text-brand-charcoal/60 font-medium">
                        Direct connection from your phone to a classroom in Lahore. No middlemen, no mystery.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="bg-brand-gray-50 p-8 md:p-10 rounded-3xl border border-brand-charcoal/5 relative shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-nero shadow-sm border border-brand-charcoal/5">
                                        <step.icon size={24} />
                                    </div>
                                    <span className="text-3xl font-[900] text-brand-charcoal/20">
                                        {step.num}
                                    </span>
                                </div>
                                <h3 className="text-xl font-[900] text-brand-charcoal mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
