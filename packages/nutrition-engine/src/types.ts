export type UnitPreference = 'katori' | 'grams'

export type Segment = 'general' | 'pregnant' | 'postpartum'

export type Prakriti = 'vata' | 'pitta' | 'kapha' | 'unknown'

export type ConditionTrack = 'pcos' | 'diabetes' | 'hypertension' | 'thyroid' | 'post_surgery'

export type SlotType = 'breakfast' | 'morning_snack' | 'lunch' | 'chai_snack' | 'dinner'

export type DietaryPref = 'veg' | 'egg' | 'non_veg' | 'jain' | 'satvik'

export type Region = 'north' | 'south' | 'east' | 'west' | 'all'

export interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  iron: number
  calcium: number
  folate: number
}

export interface DailyTargets extends Nutrition {
  water: number // litres
  sodium?: number // mg — set for hypertension track
}

export interface UserProfile {
  id: string
  segment: Segment
  trimester?: 1 | 2 | 3
  isBreastfeeding?: boolean
  prakriti: Prakriti
  conditions: ConditionTrack[]
  unitPreference: UnitPreference // user-chosen, never defaulted by app
  weightKg: number
  heightCm: number
  ageYears: number
  region: Region
  dietaryPref: DietaryPref
  fastingPrefs?: string[]
}

export interface Recipe {
  id: string
  name: string
  nameHindi?: string
  region: Region | string
  mealType: 'breakfast' | 'snack' | 'lunch' | 'dinner' | 'drink'
  dietaryTags: DietaryPref[]
  cookTimeMinutes: number
  nutrition: Nutrition // per serving
  servingGrams: number
  servingKatori: number
  healthTags: string[]
  conditionTags: string[]
  swapTags: string[]
  seasonalMonths: number[] // 1–12
  fastingSafe: boolean
  pregnancySafe: boolean
  postpartumRecommended: boolean
  budgetTier: 'budget' | 'moderate' | 'premium'
}

export interface FoodLog {
  id: string
  userId: string
  loggedAt: Date
  recipeId?: string
  customName?: string
  amountGrams: number
  unitUsed: UnitPreference
  nutrition: Nutrition
}

export interface MealSlot {
  id: string
  slotType: SlotType
  recipe: Recipe
  portionMultiplier: number
  swappedFromId?: string
}

export interface MealPlan {
  id: string
  userId: string
  date: Date
  slots: MealSlot[]
}

export interface SwapResult {
  similarNutrition: Recipe[] // max 3, ±10% cals, same dominant macro
  sameType: Recipe[]         // max 3, same category, different dish
}

export interface NutrientGapReport {
  score: number // 0–100
  deficient: Array<{ nutrient: keyof Nutrition; actual: number; target: number; gap: number }>
  excess: Array<{ nutrient: keyof Nutrition; actual: number; target: number; excess: number }>
  weeklyAverages: Nutrition
}

export interface PrakritiAnswer {
  questionId: string
  answer: 'vata' | 'pitta' | 'kapha'
}

export interface MealBias {
  preferWarm: boolean
  preferLight: boolean
  preferCooling: boolean
  avoidSpicy: boolean
  preferGrounding: boolean
  mealTimingNote: string
}
