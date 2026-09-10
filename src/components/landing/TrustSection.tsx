import { MessageCircle, ShieldCheck } from "lucide-react";

export function TrustSection() {
    return (
        <section id="proof" className="border-t border-brand-charcoal/5 bg-white py-20 shadow-sm md:py-28">
            <div className="container">
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <span className="rounded-full bg-brand-nero/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero">
                        Public accountability
                    </span>
                    <h2 className="mt-4 text-3xl font-[900] leading-tight tracking-tight text-brand-charcoal sm:text-4xl md:text-5xl">
                        Ask who operates the project and who receives support.
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-brand-charcoal/70">
                        Hammad Foundation communicates the school experience. YZ Educational
                        Services provides the parent operating and payment layer.
                    </p>
                </div>

                <div className="mx-auto mb-16 grid max-w-4xl gap-8 rounded-3xl border border-brand-charcoal/10 bg-white p-8 shadow-lg md:grid-cols-2 md:p-10">
                    {[
                        ["Project relationship", "Hammad Foundation", "A school project of YZ Educational Services"],
                        ["Payment identity", "YZ Educational Services", "Payments are received by YZ and designated for Hammad Foundation"],
                        ["Corporate record", "CUIN 0326364", "SECP record for YZ Educational Services (Private) Limited"],
                        ["Evidence standard", "Review before publication", "Claims, updates, receipts, and learner media require supporting evidence"],
                    ].map(([label, value, description]) => (
                        <div key={label} className="space-y-1.5 rounded-2xl border border-brand-charcoal/5 bg-brand-gray-50/70 p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal/40">
                                {label}
                            </p>
                            <p className="text-lg font-black text-brand-charcoal">{value}</p>
                            <p className="text-xs font-medium leading-relaxed text-brand-charcoal/60">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mx-auto mb-16 max-w-4xl">
                    <p className="mb-8 text-center text-xs font-black uppercase tracking-[0.25em] text-brand-nero">
                        What a responsible public record includes
                    </p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            ["1", "Project role", "Who operates what"],
                            ["2", "Payment identity", "Recipient and designation"],
                            ["3", "Source evidence", "Owner and review date"],
                            ["4", "Safeguarding", "Consent before publication"],
                        ].map(([number, title, description]) => (
                            <div key={number} className="rounded-2xl border border-brand-charcoal/5 bg-brand-gray-50 p-6 text-center shadow-sm">
                                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-charcoal/10 bg-white text-base font-black text-brand-nero shadow-sm">
                                    {number}
                                </div>
                                <h3 className="mb-1 text-sm font-black text-brand-charcoal">{title}</h3>
                                <p className="text-xs font-medium leading-relaxed text-brand-charcoal/60">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-brand-nero p-8 text-center text-white shadow-2xl md:p-12">
                    <div className="relative z-10">
                        <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold">
                            <ShieldCheck size={18} /> Questions are welcome
                        </div>
                        <h3 className="mb-3 text-2xl font-black tracking-tight sm:text-3xl">
                            Ask for the record you need.
                        </h3>
                        <p className="mx-auto mb-8 max-w-xl text-sm font-medium leading-relaxed text-white/80 md:text-base">
                            Contact the school team for programme questions. Use YZ Educational
                            Services for payment-recipient and transaction questions.
                        </p>
                        <a
                            href="https://wa.me/923008099015?text=Salaam%20Sir%20Ali!%20I%20have%20a%20question%20about%20Hammad%20Foundation%20records."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-auto flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-black uppercase tracking-wider text-brand-nero shadow-lg transition-transform hover:scale-105 active:scale-95 sm:w-auto"
                        >
                            <MessageCircle className="h-5 w-5 fill-current" />
                            Contact the school team
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
