import Link from "next/link";
import { MessageCircle, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-12 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Col 1: Identity & Legal Purpose */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-[900] tracking-tight text-white">
                HAMMAD <span className="text-brand-nero">FOUNDATION</span>
              </span>
            </Link>
            <p className="text-white/70 text-xs leading-relaxed font-medium">
              Hammad Foundation is a named school project of YZ Educational Services (Private) Limited. Serving underprivileged girls in Lahore with 100% transparent, direct student sponsorship.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-brand-nero font-bold">
              <ShieldCheck size={16} />
              <span>SECP CUIN 0326364 · Verified Educational Entity</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-nero mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/75 font-medium">
              <li>
                <Link href="/#impact" className="hover:text-white transition-colors">
                  Sponsorship Packages
                </Link>
              </li>
              <li>
                <Link href="/our-school" className="hover:text-white transition-colors">
                  Our School Campus
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/how-we-are-structured" className="hover:text-white transition-colors">
                  How Support Works
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="hover:text-white transition-colors">
                  Transparency &amp; Records
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Details */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-nero mb-4">
              Campus &amp; Director Hotline
            </h4>
            <div className="space-y-2 text-xs text-white/75">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-brand-nero shrink-0 mt-0.5" />
                <span>Opposite Garrison Shooting Gallery, Barki Road, Lahore, Pakistan</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-brand-nero shrink-0" />
                <a href="tel:+923008099015" className="hover:underline font-bold text-white">
                  +92 300 8099015 (Director Sir Ali Choudhary)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-brand-nero shrink-0" />
                <a href="mailto:info@hammadfoundation.edu.pk" className="hover:underline">
                  info@hammadfoundation.edu.pk
                </a>
              </p>
            </div>

            <div className="pt-3">
              <a
                href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20have%20a%20question%20about%20the%20school%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-nero hover:bg-brand-nero/90 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl shadow transition-colors"
              >
                <MessageCircle size={15} />
                <span>Text Director on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Hammad Foundation. A project of YZ Educational Services (Private) Limited. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/refunds" className="hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
