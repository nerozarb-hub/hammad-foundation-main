"use client";

import { AlertTriangle } from "lucide-react";

export function UrgencyBar() {
    return (
        <div className="bg-brand-amber py-3 border-y border-brand-charcoal/5">
            <div className="container flex items-center justify-center gap-3 text-center px-4">
                <AlertTriangle className="w-4 h-4 text-brand-charcoal shrink-0" />
                <p className="text-xs sm:text-sm font-[800] text-brand-charcoal tracking-tight">
                    53 SPOTS LEFT for 2025-2026 school year.{" "}
                    <span className="font-medium opacity-80 hidden sm:inline">
                        After that, these kids wait another year—or drop out permanently.
                    </span>
                </p>
            </div>
        </div>
    );
}
