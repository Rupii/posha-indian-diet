export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-warm-50 animate-pulse">
      {/* Nav bar skeleton */}
      <div className="h-16 bg-warm-200 border-b border-warm-300 flex items-center px-6 gap-4">
        <div className="h-8 w-24 bg-warm-300 rounded-md" />
        <div className="flex-1" />
        <div className="h-8 w-8 bg-warm-300 rounded-full" />
        <div className="h-8 w-20 bg-warm-300 rounded-md" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Page title skeleton */}
        <div className="space-y-2">
          <div className="h-7 w-48 bg-warm-200 rounded-md" />
          <div className="h-4 w-64 bg-warm-200 rounded-md" />
        </div>

        {/* Nutrition ring + summary row */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Nutrition ring skeleton */}
          <div className="flex-shrink-0 flex items-center justify-center bg-warm-100 rounded-2xl p-6 w-full sm:w-64 h-64">
            <div className="relative">
              <div className="h-44 w-44 rounded-full bg-warm-200" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <div className="h-5 w-16 bg-warm-300 rounded" />
                <div className="h-3 w-10 bg-warm-300 rounded" />
              </div>
            </div>
          </div>

          {/* Macro summary cards */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 gap-4">
            {['Protein', 'Carbs', 'Fat', 'Fibre'].map((label) => (
              <div
                key={label}
                className="bg-warm-100 rounded-xl p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="h-3 w-12 bg-warm-200 rounded" />
                <div className="h-6 w-20 bg-warm-300 rounded" />
                <div className="h-2 w-full bg-warm-200 rounded-full">
                  <div className="h-2 w-1/2 bg-warm-300 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal slots */}
        <div className="space-y-4">
          <div className="h-5 w-32 bg-warm-200 rounded" />

          {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
            <div
              key={meal}
              className="bg-warm-100 rounded-2xl p-5 space-y-3"
            >
              {/* Meal slot header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-4 w-20 bg-warm-200 rounded" />
                  <div className="h-3 w-28 bg-warm-200 rounded" />
                </div>
                <div className="h-8 w-24 bg-warm-200 rounded-lg" />
              </div>

              {/* Food item rows */}
              <div className="space-y-2 pt-1">
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-warm-200 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 w-36 bg-warm-200 rounded" />
                      <div className="h-2 w-20 bg-warm-200 rounded" />
                    </div>
                    <div className="h-4 w-12 bg-warm-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick log button skeleton */}
        <div className="flex justify-center">
          <div className="h-12 w-48 bg-warm-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}
