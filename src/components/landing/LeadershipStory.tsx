import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LeadershipStory() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="leadership-heading">
      <div className="container grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-14">
        <figure className="lg:col-span-5">
          <div className="photo-frame aspect-[4/5] bg-brand-gray-100">
            <Image src="/images/hammad/leadership-portrait.webp" alt="Portrait supplied by Hammad Foundation of its CEO seated in a dark waistcoat" fill sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw" className="object-cover object-top" />
          </div>
          <figcaption className="mt-3 text-base text-secondary">Hammad Foundation CEO · Portrait supplied by the team</figcaption>
        </figure>
        <div className="lg:col-span-7">
          <p className="eyebrow">The people behind the work</p>
          <h2 id="leadership-heading" className="mt-4 max-w-[18ch]">A school year is made of everyday moments.</h2>
          <p className="mt-6 max-w-[58ch] text-lg text-secondary">The next lesson. A familiar classroom. The books and essentials that help a student arrive ready to learn. Hammad Foundation’s broader purpose is to help people access education. Its Lahore school community gives that purpose a place and a daily rhythm.</p>
          <p className="mt-4 max-w-[58ch] text-lg text-secondary">The CEO’s portrait gives the work a human face. The school photographs show the people and place at its centre. Together they reflect a simple promise: make the school visible, explain how support works, and give every visitor a clear way to ask questions.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/our-school" className="btn-outline">See the school <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/transparency" className="btn-outline">Read the public record <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
