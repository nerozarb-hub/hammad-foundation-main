"use client";

import { ShieldCheck } from "lucide-react";

export function FloatingTrustBadge() {
    return (
        <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-brand-charcoal/10 shadow-lg text-brand-charcoal text-xs font-bold transition-all hover:scale-105">
            <ShieldCheck className="w-4 h-4 text-brand-nero shrink-0" />
            <span>SECP: 0192839 &bull; Lahore Board LHR-09</span>
        </div>
    );
}
