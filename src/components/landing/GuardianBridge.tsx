import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supportOptions } from "@/config/ecosystem";

export function GuardianBridge() {
  const guardian = supportOptions.find(option => option.id === "guardian-monthly")!;
  return <section className="overflow-hidden bg-[#EAF8ED] py-14 md:py-20"><div className="container grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-12"><div className="lg:col-span-5"><p className="eyebrow">The Guardian bridge</p><h2 className="mt-4 max-w-[17ch]">A clear way to support school continuity.</h2><p className="mt-5 max-w-[53ch] text-lg body-muted">{guardian.description}</p><p className="mt-4 max-w-[53ch] text-base body-muted">The current PayPro checkout creates one payment for this monthly designation. It does not start automatic billing.</p><Link href={`/donate?support=${guardian.id}`} className="btn-brand mt-7">Continue with PKR {guardian.amountPkr.toLocaleString()} <ArrowRight size={17} /></Link></div><figure className="lg:col-span-7"><Image src="/images/hammad/illustrations/guardian-bridge.webp" width={1448} height={1086} sizes="(min-width: 1024px) 55vw, 100vw" alt="Conceptual green bridge from a stack of books toward an open school doorway" className="h-auto w-full" /><figcaption className="text-sm body-muted">Conceptual illustration of continued access to learning.</figcaption></figure></div></section>;
}
