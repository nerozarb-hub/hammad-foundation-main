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
        a: "We send you photographic receipts every single month: your student's official tuition receipt with their registration code, daily cafeteria lunch distribution photos, and term attendance records. If you do not receive verifiable proof, you can cancel immediately. Simple as that.",
    },
    {
        q: "What if my sponsored student drops out or their family moves?",
        a: "We immediately re-assign your sponsorship to another child on our waitlist so not a single dollar is lost. We have a waitlist of 376 students right now in Lahore waiting for a Guardian.",
    },
    {
        q: "Is this eligible for Zakat?",
        a: "Yes, 100%. Education expenses, school uniforms, books, and daily hot meals for underprivileged children qualify under Zakat guidelines. Hammad Foundation is FBR-registered and Zakat-verified.",
    },
    {
        q: "Can I meet my student in person if I visit Lahore?",
        a: "Absolutely. Our campus doors on Barki Road, Lahore are open Monday through Saturday. No appointment is needed for active Guardians—just walk in and ask for Sir Ali Choudhary. For overseas Guardians, we provide direct WhatsApp video messages.",
    },
    {
        q: "What if I need to cancel my $30/month sponsorship?",
        a: "You can cancel anytime with one click or a simple message. No awkward questions, no guilt trips. Life circumstances change. When a Guardian cancels, we step in with reserve funds and find a new Guardian.",
    },
    {
        q: "Why sponsor 1-to-1 instead of donating to a large pooled NGO?",
        a: "Large organizations do great work, but your donation enters a massive corporate pool where significant percentages go toward marketing, gala events, and executive salaries. With Hammad Foundation, you know your student's name, see their classroom video every week, and watch them rise.",
    },
    {
        q: "This sounds almost too good to be true.",
        a: "Don't take our word for it. Message Director Sir Ali Choudhary directly on WhatsApp at +92 300 8099015. Ask for a live camera walkthrough of the school today. If you aren't convinced, don't donate.",
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
