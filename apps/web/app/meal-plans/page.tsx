'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'

// ── Pregnancy safety check ────────────────────────────────────────────────────
// These are foods commonly served in Indian meal plans that require a warning
// when the user is pregnant.
const PREGNANCY_UNSAFE: { keywords: string[]; reason: string; safe: string }[] = [
  {
    keywords: ['surmai', 'king mackerel', 'swordfish', 'shark'],
    reason: 'High-mercury fish — mercury accumulates in the fetal nervous system and can cause developmental damage.',
    safe: 'Swap to Rohu, Catla, Pomfret, or sardines — low-mercury, high Omega-3.',
  },
  {
    keywords: ['raw papaya', 'kachcha papaya', 'green papaya'],
    reason: 'Contains papain and latex compounds that may trigger uterine contractions.',
    safe: 'Use ripe papaya in small amounts (T2/T3 only).',
  },
  {
    keywords: ['raw sprouts', 'uncooked sprouts'],
    reason: 'High risk of Listeria and Salmonella contamination.',
    safe: 'Always lightly cook or sauté sprouts before eating.',
  },
  {
    keywords: ['desi paneer', 'raw paneer', 'unpasteurised'],
    reason: 'Raw-milk paneer may carry Listeria bacteria — especially risky in T1.',
    safe: 'Use packaged, pasteurised paneer from reputable brands.',
  },
]

function pregnancySafetyWarning(recipeName: string): { reason: string; safe: string } | null {
  const lower = recipeName.toLowerCase()
  for (const item of PREGNANCY_UNSAFE) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return { reason: item.reason, safe: item.safe }
    }
  }
  return null
}

const SLOTS = [
  {
    id: '1',
    slotType: 'Breakfast',
    time: '8–9 am',
    recipe: {
      name: 'Ven Pongal + Coconut Chutney + Filter Kaapi',
      region: 'Tamil Nadu',
      calories: 340,
      protein: 10,
      carbs: 52,
      fat: 10,
      serving: '1 katori pongal + 2 tbsp chutney + 1 small kaapi',
      tags: ['Iron-rich', 'Gut-friendly', 'South Indian'],
    },
  },
  {
    id: '2',
    slotType: 'Morning snack',
    time: '11 am',
    recipe: {
      name: 'Roasted Makhana + Turmeric Milk',
      region: 'All India',
      calories: 165,
      protein: 7,
      carbs: 29,
      fat: 3,
      serving: '1 katori makhana + 1 glass golden milk',
      tags: ['Calcium-rich', 'Anti-inflammatory', 'Bone health'],
    },
  },
  {
    id: '3',
    slotType: 'Lunch',
    time: '1–2 pm',
    recipe: {
      name: 'Surmai Fish Curry + Red Rice + Kachumber',
      region: 'Coastal Konkan',
      calories: 530,
      protein: 30,
      carbs: 55,
      fat: 14,
      serving: '1 medium piece curry + 1 katori rice + salad',
      tags: ['High-protein', 'Omega-3', 'DHA for baby', 'Iron-rich'],
    },
  },
  {
    id: '4',
    slotType: 'Chai snack',
    time: '4–5 pm',
    recipe: {
      name: 'Dates, Walnuts + Warm Doodh',
      region: 'All India',
      calories: 180,
      protein: 5.5,
      carbs: 26,
      fat: 7,
      serving: '3 dates + 4 walnut halves + 1 glass milk',
      tags: ['Iron-rich', 'Calcium-rich', 'Brain health'],
    },
  },
  {
    id: '5',
    slotType: 'Dinner',
    time: '8–9 pm',
    recipe: {
      name: 'Palak Dal + 2 Phulka + Gajar Sabzi',
      region: 'North Indian',
      calories: 440,
      protein: 17,
      carbs: 62,
      fat: 10,
      serving: '1½ katori dal + 2 phulka + ½ katori sabzi',
      tags: ['Iron-rich', 'Folate', 'High-fiber', 'Vitamin A'],
    },
  },
]

// Swap alternatives for each slot
const SWAP_DATA: Record<string, { name: string; serving: string; calories: number; protein: number; tags: string[] }[]> = {
  '1': [
    { name: 'Idli (3) + Sambar + Coconut Chutney', serving: '3 idli + ½ katori sambar', calories: 285, protein: 11, tags: ['Fermented', 'Gut-friendly', 'South Indian'] },
    { name: 'Pesarattu + Ginger Chutney', serving: '2 dosas + chutney', calories: 310, protein: 13, tags: ['High-protein', 'Mung bean', 'Andhra'] },
    { name: 'Ragi Dosa + Tomato Chutney', serving: '2 dosas + chutney', calories: 295, protein: 8, tags: ['Calcium-rich', 'Millet', 'Gluten-free'] },
  ],
  '3': [
    { name: 'Kerala Fish Curry + Red Rice + Olan', serving: '1 piece curry + 1 katori rice', calories: 520, protein: 27, tags: ['Omega-3', 'DHA', 'Kerala'] },
    { name: 'Gongura Prawns + Steamed Rice', serving: '6-8 prawns + 1 katori rice', calories: 490, protein: 28, tags: ['High-protein', 'Andhra style', 'Zinc-rich'] },
    { name: 'Rajma Chawal + Cucumber Raita', serving: '1 katori rajma + 1 katori rice', calories: 540, protein: 18, tags: ['High-protein', 'Iron-rich', 'North Indian'] },
  ],
  '5': [
    { name: 'Bisibelebath + Papadam', serving: '1½ katori + 1 papadam', calories: 430, protein: 14, tags: ['Complete meal', 'Karnataka', 'Iron-rich'] },
    { name: 'Moringa Dal + 2 Phulka + Beetroot sabzi', serving: '1½ katori dal + 2 roti', calories: 415, protein: 16, tags: ['Folate-rich', 'Iron-rich', 'South Indian'] },
    { name: 'Chicken Curry + 2 Roti + Salad', serving: '1 piece curry + 2 roti', calories: 480, protein: 26, tags: ['High-protein', 'Iron-rich', 'Non-veg'] },
  ],
}

export default function MealPlansPage() {
  const [swapOpen, setSwapOpen] = useState<string | null>(null)
  const [isPregnant, setIsPregnant] = useState(false)
  const [profileSet, setProfileSet] = useState(true) // assume true until checked

  useEffect(() => {
    const raw = localStorage.getItem('poshaProfile')
    if (!raw) {
      setProfileSet(false)
      return
    }
    try {
      const profile = JSON.parse(raw)
      setIsPregnant(profile.segment === 'pregnant')
    } catch { /* ignore */ }
  }, [])

  return (
    <AppShell activePage="meals">
      <div className="px-4 md:px-8 pt-5 pb-2 flex items-center gap-3 border-b border-warm-100">
        <Link href="/dashboard" className="text-warm-400 hover:text-warm-700 text-lg leading-none">←</Link>
        <h1 className="font-bold text-warm-900 text-lg">Today&apos;s Meal Plan</h1>
      </div>

      <div className="px-4 md:px-8 py-5">

        {/* No profile banner */}
        {!profileSet && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-5 flex gap-3 items-start">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-amber-600 shrink-0 mt-0.5">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Your profile isn&apos;t set up yet</p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                We&apos;re showing a general meal plan. If you&apos;re pregnant or have dietary needs, some of these suggestions
                may not be safe for you.
              </p>
              <Link href="/onboarding" className="inline-block mt-2 text-xs font-semibold text-amber-700 underline underline-offset-2">
                Set up your profile →
              </Link>
            </div>
          </div>
        )}

        {/* Daily totals */}
        <div className="card mb-5">
          <p className="text-xs font-medium text-warm-400 uppercase tracking-wide mb-3">Daily totals</p>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: 'Calories', value: '1,655', unit: 'kcal', color: 'text-saffron-600' },
              { label: 'Protein',  value: '70',    unit: 'g',    color: 'text-forest-500' },
              { label: 'Carbs',    value: '224',   unit: 'g',    color: 'text-orange-500' },
              { label: 'Fat',      value: '44',    unit: 'g',    color: 'text-amber-500' },
            ].map((m) => (
              <div key={m.label}>
                <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-warm-400">{m.unit}</p>
                <p className="text-xs text-warm-500 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meal slots */}
        <div className="space-y-3 max-w-3xl">
          {SLOTS.map((slot) => {
            const safetyWarn = (isPregnant || !profileSet)
              ? pregnancySafetyWarning(slot.recipe.name)
              : null

            return (
            <div key={slot.id} className={`card ${safetyWarn ? 'border-rose-200' : ''}`}>
              <div className="flex items-center gap-2 mb-3">
                <SlotIcon slotType={slot.slotType} />
                <span className="font-semibold text-warm-900">{slot.slotType}</span>
                <span className="text-warm-400 text-sm">· {slot.time}</span>
                <span className="ml-auto text-xs text-warm-400 bg-warm-100 rounded-full px-2 py-0.5">{slot.recipe.region}</span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-warm-900">{slot.recipe.name}</p>
                  <p className="text-sm text-warm-400 mt-0.5">{slot.recipe.serving}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {slot.recipe.tags.map((tag) => (
                      <span key={tag} className="nutrient-pill bg-forest-50 text-forest-500">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-warm-900">{slot.recipe.calories}</p>
                  <p className="text-xs text-warm-400">kcal</p>
                </div>
              </div>

              {/* Pregnancy safety warning */}
              {safetyWarn && (
                <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3 flex gap-2.5">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-rose-500 shrink-0 mt-0.5">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-rose-700">
                      {isPregnant ? 'Not recommended during pregnancy' : 'Check if pregnant: safety flag'}
                    </p>
                    <p className="text-xs text-rose-600 mt-0.5 leading-relaxed">{safetyWarn.reason}</p>
                    <p className="text-xs text-forest-600 font-medium mt-1">Safe swap: {safetyWarn.safe}</p>
                  </div>
                  {SWAP_DATA[slot.id] && (
                    <button
                      onClick={() => setSwapOpen(slot.id)}
                      className="shrink-0 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-100 rounded-lg px-2.5 py-1 transition-colors"
                    >
                      Swap
                    </button>
                  )}
                </div>
              )}

              <div className="flex gap-4 mt-3 pt-3 border-t border-warm-100 text-xs text-warm-400">
                <span>P <span className="font-semibold text-warm-600">{slot.recipe.protein}g</span></span>
                <span>C <span className="font-semibold text-warm-600">{slot.recipe.carbs}g</span></span>
                <span>F <span className="font-semibold text-warm-600">{slot.recipe.fat}g</span></span>
                <div className="flex-1" />
                {SWAP_DATA[slot.id] && !safetyWarn && (
                  <button
                    onClick={() => setSwapOpen(slot.id)}
                    className="text-saffron-600 font-semibold hover:text-saffron-700 transition-colors"
                  >
                    Don&apos;t want this? →
                  </button>
                )}
              </div>
            </div>
            )
          })}
        </div>
      </div>

      {/* Swap modal */}
      {swapOpen && (
        <MealSwapModal
          slotId={swapOpen}
          currentRecipe={SLOTS.find((s) => s.id === swapOpen)?.recipe.name ?? ''}
          swapOptions={SWAP_DATA[swapOpen] ?? []}
          onClose={() => setSwapOpen(null)}
        />
      )}
    </AppShell>
  )
}

function SlotIcon({ slotType }: { slotType: string }) {
  const map: Record<string, string> = {
    Breakfast: 'text-amber-500',
    'Morning snack': 'text-green-600',
    Lunch: 'text-orange-500',
    'Chai snack': 'text-amber-700',
    Dinner: 'text-indigo-500',
  }
  const icons: Record<string, React.ReactNode> = {
    Breakfast: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
    'Morning snack': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    Lunch: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    'Chai snack': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    Dinner: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    ),
  }
  return (
    <span className={map[slotType] ?? 'text-warm-400'}>
      {icons[slotType]}
    </span>
  )
}

function MealSwapModal({
  currentRecipe,
  swapOptions,
  onClose,
}: {
  slotId: string
  currentRecipe: string
  swapOptions: { name: string; serving: string; calories: number; protein: number; tags: string[] }[]
  onClose: () => void
}) {
  const [tab, setTab] = useState<'nutrition' | 'type'>('nutrition')

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-5 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-warm-200 rounded-full mx-auto mb-4 md:hidden" />
        <h2 className="font-bold text-warm-900 mb-1">Swap: {currentRecipe.slice(0, 40)}{currentRecipe.length > 40 ? '…' : ''}</h2>
        <p className="text-sm text-warm-400 mb-4">3 alternatives — pick what works</p>

        <div className="flex bg-warm-100 rounded-xl p-1 mb-4">
          <button
            onClick={() => setTab('nutrition')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === 'nutrition' ? 'bg-white text-warm-900 shadow-sm' : 'text-warm-500'
            }`}
          >
            Similar Nutrition
          </button>
          <button
            onClick={() => setTab('type')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              tab === 'type' ? 'bg-white text-warm-900 shadow-sm' : 'text-warm-500'
            }`}
          >
            Same Meal Type
          </button>
        </div>

        <div className="space-y-3">
          {swapOptions.map((opt) => (
            <button
              key={opt.name}
              onClick={onClose}
              className="w-full card hover:border-saffron-400 border border-warm-200 text-left transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-warm-900">{opt.name}</p>
                  <p className="text-sm text-warm-400 mt-0.5">{opt.serving}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {opt.tags.map((t) => (
                      <span key={t} className="nutrient-pill bg-saffron-50 text-saffron-700">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-warm-900">{opt.calories}</p>
                  <p className="text-xs text-warm-400">kcal</p>
                  <p className="text-xs text-warm-400 mt-0.5">P {opt.protein}g</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
