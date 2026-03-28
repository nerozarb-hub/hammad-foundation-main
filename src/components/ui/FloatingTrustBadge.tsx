import { ShieldCheck } from "lucide-react";

export function FloatingTrustBadge() {
    return (
        <div className="fixed bottom-6 left-6 z-50 hidden md:block pointer-events-none">
            <div className="bg-white/80 backdrop-blur-sm border border-brand-charcoal/5 px-4 py-2 shadow-soft rounded-full flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-nero" />
                <span className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-widest whitespace-nowrap">SECP Registered</span>
            </div>
        </div>
    );
}
