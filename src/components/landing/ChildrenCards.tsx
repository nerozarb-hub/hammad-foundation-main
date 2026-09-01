"use client";

import { Heart, Sparkles, GraduationCap, ArrowRight } from "lucide-react";

interface Child {
    id: string;
    name: string;
    age: number;
    grade: string;
    dream: string;
    story: string;
    image: string;
    status: "waiting" | "urgent";
}

const children: Child[] = [
    {
        id: "ayesha-gr4",
        name: "Ayesha",
        age: 9,
        grade: "Grade 4",
        dream: "Doctor",
        story: "Top student in her general science class. Her father is a daily wage laborer who cannot afford next term's textbooks.",
        image: "https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&q=80&w=500",
        status: "urgent",
    },
    {
        id: "hassan-gr5",
        name: "Hassan",
        age: 10,
        grade: "Grade 5",
        dream: "Computer Engineer",
        story: "Fascinated by computer lab lessons and arithmetic. Walks 40 minutes to school every morning without fail.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=500",
        status: "waiting",
    },
    {
        id: "zainab-gr7",
        name: "Zainab",
        age: 12,
        grade: "Grade 7",
        dream: "Mathematics Teacher",
        story: "Helps younger students with arithmetic homework during breaks. Dreams of returning to teach in her neighborhood.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
        status: "urgent",
    },
    {
        id: "ali-gr3",
        name: "Ali",
        age: 8,
        grade: "Grade 3",
        dream: "Civil Engineer",
        story: "Loves building cardboard models and drawing bridges. Needs a Guardian for complete tuition and school supplies.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=500",
        status: "waiting",
    },
];

interface ChildrenCardsProps {
    onSelectStudent?: (studentName: string) => void;
}

export function ChildrenCards({ onSelectStudent }: ChildrenCardsProps) {
    return (
        <section id="students" className="py-20 md:py-24 bg-brand-gray-50 border-t border-brand-charcoal/5">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero bg-brand-nero/10 px-3.5 py-1.5 rounded-full">
                        Meet the Children
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[900] text-brand-charcoal tracking-tight mt-4 mb-3">
                        376 Students Waiting for Their Guardian
                    </h2>
                    <p className="text-base text-brand-charcoal/60 font-medium max-w-xl mx-auto">
                        Choose a student below. When you become their Guardian, you receive their official welcome packet, report card, and weekly WhatsApp updates.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {children.map((child) => (
                        <div
                            key={child.id}
                            className="bg-white rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="aspect-[4/3] bg-brand-charcoal/10 relative overflow-hidden">
                                    <img
                                        src={child.image}
                                        alt={child.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-brand-charcoal/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                                        {child.status === "urgent" ? "⚠️ Urgent Need" : "Waiting"}
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-brand-nero text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                                        {child.grade} &bull; Age {child.age}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <h3 className="text-xl font-[900] text-brand-charcoal">
                                            {child.name}
                                        </h3>
                                        <span className="text-xs font-bold text-brand-nero bg-brand-nero/10 px-2.5 py-0.5 rounded-full">
                                            Aspires: {child.dream}
                                        </span>
                                    </div>
                                    <p className="text-xs text-brand-charcoal/70 leading-relaxed font-medium mt-3 min-h-[48px]">
                                        {child.story}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 pt-0">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onSelectStudent) {
                                            onSelectStudent(child.name);
                                        } else {
                                            const element = document.getElementById("donate");
                                            element?.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className="w-full h-12 bg-brand-nero text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-brand-nero/90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Sponsor {child.name} &rarr; $30/mo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm font-bold text-brand-charcoal/50">
                        And 372 other bright students waiting in Barki Road, Lahore.
                    </p>
                </div>
            </div>
        </section>
    );
}
