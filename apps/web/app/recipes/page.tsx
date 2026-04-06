'use client'

import { useState } from 'react'
import Link from 'next/link'

const RECIPES = [
  { id: '1', name: 'Dal Tadka', region: 'north', mealType: 'lunch', cookTime: 30, calories: 210, protein: 12, tags: ['High-protein', 'Iron-rich'], emoji: '🫕', budget: 'budget', dietaryTag: 'veg' },
  { id: '2', name: 'Palak Paneer', region: 'north', mealType: 'lunch', cookTime: 35, calories: 245, protein: 14.5, tags: ['Iron-rich', 'Calcium-rich'], emoji: '🍃', budget: 'moderate', dietaryTag: 'veg' },
  { id: '3', name: 'Idli + Sambar', region: 'south', mealType: 'breakfast', cookTime: 20, calories: 290, protein: 12, tags: ['Fermented', 'Gut-friendly'], emoji: '🍚', budget: 'budget', dietaryTag: 'veg' },
  { id: '4', name: 'Poha', region: 'west', mealType: 'breakfast', cookTime: 15, calories: 250, protein: 5.5, tags: ['Iron-fortified', 'Light'], emoji: '🌾', budget: 'budget', dietaryTag: 'veg' },
  { id: '5', name: 'Methi Ladoo', region: 'north', mealType: 'snack', cookTime: 45, calories: 280, protein: 6.5, tags: ['Galactagogue', 'Iron-rich'], emoji: '🟡', budget: 'moderate', dietaryTag: 'veg' },
  { id: '6', name: 'Ragi Porridge', region: 'south', mealType: 'breakfast', cookTime: 15, calories: 210, protein: 6.5, tags: ['Calcium-rich', 'Millet'], emoji: '🍲', budget: 'budget', dietaryTag: 'veg' },
  { id: '7', name: 'Sattu Sharbat', region: 'north', mealType: 'drink', cookTime: 5, calories: 165, protein: 8.5, tags: ['High-protein', 'Cooling'], emoji: '🥤', budget: 'budget', dietaryTag: 'veg' },
  { id: '8', name: 'Moringa Dal', region: 'south', mealType: 'lunch', cookTime: 35, calories: 195, protein: 13, tags: ['Folate-rich', 'Iron-rich'], emoji: '🌿', budget: 'budget', dietaryTag: 'veg' },
  { id: '9', name: 'Rajma', region: 'north', mealType: 'lunch', cookTime: 50, calories: 220, protein: 13.5, tags: ['High-fiber', 'Iron-rich'], emoji: '🫘', budget: 'budget', dietaryTag: 'veg' },
]

const REGIONS = ['all', 'north', 'south', 'east', 'west']
const MEAL_TYPES = ['all', 'breakfast', 'lunch', 'snack', 'dinner', 'drink']

export default function RecipesPage() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('all')
  const [mealType, setMealType] = useState('all')

  const filtered = RECIPES.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchRegion = region === 'all' || r.region === region
    const matchMeal = mealType === 'all' || r.mealType === mealType
    return matchSearch && matchRegion && matchMeal
  })

  return (
    <div className="min-h-screen bg-warm-50">
      <nav className="bg-white border-b border-warm-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/dashboard" className="text-warm-400 hover:text-warm-700">←</Link>
        <h1 className="font-bold text-warm-900 flex-1">Recipes</h1>
      </nav>

      <main className="max-w-2xl mx-auto px-4 pb-24 pt-4">
        {/* Search */}
        <input
          className="input mb-4"
          placeholder="Search dal, dosa, roti..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Region filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-3 scrollbar-none">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                region === r
                  ? 'bg-saffron-500 text-white'
                  : 'bg-white border border-warm-200 text-warm-600'
              }`}
            >
              {r === 'all' ? 'All regions' : `${r.charAt(0).toUpperCase() + r.slice(1)} India`}
            </button>
          ))}
        </div>

        {/* Meal type filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {MEAL_TYPES.map((m) => (
            <button
              key={m}
              onClick={() => setMealType(m)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                mealType === m
                  ? 'bg-warm-800 text-white'
                  : 'bg-white border border-warm-200 text-warm-600'
              }`}
            >
              {m === 'all' ? 'All meals' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-warm-400 mb-3">{filtered.length} recipes</p>

        {/* Grid */}
        <div className="space-y-3">
          {filtered.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div className="card hover:shadow-md transition-shadow flex items-center gap-4">
                <span className="text-4xl">{recipe.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-warm-900">{recipe.name}</p>
                  <p className="text-sm text-warm-400">{recipe.region} · {recipe.cookTime} min · {recipe.mealType}</p>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="nutrient-pill bg-forest-50 text-forest-500">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-warm-900">{recipe.calories}</p>
                  <p className="text-xs text-warm-400">kcal</p>
                  <p className="text-xs text-warm-400">P {recipe.protein}g</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-warm-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">No recipes found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}
      </main>
    </div>
  )
}
