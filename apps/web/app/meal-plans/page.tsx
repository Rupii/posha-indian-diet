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
      name: 'Poha',
      region: 'West Indian',
      calories: 250,
      protein: 5.5,
      carbs: 48,
      fat: 4.5,
      serving: '1½ katori',
      tags: ['Iron-fortified', 'Light'],
    },
  },
  {
    id: '2',
    slotType: 'Morning snack',
    time: '11 am',
    emoji: '🌿',
    recipe: {
      name: 'Roasted Makhana',
      region: 'All India',
      calories: 100,
      protein: 3.2,
      carbs: 25,
      fat: 0.5,
      serving: '1 katori',
      tags: ['High-fiber', 'Low-fat'],
    },
  },
  {
    id: '3',
    slotType: 'Lunch',
    time: '1–2 pm',
    emoji: '☀️',
    recipe: {
      name: 'Dal Tadka + Jeera Rice',
      region: 'North Indian',
      calories: 450,
      protein: 16.5,
      carbs: 78,
      fat: 10,
      serving: '1½ katori dal + 1 katori rice',
      tags: ['High-protein', 'Iron-rich'],
    },
  },
  {
    id: '4',
    slotType: 'Chai snack',
    time: '4–5 pm',
    emoji: '🍵',
    recipe: {
      name: 'Sprouts Chaat',
      region: 'All India',
      calories: 120,
      protein: 7,
      carbs: 18,
      fat: 2,
      serving: '1 katori',
      tags: ['High-protein', 'Raw', 'Cooling'],
    },
  },
  {
    id: '5',
    slotType: 'Dinner',
    time: '8–9 pm',
    emoji: '🌙',
    recipe: {
      name: 'Palak Paneer + 2 Roti',
      region: 'North Indian',
      calories: 380,
      protein: 18,
      carbs: 38,
      fat: 18,
      serving: '1 katori sabzi + 2 roti',
      tags: ['Iron-rich', 'Calcium-rich'],
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
              { label: 'Calories', value: '1300', unit: 'kcal', color: 'text-saffron-600' },
              { label: 'Protein', value: '50', unit: 'g', color: 'text-forest-500' },
              { label: 'Carbs', value: '207', unit: 'g', color: 'text-orange-500' },
              { label: 'Fat', value: '35', unit: 'g', color: 'text-amber-500' },
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
    { name: 'Upma', serving: '1½ katori', calories: 240, protein: 6, tags: ['Veg', 'Light'] },
    { name: 'Besan Cheela', serving: '2 pieces', calories: 260, protein: 10, tags: ['High-protein', 'Veg'] },
    { name: 'Oats Khichdi', serving: '1 katori', calories: 245, protein: 7, tags: ['High-fiber', 'Veg'] },
  ]

  const sameType = [
    { name: 'Masala Dosa', serving: '1 dosa + chutney', calories: 285, protein: 8, tags: ['South Indian'] },
    { name: 'Idli + Sambar', serving: '2 idli + ½ katori sambar', calories: 290, protein: 12, tags: ['Fermented', 'Veg'] },
    { name: 'Ragi Porridge', serving: '1 katori', calories: 210, protein: 6.5, tags: ['Millet', 'Calcium-rich'] },
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
