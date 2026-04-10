export default function RomansLoading() {
  return (
    <div className="section-wrap-lg section-pad-md stack-md text-ink">
      <div className="h-6 w-24 animate-pulse rounded bg-surface-placeholder" />
      <div className="h-12 w-full animate-pulse rounded bg-surface-placeholder" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`roman-loading-${index}`} className="stack-sm">
            <div className="h-56 w-full animate-pulse rounded-2xl bg-surface-placeholder" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-surface-placeholder" />
            <div className="h-4 w-full animate-pulse rounded bg-surface-placeholder" />
          </div>
        ))}
      </div>
    </div>
  );
}
