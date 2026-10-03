"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  ["What does Hammad Foundation do?", "Hammad Foundation is dedicated to helping people access education. This website documents its Lahore school community, current support options, and how payments are handled."],
  ["Who receives a support payment?", "Payments are received by YZ Educational Services (Private) Limited (SECP CUIN 0326364) and designated specifically for Hammad Foundation."],
  ["Can I choose a support package?", "Yes. Choose an available support option or enter a custom amount on the support page before you continue to checkout."],
  ["Is payment secure?", "The secure payment flow is hosted through PayPro. The recipient and Hammad Foundation designation are shown before a payment is initiated."],
  ["Can I support monthly?", "You can choose the Guardian monthly designation. The current PayPro checkout creates one payment; it does not set up an automatic recurring charge. For refund questions, use the stated policy and include your order reference."],
  ["How can I verify the organisation?", "Review the public relationship with YZ Educational Services, CUIN 0326364, and the transparency information. You may also contact the school team about campus arrangements."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="bg-brand-gray-50 py-16 md:py-24"><div className="container max-w-5xl"><div className="grid gap-7 border-b border-brand-charcoal/12 pb-10 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-nero">Questions</p><h2 className="mt-4 text-4xl sm:text-5xl">Clear answers before you give.</h2></div><p className="max-w-xl text-base leading-relaxed body-muted md:justify-self-end">The essentials of payment identity, support options, and public accountability.</p></div><div className="border-b border-brand-charcoal/12">{faqs.map(([question, answer], index) => { const expanded = open === index; return <div key={question} className="border-t border-brand-charcoal/12"><button type="button" onClick={() => setOpen(expanded ? null : index)} className="flex min-h-[68px] w-full items-center justify-between gap-5 py-4 text-left text-base font-semibold sm:text-lg" aria-expanded={expanded}><span>{question}</span><span className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-charcoal/15">{expanded ? <Minus size={17} /> : <Plus size={17} />}</span></button>{expanded && <div className="max-w-3xl pb-6 pr-10 text-base leading-relaxed body-muted">{answer}</div>}</div>; })}</div></div></section>;
}
