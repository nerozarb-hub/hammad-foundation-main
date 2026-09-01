import Link from "next/link";

const practicalSupport = [
  ["Learning", "Tuition, books, supplies, and the everyday costs that can interrupt a child’s education."],
  ["Dignity", "Uniforms, a dependable school routine, and the confidence to learn alongside peers."],
  ["Wellbeing", "Practical needs around a school day, including nourishment and care, where the programme confirms them."],
  ["Continuity", "A community that stays close to the question that matters most: can this child keep learning?"],
];

export function MissionContent() {
  return (
    <>
      <section id="how-it-works" className="border-y border-brand-charcoal/10 bg-brand-gray-50/60 py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero">What support is for</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-5xl">The costs around learning are never just one cost.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-charcoal/65">The original Hammad story was built around a simple truth: when a family cannot meet a school expense, a child can lose far more than a lesson. This programme exists to help keep that door open.</p>
            <Link href="/our-school" className="mt-8 inline-flex border-b-2 border-brand-nero pb-1 font-black text-brand-charcoal transition-colors hover:text-brand-nero">Learn about the school experience</Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-brand-charcoal/10 bg-brand-charcoal/10 sm:grid-cols-2">
            {practicalSupport.map(([title, description], index) => (
              <article key={title} className="min-h-52 bg-white p-7 md:p-9">
                <p className="text-xs font-black tracking-[0.22em] text-brand-nero">0{index + 1}</p>
                <h3 className="mt-10 text-2xl font-black">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-charcoal py-20 text-white md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-nero">A personal reason to participate</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">Small, regular support can make a school year feel possible again.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">Guardian is the name of the Hammad support community. It brings together people who want a direct, dignified way to stand behind education in Lahore—without asking them to suspend their judgement or take trust for granted.</p>
          </div>
          <aside className="border-l-2 border-brand-nero bg-white/5 p-7 md:p-9">
            <p className="text-sm font-black uppercase tracking-widest text-brand-nero">Before you decide</p>
            <p className="mt-5 text-xl font-bold leading-relaxed">Ask where your payment goes, how it is designated, and what information can be shared about the work it supports.</p>
            <p className="mt-5 text-sm leading-relaxed text-white/60">YZ Educational Services handles approved payments and records. Hammad tells the public mission story. Keeping those roles clear is part of respecting every supporter.</p>
            <Link href="/how-we-are-structured" className="mt-7 inline-block font-black text-brand-nero underline underline-offset-4">See how Hammad and YZ work together</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
