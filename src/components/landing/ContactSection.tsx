"use client";

import { MapPin, Phone, Mail, Clock, Bus, MessageCircle, ExternalLink } from "lucide-react";

export function ContactSection() {
    return (
        <section id="contact" className="py-20 md:py-28 bg-brand-charcoal text-white relative shadow-xl overflow-hidden">
            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/20 px-3.5 py-1.5 rounded-full">
                        Open-Door Physical Campus
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-4 mb-3">
                        Transparency You Can <span className="text-brand-nero italic">Touch</span>
                    </h2>
                    <p className="text-base text-white/70 font-medium">
                        A real campus with certified teachers, science labs, and 500+ active students. Come visit us in Lahore.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left Campus Info Box */}
                    <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-brand-nero/20 rounded-2xl flex items-center justify-center shrink-0">
                                <MapPin className="w-6 h-6 text-brand-nero" />
                            </div>
                            <div>
                                <p className="text-brand-nero font-black uppercase tracking-widest text-[10px] mb-1">
                                    School Campus Location
                                </p>
                                <h3 className="text-xl font-bold text-white mb-1">
                                    Hammad Foundation Girls High School
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Opposite Garrison Shooting Gallery, Barki Road, Lahore, Pakistan
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Hammad+Foundation+School+Barki+Road+Lahore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-nero hover:underline mt-2"
                                >
                                    Open in Google Maps <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs md:text-sm">
                            <div className="space-y-1">
                                <p className="text-brand-nero font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                                    <Phone size={13} /> Director Hotline
                                </p>
                                <a href="tel:+923008099015" className="font-bold text-white hover:text-brand-nero transition-colors">
                                    +92 300 8099015
                                </a>
                            </div>

                            <div className="space-y-1">
                                <p className="text-brand-nero font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                                    <Mail size={13} /> Official Email
                                </p>
                                <a href="mailto:info@hammadfoundation.edu.pk" className="font-bold text-white hover:text-brand-nero transition-colors">
                                    info@hammadfoundation.edu.pk
                                </a>
                            </div>

                            <div className="space-y-1">
                                <p className="text-brand-nero font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                                    <Clock size={13} /> Campus Hours
                                </p>
                                <p className="font-bold text-white">Mon &ndash; Sat, 8:00 AM &ndash; 3:30 PM</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-brand-nero font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                                    <Clock size={13} /> Office Administration
                                </p>
                                <p className="font-bold text-white">Office #602, Faisal Town, Lahore</p>
                            </div>
                        </div>

                        {/* Student Bus Fleet */}
                        <div className="bg-brand-nero/10 rounded-2xl p-4 border border-brand-nero/20 flex gap-4 items-center">
                            <div className="w-10 h-10 bg-brand-nero rounded-xl flex items-center justify-center shrink-0">
                                <Bus className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-white">Free Student Transport Fleet</h4>
                                <p className="text-white/60 text-xs">
                                    Dedicated buses picking up girls from rural villages along Barki Road daily.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Walk-in & Scheduler Box */}
                    <div className="flex flex-col justify-center space-y-6 lg:pl-6">
                        <h3 className="text-2xl md:text-3xl font-[900] text-white tracking-tight">
                            Want to inspect the classrooms yourself?
                        </h3>
                        <p className="text-base text-white/70 leading-relaxed font-medium">
                            If you or your relatives are visiting Lahore, drop in anytime. Meet the principal, inspect the science labs, and have lunch with the students.
                        </p>

                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-xs font-bold text-brand-nero uppercase tracking-widest mb-2">
                                Instant Verification
                            </p>
                            <p className="text-sm text-white/80">
                                Over 124 diaspora Pakistanis from Houston, London, Dubai, and Toronto actively support our students.
                            </p>
                        </div>

                        <a
                            href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20Hammad%20Foundation%20School."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-brand h-14 w-full text-sm md:text-base font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
                        >
                            <MessageCircle className="w-5 h-5 fill-current" />
                            SCHEDULE A VISIT VIA WHATSAPP
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
