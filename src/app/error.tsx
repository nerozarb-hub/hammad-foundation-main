"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="container flex min-h-[55vh] items-center py-16 md:py-24"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-nero">Unable to load this page</p><h1 className="mt-4 text-4xl">Please try again.</h1><p className="mt-4 max-w-xl text-base leading-relaxed text-brand-charcoal/68">The page could not be loaded. Your payment details have not been changed.</p><button type="button" onClick={reset} className="btn-brand mt-7">Try again</button></div></div>;
}
