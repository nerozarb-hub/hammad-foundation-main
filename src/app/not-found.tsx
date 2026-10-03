import Link from "next/link";

export default function NotFound() {
  return <div className="container flex min-h-[55vh] items-center py-16 md:py-24"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-nero">Page not found</p><h1 className="mt-4 text-5xl sm:text-6xl">This page is not available.</h1><p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-charcoal/68">Use the school home page to explore the programme, support options, and public information.</p><Link href="/" className="btn-brand mt-8">Return to the school home</Link></div></div>;
}
