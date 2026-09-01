import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Video, Award, Users, Heart, ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "The Guardian Programme | 1-to-1 Student Sponsorship",
  description: "Sponsor a bright student in Lahore for $30/month. 100% direct tuition, daily lunch, uniform, and weekly WhatsApp video updates.",
  alternates: { canonical: "/guardian-programme" },
};

export default function GuardianProgrammePage() {
  const benefits = [
    {
      title: "100% Tuition & Academic Fees",
      desc: "Covers all monthly instruction fees, examination registrations, and laboratory supplies.",
    },
    {
      title: "Daily Fresh Hot Lunch",
      desc: "Nutritious on-site meal prepared every single school day to ensure physical and mental stamina.",
    },
    {
      title: "2 Tailored Uniforms & Shoes",
      desc: "Complete school kit including black leather shoes, warm winter sweaters, and socks.",
    },
    {
      title: "Government-Approved Textbooks",
      desc: "Complete set of books, notebooks, registers, and geometry stationery sets for the entire year.",
    },
    {
      title: "Routine Health & Dental Checkups",
      desc: "Periodic health screenings, vision tests, and preventative medical care on campus.",
    },
    {
      title: "Safe Bus Fleet Transit",
      desc: "Door-to-door transportation from remote rural villages along Barki Road.",
    },
  ];

  const deliverables = [
    {
      step: "48 Hours",
      title: "Student Assignment & Welcome Kit",
      desc: "Receive your assigned student's photo, background bio, academic grade, and official ID.",
    },
    {
      step: "Weekly",
      title: "Personal WhatsApp Video Updates",
      desc: "Watch short video clips of your student reading, solving math problems, or greeting you from Lahore.",
    },
    {
      step: "Termly",
      title: "Official Examination Report Cards",
      desc: "Track their academic trajectory and subject marks through BISE certified grade reports.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            1-to-1 Direct Sponsorship
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            The Guardian Programme
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">
            You don&apos;t donate into an anonymous corporate charity pool. You become the dedicated Guardian of a specific child in Lahore, raising them from primary school to university.
          </p>
        </div>

        {/* Hero Impact Box */}
        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-14 shadow-2xl mb-16 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-nero bg-brand-nero/20 px-3 py-1 rounded-full">
                $30 / Month &bull; Cancel Anytime
              </span>
              <h2 className="text-3xl md:text-4xl font-[900] tracking-tight leading-tight">
                One Guardian. One Student. A Broken Cycle of Poverty.
              </h2>
              <p className="text-white/70 text-base leading-relaxed font-medium">
                For $1 a day, you protect a child from dropping out, entering dangerous factory labor, or premature marriage. You receive tangible proof of their progress every single week.
              </p>
              <div className="pt-2">
                <Link
                  href="/#donate"
                  className="btn-brand h-14 px-8 text-base font-black rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  SPONSOR A STUDENT NOW &rarr;
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black text-brand-nero uppercase tracking-widest">
                What Your $30/Month Covers:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {benefits.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <Check className="w-5 h-5 text-brand-nero shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">{b.title}</p>
                      <p className="text-xs text-white/60">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What You Receive Deliverables */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-[900] text-brand-charcoal tracking-tight">
              What You Receive as a Guardian
            </h2>
            <p className="text-brand-charcoal/60 text-sm md:text-base font-medium mt-2">
              Radical transparency delivered straight to your phone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {deliverables.map((d, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-brand-charcoal/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-nero bg-brand-nero/10 px-3 py-1 rounded-full">
                    {d.step}
                  </span>
                  <h3 className="text-xl font-black text-brand-charcoal mt-4 mb-2">
                    {d.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Full Benefits Grid */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight mb-8 text-center">
            Comprehensive Child Welfare Standard
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-5 rounded-2xl bg-brand-gray-50 border border-brand-charcoal/5 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-brand-nero/10 text-brand-nero flex items-center justify-center font-bold text-xs">
                  {i + 1}
                </div>
                <h4 className="font-bold text-brand-charcoal text-sm">{b.title}</h4>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-nero text-white rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Ready to Meet Your Student?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-base font-medium">
            Join 124 other Guardians from Houston, London, Dubai, and across the world.
          </p>
          <div className="pt-2">
            <Link
              href="/#donate"
              className="btn-brand h-14 px-10 bg-white text-brand-charcoal hover:bg-white/95 rounded-2xl font-black text-base inline-flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              Start $30/Month Sponsorship Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
