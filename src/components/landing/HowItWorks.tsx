"use client";

import Link from "next/link";
import { UserCheck, ShieldCheck, Video, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: UserCheck,
      title: "Choose Your Impact",
      desc: "Select a student package ($15 books, $25 uniform, $30/mo full Guardian) or choose your own custom contribution.",
    },
    {
      num: "02",
      icon: ShieldCheck,
      title: "Secure Verification via YZ & PayPro",
      desc: "Payments are received by registered operating entity YZ Educational Services and designated for Hammad Foundation via PayPro's encrypted checkout.",
    },
    {
      num: "03",
      icon: Video,
      title: "Direct Field Connection & Proof",
      desc: "Receive your student's official welcome photo, background bio, term examination report cards, and weekly Friday video updates on WhatsApp.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-t border-brand-charcoal/5">
      <div className="container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-3">
            How Support Reaches the School
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/70 font-medium">
            A direct connection from your phone to a classroom in Barki Road, Lahore. Transparent, verified, and personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-brand-gray-50 p-8 rounded-3xl border border-brand-charcoal/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-nero shadow-sm border border-brand-charcoal/5">
                      <Icon size={24} />
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
            );
          })}
        </div>

        {/* Clean link to full operational details */}
        <div className="text-center">
          <Link
            href="/how-we-are-structured"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-nero hover:underline underline-offset-4"
          >
            <span>Learn more about the YZ &amp; Hammad operational structure</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
