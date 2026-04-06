export default function RecipesLoading() {
  return (
    <div className="min-h-screen bg-warm-50 animate-pulse">
      {/* Nav bar skeleton */}
      <div className="h-16 bg-warm-200 border-b border-warm-300 flex items-center px-6 gap-4">
        <div className="h-8 w-24 bg-warm-300 rounded-md" />
        <div className="flex-1" />
        <div className="h-8 w-8 bg-warm-300 rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Page heading skeleton */}
        <div className="space-y-2">
          <div className="h-7 w-36 bg-warm-200 rounded-md" />
          <div className="h-4 w-60 bg-warm-200 rounded-md" />
        </div>

        {/* Search bar skeleton */}
        <div className="relative">
          <div className="h-12 w-full bg-warm-200 rounded-xl" />
          {/* Search icon placeholder */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 bg-warm-300 rounded-full" />
        </div>

        {/* Filter chips skeleton */}
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 bg-warm-200 rounded-full"
              style={{ width: `${60 + i * 12}px` }}
            />
          ))}
        </div>

        {/* Recipe count skeleton */}
        <div className="h-3 w-28 bg-warm-200 rounded" />

        {/* 6 recipe card skeletons in a list */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-warm-100 rounded-2xl p-4 flex items-center gap-4"
            >
              {/* Recipe image */}
              <div className="h-20 w-20 bg-warm-200 rounded-xl flex-shrink-0" />

              {/* Recipe info */}
              <div className="flex-1 space-y-2 min-w-0">
                {/* Title */}
                <div
                  className="h-4 bg-warm-200 rounded"
                  style={{ width: `${55 + (i % 3) * 15}%` }}
                />
                {/* Subtitle / region */}
                <div className="h-3 w-24 bg-warm-200 rounded" />
                {/* Macro pills */}
                <div className="flex gap-2 flex-wrap">
                  <div className="h-5 w-16 bg-warm-200 rounded-full" />
                  <div className="h-5 w-14 bg-warm-200 rounded-full" />
                  <div className="h-5 w-16 bg-warm-200 rounded-full" />
                </div>
              </div>

              {/* Right side: time + action */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="h-3 w-12 bg-warm-200 rounded" />
                <div className="h-8 w-8 bg-warm-200 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
