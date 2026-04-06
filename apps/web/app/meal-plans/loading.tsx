export default function MealPlansLoading() {
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
          <div className="h-7 w-40 bg-warm-200 rounded-md" />
          <div className="h-4 w-72 bg-warm-200 rounded-md" />
        </div>

        {/* Week selector skeleton */}
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center gap-1 bg-warm-100 rounded-xl px-3 py-2"
            >
              <div className="h-3 w-6 bg-warm-200 rounded" />
              <div className="h-7 w-7 bg-warm-300 rounded-full" />
            </div>
          ))}
        </div>

        {/* 5 meal slot skeleton cards */}
        {['Early Morning', 'Breakfast', 'Lunch', 'Evening Snack', 'Dinner'].map(
          (slot) => (
            <div
              key={slot}
              className="bg-warm-100 rounded-2xl p-5 space-y-4"
            >
              {/* Slot header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-warm-200 rounded" />
                  <div className="h-3 w-20 bg-warm-200 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-16 bg-warm-200 rounded-lg" />
                  <div className="h-7 w-16 bg-warm-200 rounded-lg" />
                </div>
              </div>

              {/* Meal detail row */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-warm-200 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 bg-warm-200 rounded" />
                  <div className="h-3 w-56 bg-warm-200 rounded" />
                  <div className="flex gap-3">
                    <div className="h-3 w-16 bg-warm-200 rounded" />
                    <div className="h-3 w-16 bg-warm-200 rounded" />
                    <div className="h-3 w-16 bg-warm-200 rounded" />
                  </div>
                </div>
                <div className="h-8 w-8 bg-warm-200 rounded-full flex-shrink-0" />
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-warm-200 rounded-full">
                <div
                  className="h-1.5 bg-warm-300 rounded-full"
                  style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                />
              </div>
            </div>
          ),
        )}

        {/* Generate plan button skeleton */}
        <div className="flex justify-center pt-2">
          <div className="h-12 w-56 bg-warm-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}
