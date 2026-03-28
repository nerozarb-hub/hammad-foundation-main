import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img src="/images/logo.png" alt="Hammad Foundation" className="h-10 w-auto" />
                </Link>

                <nav className="hidden lg:flex gap-8 items-center text-xs font-black uppercase tracking-[0.15em] text-brand-charcoal/60">
                    <Link href="#how-it-works" className="hover:text-brand-nero transition-colors">
                        How It Works
                    </Link>
                    <Link href="#proof" className="hover:text-brand-nero transition-colors">
                        Our Proof
                    </Link>
                    <Link href="#faq" className="hover:text-brand-nero transition-colors">
                        FAQ
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <p className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-widest">Lahore, PK</p>
                        <p className="text-xs font-bold text-brand-nero">24.8% Funded</p>
                    </div>
                    <Button variant="default" className="hidden sm:inline-flex h-10 px-6 text-xs" asChild>
                        <Link href="#donate">
                            BECOME A GUARDIAN
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="lg:hidden text-brand-charcoal">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
