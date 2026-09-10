"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteUrls } from "@/config/ecosystem";

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/10 bg-white shadow-sm">
            <div className="container flex w-full min-h-16 max-w-[1280px] items-center justify-between gap-4 py-2 pr-8 lg:pr-16">
                {/* Brand */}
                <Link href="/" className="flex min-w-0 items-center gap-2 hover:opacity-90 transition-opacity">
                    <span>
                        <span className="block text-xl font-[900] tracking-tight text-brand-charcoal">
                            HAMMAD <span className="text-brand-nero">FOUNDATION</span>
                        </span>
                        <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-brand-charcoal/45">
                            A project of YZ Educational Services
                        </span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden 2xl:flex gap-5 items-center text-xs font-black uppercase tracking-[0.12em] text-brand-charcoal/65">
                    <Link href="/our-school" className="hover:text-brand-nero transition-colors">
                        Our School
                    </Link>
                    <Link href="/our-story" className="hover:text-brand-nero transition-colors">
                        Our Story
                    </Link>
                    <Link href="/guardian-programme" className="hover:text-brand-nero transition-colors">
                        Support through YZ
                    </Link>
                    <Link href="/how-we-are-structured" className="hover:text-brand-nero transition-colors">
                        How YZ &amp; Hammad Work
                    </Link>
                    <Link href="/transparency" className="hover:text-brand-nero transition-colors">
                        Transparency
                    </Link>
                    <Link href="/#faq" className="hover:text-brand-nero transition-colors">
                        FAQ
                    </Link>
                    <Link href="/contact" className="hover:text-brand-nero transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Status & CTA */}
                <div className="ml-auto flex shrink-0 items-center gap-3 lg:gap-4">
                    <div className="hidden 2xl:flex flex-col items-end">
                        <p className="text-[10px] font-black text-brand-charcoal/40 uppercase tracking-widest">
                            Lahore, PK &bull; Barki Rd
                        </p>
                        <p className="text-xs font-bold text-brand-nero">
                            Support through YZ Educational Services
                        </p>
                    </div>

                    <Link
                        href={`${siteUrls.yz}/donate?project=hammad-foundation`}
                        className="hidden 2xl:inline-flex items-center justify-center btn-brand h-10 px-5 text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg"
                    >
                        SUPPORT THROUGH YZ
                    </Link>

                    <button
                        type="button"
                        className="2xl:hidden text-brand-charcoal p-2 rounded-lg hover:bg-brand-gray-50 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                        aria-controls="hammad-mobile-nav"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div id="hammad-mobile-nav" className="2xl:hidden bg-white border-t border-brand-charcoal/10 p-5 shadow-xl">
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
                            Support through YZ
                        </Link>
                        <Link
                            href="/how-we-are-structured"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            How YZ &amp; Hammad Work
                        </Link>
                        <Link
                            href="/transparency"
                            onClick={() => setMobileOpen(false)}
                            className="py-2.5 px-3 rounded-lg text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50"
                        >
                            Transparency
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
                                href={`${siteUrls.yz}/donate?project=hammad-foundation`}
                                onClick={() => setMobileOpen(false)}
                                className="btn-brand w-full h-12 text-sm font-black flex items-center justify-center rounded-xl shadow"
                            >
                                SUPPORT THROUGH YZ &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
