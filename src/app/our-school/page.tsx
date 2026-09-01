import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Bus, Utensils, Laptop, BookOpen, ShieldCheck, MapPin, CheckCircle2, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our School Campus | Hammad Foundation Girls High School",
  description: "Explore Hammad Foundation Girls High School on Barki Road, Lahore — classrooms, science lab, computer lab, free bus fleet, and hot meals.",
  alternates: { canonical: "/our-school" },
};

export default function OurSchoolPage() {
  const facilities = [
    {
      icon: Building2,
      title: "14 Modern Classrooms",
      desc: "Bright, ventilated, and properly furnished learning spaces designed for active engagement and student comfort.",
    },
    {
      icon: Laptop,
      title: "Digital Literacy & Computer Lab",
      desc: "Equipped with high-speed internet and modern workstations teaching foundational computing, typing, and coding basics.",
    },
    {
      icon: BookOpen,
      title: "Science Lab & Reading Library",
      desc: "Fully stocked physics, chemistry, and biology laboratory equipment aligned with BISE Lahore Board matriculation requirements.",
    },
    {
      icon: Utensils,
      title: "Daily Nutrition & Cafeteria",
      desc: "A clean, on-site kitchen providing daily fresh hot lunches (daal, rice, chicken broth) ensuring zero students study on an empty stomach.",
    },
    {
      icon: Bus,
      title: "Free Student Bus Transport",
      desc: "A dedicated fleet of school buses providing safe, free door-to-door morning and afternoon transit for girls across rural villages.",
    },
    {
      icon: ShieldCheck,
      title: "Safe, Secure Gated Campus",
      desc: "Full-time security personnel, boundary walls, and strict visitor verification ensuring a safe environment for all female students.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Campus Tour &amp; Infrastructure
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            Hammad Foundation Girls High School
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium max-w-3xl">
            Located on Barki Road, Lahore. A fully accredited BISE Lahore Board high school serving 500+ girls with tuition-free education, daily nutrition, and safe transport.
          </p>
        </div>

        {/* Campus Gallery 2-Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="aspect-[4/3] bg-brand-charcoal rounded-3xl overflow-hidden shadow-lg relative">
            <img
              src="https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&q=80&w=800"
              alt="Hammad Foundation Classroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold text-sm">Active Classroom Instruction</p>
              <p className="text-xs text-white/70">Grades 1 through 10 Matriculation</p>
            </div>
          </div>

          <div className="aspect-[4/3] bg-brand-charcoal rounded-3xl overflow-hidden shadow-lg relative">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
              alt="Science and computer lab at Hammad Foundation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-bold text-sm">Computer &amp; Science Laboratories</p>
              <p className="text-xs text-white/70">Hands-on STEM learning for every grade</p>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-[900] text-brand-charcoal tracking-tight">
              A Complete Educational Ecosystem
            </h2>
            <p className="text-brand-charcoal/60 text-sm md:text-base font-medium mt-2">
              Education requires more than four walls. We provide the full support system children need to thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((fac, i) => (
              <div
                key={i}
                className="bg-white p-7 rounded-3xl border border-brand-charcoal/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-nero/10 text-brand-nero flex items-center justify-center mb-5">
                    <fac.icon size={24} />
                  </div>
                  <h3 className="text-lg font-black text-brand-charcoal mb-2">
                    {fac.title}
                  </h3>
                  <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                    {fac.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Structure & Board Registration */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm space-y-8 text-brand-charcoal font-medium text-sm md:text-base leading-relaxed mb-16">
          <h2 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight">
            Academic Excellence &amp; Accreditation
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-black text-brand-charcoal text-lg">BISE Lahore Board (Code: LHR-09)</h3>
              <p className="text-brand-charcoal/70">
                Students sit for official Matriculation examinations (Class 9 and 10) certified by the Board of Intermediate and Secondary Education, Lahore. Our graduates qualify for direct entry into government and private medical, engineering, and commerce colleges.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-black text-brand-charcoal text-lg">Faculty &amp; Pedagogical Quality</h3>
              <p className="text-brand-charcoal/70">
                Our faculty consists of 18 full-time, certified female educators who live in the local community. They receive continuous curriculum training and performance reviews to maintain top academic standards.
              </p>
            </div>
          </div>
        </div>

        {/* Campus Location & Visit CTA */}
        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-brand-nero text-xs font-black uppercase tracking-widest">
              <MapPin size={16} /> Barki Road, Lahore
            </div>
            <h3 className="text-2xl md:text-3xl font-[900] tracking-tight">
              Come Visit the School in Person
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We welcome overseas donors and local families Monday through Saturday. Meet the teachers, walk through the labs, and see your impact with your own eyes.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20would%20like%20to%20visit%20the%20Barki%20Road%20campus."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand h-14 px-8 text-sm font-black rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={18} /> Schedule Campus Visit
            </a>
            <Link
              href="/#donate"
              className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-black inline-flex items-center justify-center border border-white/20 transition-colors"
            >
              Sponsor a Student &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
