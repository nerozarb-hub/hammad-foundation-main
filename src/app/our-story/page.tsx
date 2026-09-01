import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Heart, ArrowRight, ShieldCheck, CheckCircle2, GraduationCap, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | Hammad Foundation",
  description: "The founding story of Hammad Foundation Girls High School on Barki Road, Lahore — founded by Sir Ali Choudhary.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-4xl">
        {/* Header Badge */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Our Founding Journey
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            Why We Built Hammad Foundation in Lahore
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">
            Founded by Sir Ali Choudhary on Barki Road, Lahore — built on a simple conviction that no bright child should be forced into factory labor over a Rs. 3,000 monthly fee.
          </p>
        </div>

        {/* Hero Photo Card */}
        <div className="aspect-[16/9] bg-brand-charcoal rounded-3xl overflow-hidden shadow-xl mb-12 relative">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200"
            alt="Students in classroom at Hammad Foundation School"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-brand-nero">Barki Road Campus &bull; Lahore</p>
            <p className="text-xl md:text-2xl font-bold">Where 500+ girls build their academic future every single day.</p>
          </div>
        </div>

        {/* Narrative Section 1 */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm space-y-8 text-brand-charcoal text-base md:text-lg leading-relaxed font-medium mb-10">
          <h2 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight">
            The Moment That Started It All
          </h2>
          <p>
            In 2015, Sir Ali Choudhary witnessed a sight that plays out in low-income neighborhoods across Pakistan every single day: a capable, eager 9-year-old girl sitting quietly on the roadside outside a school gate while her peers attended class inside.
          </p>
          <p>
            Her father, a daily-wage laborer, was short just Rs. 3,000 ($10) for that month&apos;s tuition fee. Because of that tiny shortfall, her education stopped. Within months, she was at home washing dishes, and within years, likely facing premature child marriage or informal garment factory shifts.
          </p>
          <div className="p-6 bg-brand-nero/10 rounded-2xl border-l-4 border-brand-nero text-brand-charcoal font-bold italic">
            &ldquo;We realized that generational poverty doesn&apos;t happen because people are lazy. It happens because capable families get hit by small economic shocks and have no safety cushion. $10 stands between a child becoming a doctor or becoming a laborer.&rdquo;
          </div>
        </div>

        {/* Narrative Section 2: Building the School */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm space-y-8 text-brand-charcoal text-base md:text-lg leading-relaxed font-medium mb-10">
          <h2 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight">
            From a Single Classroom to a Registered High School
          </h2>
          <p>
            Rather than creating another abstract NGO with high corporate overhead, Sir Ali began renting classrooms and hiring certified female teachers. We focused specifically on girls&apos; education because in rural peri-urban areas like Barki Road, girls are the very first to be pulled out of school when household finances get tight.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-brand-gray-50 p-5 rounded-2xl border border-brand-charcoal/5 text-center">
              <p className="text-3xl font-black text-brand-nero">500+</p>
              <p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider mt-1">Enrolled Students</p>
            </div>
            <div className="bg-brand-gray-50 p-5 rounded-2xl border border-brand-charcoal/5 text-center">
              <p className="text-3xl font-black text-brand-nero">124</p>
              <p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider mt-1">Active Guardians</p>
            </div>
            <div className="bg-brand-gray-50 p-5 rounded-2xl border border-brand-charcoal/5 text-center">
              <p className="text-3xl font-black text-brand-nero">100%</p>
              <p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider mt-1">Direct Fund Use</p>
            </div>
          </div>
          <p>
            Today, <strong>Hammad Foundation Girls High School</strong> is accredited under <strong>BISE Lahore Board (Code: LHR-09)</strong>, officially registered with <strong>SECP (Reg: 0192839)</strong>, and verified by <strong>FBR (NTN: 827364-1)</strong>. We maintain a free bus transportation fleet that picks up students from surrounding rural villages every single morning.
          </p>
        </div>

        {/* Strategic Ecosystem Integration Note */}
        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6 mb-10">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-brand-nero" />
            <h2 className="text-2xl font-[900] tracking-tight">Institutional Architecture &amp; Governance</h2>
          </div>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            To ensure complete institutional compliance and corporate financial hygiene, Hammad Foundation partners with <strong>YZ Educational Services (Private) Limited</strong> (SECP CUIN: 0326364). YZ manages the formal payment gateway boundary, audited data rooms, and corporate billing compliance, while Hammad Foundation focuses 100% of its on-the-ground energy on student education, hot meals, teacher salaries, and academic excellence.
          </p>
          <div className="pt-2">
            <Link
              href="/how-we-are-structured"
              className="inline-flex items-center gap-2 text-brand-nero font-black text-sm hover:underline"
            >
              Read our full structural governance report &rarr;
            </Link>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-brand-nero text-white rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            Be Part of Our Next Chapter
          </h3>
          <p className="text-white/80 max-w-xl mx-auto text-base font-medium">
            124 overseas Pakistanis have already stepped forward as Guardians. 376 bright girls in Lahore are waiting for their champion.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#donate"
              className="h-14 px-8 bg-white text-brand-charcoal hover:bg-white/95 rounded-2xl font-black text-sm md:text-base inline-flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              Become a Guardian &rarr; $30/mo
            </Link>
            <a
              href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20read%20the%20founding%20story%20and%20want%20to%20help."
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-2xl font-black text-sm md:text-base inline-flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle size={18} /> Message Sir Ali
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
