import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-brand-charcoal py-14 text-white border-t border-white/5">
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-xl font-[900] tracking-tight text-white">
                                HAMMAD <span className="text-brand-nero">FOUNDATION</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-xs leading-relaxed font-medium">
                            Transforming Pakistan By 2050<br />
                            Poverty To Prosperity Through 1-to-1 Education
                        </p>
                        <p className="text-white/40 text-[11px] leading-relaxed">
                            Barki Road Campus, Lahore, Pakistan &bull; Opposite Garrison Shooting Gallery
                        </p>
                    </div>

                    {/* Column 2: Legal Registrations */}
                    <div>
                        <h4 className="font-black text-white mb-4 text-[10px] uppercase tracking-[0.2em] text-brand-nero">
                            Accreditation &amp; Legal
                        </h4>
                        <ul className="space-y-2 text-xs text-white/70 font-medium">
                            <li>Hammad Foundation Girls High School</li>
                            <li>BISE Lahore Board: Code LHR-09</li>
                            <li>SECP Registration: 0192839</li>
                            <li>FBR NTN: 827364-1 (Zakat Eligible)</li>
                            <li>Payment Gateway: YZ Educational Services</li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="font-black text-white mb-4 text-[10px] uppercase tracking-[0.2em] text-brand-nero">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-xs font-medium">
                            <li><Link href="/our-school" className="text-white/70 hover:text-brand-nero transition-colors">Our School</Link></li>
                            <li><Link href="/our-story" className="text-white/70 hover:text-brand-nero transition-colors">Our Story</Link></li>
                            <li><Link href="/guardian-programme" className="text-white/70 hover:text-brand-nero transition-colors">Guardian Programme</Link></li>
                            <li><Link href="/transparency" className="text-white/70 hover:text-brand-nero transition-colors">Proof &amp; Transparency</Link></li>
                            <li><Link href="/how-we-are-structured" className="text-white/70 hover:text-brand-nero transition-colors">Institutional Structure</Link></li>
                            <li><Link href="/updates" className="text-white/70 hover:text-brand-nero transition-colors">Field Updates</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Director Hotline */}
                    <div>
                        <h4 className="font-black text-white mb-4 text-[10px] uppercase tracking-[0.2em] text-brand-nero">
                            Contact &amp; Visits
                        </h4>
                        <ul className="space-y-2 text-xs text-white/70 font-medium">
                            <li>Director: Sir Ali Choudhary</li>
                            <li>WhatsApp / Phone: +92 300 8099015</li>
                            <li>Office: #602, Block A, Faisal Town, Lahore</li>
                            <li>Email: info@hammadfoundation.edu.pk</li>
                            <li className="pt-2">
                                <a
                                    href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20want%20to%20become%20a%20Guardian."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-brand h-9 px-4 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 shadow"
                                >
                                    <MessageCircle size={14} /> WhatsApp Director
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>
                        &copy; {new Date().getFullYear()} Hammad Foundation. Operating in strategic partnership with YZ Educational Services (Pvt) Ltd.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/refunds" className="hover:text-white transition-colors">Refunds</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
