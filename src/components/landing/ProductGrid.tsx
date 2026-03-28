"use client";

import { useState } from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "@/components/modals/PaymentModal";

export function ProductGrid() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ amount: number | "custom"; name: string } | null>(null);

    const handleSelect = (amount: number | "custom", name: string) => {
        setSelectedProduct({ amount, name });
        setModalOpen(true);
    };

    return (
        <section id="donate" className="py-16 bg-white shadow-sm">
            <div className="container">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-[900] text-brand-charcoal mb-3 tracking-tight">
                        Pick Your Impact Level
                    </h2>
                    <p className="text-brand-charcoal/60 text-base font-bold">
                        Every option goes 100% to students. No admin fees. No middlemen.
                    </p>
                </div>

                {/* 4-column grid: small cards + featured + custom */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

                    {/* $15 Books */}
                    <div className="bg-white rounded-2xl p-6 flex flex-col border border-brand-charcoal/5 shadow-md hover:shadow-lg transition-all">
                        <span className="inline-flex w-fit items-center gap-1.5 bg-brand-nero/10 text-brand-nero text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                            The Starter
                        </span>
                        <h4 className="text-lg font-black text-brand-charcoal mb-1">Fund Their Mind</h4>
                        <p className="text-3xl font-black text-brand-nero mb-1">
                            $15 <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">one-time</span>
                        </p>
                        <p className="text-sm text-brand-charcoal/50 mb-4">Every textbook + notebook for 12 months.</p>
                        <ul className="space-y-2 mb-6 flex-grow">
                            {["8 Textbooks", "12 Notebooks", "Full Stationery", "WhatsApp Receipt"].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-bold text-brand-charcoal/70">
                                    <Check className="w-4 h-4 text-brand-nero shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSelect(15, "Annual Book Set")} size="lg" className="w-full">
                            Give $15
                        </Button>
                    </div>

                    {/* $25 Dignity */}
                    <div className="bg-white rounded-2xl p-6 flex flex-col border border-brand-charcoal/5 shadow-md hover:shadow-lg transition-all">
                        <span className="inline-flex w-fit items-center gap-1.5 bg-brand-nero/10 text-brand-nero text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                            Confidence
                        </span>
                        <h4 className="text-lg font-black text-brand-charcoal mb-1">Give Dignity</h4>
                        <p className="text-3xl font-black text-brand-nero mb-1">
                            $25 <span className="text-[10px] text-brand-charcoal/40 uppercase tracking-widest">one-time</span>
                        </p>
                        <p className="text-sm text-brand-charcoal/50 mb-4">Uniform, bag, and shoes so they fit in.</p>
                        <ul className="space-y-2 mb-6 flex-grow">
                            {["2 Uniforms", "1 Sturdy Bag", "Black Shoes", "Before/After Photo"].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-bold text-brand-charcoal/70">
                                    <Check className="w-4 h-4 text-brand-nero shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button onClick={() => handleSelect(25, "Dignity Kit")} size="lg" className="w-full">
                            Give $25
                        </Button>
                    </div>

                    {/* $30/mo GUARDIAN — featured */}
                    <div className="bg-brand-charcoal rounded-2xl p-6 flex flex-col border-2 border-brand-nero relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Crown className="w-32 h-32 text-white" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <span className="inline-flex w-fit items-center gap-1.5 bg-brand-nero text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                                Most Impact
                            </span>
                            <h4 className="text-lg font-black text-white mb-1">Become a Guardian</h4>
                            <p className="text-3xl font-black text-brand-nero mb-1">
                                $30 <span className="text-[10px] text-white/40 uppercase tracking-widest">/month</span>
                            </p>
                            <p className="text-sm text-white/50 mb-4">Sponsor YOUR student from grade school to university.</p>

                            <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                    <p className="text-[9px] font-black text-brand-nero uppercase tracking-widest mb-2">You cover:</p>
                                    <ul className="space-y-1.5">
                                        {["Full tuition", "Daily lunch", "Supplies", "Healthcare"].map((item, i) => (
                                            <li key={i} className="flex items-start gap-1.5 text-xs font-bold text-white/80">
                                                <Check className="w-3 h-3 text-brand-nero shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                                    <p className="text-[9px] font-black text-brand-nero uppercase tracking-widest mb-2">You get:</p>
                                    <ul className="space-y-1.5">
                                        {["Photo + name", "Weekly video", "Report cards", "Direct access"].map((item, i) => (
                                            <li key={i} className="flex items-start gap-1.5 text-xs font-bold text-white/80">
                                                <Check className="w-3 h-3 text-brand-nero shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Button onClick={() => handleSelect(30, "Monthly Guardian")} size="lg" className="w-full h-14 text-base font-black">
                                YES, I&apos;LL BE A GUARDIAN
                            </Button>
                            <p className="text-center text-[10px] text-white/30 font-bold mt-2 uppercase tracking-widest">
                                Cancel Anytime &bull; 100% Transparent
                            </p>
                        </div>
                    </div>

                    {/* Custom */}
                    <div className="bg-white rounded-2xl p-6 flex flex-col border border-brand-charcoal/5 shadow-md hover:shadow-lg transition-all">
                        <span className="inline-flex w-fit items-center gap-1.5 bg-brand-nero/10 text-brand-nero text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-4">
                            Build Legacy
                        </span>
                        <h4 className="text-lg font-black text-brand-charcoal mb-1">Custom Amount</h4>
                        <p className="text-3xl font-black text-brand-nero mb-1">Custom</p>
                        <p className="text-sm text-brand-charcoal/50 mb-4">Sponsor multiple students or fund a classroom.</p>
                        <ul className="space-y-2 mb-6 flex-grow">
                            {["$500: Fund 3 kids", "$1,000: Library section", "$5,000: Sponsor a grade", "Legacy Plan"].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm font-bold text-brand-charcoal/70">
                                    <Check className="w-4 h-4 text-brand-nero shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="space-y-3">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 font-black text-sm">$</span>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    className="w-full h-11 pl-8 pr-3 rounded-lg border border-brand-charcoal/10 focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20 outline-none font-bold text-sm text-brand-charcoal transition-all"
                                />
                            </div>
                            <Button onClick={() => handleSelect("custom", "Custom Impact")} variant="secondary" size="lg" className="w-full">
                                Let&apos;s Talk
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                selectedAmount={selectedProduct?.amount || 0}
                productName={selectedProduct?.name || ""}
            />
        </section>
    );
}
