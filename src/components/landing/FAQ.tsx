"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "How do I know the money actually goes to the student?",
        answer: "We send you photo receipts. Every month. Tuition receipt with your name on it. Lunch distribution photos. Attendance sheet. If we don't send proof, stop paying. Simple.",
    },
    {
        question: "What if the student drops out?",
        answer: "We assign you a new student immediately. Your $30 always goes to a kid. We have a waitlist of 376 students right now.",
    },
    {
        question: "Is this tax-deductible?",
        answer: "In Pakistan: Yes (FBR verified Zakat-eligible). In US/UK: Not yet (we're working on 501c3/UK charity status). For now, it's not about the tax break. It's about the kid.",
    },
    {
        question: "Can I meet my student?",
        answer: "If you visit Lahore, yes. We arrange school visits. Most Guardians are overseas, so WhatsApp videos work better.",
    },
    {
        question: "What if I can't afford $30/month anymore?",
        answer: "Cancel anytime. No guilt. No questions. Life happens. We'll find another Guardian for your student.",
    },
    {
        question: "Do you take Zakat?",
        answer: "Yes. Hammad Foundation is FBR-approved for Zakat. Education expenses are 100% Zakat-eligible.",
    },
    {
        question: "Why not just give to a big NGO like TCF?",
        answer: "TCF is great. But you're donating to \"a program.\" With us, you sponsor YOUR student. You see their face. You get updates. It's personal, not pooled.",
    },
    {
        question: "This sounds too good to be true.",
        answer: "Text Ali Choudhary (Director): +92 300 8099015. Ask him anything. He replies himself. If he doesn't reply in 24 hours, don't donate. Fair?",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-16 bg-brand-gray-50/30 border-b border-brand-charcoal/5">
            <div className="container max-w-4xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl lg:text-[44px] font-black text-brand-charcoal leading-[1.15] tracking-tight mb-4">
                        &ldquo;Yeah, But...&rdquo;{" "}
                        <span className="text-brand-nero italic">We&rsquo;ve Heard It All</span>
                    </h2>
                    <p className="text-[11px] font-black text-brand-charcoal/30 uppercase tracking-[0.3em]">
                        Answers to your toughest questions:
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-brand-charcoal/5 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brand-nero/20 transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-black text-brand-charcoal text-base pr-8">
                                    {faq.question}
                                </span>
                                <div
                                    className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                        openIndex === index
                                            ? "bg-brand-nero text-white"
                                            : "bg-brand-charcoal/5 text-brand-charcoal/40"
                                    )}
                                >
                                    <Plus className={cn("w-4 h-4", openIndex === index && "hidden")} />
                                    <Minus className={cn("w-4 h-4", openIndex !== index && "hidden")} />
                                </div>
                            </button>
                            <div
                                className={cn(
                                    "transition-all duration-300 overflow-hidden",
                                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="px-5 pb-5 border-t border-brand-charcoal/5">
                                    <p className="text-sm text-brand-charcoal/60 leading-relaxed font-medium pt-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
