'use client'

import React from 'react'

type IngredientCategory =
  | 'grain'
  | 'legume'
  | 'vegetable'
  | 'dairy'
  | 'fruit'
  | 'nut'
  | 'oil'
  | 'meat'

interface PortionDisplayProps {
  grams: number
  ingredientCategory: IngredientCategory
  preference: 'katori' | 'grams'
  showBoth?: boolean
}

/**
 * Standard gram-per-unit mappings for each ingredient category.
 * These are the "1 unit" reference weights used for conversion.
 */
const UNIT_GRAMS: Record<IngredientCategory, { amount: number; unit: string }> = {
  grain:     { amount: 150, unit: 'katori' },
  legume:    { amount: 150, unit: 'katori' },
  vegetable: { amount: 100, unit: 'katori' },
  dairy:     { amount: 150, unit: 'katori' },
  fruit:     { amount: 120, unit: 'piece' },
  nut:       { amount: 15,  unit: 'tbsp' },
  oil:       { amount: 5,   unit: 'tsp' },
  meat:      { amount: 150, unit: 'katori' },
}

/**
 * Round a quantity to the nearest half (0.5, 1, 1.5, 2 …).
 * Clamps to a minimum of 0.5.
 */
function roundToHalf(value: number): number {
  const rounded = Math.round(value * 2) / 2
  return Math.max(0.5, rounded)
}

/**
 * Format a quantity avoiding unnecessary ".0" (e.g. 1.0 → "1", 1.5 → "1.5").
 */
function formatQty(value: number): string {
  return value % 1 === 0 ? String(value) : value.toFixed(1)
}

function toKatoriLabel(grams: number, category: IngredientCategory): string {
  const { amount, unit } = UNIT_GRAMS[category]
  const raw = grams / amount
  const qty = roundToHalf(raw)
  return `${formatQty(qty)} ${unit}`
}

function toGramsLabel(grams: number): string {
  return `${grams}g`
}

export function PortionDisplay({
  grams,
  ingredientCategory,
  preference,
  showBoth = false,
}: PortionDisplayProps) {
  const katoriLabel = toKatoriLabel(grams, ingredientCategory)
  const gramsLabel = toGramsLabel(grams)

  let displayText: string

  if (showBoth) {
    // Always show both regardless of preference, leading with the preferred unit.
    displayText =
      preference === 'katori'
        ? `${katoriLabel} (${gramsLabel})`
        : `${gramsLabel} (${katoriLabel})`
  } else if (preference === 'grams') {
    displayText = gramsLabel
  } else {
    displayText = katoriLabel
  }

  return (
    <span
      className="inline-flex items-center gap-1 text-sm font-medium text-amber-800"
      aria-label={`Portion: ${displayText}`}
    >
      <svg
        className="w-3.5 h-3.5 text-amber-400 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M9 10V6a3 3 0 016 0v4M5 10l1 10h12l1-10"
        />
      </svg>
      {displayText}
    </span>
  )
}
