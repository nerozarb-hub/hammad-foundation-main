"use client";

import { MapPin, Phone, Mail, Clock, Bus, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
    const contactInfo = [
        { icon: Phone, label: "Phone", value: "+92 300 8099015", href: "tel:+923008099015" },
        { icon: Mail, label: "Email", value: "info@hammadfoundation.edu.pk", href: "mailto:info@hammadfoundation.edu.pk" },
        { icon: Clock, label: "Office Hours", value: "Mon - Sat, 9:00 AM - 5:00 PM", href: null },
    ];

    return (
        <section id="contact" className="py-16 bg-brand-charcoal text-white relative shadow-lg">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0F9D58_1px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <p className="text-brand-nero font-black uppercase tracking-[0.3em] text-xs mb-3">Visit Us</p>
                    <h2 className="text-3xl lg:text-4xl font-black leading-tight mb-3">
                        Transparency You Can <span className="text-brand-nero italic">Touch</span>
                    </h2>
                    <p className="text-base text-white/60">
                        A real school, with real teachers, and real students. Come visit us in Lahore.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Contact card */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-brand-nero/20 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-brand-nero" />
                            </div>
                            <div>
                                <p className="text-brand-nero font-black uppercase tracking-widest text-[10px] mb-1">Location</p>
                                <h3 className="text-lg font-black">Hammad Foundation School</h3>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Opposite Garrison Shooting Gallery Barki Road Lahore, Pakistan
                                </p>
                                <Button variant="link" className="px-0 h-auto text-brand-nero gap-1.5 text-xs" asChild>
                                    <a href="https://maps.google.com/?q=Hammad+Foundation+School+Barki+Road+Lahore" target="_blank" rel="noopener noreferrer">
                                        Open in Google Maps <ExternalLink className="w-3 h-3" />
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            {contactInfo.map((item, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex items-center gap-2 text-brand-nero">
                                        <item.icon className="w-4 h-4" />
                                        <p className="font-black uppercase tracking-widest text-[10px]">{item.label}</p>
                                    </div>
                                    {item.href ? (
                                        <a href={item.href} className="text-sm font-bold hover:text-brand-nero transition-colors">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm font-bold">{item.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="bg-brand-nero/10 rounded-xl p-4 border border-brand-nero/20 flex gap-4 items-center">
                            <div className="w-10 h-10 bg-brand-nero rounded-xl flex items-center justify-center shrink-0">
                                <Bus className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black text-sm">Free Student Transport</h4>
                                <p className="text-white/60 text-xs">Free bus services for students from remote areas of Lahore.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col justify-center space-y-6 lg:pl-4">
                        <h3 className="text-xl font-black">Want to verify us immediately?</h3>
                        <p className="text-base text-white/60 leading-relaxed">
                            Our doors are open Monday through Saturday. No appointment needed for active Guardians. Just walk in and ask for Sir Ali Choudhary.
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border-3 border-brand-charcoal bg-brand-gray-500 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Guardian" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/60 font-bold text-xs uppercase tracking-wide">Join 124+ Guardians</p>
                        </div>

                        <Button className="w-full h-12 text-sm" size="lg" asChild>
                            <a href="https://wa.me/923008099015?text=Salaam! I want to visit the school.">
                                <MessageCircle className="w-4 h-4 fill-current mr-2" />
                                SCHEDULE A VISIT VIA WHATSAPP
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
