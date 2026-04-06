'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

type DeliveryType = 'normal' | 'csection'
type Mood = 'tired' | 'good' | 'struggling' | null

interface MealCard {
  name: string
  description: string
  icon: string
  phase: string
  tags: string[]
}

interface LactationRecipe {
  name: string
  description: string
  icon: string
  badges: string[]
  time: string
}

interface SnackCard {
  name: string
  description: string
  icon: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MOCK_RECOVERY_DAY = 18
const MOCK_DELIVERY_DATE = new Date('2026-03-19')
const CONFINEMENT_TOTAL_DAYS = 40

// Phase boundaries
const PHASES = [
  { label: 'Liquid / Soft', range: 'Days 1–5', start: 1, end: 5, color: 'bg-rose-300' },
  { label: 'Semi-Solid', range: 'Days 6–15', start: 6, end: 15, color: 'bg-saffron-400' },
  { label: 'Full Diet', range: 'Day 16+', start: 16, end: 40, color: 'bg-forest-500' },
]

const MEAL_SUGGESTIONS: Record<DeliveryType, MealCard[]> = {
  normal: [
    {
      name: 'Methi Ladoo',
      description: 'Fenugreek, dry ginger, edible gum, jaggery and ghee — the classic postpartum energy ball.',
      icon: '🟡',
      phase: 'Full Diet',
      tags: ['Iron', 'Galactagogue', 'Energy'],
    },
    {
      name: 'Moringa Dal',
      description: 'Toor dal tempered with mustard seeds and loaded with drumstick leaves — calcium and iron powerhouse.',
      icon: '🍵',
      phase: 'Full Diet',
      tags: ['Protein', 'Iron', 'Calcium'],
    },
    {
      name: 'Ragi Porridge',
      description: 'Finger millet cooked in whole milk with jaggery and a pinch of cardamom. Best morning meal.',
      icon: '🥣',
      phase: 'Full Diet',
      tags: ['Calcium', 'Fiber', 'Iron'],
    },
  ],
  csection: [
    {
      name: 'Soft Khichdi',
      description: 'Moong dal khichdi with ghee and mild spices — gentle on the digestive system post-surgery.',
      icon: '🍲',
      phase: 'Full Diet',
      tags: ['Easy Digest', 'Protein', 'Warming'],
    },
    {
      name: 'Moringa Dal',
      description: 'Toor dal tempered with mustard seeds and loaded with drumstick leaves — calcium and iron powerhouse.',
      icon: '🍵',
      phase: 'Full Diet',
      tags: ['Protein', 'Iron', 'Calcium'],
    },
    {
      name: 'Ragi Porridge',
      description: 'Finger millet cooked in whole milk with jaggery and a pinch of cardamom. Best morning meal.',
      icon: '🥣',
      phase: 'Full Diet',
      tags: ['Calcium', 'Fiber', 'Iron'],
    },
  ],
}

const LACTATION_RECIPES: LactationRecipe[] = [
  {
    name: 'Methi Ladoo',
    description: 'Fenugreek seeds with gondh, whole wheat, jaggery & ghee. 2 per day.',
    icon: '🟡',
    badges: ['Fenugreek', 'Gondh'],
    time: '40 min',
  },
  {
    name: 'Moringa Soup',
    description: 'Drumstick leaf soup with garlic and jeera. Rich in phytosterols that boost prolactin.',
    icon: '🥬',
    badges: ['Moringa', 'Drumstick leaves'],
    time: '20 min',
  },
  {
    name: 'Gondh Panjiri',
    description: 'Edible gum with whole wheat flour, dry fruits, makhana — traditional North Indian lactation booster.',
    icon: '🫙',
    badges: ['Gondh', 'Dry Fruits'],
    time: '25 min',
  },
  {
    name: 'Jeera-Saunf Milk',
    description: 'Cumin and fennel seeds simmered in whole milk. Drink warm at bedtime for overnight milk boost.',
    icon: '🥛',
    badges: ['Fenugreek', 'Fennel'],
    time: '10 min',
  },
]

const ONE_HAND_SNACKS: SnackCard[] = [
  {
    name: 'Makhana (Fox Nuts)',
    description: 'Dry roasted with ghee and rock salt. High protein, low calorie, zero mess.',
    icon: '🔵',
  },
  {
    name: 'Mixed Dry Fruits',
    description: 'Almonds, cashews, raisins pre-portioned in a small zip bag. Iron + healthy fats.',
    icon: '🥜',
  },
  {
    name: 'Banana',
    description: 'Nature\'s perfect one-hand snack. Potassium, quick carbs, and natural mood lifter.',
    icon: '🍌',
  },
  {
    name: 'Coconut Energy Balls',
    description: 'Dates, desiccated coconut, and sesame seeds rolled into bite-sized bites. No cutlery needed.',
    icon: '🟤',
  },
]

const IRON_WEEKLY_TARGET = 30 // mg
const IRON_CURRENT = 21 // mg — mock

// ─── Sub-components ───────────────────────────────────────────────────────────

function PhaseLabel({ day }: { day: number }) {
  const phase = PHASES.find((p) => day >= p.start && day <= p.end)
  if (!phase) return null
  return (
    <span className={`nutrient-pill text-white text-xs ${phase.color}`}>
      {phase.label} Phase
    </span>
  )
}

function ConfinementProgressBar({ day }: { day: number }) {
  const pct = Math.min(100, Math.round((day / CONFINEMENT_TOTAL_DAYS) * 100))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-warm-600">Day {day} of 40</span>
        <span className="text-xs text-warm-400">{CONFINEMENT_TOTAL_DAYS - day} days remaining</span>
      </div>

      {/* Segmented bar */}
      <div className="relative h-4 bg-warm-100 rounded-full overflow-hidden">
        {/* Phase segments */}
        <div className="absolute inset-0 flex">
          <div className="bg-rose-200" style={{ width: '12.5%' }} /> {/* 5/40 */}
          <div className="bg-saffron-200" style={{ width: '25%' }} />  {/* 10/40 */}
          <div className="bg-forest-100" style={{ width: '62.5%' }} /> {/* 25/40 */}
        </div>
        {/* Progress overlay */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-400 via-saffron-500 to-forest-500 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
        {/* Day marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-white/80"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Phase labels */}
      <div className="flex text-xs text-warm-500 justify-between px-0.5">
        <span>Day 1<br /><span className="text-rose-400 font-medium">Liquid</span></span>
        <span className="text-center">Day 6<br /><span className="text-saffron-500 font-medium">Semi-solid</span></span>
        <span className="text-right">Day 16+<br /><span className="text-forest-500 font-medium">Full diet</span></span>
      </div>
    </div>
  )
}

function MealSuggestionCard({ meal }: { meal: MealCard }) {
  return (
    <div className="card flex gap-3 items-start">
      <div className="w-12 h-12 rounded-xl bg-warm-100 flex items-center justify-center text-2xl shrink-0">
        {meal.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-warm-900 text-sm leading-snug">{meal.name}</p>
          <span className="nutrient-pill bg-forest-100 text-forest-500 shrink-0 text-xs">{meal.phase}</span>
        </div>
        <p className="text-xs text-warm-500 mt-1 leading-relaxed">{meal.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {meal.tags.map((tag) => (
            <span key={tag} className="nutrient-pill bg-saffron-50 text-saffron-700">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function LactationCard({ recipe }: { recipe: LactationRecipe }) {
  return (
    <div className="card space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0">
          {recipe.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="font-semibold text-warm-900 text-sm">{recipe.name}</p>
            <span className="nutrient-pill bg-warm-100 text-warm-500 text-xs">{recipe.time}</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-warm-500 leading-relaxed">{recipe.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {recipe.badges.map((badge) => (
          <span key={badge} className="nutrient-pill bg-amber-100 text-amber-700">
            🌿 {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

function OneHandSnackCard({ snack }: { snack: SnackCard }) {
  return (
    <div className="card flex gap-3 items-start">
      <div className="w-11 h-11 rounded-xl bg-warm-100 flex items-center justify-center text-xl shrink-0">
        {snack.icon}
      </div>
      <div>
        <p className="font-semibold text-warm-900 text-sm">{snack.name}</p>
        <p className="text-xs text-warm-500 mt-0.5 leading-relaxed">{snack.description}</p>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PostpartumPage() {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('normal')
  const [breastfeeding, setBreastfeeding] = useState(true)
  const [glasses, setGlasses] = useState(5)
  const [mood, setMood] = useState<Mood>(null)
  const [moodSaved, setMoodSaved] = useState(false)

  const calorieTarget = breastfeeding ? 2200 : 1800
  const ironPct = Math.min(100, Math.round((IRON_CURRENT / IRON_WEEKLY_TARGET) * 100))
  const hydrationPct = Math.min(100, Math.round((glasses / 12) * 100)) // 12 glasses ≈ 3L
  const meals = MEAL_SUGGESTIONS[deliveryType]

  const handleMood = (m: Mood) => {
    setMood(m)
    setMoodSaved(true)
  }

  const MOOD_OPTIONS: { key: Mood; emoji: string; label: string; color: string }[] = [
    { key: 'tired', emoji: '😴', label: 'Tired', color: 'border-blue-300 bg-blue-50 text-blue-700' },
    { key: 'good', emoji: '😊', label: 'Good', color: 'border-forest-500 bg-forest-50 text-forest-500' },
    { key: 'struggling', emoji: '😢', label: 'Struggling', color: 'border-rose-400 bg-rose-50 text-rose-600' },
  ]

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
            <h1 className="text-base font-bold text-warm-900">Postpartum Recovery</h1>
            <p className="text-xs text-warm-400">Posha 40-Day Guide</p>
          </div>
          <PhaseLabel day={MOCK_RECOVERY_DAY} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-24 space-y-5 pt-5">

        {/* Recovery Day Hero */}
        <div className="card bg-gradient-to-br from-rose-50 to-saffron-50 border-rose-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/80 border border-rose-200 flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-rose-500 leading-none">{MOCK_RECOVERY_DAY}</span>
              <span className="text-xs text-rose-400 font-medium">days</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-warm-900">Day {MOCK_RECOVERY_DAY} of Recovery</p>
              <p className="text-xs text-warm-500 mt-0.5">
                Delivery: {MOCK_DELIVERY_DATE.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-xs text-warm-400">Calorie target:</span>
                <span className="nutrient-pill bg-saffron-100 text-saffron-700 font-semibold">
                  {calorieTarget.toLocaleString()} kcal/day
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Type + Breastfeeding Toggles */}
        <div className="card space-y-4">
          {/* Delivery type */}
          <div>
            <p className="text-xs font-medium text-warm-600 mb-2">Delivery type</p>
            <div className="flex gap-2">
              {(['normal', 'csection'] as DeliveryType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setDeliveryType(type)}
                  className={`flex-1 py-3 rounded-xl font-medium text-sm border-2 transition-all ${
                    deliveryType === type
                      ? 'border-saffron-500 bg-saffron-50 text-saffron-700'
                      : 'border-warm-200 bg-white text-warm-600 hover:border-warm-300'
                  }`}
                >
                  {type === 'normal' ? '🌸 Normal' : '🏥 C-Section'}
                </button>
              ))}
            </div>
            {deliveryType === 'csection' && (
              <p className="text-xs text-warm-500 mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                C-Section meal plan: extra care on wound healing foods — collagen-rich, high zinc, easy-to-digest options prioritised.
              </p>
            )}
          </div>

          {/* Breastfeeding toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-warm-900">Breastfeeding</p>
              <p className="text-xs text-warm-400">{breastfeeding ? '+500 kcal/day added' : 'Standard calorie target'}</p>
            </div>
            <button
              onClick={() => setBreastfeeding(!breastfeeding)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                breastfeeding ? 'bg-forest-500' : 'bg-warm-300'
              }`}
              aria-label={`Breastfeeding ${breastfeeding ? 'on' : 'off'}`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  breastfeeding ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 40-Day Confinement Progress */}
        <section>
          <h2 className="section-title mb-3">40-Day Confinement Progress</h2>
          <div className="card">
            <ConfinementProgressBar day={MOCK_RECOVERY_DAY} />
          </div>
        </section>

        {/* Today's Meal Suggestions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">Today&apos;s Confinement Meals</h2>
            <span className="nutrient-pill bg-warm-100 text-warm-500">Day {MOCK_RECOVERY_DAY}</span>
          </div>
          <div className="space-y-3">
            {meals.map((meal) => (
              <MealSuggestionCard key={meal.name} meal={meal} />
            ))}
          </div>
        </section>

        {/* Lactation Boosters */}
        {breastfeeding && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="section-title">Lactation Booster Recipes</h2>
              <span className="nutrient-pill bg-amber-100 text-amber-700">Galactagogues</span>
            </div>
            <div className="space-y-3">
              {LACTATION_RECIPES.map((recipe) => (
                <LactationCard key={recipe.name} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Iron Recovery Tracker */}
        <section>
          <h2 className="section-title mb-3">Iron Recovery This Week</h2>
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-700 font-medium">Iron intake</span>
              <span className={`text-sm font-bold ${ironPct >= 80 ? 'text-forest-500' : 'text-saffron-600'}`}>
                {IRON_CURRENT} / {IRON_WEEKLY_TARGET} mg
              </span>
            </div>
            <div className="h-3 bg-warm-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  ironPct >= 80 ? 'bg-forest-500' : 'bg-saffron-500'
                }`}
                style={{ width: `${ironPct}%` }}
              />
            </div>
            <p className="text-xs text-warm-400">
              Target: 30 mg/day. Boost with moringa, methi ladoo, rajma, and vitamin C alongside iron foods.
            </p>
          </div>
        </section>

        {/* Hydration Tracker */}
        <section>
          <h2 className="section-title mb-3">Hydration Goal — 3L / Day</h2>
          <div className="card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-warm-700 font-medium">
                {glasses} of 12 glasses
              </span>
              <span className={`text-sm font-bold ${hydrationPct >= 80 ? 'text-forest-500' : 'text-blue-500'}`}>
                {Math.round(glasses * 250)} ml
              </span>
            </div>

            {/* Glass visualization */}
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGlasses(i + 1)}
                  className={`aspect-square rounded-lg text-lg transition-all ${
                    i < glasses
                      ? 'bg-blue-100 text-blue-500 border-2 border-blue-300'
                      : 'bg-warm-100 text-warm-300 border-2 border-warm-200'
                  }`}
                  aria-label={`${i + 1} glass${i === 0 ? '' : 'es'}`}
                >
                  💧
                </button>
              ))}
            </div>

            <button
              onClick={() => setGlasses((g) => Math.min(12, g + 1))}
              className="btn-primary w-full text-sm"
              disabled={glasses >= 12}
            >
              + Add a glass
            </button>

            {glasses >= 12 && (
              <p className="text-center text-xs text-forest-500 font-semibold">
                Hydration goal reached! Great job 💧
              </p>
            )}
          </div>
        </section>

        {/* One-Hand Snacks */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="section-title">One-Hand Snacks</h2>
            <span className="nutrient-pill bg-warm-100 text-warm-500 text-xs">Easy while nursing</span>
          </div>
          <div className="space-y-3">
            {ONE_HAND_SNACKS.map((snack) => (
              <OneHandSnackCard key={snack.name} snack={snack} />
            ))}
          </div>
        </section>

        {/* Mood Log */}
        <section>
          <h2 className="section-title mb-1">How are you feeling today?</h2>
          <p className="text-xs text-warm-400 mb-3">
            Postpartum wellness matters. Your mood is tracked privately.
          </p>
          <div className="flex gap-3">
            {MOOD_OPTIONS.map(({ key, emoji, label, color }) => (
              <button
                key={key}
                onClick={() => handleMood(key)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl border-2 transition-all ${
                  mood === key
                    ? color
                    : 'border-warm-200 bg-white text-warm-600 hover:border-warm-300'
                }`}
              >
                <span className="text-3xl leading-none">{emoji}</span>
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>

          {moodSaved && mood && (
            <div
              className={`mt-3 card text-center py-3 ${
                mood === 'struggling'
                  ? 'bg-rose-50 border-rose-300'
                  : mood === 'good'
                  ? 'bg-forest-50 border-forest-500'
                  : 'bg-blue-50 border-blue-300'
              }`}
            >
              {mood === 'struggling' ? (
                <>
                  <p className="text-sm font-semibold text-rose-600">You&apos;re not alone 💙</p>
                  <p className="text-xs text-rose-500 mt-0.5">
                    If you feel overwhelmed, please talk to a trusted person or contact iCall: 9152987821
                  </p>
                </>
              ) : mood === 'good' ? (
                <>
                  <p className="text-sm font-semibold text-forest-500">Wonderful! Keep nourishing yourself 🌿</p>
                  <p className="text-xs text-forest-500 opacity-70 mt-0.5">Logged for today</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-blue-700">Rest is part of recovery 😴</p>
                  <p className="text-xs text-blue-500 mt-0.5">
                    Try to nap when baby naps. Logged for today.
                  </p>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
