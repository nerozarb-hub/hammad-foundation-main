"use client";

import { AlertTriangle } from "lucide-react";

export function UrgencyBar() {
    return (
        <div className="bg-brand-amber py-3 border-y border-brand-charcoal/5">
            <div className="container flex items-center justify-center gap-3 text-center px-4">
                <AlertTriangle className="w-4 h-4 text-brand-charcoal shrink-0" />
                <p className="text-xs sm:text-sm font-[800] text-brand-charcoal tracking-tight">
                    53 SPONSORSHIP PLACES REMAIN.{" "}
                    <span className="font-medium opacity-80 hidden sm:inline">
                        Each place covers tuition, lunch, and school supplies for one student.
                    </span>
                </p>
            </div>
        </div>
    );
}
