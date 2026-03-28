"use client";

import { ShieldCheck, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TrustSection() {
    return (
        <section id="proof" className="py-16 bg-white shadow-sm">
            <div className="container">
                {/* Headline */}
                <div className="max-w-4xl mx-auto text-center mb-14">
                    <h2 className="text-3xl lg:text-[44px] font-black text-brand-charcoal leading-[1.15] tracking-tight mb-6">
                        We Know What You&rsquo;re Thinking:{" "}
                        <span className="text-brand-nero italic">&ldquo;Is this another scam?&rdquo;</span>
                    </h2>

                    <div className="space-y-4 text-base leading-relaxed text-brand-charcoal/60 max-w-3xl mx-auto">
                        <p className="font-black text-brand-charcoal text-xl">
                            You&rsquo;re right to be skeptical.
                        </p>
                        <p>
                            Pakistani charities have burned people. Money disappears. &ldquo;Students&rdquo; don&rsquo;t exist. Fake receipts.
                        </p>
                    </div>
                </div>

                {/* Credentials grid */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-brand-charcoal/5 shadow-md grid md:grid-cols-2 gap-8 mb-14">
                    {[
                        { label: "Legal Registration", title: "Hammad Foundation", desc: "Securities & Exchange Commission of Pakistan (SECP)" },
                        { label: "Academic Accreditation", title: "BISE Lahore Board", desc: "Hammad Foundation Girls High School (LHR-09)" },
                        { label: "Tax Status", title: "FBR Registered (NTN)", desc: "All donations are audit-verified & transparent." },
                        { label: "Our Location", title: "Lahore, Punjab", desc: "Direct field visits are welcome 7 days a week." },
                    ].map((item, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em]">{item.label}</p>
                            <p className="text-lg font-black text-brand-charcoal">{item.title}</p>
                            <p className="text-sm font-medium text-brand-charcoal/50">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Transparency stack */}
                <div className="max-w-4xl mx-auto mb-14">
                    <p className="text-[11px] font-black text-brand-nero uppercase tracking-[0.3em] text-center mb-8">
                        The &ldquo;Transparency Stack&rdquo;: What We Send You
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Personal ID", desc: "Student's Photo, Name, and Grade" },
                            { title: "Direct Receipt", desc: "Digital & Paper Tuition Proof" },
                            { title: "Hot Lunch", desc: "Daily Photo of the Class Meal" },
                            { title: "Live Updates", desc: "Weekly WhatsApp Video Message" },
                        ].map((item, i) => (
                            <div key={i} className="bg-brand-gray-50 p-5 rounded-xl border border-brand-charcoal/5 text-center shadow-sm">
                                <div className="w-10 h-10 mx-auto rounded-full bg-white border border-brand-charcoal/5 flex items-center justify-center text-brand-nero mb-3">
                                    <span className="text-lg font-black">{i + 1}</span>
                                </div>
                                <h4 className="font-black text-brand-charcoal text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-brand-charcoal/50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA card */}
                <div className="max-w-3xl mx-auto bg-brand-nero rounded-2xl p-10 text-white text-center relative overflow-hidden">
                    <h3 className="text-2xl lg:text-3xl font-black tracking-tight mb-4">
                        Still skeptical? Good.
                    </h3>
                    <p className="text-base text-white/80 mb-8 max-w-xl mx-auto">
                        Text Ali Choudhary (Director) directly. He replies himself. Ask for a live tour. Ask for specific proof.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="w-full md:w-auto h-14 bg-white text-brand-nero hover:bg-white hover:scale-[1.02] text-base font-black px-8 gap-3 shadow-lg"
                            asChild
                        >
                            <a href="https://wa.me/923008099015?text=Salaam! I have some questions about the Hammad Foundation.">
                                <Phone className="w-5 h-5 fill-current" />
                                TEXT ALI NOW
                            </a>
                        </Button>
                        <p className="text-xs font-black text-white/40 uppercase tracking-widest">
                            Available 24/7 on WhatsApp
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
