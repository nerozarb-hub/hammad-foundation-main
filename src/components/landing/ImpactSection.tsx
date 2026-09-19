"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Shirt, GraduationCap, HeartHandshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { supportOptions } from "@/config/ecosystem";

interface ImpactSectionProps {
  onSelectPlan?: (planId: string) => void;
}

export function ImpactSection({ onSelectPlan }: ImpactSectionProps) {
  const tiers = [
    {
      id: "education-support",
      amountUsd: "$15",
      amountPkr: "PKR 4,500",
      cadence: "one-time",
      title: "Books & Stationery Kit",
      summary: "Equips one student with all required academic books and materials for a full year.",
      icon: BookOpen,
      badge: "Starter Impact",
      badgeColor: "bg-brand-nero/10 text-brand-nero",
      features: [
        "8 Government-approved Textbooks",
        "12 Ruled Notebooks & Registers",
        "Complete Geometry & Stationery Kit",
        "WhatsApp Delivery Photo Receipt",
      ],
      cta: "Fund Books · PKR 4,500",
      featured: false,
    },
    {
      id: "student-essentials",
      amountUsd: "$25",
      amountPkr: "PKR 7,500",
      cadence: "one-time",
      title: "Uniform & Student Dignity",
      summary: "Gives a student the pride and confidence of wearing a proper school uniform.",
      icon: Shirt,
      badge: "Dignity & Pride",
      badgeColor: "bg-brand-nero/10 text-brand-nero",
      features: [
        "2 Custom-Tailored School Uniforms",
        "1 Sturdy Waterproof School Bag",
        "Durable Leather Shoes & Socks",
        "Before & After Student Photo",
      ],
      cta: "Fund Uniform · PKR 7,500",
      featured: false,
    },
    {
      id: "guardian-monthly",
      amountUsd: "$30",
      amountPkr: "PKR 9,000",
      cadence: "/ month",
      title: "Full Guardian Sponsorship",
      summary: "Covers complete monthly tuition, daily hot lunch, books, and medical care.",
      icon: GraduationCap,
      badge: "Most Impact · 1 Student",
      badgeColor: "bg-brand-nero text-white",
      features: [
        "Full Monthly School Tuition",
        "Daily Hot Nutritious Lunch",
        "All Books, Uniforms & Healthcare",
        "Assigned Student & Friday Video Updates",
      ],
      cta: "Become a Guardian · $30/mo",
      featured: true,
    },
    {
      id: "custom",
      amountUsd: "Custom",
      amountPkr: "From PKR 100",
      cadence: "flexible",
      title: "Classroom & STEM Labs",
      summary: "Sponsor multiple students, fund laboratory equipment, or support a classroom.",
      icon: HeartHandshake,
      badge: "Community Legacy",
      badgeColor: "bg-brand-charcoal/10 text-brand-charcoal",
      features: [
        "PKR 10,000: Library Book Bundles",
        "PKR 25,000: STEM Lab Equipment",
        "PKR 108,000: Full Year for 1 Child",
        "Direct Impact Verification Report",
      ],
      cta: "Choose Custom Amount",
      featured: false,
    },
  ];

  return (
    <section id="impact" className="py-20 md:py-28 bg-white border-t border-brand-charcoal/5">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-4 py-1.5 rounded-full">
            <Sparkles size={14} /> Immediate Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal mt-4 mb-4 tracking-tight">
            Choose How You Want to Protect a Child&apos;s Future
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/70 font-medium leading-relaxed">
            Every rupee directly funds student tuition, daily meals, uniforms, and textbooks at Hammad Foundation School. No deductions, complete field transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${
                  tier.featured
                    ? "bg-brand-charcoal text-white border-2 border-brand-nero shadow-2xl xl:-translate-y-2"
                    : "bg-brand-gray-50 text-brand-charcoal border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tier.featured ? "bg-white/10 text-brand-nero" : "bg-white text-brand-nero border border-brand-charcoal/5"
                    }`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className={`text-xl font-black mb-1 ${tier.featured ? "text-white" : "text-brand-charcoal"}`}>
                    {tier.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-[900] text-brand-nero">{tier.amountPkr}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      tier.featured ? "text-white/60" : "text-brand-charcoal/50"
                    }`}>
                      ({tier.amountUsd}) {tier.cadence}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 font-medium ${
                    tier.featured ? "text-white/70" : "text-brand-charcoal/65"
                  }`}>
                    {tier.summary}
                  </p>

                  <div className={`border-t pt-5 mb-6 space-y-2.5 ${
                    tier.featured ? "border-white/10" : "border-brand-charcoal/10"
                  }`}>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-semibold">
                        <CheckCircle2 size={16} className="text-brand-nero shrink-0 mt-0.5" />
                        <span className={tier.featured ? "text-white/90" : "text-brand-charcoal/80"}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/donate?support=${tier.id}`}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      tier.featured
                        ? "bg-brand-nero text-white shadow-lg hover:bg-brand-nero/90 hover:shadow-xl"
                        : "bg-brand-charcoal text-white hover:bg-brand-charcoal/90"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/50">
            Support received by YZ Educational Services · Designated for Hammad Foundation · PayPro Secure Checkout
          </p>
        </div>
      </div>
    </section>
  );
}
