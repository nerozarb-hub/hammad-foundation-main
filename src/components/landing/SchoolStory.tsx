"use client";

import Link from "next/link";
import { MessageCircle, Heart, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  dream: string;
  story: string;
  status: "urgent" | "waiting";
}

const students: Student[] = [
  {
    id: "ayesha-gr4",
    name: "Ayesha",
    age: 9,
    grade: "Grade 4",
    dream: "Doctor",
    story: "Top student in her general science class. Her father is a daily wage laborer who cannot afford next term's textbooks.",
    status: "urgent",
  },
  {
    id: "hassan-gr5",
    name: "Hassan",
    age: 10,
    grade: "Grade 5",
    dream: "Computer Engineer",
    story: "Fascinated by computer lab lessons and arithmetic. Walks 40 minutes to school every morning without fail.",
    status: "waiting",
  },
  {
    id: "zainab-gr7",
    name: "Zainab",
    age: 12,
    grade: "Grade 7",
    dream: "Mathematics Teacher",
    story: "Helps younger students with arithmetic homework during breaks. Dreams of returning to teach in her neighborhood.",
    status: "urgent",
  },
  {
    id: "ali-gr3",
    name: "Ali",
    age: 8,
    grade: "Grade 3",
    dream: "Civil Engineer",
    story: "Loves building cardboard models and drawing bridges. Needs a Guardian for complete tuition and school supplies.",
    status: "waiting",
  },
];

export function SchoolStory() {
  return (
    <section id="school-story" className="py-20 md:py-28 bg-brand-sand border-t border-brand-charcoal/5">
      <div className="container">
        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-4 py-1.5 rounded-full mb-4">
            <Heart size={14} className="fill-current" /> The School Story
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight leading-[1.1] mb-6">
            A Real Classroom on Barki Road, Lahore. Real Futures at Stake.
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal/75 font-medium leading-relaxed">
            Hammad Foundation Girls High School is not a corporate fundraising brand. It is an active educational institution serving the children of daily-wage families who are determined to see their daughters learn, graduate, and lead.
          </p>
        </div>

        {/* Real Classroom Imagery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="relative aspect-[16/10] bg-brand-charcoal rounded-3xl overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200"
              alt="Students learning in active classroom at Hammad Foundation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-nero">
                Barki Road Campus · Primary to Matriculation
              </span>
              <p className="text-lg font-bold mt-1">180+ Active Students in Daily Classroom Learning</p>
              <p className="text-xs text-white/70 mt-1">Complete curriculum including mathematics, science, language, and computer literacy.</p>
            </div>
          </div>

          <div className="relative aspect-[16/10] bg-brand-charcoal rounded-3xl overflow-hidden shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200"
              alt="Science and laboratory learning at Hammad Foundation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-nero">
                Hands-On STEM Education
              </span>
              <p className="text-lg font-bold mt-1">Dedicated Science &amp; Computer Laboratories</p>
              <p className="text-xs text-white/70 mt-1">Equipping young girls with technical skills and practical scientific understanding.</p>
            </div>
          </div>
        </div>

        {/* Student Cards: 4 Real Waiting Children */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-nero">
                Direct Guardian Matching
              </p>
              <h3 className="text-2xl sm:text-3xl font-[900] text-brand-charcoal tracking-tight mt-1">
                Meet Students Waiting for a Sponsor
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-bold text-brand-charcoal/60">
              376 verified students on the waiting list in Lahore
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((child) => (
              <div
                key={child.id}
                className="bg-white rounded-3xl p-6 border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-nero/10 text-brand-nero flex items-center justify-center font-black text-lg">
                      {child.name.charAt(0)}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      child.status === "urgent" ? "bg-red-50 text-red-700 border border-red-200" : "bg-brand-gray-50 text-brand-charcoal/70"
                    }`}>
                      {child.status === "urgent" ? "Urgent Need" : "Waiting"}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-lg font-black text-brand-charcoal">{child.name}</h4>
                    <span className="text-xs font-bold text-brand-charcoal/50">Age {child.age}</span>
                  </div>

                  <p className="text-xs font-bold text-brand-nero mb-3">
                    {child.grade} · Aspires to be a {child.dream}
                  </p>

                  <p className="text-xs leading-relaxed text-brand-charcoal/70 mb-6 font-medium">
                    {child.story}
                  </p>
                </div>

                <Link
                  href={`/donate?support=guardian-monthly`}
                  className="w-full py-3 px-4 rounded-xl bg-brand-nero text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow hover:bg-brand-nero/90 transition-colors"
                >
                  <span>Sponsor {child.name} · $30/mo</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Director Sir Ali Choudhary On-The-Ground Callout */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-charcoal/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-brand-charcoal relative shadow-md">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/7b5f254b-7a49-4fe7-bd18-98bbcc1aab83/Screenshot-2026-02-14-at-6.32.51-AM-1771032790996.png?width=1200&height=1500&resize=contain"
                alt="Sir Ali Choudhary - Director of Hammad Foundation School"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-bold text-sm">Sir Ali Choudhary</p>
                <p className="text-[11px] text-brand-nero font-semibold uppercase tracking-wider">
                  Director &amp; Educational Leader
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-nero/10 rounded-full border border-brand-nero/20">
              <Sparkles size={14} className="text-brand-nero" />
              <span className="text-xs font-black uppercase tracking-wider text-brand-nero">
                Direct Message from Campus Leadership
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-[900] text-brand-charcoal tracking-tight leading-tight">
              &ldquo;I am on the ground in Barki Road every morning. I know every student and their family.&rdquo;
            </h3>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-brand-charcoal/75 font-medium">
              <p>
                &ldquo;I am not a career charity executive. We don&apos;t spend our resources hosting lavish donor banquets. We are on the ground right here on Barki Road in Lahore. Too many brilliant children are forced out of school into informal child labor simply because their parents could not afford Rs. 3,000 to Rs. 9,000 in monthly school fees and lunch costs.&rdquo;
              </p>
              <p className="font-bold text-brand-charcoal">
                &ldquo;Why should a young girl&apos;s destiny be cut short over $30 a month? When you sponsor a student through Hammad Foundation, you receive her photo, her report card, and weekly WhatsApp updates directly from our classrooms.&rdquo;
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate?support=guardian-monthly"
                className="btn-brand h-13 px-8 text-sm font-black rounded-xl inline-flex items-center justify-center gap-2"
              >
                Become a Monthly Guardian ($30) →
              </Link>
              <a
                href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20read%20your%20message%20on%20the%20website%20and%20want%20to%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="h-13 px-6 rounded-xl border-2 border-brand-charcoal text-brand-charcoal font-black text-sm inline-flex items-center justify-center gap-2 hover:bg-brand-charcoal hover:text-white transition-all"
              >
                <MessageCircle size={17} className="text-emerald-600" />
                <span>Text Sir Ali Choudhary on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
