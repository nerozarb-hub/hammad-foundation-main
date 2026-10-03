import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { campusPhotoSrc } from "@/data/campus-photos";
import { Motif } from "@/components/illustrations/Motif";

export const metadata: Metadata = { title: "Our School Campus | Hammad Foundation Girls High School", description: "See real photographs of classrooms, assemblies, and daily life at the Hammad Foundation school project in Lahore.", alternates: { canonical: "/our-school" } };

const scenes = [
  { file: "05-classroom-learning", title: "Learning together", detail: "Students studying with their books in a classroom." },
  { file: "03-girls-at-assembly", title: "School community", detail: "Girls gathered in uniform for a school assembly." },
  { file: "07-courtyard-activity", title: "Beyond lessons", detail: "An active moment with students and staff in the courtyard." },
] as const;
const topics = [
  ["books", "Learning information", "Current learning resources and programme details are confirmed by the school team."],
  ["school", "Safeguarding", "Contact the school before visiting so campus access and safeguarding arrangements can be confirmed."],
  ["questions", "Barki Road, Lahore", "The school team can provide current campus information and appropriate visit arrangements."],
] as const;

export default function OurSchoolPage() { return <div className="bg-white">
  <section className="container grid gap-8 py-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-20"><div className="lg:col-span-5"><p className="eyebrow">Our school · Lahore</p><h1 className="mt-4 max-w-[11ch]">A place to learn and belong.</h1><p className="mt-6 max-w-[52ch] text-lg body-muted">Step inside the classrooms and courtyards shown in our own photographs. This is the school community your support reaches.</p><Link href="/gallery" className="btn-brand mt-7">Explore the gallery <ArrowRight size={18} /></Link></div><figure className="lg:col-span-7"><div className="photo-frame aspect-[4/3] sm:aspect-[1.55]"><Image src={campusPhotoSrc("01-campus-assembly-overview", "homepage-5x2")} alt="Students assembled in the Hammad Foundation school courtyard, seen from above" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /></div><figcaption className="mt-3 text-sm body-muted">A school assembly in the courtyard · Photograph supplied by Hammad Foundation</figcaption></figure></section>
  <section className="bg-brand-gray-50 py-16 md:py-24"><div className="container"><div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="eyebrow">School life</p><h2 className="mt-4 max-w-[17ch]">The everyday work, in pictures.</h2></div><p className="max-w-[60ch] text-lg body-muted">Hammad Foundation Girls High School is on Barki Road, Lahore. This school is one part of Hammad Foundation’s education work and is a project of YZ Educational Services. These scenes come from photographs supplied by the school.</p></div><div className="mt-10 grid gap-7 md:grid-cols-3">{scenes.map(scene => <figure key={scene.file}><div className="photo-frame aspect-[4/3]"><Image src={campusPhotoSrc(scene.file)} alt={scene.detail} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" /></div><figcaption className="py-5"><h3 className="text-xl">{scene.title}</h3><p className="mt-2 text-base body-muted">{scene.detail}</p></figcaption></figure>)}</div><Link href="/gallery" className="link-arrow mt-5">See the full school gallery <ArrowRight size={17} /></Link></div></section>
  <section className="container py-16 md:py-24"><div className="grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="eyebrow">Information and verification</p><h2 className="mt-4 max-w-[17ch]">Ask about the details that matter.</h2></div><p className="max-w-[60ch] text-lg body-muted">The photographs show real school moments. For current programme, enrolment, and visit details, contact the school team directly.</p></div><div className="mt-10 divide-y divide-brand-charcoal/15 border-y border-brand-charcoal/15">{topics.map(([motif, title, detail]) => <article key={title} className="grid gap-3 py-6 sm:grid-cols-[4.5rem_13rem_1fr] sm:items-center"><Motif kind={motif} size={58} /><h3 className="text-xl">{title}</h3><p className="max-w-[60ch] text-base body-muted">{detail}</p></article>)}</div><Link href="/contact" className="link-arrow mt-7">Contact the school team <ArrowRight size={17} /></Link></section>
</div>; }
