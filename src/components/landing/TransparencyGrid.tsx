"use client";

import { FileText, ShieldCheck, Download, Eye, ArrowUpRight } from "lucide-react";

export function TransparencyGrid() {
    const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const receipts = [
        { id: "#8274", item: "Primary Science Textbooks (Grade 4-6)", amount: "PKR 42,500", date: today },
        { id: "#8275", item: "Daily Fresh Hot Meal Rations (500 Students)", amount: "PKR 65,000", date: today },
        { id: "#8276", item: "School Bus Diesel & Route Maintenance", amount: "PKR 28,000", date: today },
        { id: "#8277", item: "Custom School Uniforms & Shoes Batch", amount: "PKR 54,200", date: today },
    ];

    return (
        <section className="py-20 bg-brand-gray-50 border-t border-brand-charcoal/5">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                                Real-Time Financial Log
                            </span>
                            <h3 className="text-2xl md:text-3xl font-[900] text-brand-charcoal tracking-tight mt-3">
                                Recent Verified Expenditures
                            </h3>
                        </div>
                        <span className="text-xs font-bold text-brand-charcoal/50">
                            Scanned &amp; Logged Directly in Lahore
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {receipts.map((r, i) => (
                            <div
                                key={i}
                                className="bg-white p-5 rounded-2xl border border-brand-charcoal/10 shadow-sm hover:shadow-md hover:border-brand-nero/30 transition-all flex items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-brand-nero/10 text-brand-nero flex items-center justify-center shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-brand-nero uppercase tracking-wider">
                                            Receipt {r.id} &bull; {r.date}
                                        </p>
                                        <h4 className="text-sm font-bold text-brand-charcoal mt-0.5">
                                            {r.item}
                                        </h4>
                                        <p className="text-xs font-black text-brand-charcoal/70 mt-1">
                                            {r.amount}
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                                    <ShieldCheck size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
