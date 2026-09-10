export function SocialProofStrip() {
    const facts = [
        { label: "Project relationship", value: "YZ project" },
        { label: "Payment route", value: "Through YZ" },
        { label: "Project status", value: "Active" },
        { label: "Public location", value: "Lahore" },
    ];

    return (
        <section className="border-y border-brand-charcoal/20 bg-brand-charcoal py-8 text-white">
            <div className="container">
                <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                    {facts.map((fact) => (
                        <div key={fact.label} className="space-y-1">
                            <p className="text-xl font-[900] tracking-tight text-white md:text-2xl">
                                {fact.value}
                            </p>
                            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                                {fact.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
