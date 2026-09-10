import { FileText, ShieldCheck } from "lucide-react";

const recordTypes = [
  ["Project updates", "School and programme updates published after review"],
  ["Payment records", "Transaction records handled through YZ Educational Services"],
  ["Source evidence", "Supporting documents retained by the responsible operator"],
  ["Safeguarding review", "Learner media and stories reviewed before publication"],
] as const;

export function TransparencyGrid() {
  return (
    <section className="border-t border-brand-charcoal/5 bg-brand-gray-50 py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="rounded-full bg-brand-nero/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-brand-nero">
                Evidence register
              </span>
              <h3 className="mt-3 text-2xl font-[900] tracking-tight text-brand-charcoal md:text-3xl">
                What is retained before publication
              </h3>
            </div>
            <span className="text-xs font-bold text-brand-charcoal/50">
              No invented receipts or live counters
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recordTypes.map(([title, description]) => (
              <div
                key={title}
                className="flex items-center justify-between gap-4 rounded-2xl border border-brand-charcoal/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-nero/10 text-brand-nero">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-charcoal">{title}</h4>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-brand-charcoal/60">
                      {description}
                    </p>
                  </div>
                </div>
                <ShieldCheck className="shrink-0 text-emerald-600" size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
