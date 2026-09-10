import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { relationshipDisclosure } from "@/config/ecosystem";

export const metadata: Metadata = {
  title: "Our Story | Hammad Foundation",
  description: "The mission and operating relationship behind Hammad Foundation, a school project of YZ Educational Services.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">Our story</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-6 leading-tight">A school project with a clear operating structure</h1>
          <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed font-medium">Hammad Foundation exists to support a school and its surrounding community in Lahore. The public mission is Hammad Foundation; the parent operating and payment entity is YZ Educational Services.</p>
        </div>

        <div className="aspect-[16/9] bg-brand-charcoal rounded-3xl overflow-hidden shadow-xl mb-12 relative">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" alt="Students learning in a classroom" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-brand-nero">Barki Road · Lahore</p>
            <p className="text-xl md:text-2xl font-bold">A mission-facing school experience supported by a named parent entity.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-charcoal/10 shadow-sm space-y-8 text-brand-charcoal text-base md:text-lg leading-relaxed font-medium mb-10">
          <h2 className="text-2xl md:text-3xl font-[900] tracking-tight">Why the structure is explicit</h2>
          <p>Supporters should not have to infer who operates a project or receives a payment. {relationshipDisclosure} The relationship is shown on the website, in the support flow, and in the footer so the public identity and the payment identity remain connected.</p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-brand-gray-50 p-5 rounded-2xl border border-brand-charcoal/5 text-center"><p className="text-3xl font-black text-brand-nero">Project</p><p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider mt-1">Hammad Foundation</p></div>
            <div className="bg-brand-gray-50 p-5 rounded-2xl border border-brand-charcoal/5 text-center"><p className="text-3xl font-black text-brand-nero">Parent</p><p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider mt-1">YZ Educational Services</p></div>
            <div className="bg-brand-gray-50 p-5 rounded-2xl border border-brand-charcoal/5 text-center"><p className="text-3xl font-black text-brand-nero">Public</p><p className="text-xs font-bold text-brand-charcoal/60 uppercase tracking-wider mt-1">Evidence-led updates</p></div>
          </div>
        </div>

        <div className="bg-brand-charcoal text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6 mb-10">
          <div className="flex items-center gap-3"><ShieldCheck size={28} className="text-brand-nero" /><h2 className="text-2xl font-[900] tracking-tight">What supporters can verify</h2></div>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">The site separates mission information from payment handling. YZ provides the secure support route, shows the payment recipient and Hammad designation, and publishes public records only when they have a source and review owner.</p>
          <Link href="/how-we-are-structured" className="inline-flex text-brand-nero font-black text-sm hover:underline">Read the structure and governance page →</Link>
        </div>

        <div className="bg-brand-nero text-white rounded-3xl p-8 md:p-12 text-center shadow-xl space-y-6">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">Support the project through YZ</h3>
          <p className="text-white/80 max-w-xl mx-auto text-base font-medium">Choose a support option on YZ Educational Services. The payment recipient and Hammad Foundation designation are shown before payment.</p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://yzeducationalservices.com/donate?project=hammad-foundation" className="h-14 px-8 bg-white text-brand-charcoal hover:bg-white/95 rounded-2xl font-black text-sm md:text-base inline-flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider">View support options →</a>
            <a href="https://wa.me/923008099015?text=Hello%20Hammad%20Foundation%2C%20I%20would%20like%20to%20learn%20more%20about%20the%20school%20project." target="_blank" rel="noopener noreferrer" className="h-14 px-8 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-2xl font-black text-sm md:text-base inline-flex items-center justify-center gap-2 shadow-lg transition-all"><MessageCircle size={18} /> Contact the school team</a>
          </div>
        </div>
      </div>
    </div>
  );
}
