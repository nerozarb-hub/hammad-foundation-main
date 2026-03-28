"use client";
import { FileText, Users, Receipt, PieChart, Eye, ArrowUpRight } from "lucide-react";

export function TransparencyGrid() {
    const today = new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric'
    });

    const stats = [
        {
            label: "Children in school today",
            value: "234/240",
            description: "97% attendance rate verified this morning.",
            icon: Users,
            color: "bg-white text-brand-nero"
        },
        {
            label: "Receipts uploaded",
            value: "2,482",
            description: "Every single rupee spent is logged and scanned.",
            icon: Receipt,
            color: "bg-white text-brand-nero"
        },
        {
            label: "Meals served this month",
            value: "4,200+",
            description: "Healthy, nutritious meals for kids and moms.",
            icon: PieChart,
            color: "bg-white text-brand-nero"
        }
    ];

    return (
        <section id="proof" className="py-24 bg-white">
            <div className="container px-4 md:px-6">
                <div className="mb-16 max-w-3xl">
                    <h2 className="text-sm font-bold tracking-normal text-brand-nero mb-4 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Radical Transparency
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-6 tracking-tight">
                        Where Your Money Goes
                    </h3>
                    <p className="text-brand-charcoal/60 text-lg leading-relaxed">
                        We don't just tell you we're helping—we show you. Every receipt, every meal, and every school day is recorded so you can see your impact in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Live Stats */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="bg-white rounded-3xl p-8 border border-brand-charcoal/10 shadow-card hover:shadow-soft transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${stat.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-4xl font-bold text-brand-charcoal tracking-tight">{stat.value}</p>
                                        <p className="font-bold text-brand-charcoal/80 mt-1">{stat.label}</p>
                                    </div>
                                    <p className="text-sm text-brand-charcoal/60">{stat.description}</p>
                                </div>
                            );
                        })}

                        <div className="bg-brand-nero rounded-3xl p-8 text-white shadow-lg shadow-brand-nero/20 flex flex-col justify-between group cursor-pointer">
                            <div>
                                <h4 className="text-2xl font-bold mb-2">Live Update</h4>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Our team is on the ground in Lahore right now. Last audit completed today at 9:00 AM PKT.
                                </p>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all">
                                VIEW LIVE FEED <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Receipt Preview */}
                    <div className="lg:col-span-4 bg-white border border-brand-charcoal/10 rounded-3xl p-8 shadow-card flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand-nero/5 rounded-lg flex items-center justify-center text-brand-nero">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-charcoal">Recent Receipts</h4>
                                <p className="text-[10px] text-brand-charcoal/40 font-bold uppercase tracking-wider">Scanned 1 hour ago</p>
                            </div>
                        </div>

                        <div className="space-y-4 flex-grow">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-brand-charcoal/10 group cursor-pointer hover:bg-brand-nero/5 transition-colors">
                                    <div className="w-12 h-16 bg-white rounded-lg border border-brand-charcoal/10 flex items-center justify-center shadow-sm overflow-hidden relative">
                                        <div className="absolute inset-0 bg-brand-nero/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Eye className="w-5 h-5 text-brand-nero" />
                                        </div>
                                        <FileText className="w-6 h-6 text-brand-charcoal/20" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-nero uppercase tracking-wider">Receipt #{8273 + i}</p>
                                        <p className="text-sm font-bold text-brand-charcoal mt-0.5">PKR 4,250 — Uniforms</p>
                                        <p className="text-[10px] text-brand-charcoal/40 mt-0.5">{today}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full h-12 mt-8 bg-brand-charcoal text-white rounded-xl text-sm font-bold hover:bg-brand-charcoal/90 transition-all flex items-center justify-center gap-2">
                            Browse All Receipts
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
