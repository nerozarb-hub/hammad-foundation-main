import { GraduationCap, Apple, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
    const steps = [
        {
            icon: <GraduationCap className="w-8 h-8 text-brand-green" />,
            title: "School Fees",
            desc: "We pay for uniforms, books, and tuition at our Heroics School so children can go to school and stay there.",
        },
        {
            icon: <Apple className="w-8 h-8 text-brand-green" />,
            title: "Food for Families",
            desc: "We provide healthy daily meals for children and their mothers, because a hungry child cannot focus on learning.",
        },
        {
            icon: <Eye className="w-8 h-8 text-brand-green" />,
            title: "You See Everything",
            desc: "Every receipt, every photo, every rupee — we share it all with you so you know exactly where your help goes.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-brand-green font-bold text-sm tracking-normal mb-4">
                        How It Works
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-brand-charcoal tracking-tight mb-6">
                        Three simple things. <br />
                        <span className="text-brand-charcoal/40">That's all we do.</span>
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="p-8 bg-white rounded-2xl shadow-card border border-brand-charcoal/5 flex flex-col items-start transition-all hover:shadow-soft">
                            <div className="w-16 h-16 bg-brand-green/10 rounded-xl flex items-center justify-center mb-8">
                                {step.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-brand-charcoal mb-4">{step.title}</h4>
                            <p className="text-brand-charcoal/70 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
