"use client";

import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <a
                href="https://wa.me/923214908898?text=Salaam! I want to become a Guardian for Hammad Foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
            >
                {/* Pulse animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
                
                <MessageCircle className="w-7 h-7 relative z-10" />
                <span className="sr-only">Chat on WhatsApp</span>
            </a>
        </div>
    );
}
