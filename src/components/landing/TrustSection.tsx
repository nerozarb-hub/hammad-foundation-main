"use client";

import { ShieldCheck, CheckCircle2, MessageCircle, Phone, FileCheck, Landmark, MapPin } from "lucide-react";

export function TrustSection() {
    return (
        <section id="proof" className="py-20 md:py-28 bg-white shadow-sm border-t border-brand-charcoal/5">
            <div className="container">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Radical Transparency
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal leading-tight tracking-tight mt-4 mb-4">
                        We Know What You&apos;re Thinking: <br />
                        <span className="text-brand-nero italic">&ldquo;Is this another charity scam?&rdquo;</span>
                    </h2>
                    <div className="space-y-3 text-base text-brand-charcoal/70 max-w-2xl mx-auto font-medium">
                        <p className="font-bold text-brand-charcoal text-lg">
                            You are 100% right to be skeptical.
                        </p>
                        <p>
                            Untrustworthy charities have burned diaspora donors. Money vanishes into corporate admin salaries. Photos are faked. That is why we operate on complete open-book proof.
                        </p>
                    </div>
                </div>

                {/* Legal Registration 4-Card Grid */}
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-3xl border border-brand-charcoal/10 shadow-lg grid md:grid-cols-2 gap-8 mb-16">
                    <div className="space-y-1.5 p-4 rounded-2xl bg-brand-gray-50/70 border border-brand-charcoal/5">
                        <p className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-[0.2em]">Legal Registration</p>
                        <p className="text-lg font-black text-brand-charcoal">Hammad Foundation</p>
                        <p className="text-xs font-semibold text-brand-nero">SECP Registered: 0192839</p>
                        <p className="text-xs text-brand-charcoal/60">Securities &amp; Exchange Commission of Pakistan</p>
                    </div>

                    <div className="space-y-1.5 p-4 rounded-2xl bg-brand-gray-50/70 border border-brand-charcoal/5">
                        <p className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-[0.2em]">Academic Accreditation</p>
                        <p className="text-lg font-black text-brand-charcoal">BISE Lahore Board</p>
                        <p className="text-xs font-semibold text-brand-nero">School Code: LHR-09</p>
                        <p className="text-xs text-brand-charcoal/60">Hammad Foundation Girls High School</p>
                    </div>

                    <div className="space-y-1.5 p-4 rounded-2xl bg-brand-gray-50/70 border border-brand-charcoal/5">
                        <p className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-[0.2em]">Tax &amp; Zakat Compliance</p>
                        <p className="text-lg font-black text-brand-charcoal">FBR NTN: 827364-1</p>
                        <p className="text-xs font-semibold text-brand-nero">100% Zakat-Eligible Education Fund</p>
                        <p className="text-xs text-brand-charcoal/60">Audit-verified banking and expenditure logs</p>
                    </div>

                    <div className="space-y-1.5 p-4 rounded-2xl bg-brand-gray-50/70 border border-brand-charcoal/5">
                        <p className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-[0.2em]">Physical Campus</p>
                        <p className="text-lg font-black text-brand-charcoal">Barki Road, Lahore</p>
                        <p className="text-xs font-semibold text-brand-nero">Opposite Garrison Shooting Gallery</p>
                        <p className="text-xs text-brand-charcoal/60">Walk-in visits welcome 6 days a week</p>
                    </div>
                </div>

                {/* The Transparency Stack */}
                <div className="max-w-4xl mx-auto mb-16">
                    <p className="text-xs font-black text-brand-nero uppercase tracking-[0.25em] text-center mb-8">
                        The &ldquo;Transparency Stack&rdquo;: What Every Guardian Receives
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { num: "1", title: "Personal ID Card", desc: "Student photo, official grade, and background story." },
                            { num: "2", title: "Direct Tuition Receipt", desc: "Digital & stamped receipt with student registration." },
                            { num: "3", title: "Daily Meal Verification", desc: "Fresh hot lunch meal photos from the cafeteria." },
                            { num: "4", title: "WhatsApp Video", desc: "Direct weekly video update of classroom progress." },
                        ].map((item, i) => (
                            <div key={i} className="bg-brand-gray-50 p-6 rounded-2xl border border-brand-charcoal/5 text-center shadow-sm hover:shadow-md transition-all">
                                <div className="w-10 h-10 mx-auto rounded-xl bg-white border border-brand-charcoal/10 flex items-center justify-center text-brand-nero font-black text-base mb-3 shadow-sm">
                                    {item.num}
                                </div>
                                <h4 className="font-black text-brand-charcoal text-sm mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-brand-charcoal/60 font-medium leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Director Direct WhatsApp Box */}
                <div className="max-w-3xl mx-auto bg-brand-nero rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                        Still skeptical? Good. We encourage it.
                    </h3>
                    <p className="text-sm md:text-base text-white/80 mb-8 max-w-xl mx-auto font-medium">
                        Text Sir Ali Choudhary (Director) directly on WhatsApp. He answers directly. Ask for a live video tour of the school or specific student paperwork.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20have%20questions%20about%20the%20Hammad%20Foundation%20school."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto h-14 bg-white text-brand-nero hover:bg-white/95 rounded-2xl font-black px-8 flex items-center justify-center gap-2.5 text-sm md:text-base shadow-lg transition-transform hover:scale-105 active:scale-95 uppercase tracking-wider"
                        >
                            <MessageCircle className="w-5 h-5 fill-current" />
                            TEXT SIR ALI CHOUDHARY NOW
                        </a>
                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest">
                            Available directly on WhatsApp
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
