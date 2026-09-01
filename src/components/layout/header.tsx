"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, HeartHandshake, ShieldCheck } from "lucide-react";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <span className="text-xl font-[900] tracking-tight text-brand-charcoal">
                        HAMMAD <span className="text-brand-nero">FOUNDATION</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex gap-7 items-center text-xs font-black uppercase tracking-[0.15em] text-brand-charcoal/65">
                    <Link href="/our-school" className="hover:text-brand-nero transition-colors">
                        Our School
                    </Link>
                    <Link href="/our-story" className="hover:text-brand-nero transition-colors">
                        Our Story
                    </Link>
                    <Link href="/guardian-programme" className="hover:text-brand-nero transition-colors">
                        Guardian Programme
                    </Link>
                    <Link href="/#how-it-works" className="hover:text-brand-nero transition-colors">
                        How It Works
                    </Link>
                    <Link href="/transparency" className="hover:text-brand-nero transition-colors">
                        Proof &amp; Receipts
                    </Link>
                    <Link href="/#faq" className="hover:text-brand-nero transition-colors">
                        FAQ
                    </Link>
                    <Link href="/contact" className="hover:text-brand-nero transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Status & CTA */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <p className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-widest">
                            Lahore, PK &bull; Barki Rd
                        </p>
                        <p className="text-xs font-bold text-brand-nero">
                            124 / 500 Secured
                        </p>
                    </div>

                    <Link
                        href="/#donate"
                        className="hidden sm:inline-flex items-center justify-center btn-brand h-10 px-5 text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg"
                    >
                        BECOME A GUARDIAN
                    </Link>

                    <button
                        type="button"
                        className="lg:hidden text-brand-charcoal p-2 rounded-lg hover:bg-brand-gray-50 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="lg:hidden bg-white border-t border-brand-charcoal/10 p-5 shadow-xl">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/our-school"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            Our School
                        </Link>
                        <Link
                            href="/our-story"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            Our Story
                        </Link>
                        <Link
                            href="/guardian-programme"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            Guardian Programme
                        </Link>
                        <Link
                            href="/#how-it-works"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/transparency"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            Proof &amp; Receipts
                        </Link>
                        <Link
                            href="/#faq"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            Contact
                        </Link>
                        <div className="pt-3 border-t border-brand-charcoal/10">
                            <Link
                                href="/#donate"
                                onClick={() => setMobileOpen(false)}
                                className="btn-brand w-full h-12 text-sm font-black flex items-center justify-center rounded-xl shadow"
                            >
                                BECOME A GUARDIAN &rarr; $30/MO
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
