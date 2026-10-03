export default function Loading() {
  return (
    <div className="bg-white" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading Hammad Foundation content…</span>
      <div className="container grid gap-8 py-12 md:py-20 lg:grid-cols-12 lg:items-center" aria-hidden="true">
        <div className="space-y-5 lg:col-span-5">
          <div className="skeleton-block h-5 w-40 rounded-md" />
          <div className="skeleton-block h-14 w-full max-w-md rounded-xl" />
          <div className="skeleton-block h-14 w-4/5 max-w-sm rounded-xl" />
          <div className="skeleton-block h-5 w-full max-w-md rounded-md" />
          <div className="skeleton-block h-5 w-3/4 max-w-sm rounded-md" />
          <div className="flex flex-wrap gap-3 pt-4"><div className="skeleton-block h-12 w-40 rounded-xl" /><div className="skeleton-block h-12 w-40 rounded-xl" /></div>
        </div>
        <div className="skeleton-block aspect-[4/3] w-full rounded-2xl lg:col-span-7" />
      </div>
      <div className="border-t border-brand-charcoal/10 bg-brand-gray-50 py-8" aria-hidden="true"><div className="container grid gap-4 md:grid-cols-3"><div className="skeleton-block h-16 rounded-xl" /><div className="skeleton-block h-16 rounded-xl" /><div className="skeleton-block h-16 rounded-xl" /></div></div>
    </div>
  );
}
