'use client'

import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'

const RECIPES = [
  // South India
  { id: '1',  name: 'Dal Tadka',                region: 'north',  mealType: 'lunch',     cookTime: 30, calories: 210, protein: 12,  tags: ['High-protein', 'Iron-rich'],            emoji: '🫕', dietaryTag: 'veg' },
  { id: '2',  name: 'Palak Paneer',             region: 'north',  mealType: 'lunch',     cookTime: 35, calories: 245, protein: 14.5, tags: ['Iron-rich', 'Calcium-rich'],            emoji: '🍃', dietaryTag: 'veg' },
  { id: '3',  name: 'Idli + Sambar',            region: 'south',  mealType: 'breakfast', cookTime: 20, calories: 290, protein: 12,  tags: ['Fermented', 'Gut-friendly'],            emoji: '🍚', dietaryTag: 'veg' },
  { id: '4',  name: 'Poha',                     region: 'west',   mealType: 'breakfast', cookTime: 15, calories: 250, protein: 5.5, tags: ['Iron-fortified', 'Light'],              emoji: '🌾', dietaryTag: 'veg' },
  { id: '5',  name: 'Methi Ladoo',             region: 'north',  mealType: 'snack',     cookTime: 45, calories: 280, protein: 6.5, tags: ['Galactagogue', 'Iron-rich'],            emoji: '🟡', dietaryTag: 'veg' },
  { id: '6',  name: 'Ragi Porridge',           region: 'south',  mealType: 'breakfast', cookTime: 15, calories: 210, protein: 6.5, tags: ['Calcium-rich', 'Millet'],               emoji: '🍲', dietaryTag: 'veg' },
  { id: '7',  name: 'Sattu Sharbat',           region: 'north',  mealType: 'drink',     cookTime:  5, calories: 165, protein: 8.5, tags: ['High-protein', 'Cooling'],              emoji: '🥤', dietaryTag: 'veg' },
  { id: '8',  name: 'Moringa Dal',             region: 'south',  mealType: 'lunch',     cookTime: 35, calories: 195, protein: 13,  tags: ['Folate-rich', 'Iron-rich'],             emoji: '🌿', dietaryTag: 'veg' },
  { id: '9',  name: 'Rajma Chawal',            region: 'north',  mealType: 'lunch',     cookTime: 50, calories: 420, protein: 18,  tags: ['High-fiber', 'Iron-rich', 'Complete meal'], emoji: '🫘', dietaryTag: 'veg' },
  { id: '10', name: 'Ven Pongal',              region: 'south',  mealType: 'breakfast', cookTime: 30, calories: 340, protein: 10,  tags: ['South Indian', 'Iron-rich', 'Gut-friendly'], emoji: '🍚', dietaryTag: 'veg' },
  { id: '11', name: 'Pesarattu',               region: 'south',  mealType: 'breakfast', cookTime: 25, calories: 310, protein: 13,  tags: ['High-protein', 'Andhra', 'Mung bean'],  emoji: '🫓', dietaryTag: 'veg' },
  { id: '12', name: 'Kerala Fish Curry',       region: 'south',  mealType: 'lunch',     cookTime: 40, calories: 280, protein: 24,  tags: ['Omega-3', 'DHA for baby', 'Kerala'],    emoji: '🐟', dietaryTag: 'non-veg' },
  { id: '13', name: 'Puttu + Kadala Curry',    region: 'south',  mealType: 'breakfast', cookTime: 30, calories: 360, protein: 13,  tags: ['Kerala', 'High-fiber', 'Iron-rich'],    emoji: '🌽', dietaryTag: 'veg' },
  { id: '14', name: 'Bisibelebath',            region: 'south',  mealType: 'lunch',     cookTime: 45, calories: 430, protein: 14,  tags: ['Karnataka', 'Complete meal', 'Iron-rich'], emoji: '🫕', dietaryTag: 'veg' },
  { id: '15', name: 'Akki Roti',              region: 'south',  mealType: 'breakfast', cookTime: 20, calories: 315, protein: 6,   tags: ['Karnataka', 'Rice flour', 'Gluten-free'], emoji: '🫓', dietaryTag: 'veg' },
  { id: '16', name: 'Ragi Dosa',              region: 'south',  mealType: 'breakfast', cookTime: 20, calories: 295, protein: 8,   tags: ['Calcium-rich', 'Millet', 'Gluten-free'], emoji: '🥞', dietaryTag: 'veg' },
  { id: '17', name: 'Gongura Mutton',         region: 'south',  mealType: 'lunch',     cookTime: 60, calories: 380, protein: 28,  tags: ['Andhra', 'High-protein', 'Iron-rich'],  emoji: '🥩', dietaryTag: 'non-veg' },
  { id: '18', name: 'Appam + Stew',           region: 'south',  mealType: 'dinner',    cookTime: 35, calories: 380, protein: 14,  tags: ['Kerala', 'Fermented', 'Coconut'],        emoji: '🥘', dietaryTag: 'veg' },
  { id: '19', name: 'Macher Jhol',            region: 'east',   mealType: 'lunch',     cookTime: 30, calories: 280, protein: 22,  tags: ['Bengali', 'Omega-3', 'Iron-rich'],       emoji: '🐟', dietaryTag: 'non-veg' },
  { id: '20', name: 'Upma',                   region: 'south',  mealType: 'breakfast', cookTime: 20, calories: 300, protein: 7,   tags: ['South Indian', 'Quick', 'Filling'],      emoji: '🥣', dietaryTag: 'veg' },
  { id: '21', name: 'Prawn Masala',           region: 'south',  mealType: 'lunch',     cookTime: 35, calories: 260, protein: 24,  tags: ['High-protein', 'Zinc-rich', 'Coastal'],  emoji: '🦐', dietaryTag: 'non-veg' },
  { id: '22', name: 'Besan Cheela',           region: 'north',  mealType: 'breakfast', cookTime: 20, calories: 280, protein: 13,  tags: ['High-protein', 'Quick', 'Veg'],          emoji: '🫓', dietaryTag: 'veg' },
  { id: '23', name: 'Chicken Stew + Appam',   region: 'south',  mealType: 'dinner',    cookTime: 45, calories: 490, protein: 28,  tags: ['Kerala', 'High-protein', 'Omega-3'],     emoji: '🍗', dietaryTag: 'non-veg' },
  { id: '24', name: 'Dalia Khichdi',          region: 'north',  mealType: 'dinner',    cookTime: 25, calories: 320, protein: 10,  tags: ['High-fiber', 'Wholesome', 'Iron-rich'],  emoji: '🥣', dietaryTag: 'veg' },
]

const REGIONS = ['all', 'north', 'south', 'east', 'west']
const MEAL_TYPES = ['all', 'breakfast', 'lunch', 'dinner', 'snack', 'drink']

const REGION_LABELS: Record<string, string> = {
  all: 'All regions',
  north: 'North India',
  south: 'South India',
  east: 'East India',
  west: 'West India',
}

export default function RecipesPage() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('all')
  const [mealType, setMealType] = useState('all')

  const filtered = RECIPES.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                        r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchRegion = region === 'all' || r.region === region
    const matchMeal   = mealType === 'all' || r.mealType === mealType
    return matchSearch && matchRegion && matchMeal
  })

  return (
    <AppShell activePage="recipes">
      <div className="px-4 md:px-8 pt-5 pb-4 border-b border-warm-100">
        <h1 className="text-xl font-bold text-warm-900 mb-4">Recipes</h1>

        {/* Search */}
        <div className="relative mb-3">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-400 pointer-events-none">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            className="input pl-10"
            placeholder="Search dal, dosa, roti, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Region filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-2 scrollbar-hide">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                region === r
                  ? 'bg-saffron-500 text-white'
                  : 'bg-white border border-warm-200 text-warm-600 hover:border-saffron-300'
              }`}
            >
              {REGION_LABELS[r]}
            </button>
          ))}
        </div>

        {/* Meal type filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {MEAL_TYPES.map((m) => (
            <button
              key={m}
              onClick={() => setMealType(m)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                mealType === m
                  ? 'bg-warm-800 text-white'
                  : 'bg-white border border-warm-200 text-warm-600 hover:border-warm-400'
              }`}
            >
              {m === 'all' ? 'All meals' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 py-4">
        <p className="text-sm text-warm-400 mb-4 font-medium">{filtered.length} recipes</p>

        {/* Recipe grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
          {filtered.map((recipe) => (
            <div key={recipe.id} className="card hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-warm-100 flex items-center justify-center text-2xl shrink-0">
                {recipe.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-warm-900 truncate">{recipe.name}</p>
                <p className="text-xs text-warm-400 mt-0.5 capitalize">
                  {REGION_LABELS[recipe.region] ?? recipe.region} · {recipe.cookTime} min
                </p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="nutrient-pill bg-forest-50 text-forest-500">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-warm-900">{recipe.calories}</p>
                <p className="text-xs text-warm-400">kcal</p>
                <p className="text-xs text-warm-400">P {recipe.protein}g</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-warm-400">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="font-semibold text-warm-700">No recipes found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
