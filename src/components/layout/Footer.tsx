import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-brand-charcoal py-12 text-white">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-8 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/images/logo.png" alt="Hammad Foundation" className="h-10 w-auto" />
                        </div>
                        <p className="font-bold text-sm mb-1 text-white/90">Hammad Foundation</p>
                        <p className="text-white/50 text-xs leading-relaxed mb-4">
                            Transforming Pakistan By 2050<br />
                            Poverty To Prosperity
                        </p>
                        <div className="flex gap-3 text-xs">
                            <Link href="https://instagram.com/hammad_foundation" className="hover:text-brand-nero transition-colors text-white/50">Instagram</Link>
                            <Link href="https://tiktok.com/@hammadfoundation" className="hover:text-brand-nero transition-colors text-white/50">TikTok</Link>
                            <Link href="https://twitter.com/hammadfound" className="hover:text-brand-nero transition-colors text-white/50">Twitter</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 text-[10px] uppercase tracking-[0.15em] opacity-40">Legal</h4>
                        <ul className="space-y-2 text-xs text-white/60">
                            <li>Hammad Foundation Girls High School</li>
                            <li>Registration: LHR-09, Lahore Board</li>
                            <li>SECP: 0192839</li>
                            <li>FBR NTN: 827364-1</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 text-[10px] uppercase tracking-[0.15em] opacity-40">Quick Links</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="#how-it-works" className="text-white/60 hover:text-brand-nero transition-colors">How It Works</Link></li>
                            <li><Link href="#donate" className="text-white/60 hover:text-brand-nero transition-colors">Become a Guardian</Link></li>
                            <li><Link href="#proof" className="text-white/60 hover:text-brand-nero transition-colors">Our Proof</Link></li>
                            <li><Link href="/privacy" className="text-white/60 hover:text-brand-nero transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-white/60 hover:text-brand-nero transition-colors">Terms of Service</Link></li>
                            <li><Link href="/refund" className="text-white/60 hover:text-brand-nero transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4 text-[10px] uppercase tracking-[0.15em] opacity-40">Contact</h4>
                        <ul className="space-y-2 text-xs text-white/60">
                            <li>Office # 602, Block A, Faisal Town, Lahore, Pakistan</li>
                            <li>Email: hammadfoundation2015@gmail.com</li>
                            <li>Phone: +92 321 4908898</li>
                            <li>WhatsApp: +92 321 4908898</li>
                            <li className="pt-2">
                                <Button className="bg-brand-nero hover:bg-brand-nero/90 text-white font-bold h-9 px-4 text-xs rounded-lg" asChild>
                                    <a href="https://wa.me/923214908898?text=Salaam! I want to become a Guardian for Hammad Foundation">
                                        WhatsApp Us
                                    </a>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 text-[11px] text-white/25">
                    <p>&copy; {new Date().getFullYear()} Hammad Foundation. A project of YZ Educational Services (Pvt) Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
