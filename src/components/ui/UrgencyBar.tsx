"use client";

import { ShieldCheck } from "lucide-react";

export function UrgencyBar() {
    return (
        <div className="bg-brand-amber py-3 border-y border-brand-charcoal/5">
            <div className="container flex items-center justify-center gap-3 text-center px-4">
                <ShieldCheck className="w-4 h-4 text-brand-charcoal shrink-0" />
                <p className="text-xs sm:text-sm font-[800] text-brand-charcoal tracking-tight">
                    SUPPORT THROUGH THE NAMED YZ ROUTE.{" "}
                    <span className="font-medium opacity-80 hidden sm:inline">
                        Payment recipient and Hammad Foundation designation are shown before payment.
                    </span>
                </p>
            </div>
        </div>
    );
}
