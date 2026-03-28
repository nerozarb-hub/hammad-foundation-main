"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Smartphone, Check, ArrowRight, Heart, Landmark, CreditCard, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedAmount: number | "custom";
    productName: string;
}

export function PaymentModal({ isOpen, onClose, selectedAmount, productName }: PaymentModalProps) {
    const [step, setStep] = useState<"method" | "bank" | "success">("method");

    if (!isOpen) return null;

    const methods = [
        { id: "bank", name: "Bank Transfer", icon: Landmark, description: "Tap to choose", color: "text-brand-nero" },
        { id: "mobile", name: "JazzCash / EasyPaisa", icon: Smartphone, description: "Tap to choose", color: "text-brand-nero" },
        { id: "stripe", name: "Card (Stripe)", icon: CreditCard, description: "Tap to choose", color: "text-brand-nero" }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex justify-between items-center p-8">
                    <h3 className="text-[20px] font-black text-brand-charcoal tracking-tight">How Would You Like to Send?</h3>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-gray-50 transition-colors">
                        <X className="w-6 h-6 text-brand-charcoal/20" />
                    </button>
                </div>

                <div className="px-8 pb-10">
                    {step === "method" && (
                        <div className="space-y-6">
                            <p className="text-[15px] font-bold text-brand-charcoal/40 uppercase tracking-widest text-center mb-8">
                                SENDING <span className="text-brand-nero">{selectedAmount === "custom" ? "A CUSTOM AMOUNT" : `$${selectedAmount}`}</span> FOR {productName.toUpperCase()}
                            </p>

                            <div className="grid gap-4">
                                {methods.map((m) => (
                                    <button 
                                        key={m.id}
                                        onClick={() => m.id === "stripe" ? window.open("https://buy.stripe.com/test", "_blank") : setStep("bank")}
                                        className="flex items-center justify-between p-6 bg-white border-2 border-brand-charcoal/5 rounded-2xl hover:border-brand-nero/30 hover:bg-brand-gray-50 transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={cn("w-14 h-14 rounded-xl bg-brand-nero/5 flex items-center justify-center transition-colors group-hover:bg-brand-nero group-hover:text-white", m.color)}>
                                                <m.icon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <span className="block font-black text-[18px] text-brand-charcoal">{m.name}</span>
                                                <span className="block text-[13px] font-bold text-brand-charcoal/40 uppercase tracking-widest">{m.description}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-brand-charcoal/10 group-hover:text-brand-nero group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>

                            <div className="pt-8 text-center">
                                <p className="text-[13px] font-bold text-brand-charcoal/40 flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-brand-nero" />
                                    SECURE PAYMENT GATEWAY
                                </p>
                            </div>
                        </div>
                    )}

                    {step === "bank" && (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                            <div className="bg-brand-gray-50 rounded-2xl p-8 space-y-6 border border-brand-charcoal/5">
                                <div className="space-y-1">
                                    <p className="text-[12px] font-black text-brand-charcoal/40 uppercase tracking-widest">Bank Name</p>
                                    <p className="text-[18px] font-black text-brand-charcoal">JS Bank</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[12px] font-black text-brand-charcoal/40 uppercase tracking-widest">Account Title</p>
                                    <p className="text-[18px] font-black text-brand-charcoal">HAMMAD FOUNDATION</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[12px] font-black text-brand-charcoal/40 uppercase tracking-widest">IBAN</p>
                                    <p className="text-[18px] font-black text-brand-charcoal font-mono tracking-tight">PK09 JSBL 9606 0000 0222 8148</p>
                                </div>
                                <div className="pt-4 border-t border-brand-charcoal/10">
                                    <p className="text-[12px] font-black text-brand-charcoal/40 uppercase tracking-widest mb-1">JazzCash / Raast</p>
                                    <p className="text-[18px] font-black text-brand-charcoal">+92 321 4908898</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button 
                                    className="w-full h-20 bg-brand-nero hover:bg-brand-nero/90 text-white font-black text-[18px] rounded-2xl shadow-xl flex items-center justify-center gap-4 transition-all active:scale-[0.98]" 
                                    onClick={() => {
                                        const msg = `Salaam! I've just sent a payment of ${selectedAmount === "custom" ? "a custom amount" : `$${selectedAmount}`} for ${productName}. Here is the receipt.`;
                                        window.open(`https://wa.me/923214908898?text=${encodeURIComponent(msg)}`, "_blank");
                                        setStep("success");
                                    }}
                                >
                                    <Smartphone className="w-6 h-6" />
                                    WANT A RECEIPT ON WHATSAPP? TAP HERE
                                </Button>
                                
                                <button onClick={() => setStep("method")} className="w-full text-center text-[12px] font-black uppercase tracking-widest text-brand-charcoal/20 hover:text-brand-charcoal transition-colors">
                                    Change payment method
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="text-center py-10 space-y-10 animate-in zoom-in-95 duration-500">
                            <div className="w-24 h-24 bg-brand-nero rounded-full flex items-center justify-center mx-auto text-white shadow-2xl shadow-brand-nero/20">
                                <Check className="w-12 h-12 stroke-[4]" />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[32px] font-black text-brand-charcoal tracking-tight leading-none">Thank you!</h4>
                                <p className="text-brand-charcoal/60 text-[18px] font-bold leading-relaxed max-w-xs mx-auto">
                                    We got your payment. You'll hear from us soon.
                                </p>
                            </div>
                            <Button onClick={onClose} className="w-full h-16 bg-brand-nero text-white text-[18px] font-black rounded-2xl hover:bg-brand-nero/90 transition-all shadow-xl">
                                CLOSE
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
