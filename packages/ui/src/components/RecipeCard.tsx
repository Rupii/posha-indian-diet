'use client'

import React from 'react'

interface RecipeCardProps {
  recipe: {
    id: string
    name: string
    region: string
    mealType: string
    cookTimeMinutes: number
    calories: number
    protein: number
    servingGrams: number
    servingKatori: number
    healthTags: string[]
    emoji?: string
  }
  unitPreference: 'katori' | 'grams'
  onSwap?: () => void
  onAdd?: () => void
  compact?: boolean
}

export function RecipeCard({
  recipe,
  unitPreference,
  onSwap,
  onAdd,
  compact = false,
}: RecipeCardProps) {
  const servingLabel =
    unitPreference === 'grams'
      ? `${recipe.servingGrams}g`
      : `${recipe.servingKatori} katori`

  return (
    <div
      className={`
        bg-white border border-amber-100 rounded-2xl shadow-sm
        ${compact ? 'p-3' : 'p-4'}
        hover:shadow-md transition-shadow duration-200
      `}
    >
      {/* Header row: emoji + name + region badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          {recipe.emoji && (
            <span className={`${compact ? 'text-xl' : 'text-2xl'} flex-shrink-0`} aria-hidden="true">
              {recipe.emoji}
            </span>
          )}
          <h3
            className={`font-semibold text-amber-900 truncate ${
              compact ? 'text-sm' : 'text-base'
            }`}
          >
            {recipe.name}
          </h3>
        </div>

        <span className="flex-shrink-0 inline-block bg-saffron-50 border border-amber-200 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap bg-amber-50">
          {recipe.region}
        </span>
      </div>

      {/* Meal type + cook time + serving */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-amber-700 mb-3">
        <span className="capitalize">{recipe.mealType}</span>
        <span className="text-amber-300">·</span>
        <span className="flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {recipe.cookTimeMinutes} min
        </span>
        <span className="text-amber-300">·</span>
        <span>{servingLabel}</span>
      </div>

      {/* Macro summary */}
      <div className="flex items-center gap-4 mb-3">
        <div className="text-center">
          <p className={`font-bold text-amber-800 ${compact ? 'text-sm' : 'text-base'}`}>
            {recipe.calories}
          </p>
          <p className="text-xs text-amber-500">kcal</p>
        </div>
        <div className="text-center">
          <p className={`font-bold text-green-700 ${compact ? 'text-sm' : 'text-base'}`}>
            {recipe.protein}g
          </p>
          <p className="text-xs text-amber-500">protein</p>
        </div>
      </div>

      {/* Health tag pills */}
      {recipe.healthTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.healthTags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-orange-50 border border-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full capitalize"
            >
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {(onSwap || onAdd) && (
        <div className="flex gap-2 mt-1">
          {onSwap && (
            <button
              onClick={onSwap}
              className="flex-1 py-1.5 px-3 text-xs font-medium rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 active:bg-amber-100 transition-colors duration-150"
            >
              Swap
            </button>
          )}
          {onAdd && (
            <button
              onClick={onAdd}
              className="flex-1 py-1.5 px-3 text-xs font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 transition-colors duration-150"
            >
              + Add
            </button>
          )}
        </div>
      )}
    </div>
  )
}
