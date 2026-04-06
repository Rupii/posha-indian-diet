export default function LogLoading() {
  return (
    <div className="min-h-screen bg-warm-50 px-4 py-6 space-y-6">
      {/* Search bar skeleton */}
      <div className="h-12 w-full rounded-xl bg-warm-200 animate-pulse" />

      {/* Quick-add pills skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-warm-200 animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 rounded-full bg-warm-200 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Log entry skeleton cards */}
      <div className="space-y-3">
        <div className="h-4 w-40 rounded bg-warm-200 animate-pulse" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="card flex items-center justify-between gap-4 animate-pulse"
          >
            {/* Left: food name + nutrient pills */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-28 rounded bg-warm-200" />
              <div className="flex gap-2">
                <div className="h-5 w-14 rounded-full bg-warm-200" />
                <div className="h-5 w-14 rounded-full bg-warm-200" />
                <div className="h-5 w-14 rounded-full bg-warm-200" />
              </div>
            </div>

            {/* Right: unit toggle skeleton + edit button */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="h-8 w-32 rounded-full bg-warm-200" />
              <div className="h-6 w-10 rounded bg-warm-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Manual add form skeleton */}
      <div className="card space-y-3 animate-pulse">
        <div className="h-4 w-24 rounded bg-warm-200" />
        <div className="h-10 w-full rounded-lg bg-warm-200" />
        <div className="flex gap-2">
          <div className="h-10 flex-1 rounded-lg bg-warm-200" />
          <div className="h-10 w-28 rounded-lg bg-warm-200" />
        </div>
        <div className="h-10 w-full rounded-lg bg-warm-200" />
        <div className="h-11 w-full rounded-xl bg-warm-200" />
      </div>
    </div>
  );
}
