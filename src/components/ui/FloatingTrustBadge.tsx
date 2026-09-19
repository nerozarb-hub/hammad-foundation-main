"use client";

import { ShieldCheck } from "lucide-react";

export function FloatingTrustBadge() {
  return (
    <aside
      aria-label="Entity and payment trust indicator"
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-brand-charcoal/15 shadow-xl text-brand-charcoal text-xs font-semibold"
    >
      <ShieldCheck className="w-4 h-4 text-brand-nero shrink-0" />
      <span>
        Support received by <strong className="font-bold">YZ Educational Services</strong> · Designated for <strong className="font-bold">Hammad Foundation</strong>
      </span>
    </aside>
  );
}
