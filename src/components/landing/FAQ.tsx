"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
    q: string;
    a: string;
}

const faqs: FAQItem[] = [
    {
        q: "How do I know the money actually goes to the student?",
        a: "Support is initiated through YZ Educational Services, which shows the recipient and Hammad Foundation designation before payment. Public programme updates and records are published only when they have a source and review owner.",
    },
    {
        q: "What if my sponsored student drops out or their family moves?",
        a: "The project team should explain any programme change directly. Contact the school team for current programme information and contact YZ for payment or transaction questions.",
    },
    {
        q: "Who receives a support payment?",
        a: "Payments are received by YZ Educational Services (Private) Limited and designated for Hammad Foundation. The website does not claim separate NGO, charity, tax-deductible, or Zakat status for Hammad Foundation.",
    },
    {
        q: "Can I meet my student in person if I visit Lahore?",
        a: "Contact the school team before visiting so the current campus hours, safeguarding requirements, and visitor arrangements can be confirmed.",
    },
    {
        q: "What if I need to cancel recurring support?",
        a: "Cancellation and refund terms must be shown on the YZ payment page before any recurring support is enabled. Contact YZ with the transaction reference for payment questions.",
    },
    {
        q: "Why sponsor 1-to-1 instead of donating to a large pooled NGO?",
        a: "Hammad Foundation is the mission-facing school project. YZ Educational Services is the parent operating and payment entity. The relationship is stated openly so supporters can decide with the correct information.",
    },
    {
        q: "How can I verify information before supporting?",
        a: "Review the relationship, payment identity, transparency page, and current school information. You can also contact the school team with questions before using the YZ support page.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="py-20 md:py-28 bg-brand-gray-50/50 border-t border-brand-charcoal/5">
            <div className="container max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Honest Answers
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal mt-4 mb-3 tracking-tight">
                        &ldquo;Yeah, But...&rdquo; <span className="text-brand-nero italic">We&apos;ve Heard It All</span>
                    </h2>
                    <p className="text-base text-brand-charcoal/60 font-medium">
                        Direct answers to the toughest questions about transparency, fund usage, and student tracking.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-brand-charcoal/10 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-brand-nero/30 transition-all"
                        >
                            <button
                                type="button"
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-black text-brand-charcoal text-base md:text-lg pr-6">
                                    {faq.q}
                                </span>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-brand-charcoal/5 text-brand-charcoal">
                                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>

                            {openIndex === i && (
                                <div className="px-6 pb-6 pt-2 border-t border-brand-charcoal/5 text-sm md:text-base text-brand-charcoal/70 leading-relaxed font-medium">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
