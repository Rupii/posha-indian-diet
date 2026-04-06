import { UnitPreference } from './types'

// Standard katori equivalents in grams by ingredient category
// 1 katori = ~150ml volume; gram equivalent varies by density
const KATORI_GRAM_MAP: Record<string, number> = {
  grain: 150,           // cooked rice, cooked dal
  legume: 80,           // raw dal/beans; cooked ~150g
  'legume-cooked': 150,
  vegetable: 100,
  dairy: 150,           // milk, curd, lassi
  fruit: 120,
  nut: 30,
  oil: 5,               // per tsp not katori
  spice: 5,             // per tsp
  meat: 100,
  superfood: 30,
  default: 150,
}

// Unit labels by category
const UNIT_LABELS: Record<string, { unit: string; divisor: number }> = {
  grain: { unit: 'katori', divisor: 150 },
  legume: { unit: 'katori', divisor: 150 },
  vegetable: { unit: 'katori', divisor: 100 },
  dairy: { unit: 'katori', divisor: 150 },
  fruit: { unit: 'piece', divisor: 120 },
  nut: { unit: 'tbsp', divisor: 15 },
  oil: { unit: 'tsp', divisor: 5 },
  spice: { unit: 'tsp', divisor: 5 },
  meat: { unit: 'katori', divisor: 100 },
  superfood: { unit: 'katori', divisor: 30 },
  default: { unit: 'katori', divisor: 150 },
}

export function gramsToKatori(
  grams: number,
  ingredientCategory: string,
): { value: number; unit: string } {
  const map = UNIT_LABELS[ingredientCategory] ?? UNIT_LABELS.default
  const value = Math.round((grams / map.divisor) * 10) / 10 // 1 decimal place
  return { value, unit: map.unit }
}

export function katoriToGrams(
  amount: number,
  unit: string,
  ingredientCategory: string,
): number {
  const map = UNIT_LABELS[ingredientCategory] ?? UNIT_LABELS.default
  return Math.round(amount * map.divisor)
}

// Always requires preference — never picks a unit silently
export function formatPortion(
  grams: number,
  category: string,
  preference: UnitPreference,
): string {
  if (preference === 'grams') {
    return `${Math.round(grams)}g`
  }

  const { value, unit } = gramsToKatori(grams, category)

  // Round to readable fractions: 0.5, 1, 1.5, 2...
  const rounded = Math.round(value * 2) / 2

  if (rounded === 0.5) return `½ ${unit}`
  if (rounded === 1.5) return `1½ ${unit}`
  if (rounded === 2.5) return `2½ ${unit}`
  return `${rounded} ${unit}`
}

// Display format that shows both: "1 katori (150g)"
export function formatPortionWithGrams(
  grams: number,
  category: string,
  preference: UnitPreference,
): string {
  if (preference === 'grams') {
    return `${Math.round(grams)}g`
  }
  const katori = formatPortion(grams, category, 'katori')
  return `${katori} (${Math.round(grams)}g)`
}
