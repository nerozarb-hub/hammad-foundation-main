"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { name: "Our School", href: "/our-school" },
  { name: "Our Story", href: "/our-story" },
  { name: "Transparency", href: "/transparency" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-md">
      <div className="container flex min-h-[78px] items-center justify-between gap-4">
        <Link href="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3" aria-label="Hammad Foundation home">
          <Image src="/images/hammad/logo-mark.webp" alt="" width={160} height={164} className="h-[50px] w-[49px] shrink-0 object-contain" />
          <span className="min-w-0 font-display text-[15px] font-extrabold leading-tight tracking-[-.045em] text-brand-charcoal sm:text-lg">Hammad Foundation<span className="block font-sans text-xs font-semibold tracking-normal text-brand-gray-500">Education access · Lahore</span></span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-lg px-3 text-base text-brand-charcoal hover:bg-brand-gray-100 hover:text-brand-nero ${pathname === link.href ? "bg-brand-gray-100 font-bold text-brand-nero" : ""}`}>{link.name}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/donate" className="btn-brand hidden whitespace-nowrap sm:inline-flex">Support education</Link>
          <button ref={toggleRef} type="button" onClick={() => setOpen(value => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-charcoal/20 lg:hidden">{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {open && <div ref={menuRef} id="mobile-navigation" className="max-h-[calc(100dvh-78px)] overflow-y-auto border-t border-brand-charcoal/10 bg-white px-5 py-5 lg:hidden"><nav className="container flex flex-col px-0" aria-label="Mobile navigation">
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined} className="flex min-h-12 items-center border-b border-brand-charcoal/10 text-lg font-semibold">{link.name}</Link>)}
        <Link href="/donate" onClick={() => setOpen(false)} className="btn-brand mt-5">Support education</Link>
        <Link href="/transparency" onClick={() => setOpen(false)} className="btn-outline mt-4 w-full">How payments are received <ArrowRight size={17} aria-hidden="true" /></Link>
      </nav></div>}
    </header>
  );
}
