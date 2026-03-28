import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const children = [
    {
        name: "Fatima",
        age: 8,
        dream: "Wants to be a doctor",
        grade: "Grade 3",
        color: "bg-white",
    },
    {
        name: "Zain",
        age: 10,
        dream: "Wants to be an engineer",
        grade: "Grade 5",
        color: "bg-white",
    },
    {
        name: "Ayesha",
        age: 7,
        dream: "Wants to be a teacher",
        grade: "Grade 2",
        color: "bg-white",
    },
    {
        name: "Bilal",
        age: 9,
        dream: "Wants to be a pilot",
        grade: "Grade 4",
        color: "bg-white",
    },
];

export function ChildrenCards() {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-brand-green font-bold text-sm tracking-normal mb-4">
                        Meet the Children
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-brand-charcoal tracking-tight mb-6">
                        Meet the children <br />
                        <span className="text-brand-charcoal/40">you'll help support.</span>
                    </h3>
                    <p className="text-lg text-brand-charcoal/70 leading-relaxed">
                        Each one has a name, a dream, and a story. Your support gives them the chance to make those dreams come true.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {children.map((child, i) => (
                        <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-card border border-brand-charcoal/5 hover:shadow-soft transition-all">
                            {/* Photo Placeholder */}
                            <div className={`aspect-[4/5] ${child.color} relative flex items-center justify-center overflow-hidden`}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                                <span className="text-brand-charcoal/20 font-bold text-4xl">{child.name[0]}</span>
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                                    <Heart className="w-5 h-5 text-brand-green" />
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-2xl font-bold text-brand-charcoal">{child.name}, {child.age}</h4>
                                    <span className="text-sm font-bold text-brand-green px-3 py-1 bg-brand-green/10 rounded-full">
                                        {child.grade}
                                    </span>
                                </div>
                                <p className="text-brand-charcoal/70 italic mb-6">"{child.dream}"</p>
                                <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-xl h-12">
                                    Support {child.name}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <p className="text-brand-charcoal/50 text-sm">
                        And 236 other children waiting for your help.
                    </p>
                </div>
            </div>
        </section>
    );
}
