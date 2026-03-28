"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Users, Clock } from "lucide-react";

export function ProgressBar() {
    const [progress, setProgress] = useState(0);
    const target = 500;
    const current = 124;
    const percentage = (current / target) * 100;

    useEffect(() => {
        // Simple animation on mount
        const timer = setTimeout(() => setProgress(percentage), 500);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="w-full bg-brand-charcoal py-4 border-y border-brand-nero/20">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3 text-white">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-brand-nero" />
                        <span className="font-semibold text-lg">
                            <span className="text-brand-nero text-xl">{current}</span> / {target} Guardians Secured
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-brand-gray200 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <Clock className="w-4 h-4 text-brand-gold" />
                        <span>53 scholarships left for this term</span>
                    </div>
                </div>

                {/* Bar Track */}
                <div className="h-4 w-full bg-brand-charcoal/50 rounded-full border border-white/10 overflow-hidden relative">
                    {/* Animated Fill */}
                    <div
                        className="h-full bg-gradient-to-r from-brand-nero to-[#2ecc71] rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shine effect */}
                        <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-l from-white/20 to-transparent" />
                    </div>
                </div>

                <p className="mt-2 text-xs text-brand-gray600 text-center sm:text-right">
                    Join 124 others. Be the tipping point.
                </p>
            </div>
        </div>
    );
}
