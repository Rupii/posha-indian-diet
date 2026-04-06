import { Recipe, FoodLog, UserProfile, SwapResult } from './types'

// Returns dominant macro label for a recipe
function dominantMacro(recipe: Recipe): 'protein' | 'carb' | 'fat' {
  const { protein, carbs, fat } = recipe.nutrition
  const pCal = protein * 4
  const cCal = carbs * 4
  const fCal = fat * 9
  if (pCal >= cCal && pCal >= fCal) return 'protein'
  if (fCal > pCal && fCal > cCal) return 'fat'
  return 'carb'
}

function isRecentlyLogged(recipe: Recipe, logs: FoodLog[], days = 7): boolean {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return logs.some(
    (log) => log.recipeId === recipe.id && new Date(log.loggedAt) > cutoff
  )
}

function respectsProfile(recipe: Recipe, profile: UserProfile): boolean {
  const { dietaryPref, conditions, segment } = profile

  // Dietary preference filter
  if (dietaryPref === 'veg' && recipe.dietaryTags.some(t => t === 'non_veg' || t === 'egg')) return false
  if (dietaryPref === 'jain' && recipe.dietaryTags.some(t => t === 'non_veg' || t === 'egg')) return false

  // Pregnancy safety
  if (segment === 'pregnant' && !recipe.pregnancySafe) return false

  // Condition checks (exclude recipes with bad condition tags)
  if (conditions.includes('diabetes') && recipe.conditionTags.some(t => t === 'diabetes-avoid')) return false
  if (conditions.includes('pcos') && recipe.conditionTags.some(t => t === 'pcos-avoid')) return false
  if (conditions.includes('hypertension') && recipe.conditionTags.some(t => t === 'high-sodium')) return false

  return true
}

export function findSwaps(
  original: Recipe,
  pool: Recipe[],
  userProfile: UserProfile,
  recentLogs: FoodLog[],
  rejectedIds: Set<string> = new Set(),
): SwapResult {
  const eligible = pool.filter(
    (r) =>
      r.id !== original.id &&
      !rejectedIds.has(r.id) &&
      !isRecentlyLogged(r, recentLogs) &&
      respectsProfile(r, userProfile)
  )

  // Similar Nutrition: ±10% calories, same dominant macro
  const origCals = original.nutrition.calories
  const origMacro = dominantMacro(original)

  const similarNutrition = eligible
    .filter((r) => {
      const calDiff = Math.abs(r.nutrition.calories - origCals) / origCals
      return calDiff <= 0.10 && dominantMacro(r) === origMacro && r.id !== original.id
    })
    .sort((a, b) => Math.abs(a.nutrition.calories - origCals) - Math.abs(b.nutrition.calories - origCals))
    .slice(0, 3)

  // Same Type: same mealType, overlapping swapTags, different dish
  const sameType = eligible
    .filter((r) => {
      const sharedTags = r.swapTags.filter((t) => original.swapTags.includes(t))
      return r.mealType === original.mealType && sharedTags.length > 0
    })
    .sort((a, b) => {
      // Prefer same region
      const aRegion = a.region === userProfile.region ? 1 : 0
      const bRegion = b.region === userProfile.region ? 1 : 0
      return bRegion - aRegion
    })
    .slice(0, 3)

  return { similarNutrition, sameType }
}

export interface SwapRejection {
  userId: string
  rejectedRecipeId: string
  reason: 'dont_like' | 'already_had' | 'not_in_mood'
  rejectedAt: Date
  expiresAt: Date
}

export function buildRejection(
  userId: string,
  recipeId: string,
  reason: SwapRejection['reason'],
): SwapRejection {
  const now = new Date()
  const expires = new Date(now)
  expires.setDate(expires.getDate() + 7)
  return {
    userId,
    rejectedRecipeId: recipeId,
    reason,
    rejectedAt: now,
    expiresAt: expires,
  }
}
