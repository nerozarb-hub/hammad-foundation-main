import { CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

const facts = [
    "Hammad Foundation is the school project",
    "YZ Educational Services is the parent entity",
    "Support payments begin on the YZ site",
];

export function SocialProof() {
    return (
        <section id="proof" className="py-20 md:py-24 bg-white shadow-sm border-t border-brand-charcoal/5">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">What supporters can verify</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-4">Trust starts with the relationship being visible.</h2>
                    <p className="text-base text-brand-charcoal/60 font-medium">The public project and the operating/payment entity are named consistently across the experience.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {facts.map((fact) => (
                        <div key={fact} className="bg-brand-gray-50 p-7 rounded-2xl border border-brand-charcoal/5 shadow-sm flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-brand-nero shrink-0 mt-0.5" />
                            <p className="text-sm md:text-base font-bold text-brand-charcoal leading-relaxed">{fact}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto bg-brand-charcoal rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3"><ShieldCheck className="w-5 h-5 text-brand-nero" /><span className="text-xs font-[800] uppercase tracking-[0.2em] text-white/60">Payment identity</span></div>
                            <h3 className="text-2xl md:text-3xl font-[900] leading-tight mb-3">See the recipient before you pay.</h3>
                            <p className="text-sm md:text-base font-medium text-white/60">YZ Educational Services receives the payment and shows Hammad Foundation as the designated project. Hammad does not collect card details on this site.</p>
                        </div>
                        <Link href="https://yzeducationalservices.com/donate?project=hammad-foundation" className="shrink-0 inline-flex items-center gap-2 bg-brand-nero px-6 py-4 rounded-xl text-sm font-black text-white hover:bg-brand-nero/90 transition-colors">Open YZ support page <ExternalLink size={16} /></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
