import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'

const TODAY = new Date()

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

interface MealSlot { id: string; slotType: string; time: string; recipe: string; calories: number; done: boolean }
interface DayTotals { consumed: number; target: number; protein: number; proteinTarget: number }
interface DayData { slots: MealSlot[]; totals: DayTotals }

// 14 days of varied Indian meals — South Indian, North Indian, Coastal, Bengali, Maharashtrian
const WEEK_MEALS: Record<number, DayData> = {
  0: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Ven Pongal + coconut chutney + filter coffee', calories: 340, done: true },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Roasted makhana + warm turmeric milk',           calories: 165, done: true },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Surmai fish curry + red rice + kachumber salad', calories: 530, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Dates + walnut + 1 glass doodh',                 calories: 180, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Palak dal + 2 phulka + gajar sabzi',             calories: 440, done: false },
    ],
    totals: { consumed: 505, target: 2200, protein: 24, proteinTarget: 75 },
  },
  1: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Pesarattu (moong dal dosa) + ginger chutney',   calories: 310, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Banana + soaked almonds (10)',                   calories: 155, done: false },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Rajma chawal + cucumber raita',                  calories: 540, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Ripe papaya + sunflower seeds',                  calories: 145, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Chicken stew + appam (3)',                       calories: 490, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  2: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Idli (3) + sambar + coconut chutney',           calories: 280, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Mixed dry fruits + 1 glass warm doodh',          calories: 195, done: false },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Macher jhol (rohu) + steamed rice + begun bhaja', calories: 510, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Chikoo + dahi',                                  calories: 160, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Paneer bhurji + 2 roti + baingan sabzi',         calories: 515, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  3: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Akki roti + raw coconut chutney + dahi',        calories: 315, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Roasted chana + jaggery + warm milk',            calories: 170, done: false },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Mutton stew + brown rice + kumro bhaja',         calories: 565, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Orange + handful of walnuts',                    calories: 145, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Moong dal + 2 phulka + bhindi masala',           calories: 420, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  4: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Ragi dosa (2) + tomato chutney + filter coffee', calories: 295, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Dates (3) + soaked almonds + warm milk',          calories: 175, done: false },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Prawn masala + red rice + kachumber',             calories: 535, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Banana + 1 glass doodh',                          calories: 160, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Masoor dal + 2 roti + aloo gobi',                 calories: 450, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  5: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Puttu + kadala curry (Kerala style)',            calories: 360, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Mixed seeds (flax, sunflower) + warm milk',       calories: 180, done: false },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Kerala fish curry + red rice + olan',             calories: 520, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Ripe papaya + handful of peanuts',                calories: 155, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Palak paneer + 2 roti + jeera rice',              calories: 510, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
  6: {
    slots: [
      { id: '1', slotType: 'Breakfast',     time: '8–9 am',   recipe: 'Upma + coconut chutney + lime + filter kaapi',   calories: 300, done: false },
      { id: '2', slotType: 'Morning snack', time: '11 am',    recipe: 'Sprouts chaat + lime + jeera',                    calories: 145, done: false },
      { id: '3', slotType: 'Lunch',         time: '1–2 pm',   recipe: 'Gongura mutton + steamed rice + pappadam',        calories: 555, done: false },
      { id: '4', slotType: 'Chai snack',    time: '4–5 pm',   recipe: 'Chikoo + roasted makhana',                        calories: 165, done: false },
      { id: '5', slotType: 'Dinner',        time: '8–9 pm',   recipe: 'Dal tadka + 2 phulka + mixed sabzi',              calories: 435, done: false },
    ],
    totals: { consumed: 0, target: 2200, protein: 0, proteinTarget: 75 },
  },
}

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
    <AppShell activePage="home">
      <div className="px-4 md:px-8 pt-6 pb-2">
        <p className="text-warm-400 text-sm">{TODAY_LABEL}</p>
        <h1 className="text-2xl md:text-3xl font-bold text-warm-900 mt-0.5">
          {getGreeting()}, Haritha
        </h1>
      </div>

      {/* Desktop 2-col grid */}
      <div className="px-4 md:px-8 pb-6 flex flex-col lg:flex-row gap-5 items-start">

        {/* ── Left column ─────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Nutrition card */}
          <div className="card">
            <div className="flex items-center gap-6">
              <NutritionRing consumed={totals.consumed} target={totals.target} />
              <div className="flex-1">
                <p className="text-warm-400 text-xs font-medium mb-3 uppercase tracking-wide">Today&apos;s nutrition</p>
                <div className="space-y-2.5">
                  <MacroRow label="Calories" value={totals.consumed} target={totals.target} unit="kcal" color="bg-saffron-400" />
                  <MacroRow label="Protein"  value={totals.protein}  target={totals.proteinTarget} unit="g" color="bg-forest-500" />
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-warm-100 flex gap-3">
              <Link href="/log"        className="btn-primary  flex-1 text-sm py-2.5">+ Log food</Link>
              <Link href="/meal-plans" className="btn-secondary flex-1 text-sm py-2.5">View plan</Link>
            </div>
          </div>

          {/* Week date strip + meals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-warm-900">{dayHeaderLabel}</h2>
              <Link href="/meal-plans" className="text-sm text-saffron-600 font-medium hover:text-saffron-700">See all</Link>
            </div>

            {/* 7-day scroller */}
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
                  <span className="text-base font-bold leading-tight">{getDayDate(i)}</span>
                  <span className={`text-xs leading-tight ${selectedDay === i ? 'text-saffron-100' : 'text-warm-400'}`}>
                    {getDayMonth(i)}
                  </span>
                </Link>
              ))}
            </div>

            {/* Meal slots */}
            <div className="space-y-2">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`card flex items-center gap-4 py-3 ${slot.done ? 'opacity-60' : ''}`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${slot.done ? 'bg-forest-500' : 'bg-warm-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-warm-400 font-medium">{slot.slotType} · {slot.time}</p>
                    <p className="font-medium text-warm-900 truncate mt-0.5">{slot.recipe}</p>
                  </div>
                  <p className="text-sm font-semibold text-warm-500 shrink-0">{slot.calories} kcal</p>
                  {!slot.done && (
                    <button className="text-xs font-semibold text-saffron-500 hover:text-saffron-700 shrink-0 px-2 py-1 rounded-lg hover:bg-saffron-50 transition-colors">
                      Swap
                    </button>
                  )}
                </div>
              ))}
            </div>

            {selectedDay > 0 && (
              <p className="text-xs text-warm-400 mt-3 text-center">
                Plan ahead — get ingredients ready for {getDayLabel(selectedDay)}
              </p>
            )}
          </div>
        </div>

        {/* ── Right column (desktop: fixed width sidebar) ─────────── */}
        <div className="w-full lg:w-72 space-y-4 shrink-0">

          {/* Streak */}
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-warm-900">7-day streak</p>
              <p className="text-sm text-warm-400">Keep it going!</p>
            </div>
            <div className="text-2xl font-bold text-saffron-500">7</div>
          </div>

          {/* Quick access — no emoji, just clean links */}
          <div>
            <h2 className="text-base font-semibold text-warm-900 mb-3">Quick access</h2>
            <div className="grid grid-cols-2 gap-2.5">
              <QuickCard href="/recipes"   label="Browse recipes"     sub="180+ dishes" />
              <QuickCard href="/pregnancy" label="Pregnancy tracker"  sub="Week 33 · T3" accent />
              <QuickCard href="/postpartum" label="Post-delivery"      sub="40-day guide" />
              <QuickCard href="/log"        label="Log a meal"         sub="Add food" />
            </div>
          </div>

          {/* Week nutrition summary (desktop only) */}
          <div className="hidden lg:block card">
            <p className="text-xs font-medium text-warm-400 uppercase tracking-wide mb-3">Today&apos;s plan totals</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { label: 'Calories', value: '1,620', unit: 'kcal', color: 'text-saffron-600' },
                { label: 'Protein',  value: '67',    unit: 'g',    color: 'text-forest-500' },
                { label: 'Carbs',    value: '213',   unit: 'g',    color: 'text-orange-500' },
                { label: 'Fat',      value: '45',    unit: 'g',    color: 'text-amber-500' },
              ].map((m) => (
                <div key={m.label}>
                  <span className={`text-xl font-bold ${m.color}`}>{m.value}</span>
                  <span className="text-xs text-warm-400 ml-0.5">{m.unit}</span>
                  <p className="text-xs text-warm-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function NutritionRing({ consumed, target }: { consumed: number; target: number }) {
  const pct = Math.min((consumed / target) * 100, 100)
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#e8e4dd" strokeWidth="9" />
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="#f4a228"
        strokeWidth="9"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="46" textAnchor="middle" fill="#1e1a15" fontSize="14" fontWeight="700">
        {consumed}
      </text>
      <text x="50" y="60" textAnchor="middle" fill="#8a8278" fontSize="10">
        / {target} kcal
      </text>
    </svg>
  )
}

function MacroRow({ label, value, target, unit, color }: { label: string; value: number; target: number; unit: string; color: string }) {
  const pct = Math.min((value / target) * 100, 100)
  return (
    <div>
      <div className="flex justify-between text-xs text-warm-500 mb-1.5">
        <span className="font-medium">{label}</span>
        <span className="font-semibold text-warm-700">{value}/{target}{unit}</span>
      </div>
      <div className="h-2 bg-warm-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function QuickCard({ href, label, sub, accent }: { href: string; label: string; sub: string; accent?: boolean }) {
  return (
    <Link
      href={href}
      className={`card flex flex-col gap-1 hover:shadow-md transition-all hover:-translate-y-0.5 ${
        accent ? 'border-rose-100 bg-rose-50' : ''
      }`}
    >
      <span className={`text-sm font-semibold ${accent ? 'text-rose-700' : 'text-warm-900'}`}>{label}</span>
      <span className={`text-xs ${accent ? 'text-rose-400' : 'text-warm-400'}`}>{sub}</span>
    </Link>
  )
}
