import Link from 'next/link'

const TODAY = new Date()

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// 7 days of T3-pregnancy-appropriate Indian meals (no pork, no beef)
const WEEK_MEALS: Record<number, { slots: typeof DAY0_SLOTS; totals: typeof DAY0_TOTALS }> = {
  0: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Methi thepla + dahi', calories: 320, done: true },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Roasted makhana + warm milk', calories: 160, done: true },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Surmai fish curry + 1 katori rice + salad', calories: 520, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Dates + walnut + 1 glass doodh', calories: 180, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Palak dal + 2 phulka + gajar sabzi', calories: 440, done: false },
    ],
    totals: { consumed: 480, target: 2200, protein: 22, proteinTarget: 75 },
  },
  1: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Poha + 1 glass milk', calories: 300, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Banana + roasted chana', calories: 170, done: false },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Rajma chawal + cucumber salad', calories: 540, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Apple + 1 tbsp peanut butter', calories: 150, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Chicken curry + 1 katori rice + salad', calories: 500, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  2: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: '2 Idli + sambar + coconut chutney', calories: 280, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Mixed dry fruits + 1 glass doodh', calories: 190, done: false },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Egg bhurji + 2 phulka + onion salad', calories: 480, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Chikoo (sapota) + dahi', calories: 160, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Paneer bhurji + 2 roti + baingan sabzi', calories: 520, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  3: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Upma + dahi + sprouts', calories: 310, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Roasted makhana + dates', calories: 155, done: false },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Mutton stew + brown rice + salad', calories: 560, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Orange + handful almonds', calories: 145, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Moong dal + 2 phulka + bhindi sabzi', calories: 420, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  4: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Besan cheela + green chutney + dahi', calories: 330, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Dates + soaked almonds + milk', calories: 175, done: false },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Prawn masala + 1 katori rice + kachumber', calories: 530, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Banana + 1 glass doodh', calories: 160, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Masoor dal + 2 roti + aloo gobi sabzi', calories: 450, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  5: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Dalia khichdi + dahi', calories: 295, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Mixed seeds (sunflower, flax) + warm milk', calories: 180, done: false },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Chicken soup + whole wheat bread + salad', calories: 490, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Papaya (ripe) + handful walnuts', calories: 155, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Palak paneer + 2 roti + jeera rice', calories: 510, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  6: {
    slots: [
      { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Akki roti + coconut chutney + dahi', calories: 305, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Sprouts chaat + lime', calories: 145, done: false },
      { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Fish tikka + jeera rice + onion raita', calories: 545, done: false },
      { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Chikoo + roasted chana', calories: 165, done: false },
      { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Dal tadka + 2 phulka + mixed sabzi', calories: 435, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
}

// Needed for type inference above
const DAY0_SLOTS = WEEK_MEALS[0]?.slots ?? []
const DAY0_TOTALS = WEEK_MEALS[0]?.totals ?? { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 }

function getDayLabel(offset: number) {
  if (offset === 0) return 'Today'
  if (offset === 1) return 'Tomorrow'
  const d = new Date(TODAY)
  d.setDate(TODAY.getDate() + offset)
  return d.toLocaleDateString('en-IN', { weekday: 'short' })
}

function getDayDate(offset: number) {
  const d = new Date(TODAY)
  d.setDate(TODAY.getDate() + offset)
  return d.getDate()
}

function getDayMonth(offset: number) {
  const d = new Date(TODAY)
  d.setDate(TODAY.getDate() + offset)
  return d.toLocaleDateString('en-IN', { month: 'short' })
}

const TODAY_LABEL = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { day?: string }
}) {
  const selectedDay = Math.min(Math.max(parseInt(searchParams.day ?? '0', 10) || 0, 0), 6)
  const dayData = WEEK_MEALS[selectedDay]!
  const slots = dayData.slots
  const totals = dayData.totals

  const dayHeaderLabel =
    selectedDay === 0
      ? "Today's meals"
      : selectedDay === 1
      ? "Tomorrow's meals"
      : `${getDayLabel(selectedDay)}'s meals`

  return (
    <div className="min-h-screen bg-warm-50">
      <AppNav />

      <main className="max-w-2xl mx-auto px-4 pb-24">
        {/* Header */}
        <div className="pt-6 pb-4">
          <p className="text-warm-400 text-sm">{TODAY_LABEL}</p>
          <h1 className="text-2xl font-bold text-warm-900 mt-0.5">{getGreeting()}, Haritha 👋</h1>
        </div>

        {/* Nutrition ring + summary */}
        <div className="card mb-4">
          <div className="flex items-center gap-6">
            <NutritionRing consumed={totals.consumed} target={totals.target} />
            <div className="flex-1">
              <p className="text-warm-400 text-xs mb-3">Today&apos;s nutrition</p>
              <div className="space-y-2">
                <MacroRow label="Calories" value={totals.consumed} target={totals.target} unit="kcal" color="bg-saffron-400" />
                <MacroRow label="Protein" value={totals.protein} target={totals.proteinTarget} unit="g" color="bg-forest-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-warm-100 flex gap-3">
            <Link href="/log" className="btn-primary flex-1 text-sm py-2">
              + Log food
            </Link>
            <Link href="/meal-plans" className="btn-secondary flex-1 text-sm py-2">
              View plan
            </Link>
          </div>
        </div>

        {/* Streak */}
        <div className="card mb-4 flex items-center gap-4">
          <div className="text-3xl">🔥</div>
          <div>
            <p className="font-semibold text-warm-900">7-day streak</p>
            <p className="text-sm text-warm-400">Keep logging to maintain your streak</p>
          </div>
          <div className="ml-auto text-2xl font-bold text-saffron-500">7</div>
        </div>

        {/* Week date strip + meals */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">{dayHeaderLabel}</h2>
            <Link href="/meal-plans" className="text-sm text-saffron-600 font-medium">See all</Link>
          </div>

          {/* 7-day horizontal scroller */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide -mx-1 px-1">
            {Array.from({ length: 7 }, (_, i) => (
              <Link
                key={i}
                href={`/dashboard?day=${i}`}
                className={`flex flex-col items-center min-w-[56px] rounded-xl py-2 px-1 text-center transition-colors shrink-0 ${
                  selectedDay === i
                    ? 'bg-saffron-500 text-white'
                    : 'bg-white text-warm-600 border border-warm-200 hover:border-saffron-300'
                }`}
              >
                <span className={`text-xs font-medium leading-tight ${selectedDay === i ? 'text-saffron-100' : 'text-warm-400'}`}>
                  {getDayLabel(i)}
                </span>
                <span className="text-lg font-bold leading-tight">{getDayDate(i)}</span>
                <span className={`text-xs leading-tight ${selectedDay === i ? 'text-saffron-100' : 'text-warm-400'}`}>
                  {getDayMonth(i)}
                </span>
              </Link>
            ))}
          </div>

          {/* Meal slots for selected day */}
          <div className="space-y-2">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`card flex items-center gap-4 py-3 ${slot.done ? 'opacity-60' : ''}`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${slot.done ? 'bg-forest-500' : 'bg-warm-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-warm-400">{slot.slotType} · {slot.time}</p>
                  <p className="font-medium text-warm-900 truncate">{slot.recipe}</p>
                </div>
                <p className="text-sm text-warm-400 shrink-0">{slot.calories} kcal</p>
                {!slot.done && (
                  <button className="text-xs text-warm-400 hover:text-warm-600 shrink-0">Swap</button>
                )}
              </div>
            ))}
          </div>

          {/* Grocery hint for future days */}
          {selectedDay > 0 && (
            <p className="text-xs text-warm-400 mt-3 text-center">
              Plan ahead — get ingredients ready for {getDayLabel(selectedDay)}
            </p>
          )}
        </div>

        {/* Quick access */}
        <div>
          <h2 className="section-title mb-3">Quick access</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickCard href="/recipes" emoji="📖" label="Browse recipes" />
            <QuickCard href="/pregnancy" emoji="🤰" label="Pregnancy tracker" />
            <QuickCard href="/postpartum" emoji="🌸" label="Post-delivery" />
            <QuickCard href="/log" emoji="➕" label="Log a meal" />
          </div>
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  )
}

function NutritionRing({ consumed, target }: { consumed: number; target: number }) {
  const pct = Math.min((consumed / target) * 100, 100)
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <svg width="88" height="88" viewBox="0 0 88 88">
      <circle cx="44" cy="44" r={r} fill="none" stroke="#e8e4dd" strokeWidth="8" />
      <circle
        cx="44" cy="44" r={r}
        fill="none"
        stroke="#f4a228"
        strokeWidth="8"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 44 44)"
      />
      <text x="44" y="40" textAnchor="middle" className="text-xs" fill="#1e1a15" fontSize="13" fontWeight="600">
        {consumed}
      </text>
      <text x="44" y="55" textAnchor="middle" fill="#8a8278" fontSize="10">
        / {target}
      </text>
    </svg>
  )
}

function MacroRow({ label, value, target, unit, color }: { label: string; value: number; target: number; unit: string; color: string }) {
  const pct = Math.min((value / target) * 100, 100)
  return (
    <div>
      <div className="flex justify-between text-xs text-warm-500 mb-1">
        <span>{label}</span>
        <span>{value}/{target}{unit}</span>
      </div>
      <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function QuickCard({ href, emoji, label }: { href: string; emoji: string; label: string }) {
  return (
    <Link href={href} className="card flex items-center gap-3 hover:shadow-md transition-shadow">
      <span className="text-2xl">{emoji}</span>
      <span className="text-sm font-medium text-warm-800">{label}</span>
    </Link>
  )
}

function AppNav() {
  return (
    <nav className="bg-white border-b border-warm-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">🌿</span>
        <span className="font-bold text-warm-900">Posha</span>
      </div>
      <button className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-sm font-bold text-saffron-700">
        H
      </button>
    </nav>
  )
}

function BottomNav({ active }: { active: string }) {
  const items = [
    { id: 'home', label: 'Home', emoji: '🏠', href: '/dashboard' },
    { id: 'meals', label: 'Meals', emoji: '🍽️', href: '/meal-plans' },
    { id: 'log', label: 'Log', emoji: '➕', href: '/log' },
    { id: 'recipes', label: 'Recipes', emoji: '📖', href: '/recipes' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 flex">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`flex-1 flex flex-col items-center py-2 text-xs gap-0.5 ${
            active === item.id ? 'text-saffron-600' : 'text-warm-400'
          }`}
        >
          <span className="text-xl">{item.emoji}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
