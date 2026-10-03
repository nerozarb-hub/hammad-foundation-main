import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const explore = [
  ["Our school", "/our-school"], ["Our story", "/our-story"],
  ["School gallery", "/gallery"], ["Support options", "/guardian-programme"],
] as const;
const information = [
  ["Transparency", "/transparency"], ["How support works", "/how-we-are-structured"],
  ["Updates", "/updates"], ["Questions", "/#faq"],
] as const;

export function Footer() {
  return (
    <footer className="site-footer theme-dark bg-brand-charcoal text-white" aria-label="Site footer">
      <div className="container py-14 md:py-20">
        <div className="grid gap-10 border-b border-white/20 pb-12 lg:grid-cols-[1.35fr_.7fr_.8fr_1.1fr] lg:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 rounded-lg" aria-label="Hammad Foundation home">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white"><Image src="/images/hammad/logo-mark.webp" alt="" width={160} height={164} className="h-12 w-12 object-contain" /></span>
              <span className="font-display text-xl font-extrabold tracking-[-.04em] text-white">Hammad Foundation</span>
            </Link>
            <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-white/90">Helping people access education, with a school community in Lahore at the heart of the work.</p>
            <Link href="/donate" className="btn-brand mt-6">Support education <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <nav aria-label="Explore">
            <h2 className="text-base font-bold text-white">Explore</h2>
            <ul className="mt-3 -ml-2 space-y-1">{explore.map(([label, href]) => <li key={href}><Link className="footer-link" href={href}>{label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Information">
            <h2 className="text-base font-bold text-white">Information</h2>
            <ul className="mt-3 -ml-2 space-y-1">{information.map(([label, href]) => <li key={href}><Link className="footer-link" href={href}>{label}</Link></li>)}</ul>
          </nav>
          <div>
            <h2 className="text-base font-bold text-white">Talk to the team</h2>
            <p className="mt-5 flex items-start gap-3 text-base text-white/90"><MapPin size={19} className="mt-1 shrink-0 text-[#78e3a3]" aria-hidden="true" />Barki Road, Lahore, Pakistan</p>
            <p className="mt-4 flex items-center gap-3 text-base text-white/90"><Phone size={19} className="shrink-0 text-[#78e3a3]" aria-hidden="true" /><a href="tel:+923008099015">+92 300 8099015</a></p>
            <p className="mt-4 flex items-start gap-3 text-base text-white/90"><Mail size={19} className="mt-1 shrink-0 text-[#78e3a3]" aria-hidden="true" /><a href="mailto:info@hammadfoundation.edu.pk" className="break-all">info@hammadfoundation.edu.pk</a></p>
            <Link href="/contact" className="btn-outline mt-6">Contact us <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-sm text-white/85 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hammad Foundation. The Lahore school project is part of YZ Educational Services (Private) Limited, which receives payments.</p>
          <nav aria-label="Policies" className="-ml-2 flex flex-wrap gap-x-2 gap-y-1"><Link className="footer-link" href="/privacy">Privacy</Link><Link className="footer-link" href="/terms">Terms</Link><Link className="footer-link" href="/refunds">Refund policy</Link></nav>
        </div>
      </div>
    </footer>
  );
}
