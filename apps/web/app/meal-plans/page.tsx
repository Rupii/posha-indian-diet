'use client'

import { useState } from 'react'
import Link from 'next/link'

const SLOTS = [
  {
    id: '1',
    slotType: 'Breakfast',
    time: '8–9 am',
    emoji: '🌅',
    recipe: {
      name: 'Methi Thepla + Dahi',
      region: 'Gujarati',
      calories: 320,
      protein: 10,
      carbs: 42,
      fat: 11,
      serving: '2 thepla + ½ katori dahi',
      tags: ['Iron-rich', 'Calcium-rich', 'Folate'],
    },
  },
  {
    id: '2',
    slotType: 'Morning snack',
    time: '11 am',
    emoji: '🌿',
    recipe: {
      name: 'Roasted Makhana + Warm Milk',
      region: 'All India',
      calories: 160,
      protein: 6.5,
      carbs: 28,
      fat: 3,
      serving: '1 katori makhana + 1 glass milk',
      tags: ['Calcium-rich', 'High-fiber', 'Bone health'],
    },
  },
  {
    id: '3',
    slotType: 'Lunch',
    time: '1–2 pm',
    emoji: '☀️',
    recipe: {
      name: 'Surmai Fish Curry + Rice + Kachumber Salad',
      region: 'Coastal Indian',
      calories: 520,
      protein: 28,
      carbs: 55,
      fat: 14,
      serving: '1 medium piece fish curry + 1 katori rice + salad',
      tags: ['High-protein', 'Omega-3', 'Iron-rich', 'DHA for baby'],
    },
  },
  {
    id: '4',
    slotType: 'Chai snack',
    time: '4–5 pm',
    emoji: '🍵',
    recipe: {
      name: 'Dates, Walnuts + Doodh',
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
    emoji: '🌙',
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

export default function MealPlansPage() {
  const [swapOpen, setSwapOpen] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-warm-50">
      <nav className="bg-white border-b border-warm-200 px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="text-warm-400 hover:text-warm-700">←</Link>
        <h1 className="font-bold text-warm-900">Today&apos;s Meal Plan</h1>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pb-24 pt-4">
        {/* Daily totals */}
        <div className="card mb-5">
          <p className="text-xs text-warm-400 mb-3">Daily totals</p>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: 'Calories', value: '1620', unit: 'kcal', color: 'text-saffron-600' },
              { label: 'Protein', value: '67', unit: 'g', color: 'text-forest-500' },
              { label: 'Carbs', value: '213', unit: 'g', color: 'text-orange-500' },
              { label: 'Fat', value: '45', unit: 'g', color: 'text-amber-500' },
            ].map((m) => (
              <div key={m.label}>
                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                <p className="text-xs text-warm-400">{m.unit}</p>
                <p className="text-xs text-warm-500 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meal slots */}
        <div className="space-y-3">
          {SLOTS.map((slot) => (
            <div key={slot.id} className="card">
              <div className="flex items-center gap-2 mb-3">
                <span>{slot.emoji}</span>
                <span className="font-semibold text-warm-900">{slot.slotType}</span>
                <span className="text-warm-400 text-sm">· {slot.time}</span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-medium text-warm-900">{slot.recipe.name}</p>
                  <p className="text-sm text-warm-400">{slot.recipe.serving}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {slot.recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="nutrient-pill bg-forest-50 text-forest-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-warm-900">{slot.recipe.calories}</p>
                  <p className="text-xs text-warm-400">kcal</p>
                </div>
              </div>

              <div className="flex gap-3 mt-3 pt-3 border-t border-warm-100 text-xs text-warm-400">
                <span>P {slot.recipe.protein}g</span>
                <span>C {slot.recipe.carbs}g</span>
                <span>F {slot.recipe.fat}g</span>
                <div className="flex-1" />
                <button
                  onClick={() => setSwapOpen(slot.id)}
                  className="text-saffron-600 font-medium hover:text-saffron-700"
                >
                  Don&apos;t want this? →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Swap modal */}
      {swapOpen && (
        <MealSwapModal
          slotId={swapOpen}
          currentRecipe={SLOTS.find((s) => s.id === swapOpen)?.recipe.name ?? ''}
          onClose={() => setSwapOpen(null)}
        />
      )}
    </div>
  )
}

function MealSwapModal({
  currentRecipe,
  onClose,
}: {
  slotId: string
  currentRecipe: string
  onClose: () => void
}) {
  const [tab, setTab] = useState<'nutrition' | 'type'>('nutrition')

  const similarNutrition = [
    { name: 'Moong Dal Cheela + Dahi', serving: '2 cheela + ½ katori dahi', calories: 310, protein: 14, tags: ['High-protein', 'Calcium-rich'] },
    { name: 'Ragi Dosa + Coconut Chutney', serving: '2 dosa + chutney', calories: 290, protein: 8, tags: ['Calcium-rich', 'Millet', 'South Indian'] },
    { name: 'Sabudana Khichdi + Peanuts', serving: '1½ katori', calories: 330, protein: 8, tags: ['Iron-rich', 'Energy-dense'] },
  ]

  const sameType = [
    { name: 'Besan Cheela + Pudina Chutney', serving: '2 cheela + chutney', calories: 270, protein: 12, tags: ['High-protein', 'Veg'] },
    { name: 'Idli + Sambar + Coconut Chutney', serving: '3 idli + ½ katori sambar', calories: 305, protein: 11, tags: ['Fermented', 'Gut-friendly', 'South Indian'] },
    { name: 'Chicken Keema Paratha', serving: '1 paratha', calories: 340, protein: 18, tags: ['High-protein', 'Non-veg', 'Iron-rich'] },
  ]

  const options = tab === 'nutrition' ? similarNutrition : sameType

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50" onClick={onClose}>
      <div
        className="bg-white w-full rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-warm-200 rounded-full mx-auto mb-4" />
        <h2 className="font-bold text-warm-900 mb-1">Swap: {currentRecipe}</h2>
        <p className="text-sm text-warm-400 mb-4">Pick from 3 alternatives</p>

        {/* Tabs */}
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
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={onClose}
              className="w-full card hover:border-saffron-400 border border-warm-200 text-left transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-warm-900">{opt.name}</p>
                  <p className="text-sm text-warm-400">{opt.serving}</p>
                  <div className="flex gap-1.5 mt-1.5">
                    {opt.tags.map((t) => (
                      <span key={t} className="nutrient-pill bg-saffron-50 text-saffron-700">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-warm-900">{opt.calories}</p>
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
