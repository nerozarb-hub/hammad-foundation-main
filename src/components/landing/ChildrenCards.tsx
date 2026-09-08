"use client";

interface Child {
    id: string;
    name: string;
    age: number;
    grade: string;
    dream: string;
    story: string;
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
        status: "urgent",
    },
    {
        id: "hassan-gr5",
        name: "Hassan",
        age: 10,
        grade: "Grade 5",
        dream: "Computer Engineer",
        story: "Fascinated by computer lab lessons and arithmetic. Walks 40 minutes to school every morning without fail.",
        status: "waiting",
    },
    {
        id: "zainab-gr7",
        name: "Zainab",
        age: 12,
        grade: "Grade 7",
        dream: "Mathematics Teacher",
        story: "Helps younger students with arithmetic homework during breaks. Dreams of returning to teach in her neighborhood.",
        status: "urgent",
    },
    {
        id: "ali-gr3",
        name: "Ali",
        age: 8,
        grade: "Grade 3",
        dream: "Civil Engineer",
        story: "Loves building cardboard models and drawing bridges. Needs a Guardian for complete tuition and school supplies.",
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
                            className="bg-white rounded-3xl overflow-hidden border border-brand-charcoal/10 shadow-sm hover:shadow-xl hover:border-brand-nero/30 transition-all duration-300 flex h-full flex-col group"
                        >
                            <div className="flex h-full flex-col">
                                <div
                                    role="img"
                                    aria-label={`${child.name}'s student profile`}
                                    className="relative aspect-[4/3] min-h-44 overflow-hidden bg-brand-sand"
                                >
                                    <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full border-[18px] border-brand-nero/10 transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border-[18px] border-brand-gold/20" />
                                    <div className="relative flex h-full flex-col items-center justify-center gap-2">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-brand-nero text-3xl font-black text-white shadow-lg ring-8 ring-white/70">
                                            {child.name.charAt(0)}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/55">
                                            Student profile
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 bg-brand-charcoal/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                                        {child.status === "urgent" ? "⚠️ Urgent Need" : "Waiting"}
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-brand-nero text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg">
                                        {child.grade} &bull; Age {child.age}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="text-xl font-[900] text-brand-charcoal">
                                            {child.name}
                                        </h3>
                                        <span className="max-w-[11rem] rounded-full bg-brand-nero/10 px-2.5 py-1 text-right text-[11px] font-bold leading-tight text-brand-nero">
                                            Aspires: {child.dream}
                                        </span>
                                    </div>
                                    <p className="mt-3 min-h-[64px] text-xs font-medium leading-relaxed text-brand-charcoal/70">
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
                                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-nero px-3 text-center text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-brand-nero/90 hover:shadow-lg active:scale-95"
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
