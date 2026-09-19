"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShieldCheck, ArrowRight, Heart } from "lucide-react";

const navLinks = [
  { name: "School & Impact", href: "/#impact" },
  { name: "Our Story", href: "/our-story" },
  { name: "How Support Works", href: "/#how-it-works" },
  { name: "Transparency", href: "/transparency" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Slim Top Bar: Single clean, compact trust indicator */}
      <div className="bg-brand-charcoal text-white text-[11px] font-medium py-2 px-4 border-b border-white/10">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-brand-nero shrink-0" />
            <span className="truncate">
              Support received by <strong className="font-bold text-white">YZ Educational Services</strong> · Designated for <strong className="font-bold text-white">Hammad Foundation</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/60">
            <span>SECP CUIN 0326364</span>
            <span>Barki Road, Lahore</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container flex min-h-18 items-center justify-between gap-4 py-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-nero text-white flex items-center justify-center font-[900] text-lg shadow-md group-hover:scale-105 transition-transform">
              H
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-[900] tracking-tight text-brand-charcoal leading-none">
                HAMMAD <span className="text-brand-nero">FOUNDATION</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-charcoal/50 mt-1">
                Girls High School · Lahore
              </span>
            </div>
          </Link>

          {/* Short, Purposeful Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-[0.1em] text-brand-charcoal/70" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-brand-nero transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Persistent High-Contrast Primary CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="btn-brand min-h-11 h-11 px-5 sm:px-6 text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 shrink-0"
            >
              <span>Support School</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-brand-charcoal hover:bg-brand-gray-50 border border-brand-charcoal/10"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-brand-charcoal/10 px-6 py-5 shadow-xl space-y-3">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3 rounded-xl text-sm font-bold text-brand-charcoal hover:bg-brand-gray-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-brand-charcoal/10">
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="btn-brand w-full h-12 rounded-xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Donate / Support Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
