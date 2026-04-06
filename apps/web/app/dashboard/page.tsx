import Link from 'next/link'

// Placeholder data — replace with Supabase queries
const TODAY = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const MOCK_SLOTS = [
  { id: '1', slotType: 'Breakfast', time: '8–9 am', recipe: 'Methi thepla + dahi', calories: 320, done: true },
  { id: '2', slotType: 'Morning snack', time: '11 am', recipe: 'Roasted makhana + warm milk', calories: 160, done: true },
  { id: '3', slotType: 'Lunch', time: '1–2 pm', recipe: 'Surmai fish curry + 1 katori rice + salad', calories: 520, done: false },
  { id: '4', slotType: 'Chai snack', time: '4–5 pm', recipe: 'Dates + walnut + 1 glass doodh', calories: 180, done: false },
  { id: '5', slotType: 'Dinner', time: '8–9 pm', recipe: 'Palak dal + 2 phulka + gajar sabzi', calories: 440, done: false },
]

const TOTALS = { consumed: 480, target: 2200, protein: 22, proteinTarget: 75 }

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      <AppNav />

      <main className="max-w-2xl mx-auto px-4 pb-24">
        {/* Header */}
        <div className="pt-6 pb-4">
          <p className="text-warm-400 text-sm">{TODAY}</p>
          <h1 className="text-2xl font-bold text-warm-900 mt-0.5">{getGreeting()}, Haritha 👋</h1>
        </div>

        {/* Nutrition ring + summary */}
        <div className="card mb-4">
          <div className="flex items-center gap-6">
            <NutritionRing consumed={TOTALS.consumed} target={TOTALS.target} />
            <div className="flex-1">
              <p className="text-warm-400 text-xs mb-3">Today&apos;s nutrition</p>
              <div className="space-y-2">
                <MacroRow label="Calories" value={TOTALS.consumed} target={TOTALS.target} unit="kcal" color="bg-saffron-400" />
                <MacroRow label="Protein" value={TOTALS.protein} target={TOTALS.proteinTarget} unit="g" color="bg-forest-500" />
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

        {/* Today's meal plan preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">Today&apos;s meals</h2>
            <Link href="/meal-plans" className="text-sm text-saffron-600 font-medium">See all</Link>
          </div>
          <div className="space-y-2">
            {MOCK_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className={`card flex items-center gap-4 py-3 ${slot.done ? 'opacity-60' : ''}`}
              >
                <div className={`w-2 h-2 rounded-full ${slot.done ? 'bg-forest-500' : 'bg-warm-300'}`} />
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
