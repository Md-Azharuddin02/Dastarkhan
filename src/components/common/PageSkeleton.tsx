export function PageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
    >
      <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-beige" />
        <div className="h-9 w-2/3 max-w-md animate-pulse rounded bg-beige" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded bg-sand" />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <MenuCardSkeleton key={item} />
        ))}
      </div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

export function MenuCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-beige bg-surface">
      <div className="aspect-[4/3] animate-pulse bg-sand" />
      <div className="space-y-3 p-5">
        <div className="h-3.5 w-24 animate-pulse rounded bg-beige" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-beige" />
        <div className="h-4 w-full animate-pulse rounded bg-sand" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-sand" />
      </div>
    </div>
  );
}
