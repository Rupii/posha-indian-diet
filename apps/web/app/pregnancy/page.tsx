'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

type Trimester = 'T1' | 'T2' | 'T3'

interface Nutrient {
  name: string
  target: string
  unit: string
  current: number
  targetValue: number
  color: string
}

interface AvoidFood {
  food: string
  reason: string
  alternative: string
  icon: string
}

interface SnackCard {
  name: string
  description: string
  icon: string
  time: string
}

interface Supplement {
  id: string
  name: string
  dose: string
  icon: string
  taken: boolean
}

// ─── Today's meal plan — cross-reference with AVOID_FOODS ───────────────────
// These are today's (Day 0) meals from the dashboard. In production this would
// come from the meal plan API / user's active plan.
const TODAYS_MEALS = [
  { slotType: 'Breakfast',     name: 'Ven Pongal + Coconut Chutney + Filter Kaapi' },
  { slotType: 'Morning snack', name: 'Roasted Makhana + Turmeric Milk' },
  { slotType: 'Lunch',         name: 'Surmai Fish Curry + Red Rice + Kachumber Salad' },
  { slotType: 'Chai snack',    name: 'Dates, Walnuts + Warm Doodh' },
  { slotType: 'Dinner',        name: 'Palak Dal + 2 Phulka + Gajar Sabzi' },
]

const UNSAFE_KEYWORDS: { keywords: string[]; food: string; reason: string; safe: string }[] = [
  {
    keywords: ['surmai', 'king mackerel', 'swordfish', 'shark'],
    food: 'Surmai (King Mackerel)',
    reason: 'High-mercury fish. Mercury crosses the placenta and impairs fetal brain & nervous system development.',
    safe: 'Rohu, Catla, pomfret, or sardines — low-mercury with excellent Omega-3.',
  },
  {
    keywords: ['raw papaya', 'kachcha papaya', 'green papaya'],
    food: 'Raw/Green Papaya',
    reason: 'Contains papain and latex compounds that may stimulate uterine contractions.',
    safe: 'Ripe papaya (orange flesh) in moderate amounts is safe from T2 onwards.',
  },
  {
    keywords: ['raw sprouts', 'uncooked sprouts'],
    food: 'Raw Sprouts',
    reason: 'Sprouting conditions breed Listeria and Salmonella — both dangerous in pregnancy.',
    safe: 'Always cook sprouts before eating; boiled or stir-fried is safe.',
  },
]

function checkMealPlanSafety() {
  const issues: { slotType: string; meal: string; food: string; reason: string; safe: string }[] = []
  for (const meal of TODAYS_MEALS) {
    const lower = meal.name.toLowerCase()
    for (const item of UNSAFE_KEYWORDS) {
      if (item.keywords.some((k) => lower.includes(k))) {
        issues.push({ slotType: meal.slotType, meal: meal.name, ...item })
        break
      }
    }
  }
  return issues
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_WEEK = 33
const MOCK_DUE_DATE = new Date('2026-05-25')

const NUTRIENTS: Record<Trimester, Nutrient[]> = {
  T1: [
    { name: 'Folate', target: '500 mcg', unit: 'mcg', current: 320, targetValue: 500, color: 'bg-rose-400' },
    { name: 'Iron', target: '35 mg', unit: 'mg', current: 22, targetValue: 35, color: 'bg-saffron-500' },
    { name: 'Vitamin B12', target: '2.6 mcg', unit: 'mcg', current: 1.8, targetValue: 2.6, color: 'bg-forest-500' },
  ],
  T2: [
    { name: 'Iron', target: '38 mg', unit: 'mg', current: 26, targetValue: 38, color: 'bg-saffron-500' },
    { name: 'Protein', target: '+15 g/day', unit: 'g', current: 10, targetValue: 15, color: 'bg-forest-500' },
    { name: 'Calcium', target: '1000 mg', unit: 'mg', current: 620, targetValue: 1000, color: 'bg-blue-400' },
  ],
  T3: [
    { name: 'Calcium', target: '1200 mg', unit: 'mg', current: 740, targetValue: 1200, color: 'bg-blue-400' },
    { name: 'Omega-3 DHA', target: '200 mg', unit: 'mg', current: 80, targetValue: 200, color: 'bg-teal-500' },
    { name: 'Iron', target: '40 mg', unit: 'mg', current: 28, targetValue: 40, color: 'bg-saffron-500' },
  ],
}

const AVOID_FOODS: AvoidFood[] = [
  {
    food: 'Raw Papaya (Kachcha Papaya)',
    reason: 'Contains papain & latex compounds that may trigger uterine contractions',
    alternative: 'Ripe papaya in small amounts (T2/T3 only)',
    icon: '🍈',
  },
  {
    food: 'Raw Sprouts',
    reason: 'High bacterial contamination risk — Listeria and Salmonella thrive in humid sprouting conditions',
    alternative: 'Lightly sautéed or boiled sprouts',
    icon: '🌱',
  },
  {
    food: 'Unpasteurised Paneer / Desi Cheese',
    reason: 'Raw milk paneer may carry Listeria — especially hazardous during first trimester',
    alternative: 'Pasteurised packaged paneer from reputed brands',
    icon: '🧀',
  },
  {
    food: 'Excess Methi (Fenugreek) — T1',
    reason: 'Large doses of methi seeds have uterotonic properties; moderate use in cooking is fine',
    alternative: '1–2 tsp in tempering is safe; avoid methi supplements',
    icon: '🌿',
  },
  {
    food: 'High-Mercury Fish (Surmai / King Mackerel)',
    reason: 'Mercury accumulates in fetal nervous system and may cause developmental issues',
    alternative: 'Rohu, Catla, sardines — low-mercury, high Omega-3',
    icon: '🐟',
  },
]

const NAUSEA_SNACKS: SnackCard[] = [
  {
    name: 'Jeera Water',
    description: 'Boil 1 tsp cumin in 2 cups water, cool to warm. Sip slowly in the morning.',
    icon: '🥛',
    time: '5 min',
  },
  {
    name: 'Plain Poha',
    description: 'Thin beaten rice with just salt and turmeric — easy on the stomach, light iron source.',
    icon: '🍚',
    time: '10 min',
  },
  {
    name: 'Saunf (Fennel Seeds)',
    description: 'Chew a pinch of fennel seeds after meals. Natural anti-nausea and digestive aid.',
    icon: '🌾',
    time: 'Instant',
  },
  {
    name: 'Dry Toast + Ghee',
    description: 'Whole wheat toast lightly coated with pure ghee — keeps blood sugar stable and quells nausea.',
    icon: '🍞',
    time: '3 min',
  },
]

const INITIAL_SUPPLEMENTS: Supplement[] = [
  { id: 'folic', name: 'Folic Acid', dose: '400–800 mcg', icon: '💊', taken: false },
  { id: 'iron', name: 'Iron', dose: '60 mg', icon: '🔴', taken: true },
  { id: 'calcium', name: 'Calcium', dose: '500 mg', icon: '🦴', taken: false },
  { id: 'd3', name: 'Vitamin D3', dose: '400 IU', icon: '☀️', taken: false },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function NutrientProgressBar({ nutrient, gdOn }: { nutrient: Nutrient; gdOn: boolean }) {
  const pct = Math.min(100, Math.round((nutrient.current / nutrient.targetValue) * 100))
  const statusColor = pct >= 80 ? 'text-forest-500' : pct >= 50 ? 'text-saffron-600' : 'text-rose-500'

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-warm-900">{nutrient.name}</span>
          {gdOn && nutrient.name === 'Calcium' && (
            <span className="nutrient-pill bg-amber-100 text-amber-700">GD Priority</span>
          )}
        </div>
        <span className={`text-xs font-semibold ${statusColor}`}>
          {nutrient.current} / {nutrient.targetValue} {nutrient.unit}
        </span>
      </div>
      <div className="h-2.5 bg-warm-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${nutrient.color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-warm-400">Target: {nutrient.target}</p>
    </div>
  )
}

function AvoidFoodCard({ item, gdOn }: { item: AvoidFood; gdOn: boolean }) {
  return (
    <div className="card border-l-4 border-l-rose-400 space-y-2">
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-warm-900 text-sm leading-tight">{item.food}</p>
          <p className="text-xs text-warm-500 mt-1 leading-relaxed">{item.reason}</p>
          {gdOn && item.food.includes('Fish') && (
            <span className="inline-block mt-1 nutrient-pill bg-amber-100 text-amber-700">
              GD: Check GI index too
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-warm-400 shrink-0">Safe alternative:</span>
        <span className="nutrient-pill bg-forest-100 text-forest-500 text-xs leading-relaxed">
          {item.alternative}
        </span>
      </div>
    </div>
  )
}

function SnackCard({ snack }: { snack: SnackCard }) {
  return (
    <div className="card flex gap-3 items-start">
      <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-2xl shrink-0">
        {snack.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-warm-900 text-sm">{snack.name}</p>
          <span className="nutrient-pill bg-warm-100 text-warm-500 shrink-0">{snack.time}</span>
        </div>
        <p className="text-xs text-warm-500 mt-1 leading-relaxed">{snack.description}</p>
      </div>
    </div>
  )
}

function SupplementRow({
  supplement,
  onToggle,
}: {
  supplement: Supplement
  onToggle: (id: string) => void
}) {
  return (
    <button
      onClick={() => onToggle(supplement.id)}
      className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${
        supplement.taken
          ? 'border-forest-500 bg-forest-50'
          : 'border-warm-200 bg-white'
      }`}
    >
      <span className="text-2xl">{supplement.icon}</span>
      <div className="flex-1 text-left">
        <p className={`text-sm font-semibold ${supplement.taken ? 'text-forest-500' : 'text-warm-900'}`}>
          {supplement.name}
        </p>
        <p className="text-xs text-warm-400">{supplement.dose}</p>
      </div>
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
          supplement.taken
            ? 'border-forest-500 bg-forest-500'
            : 'border-warm-300 bg-white'
        }`}
      >
        {supplement.taken && (
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PregnancyPage() {
  const [trimester, setTrimester] = useState<Trimester>('T3')
  const [gdOn, setGdOn] = useState(false)
  const [supplements, setSupplements] = useState<Supplement[]>(INITIAL_SUPPLEMENTS)
  const [profileSet, setProfileSet] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('poshaProfile')
    setProfileSet(!!raw)
  }, [])

  const mealSafetyIssues = checkMealPlanSafety()

  const daysUntilDue = Math.ceil(
    (MOCK_DUE_DATE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  const toggleSupplement = (id: string) => {
    setSupplements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s))
    )
  }

  const takenCount = supplements.filter((s) => s.taken).length

  const trimesterLabels: Record<Trimester, string> = {
    T1: 'Weeks 1–12',
    T2: 'Weeks 13–26',
    T3: 'Weeks 27–40',
  }

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-warm-100 transition-colors"
            aria-label="Back to dashboard"
          >
            <svg className="w-5 h-5 text-warm-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-base font-bold text-warm-900">Pregnancy Nutrition</h1>
            <p className="text-xs text-warm-400">Posha Prenatal Guide</p>
          </div>
          {/* GD toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-warm-600">GD</span>
            <button
              onClick={() => setGdOn(!gdOn)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                gdOn ? 'bg-amber-500' : 'bg-warm-300'
              }`}
              aria-label={`Gestational Diabetes mode ${gdOn ? 'on' : 'off'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  gdOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 space-y-5 pt-5">
        {/* Profile not set banner */}
        {!profileSet && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 items-start">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-amber-500 shrink-0 mt-0.5">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">Pregnancy profile not set up</p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                We don&apos;t know you&apos;re pregnant yet — your current meal plan may include unsafe foods.
                Set up your profile to enable pregnancy-safe filtering on all meal suggestions.
              </p>
              <Link href="/onboarding" className="inline-block mt-2 text-xs font-semibold text-amber-800 underline underline-offset-2">
                Set up pregnancy profile →
              </Link>
            </div>
          </div>
        )}

        {/* ── TODAY'S MEAL PLAN SAFETY CHECK ─────────────────────────── */}
        {mealSafetyIssues.length > 0 && (
          <section>
            <div className="rounded-2xl bg-rose-50 border border-rose-200 overflow-hidden">
              {/* Header */}
              <div className="px-4 pt-4 pb-3 border-b border-rose-200">
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-rose-600">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>
                  </svg>
                  <h2 className="text-sm font-bold text-rose-700">
                    Today&apos;s Meal Plan — {mealSafetyIssues.length} safety concern{mealSafetyIssues.length > 1 ? 's' : ''} found
                  </h2>
                </div>
                <p className="text-xs text-rose-600 mt-1">
                  {profileSet
                    ? 'These meals in your current plan need attention during pregnancy.'
                    : "We spotted these in your general meal plan. If you're pregnant, these need attention."}
                </p>
              </div>

              {/* Issues */}
              <div className="divide-y divide-rose-100">
                {mealSafetyIssues.map((issue) => (
                  <div key={issue.slotType} className="px-4 py-3 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-rose-700 uppercase tracking-wide">{issue.slotType}</p>
                        <p className="text-sm font-medium text-warm-900 mt-0.5">{issue.meal}</p>
                      </div>
                      <span className="nutrient-pill bg-rose-100 text-rose-600 shrink-0 mt-0.5">Unsafe</span>
                    </div>
                    <p className="text-xs text-rose-600 leading-relaxed">
                      <span className="font-semibold">{issue.food}:</span> {issue.reason}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-warm-500">Safe swap:</span>
                      <span className="nutrient-pill bg-forest-50 text-forest-600 text-xs">{issue.safe}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-rose-100">
                <Link
                  href="/meal-plans"
                  className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Go to meal plan to swap →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* GD Banner */}
        {gdOn && (
          <div className="card bg-amber-50 border-amber-300 flex items-start gap-3">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-amber-600 shrink-0 mt-0.5">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">Gestational Diabetes Mode ON</p>
              <p className="text-xs text-amber-700 mt-0.5">
                GI warnings are now shown on food suggestions. Prefer low-GI swaps like bajra roti over maida and brown rice over white.
              </p>
            </div>
          </div>
        )}

        {/* Week + Due Date */}
        <div className="card flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex flex-col items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-rose-500 leading-none">{MOCK_WEEK}</span>
            <span className="text-xs text-rose-400 font-medium">weeks</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-warm-900">Week {MOCK_WEEK} of Pregnancy</p>
            <p className="text-xs text-warm-500 mt-0.5">Baby is the size of a lime 🍋</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-xs text-warm-400">Due date:</span>
              <span className="nutrient-pill bg-rose-100 text-rose-600 text-xs">
                {MOCK_DUE_DATE.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="text-xs text-warm-400">({daysUntilDue} days away)</span>
            </div>
          </div>
        </div>

        {/* Trimester Selector */}
        <div>
          <p className="text-xs text-warm-400 mb-2 px-1">Select trimester</p>
          <div className="flex gap-2">
            {(['T1', 'T2', 'T3'] as Trimester[]).map((t) => (
              <button
                key={t}
                onClick={() => setTrimester(t)}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all border-2 ${
                  trimester === t
                    ? 'border-rose-400 bg-rose-50 text-rose-600'
                    : 'border-warm-200 bg-white text-warm-600 hover:border-warm-300'
                }`}
              >
                <span className="block">{t}</span>
                <span className="text-xs font-normal opacity-70">{trimesterLabels[t]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Nutrients This Week */}
        <section>
          <h2 className="section-title mb-3">This Week&apos;s Key Nutrients</h2>
          <div className="card space-y-5">
            {NUTRIENTS[trimester].map((nutrient) => (
              <NutrientProgressBar key={nutrient.name} nutrient={nutrient} gdOn={gdOn} />
            ))}
          </div>
        </section>

        {/* Nausea-Friendly Snacks (T1 only) */}
        {trimester === 'T1' && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Nausea-Friendly Snacks</h2>
              <span className="nutrient-pill bg-rose-100 text-rose-500">First trimester</span>
            </div>
            <div className="space-y-3">
              {NAUSEA_SNACKS.map((snack) => (
                <SnackCard key={snack.name} snack={snack} />
              ))}
            </div>
          </section>
        )}

        {/* Foods to Avoid */}
        <section>
          <h2 className="section-title mb-3">Foods to Avoid</h2>
          <div className="space-y-3">
            {AVOID_FOODS.map((item) => (
              <AvoidFoodCard key={item.food} item={item} gdOn={gdOn} />
            ))}
          </div>
        </section>

        {/* Supplement Tracker */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">Today&apos;s Supplements</h2>
            <span
              className={`nutrient-pill text-sm font-bold ${
                takenCount === supplements.length
                  ? 'bg-forest-100 text-forest-500'
                  : 'bg-warm-100 text-warm-600'
              }`}
            >
              {takenCount}/{supplements.length} taken
            </span>
          </div>
          <div className="space-y-2.5">
            {supplements.map((s) => (
              <SupplementRow key={s.id} supplement={s} onToggle={toggleSupplement} />
            ))}
          </div>
          {takenCount === supplements.length && (
            <div className="mt-3 card bg-forest-50 border-forest-500 text-center py-3">
              <p className="text-sm font-semibold text-forest-500">All supplements taken today! 🎉</p>
              <p className="text-xs text-forest-500 opacity-70 mt-0.5">You&apos;re doing great, mama</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
