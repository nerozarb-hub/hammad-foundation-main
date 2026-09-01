"use client";

import { ShieldCheck, Heart, Users, CheckCircle2 } from "lucide-react";

export function SocialProofStrip() {
    const stats = [
        { label: "Students in School", value: "500+" },
        { label: "Direct Guardians", value: "124" },
        { label: "Accreditation", value: "BISE LHR-09" },
        { label: "Direct Impact Rate", value: "100%" },
    ];

    return (
        <section className="bg-brand-charcoal text-white py-8 border-y border-brand-charcoal/20">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="space-y-1">
                            <p className="text-2xl md:text-3xl font-[900] text-white tracking-tight">
                                {stat.value}
                            </p>
                            <p className="text-xs font-bold text-white/50 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
