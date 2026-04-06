import { FoodLog, DailyTargets, Nutrition, NutrientGapReport } from './types'

const NUTRITION_KEYS: Array<keyof Nutrition> = [
  'calories',
  'protein',
  'carbs',
  'fat',
  'fiber',
  'iron',
  'calcium',
  'folate',
]

/**
 * Calculate the average daily nutrition across a slice of food logs.
 * Logs are expected to already be filtered to the desired window (e.g. last 7 days).
 * If logs span multiple days, the daily average is computed by dividing total
 * intake by the number of unique calendar days represented.
 */
function averageDailyNutrition(logs: FoodLog[]): Nutrition {
  if (logs.length === 0) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      iron: 0,
      calcium: 0,
      folate: 0,
    }
  }

  // Sum totals across all logs
  const totals: Nutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    iron: 0,
    calcium: 0,
    folate: 0,
  }

  for (const log of logs) {
    for (const key of NUTRITION_KEYS) {
      totals[key] += log.nutrition[key]
    }
  }

  // Count unique calendar days
  const uniqueDays = new Set(
    logs.map((log) => {
      const d = new Date(log.loggedAt)
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }),
  ).size

  const days = Math.max(uniqueDays, 1)
  const averages: Nutrition = { ...totals }

  for (const key of NUTRITION_KEYS) {
    averages[key] = totals[key] / days
  }

  return averages
}

/**
 * Analyse the last 7 days of food logs against daily targets.
 *
 * Scoring:
 *  - A nutrient is "within range" if actual is between 80 % and 120 % of target.
 *  - score = (nutrients within range / total nutrients tracked) * 100
 *
 * Returns deficient nutrients (actual < 80 % of target),
 * excess nutrients (actual > 120 % of target),
 * the computed weekly averages, and the overall adherence score.
 */
export function analyzeWeeklyGaps(
  logs: FoodLog[],
  targets: DailyTargets,
): NutrientGapReport {
  const weeklyAverages = averageDailyNutrition(logs)

  const deficient: NutrientGapReport['deficient'] = []
  const excess: NutrientGapReport['excess'] = []
  let withinRange = 0

  for (const key of NUTRITION_KEYS) {
    const actual = weeklyAverages[key]
    const target = targets[key]

    if (target <= 0) {
      // Skip nutrients with no meaningful target
      withinRange += 1
      continue
    }

    const ratio = actual / target

    if (ratio < 0.8) {
      deficient.push({
        nutrient: key,
        actual,
        target,
        gap: target - actual,
      })
    } else if (ratio > 1.2) {
      excess.push({
        nutrient: key,
        actual,
        target,
        excess: actual - target,
      })
    } else {
      withinRange += 1
    }
  }

  const score = Math.round((withinRange / NUTRITION_KEYS.length) * 100)

  return {
    score,
    deficient,
    excess,
    weeklyAverages,
  }
}
