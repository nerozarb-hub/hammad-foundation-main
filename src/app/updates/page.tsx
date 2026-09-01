import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Calendar, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Field Updates & Campus News | Hammad Foundation",
  description: "Live updates from the classrooms on Barki Road, Lahore — exam results, uniform distributions, lab expansions, and student stories.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  const updates = [
    {
      date: "February 2026",
      tag: "Academic Milestone",
      title: "Mid-Term Examinations Completed & Science Project Exhibition",
      desc: "Over 480 girls completed their BISE-aligned mid-term examinations with an overall 92% pass rate in general science and mathematics. Students showcased working cardboard hydraulic bridges and plant biology models.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    },
    {
      date: "January 2026",
      tag: "Welfare Distribution",
      title: "500 Warm Winter Sweaters & Black Leather Shoes Distributed",
      desc: "Thanks to our Guardian community, all 500+ students received tailored winter sweaters, thermal socks, and sturdy black school shoes to protect against Lahore's heavy morning winter fog.",
      image: "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&q=80&w=600",
    },
    {
      date: "December 2025",
      tag: "Campus Infrastructure",
      title: "New Digital Literacy Lab: 10 Workstations Installed",
      desc: "We successfully deployed 10 modern computer workstations equipped with typing tutors and basic Python coding software, giving Grade 6-10 students dedicated computer lab hours every week.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
    },
    {
      date: "November 2025",
      tag: "Safe Transit",
      title: "Bus Route Expansion: Hadiara & Border Villages Connected",
      desc: "Our second dedicated 30-seater school bus commenced daily routes into Hadiara and remote surrounding villages, ensuring 65 additional female students travel to and from campus safely.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
            Real-Time Classroom Reports
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">
            Field Updates &amp; Campus News
          </h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">
            Direct dispatches from Barki Road, Lahore. Real events, real student achievements, and transparent records.
          </p>
        </div>

        {/* Updates Feed */}
        <div className="space-y-8 mb-16">
          {updates.map((item, i) => (
            <article
              key={i}
              className="bg-white rounded-3xl p-6 md:p-8 border border-brand-charcoal/10 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="w-full md:w-48 aspect-[4/3] rounded-2xl overflow-hidden bg-brand-charcoal shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black text-brand-nero bg-brand-nero/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-xs font-bold text-brand-charcoal/40 flex items-center gap-1">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-[900] text-brand-charcoal tracking-tight">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-brand-charcoal/70 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Direct WhatsApp Channel CTA */}
        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-nero/20 text-brand-nero text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            <Sparkles size={14} /> Weekly Video Stream
          </div>
          <h3 className="text-2xl md:text-3xl font-[900] tracking-tight">
            Want Live Updates on Your Phone?
          </h3>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base font-medium">
            Active Guardians receive weekly WhatsApp video clips from their assigned student. Connect with Sir Ali Choudhary to join our broadcast list.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20would%20like%20to%20receive%20regular%20school%20updates."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand h-14 px-8 text-sm font-black rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={18} /> Join WhatsApp Updates
            </a>
            <Link
              href="/#donate"
              className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold inline-flex items-center justify-center border border-white/20 transition-colors"
            >
              Sponsor a Student &rarr; $30/mo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
