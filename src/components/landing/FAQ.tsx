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
    a: "Support is initiated through YZ Educational Services with the recipient and Hammad Foundation designation clearly shown. Public programme updates and verified receipts are published only when backed by on-the-ground records.",
  },
  {
    q: "What if my sponsored student drops out or their family moves?",
    a: "The school team explains any programme or enrollment change directly. Contact the school administration for current student status or YZ for any payment-related updates.",
  },
  {
    q: "Who receives a support payment?",
    a: "Payments are received by YZ Educational Services (Private) Limited (SECP CUIN 0326364) and designated specifically for Hammad Foundation. The platform maintains transparent corporate records and verified payment tracking.",
  },
  {
    q: "Can I meet my student in person if I visit Lahore?",
    a: "Yes. We encourage supporters to visit the campus on Barki Road. Contact the school team in advance so visiting hours and student safeguarding procedures can be properly arranged.",
  },
  {
    q: "What if I need to cancel recurring support?",
    a: "Cancellation and refund policies are clearly stated. You can cancel recurring monthly Guardian sponsorships anytime by contacting the support team with your order reference.",
  },
  {
    q: "Why sponsor 1-to-1 instead of donating to a large pooled NGO?",
    a: "Direct 1-to-1 matching gives complete personal accountability. You receive an assigned student's photo, background, examination report cards, and regular video updates instead of vague pooled promises.",
  },
  {
    q: "How can I verify information before supporting?",
    a: "Review our SECP registration (CUIN 0326364), visit our Barki Road campus in Lahore, or contact Director Sir Ali Choudhary directly on WhatsApp with any specific question.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-t border-brand-charcoal/5">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-4 py-1.5 rounded-full">
            <HelpCircle size={14} /> Honest Answers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal mt-4 mb-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/70 font-medium">
            Direct, unvarnished answers about student sponsorship, fund tracking, and visits.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-brand-charcoal/10 rounded-2xl overflow-hidden bg-brand-gray-50/50 hover:bg-white hover:border-brand-nero/30 transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-black text-brand-charcoal text-base md:text-lg pr-6">
                    {faq.q}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white border border-brand-charcoal/10 text-brand-charcoal shadow-sm">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm md:text-base text-brand-charcoal/75 leading-relaxed font-medium border-t border-brand-charcoal/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
