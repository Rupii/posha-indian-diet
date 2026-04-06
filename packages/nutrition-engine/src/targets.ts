import { UserProfile, DailyTargets } from './types'

// ICMR RDA 2020 + pregnancy/condition adjustments
export function calculateDailyTargets(profile: UserProfile): DailyTargets {
  const { weightKg, ageYears, segment, trimester, isBreastfeeding, conditions } = profile

  // Base BMR (Mifflin-St Jeor, female version)
  const bmr = 10 * weightKg + 6.25 * profile.heightCm - 5 * ageYears - 161
  // Sedentary/lightly active multiplier
  let calories = Math.round(bmr * 1.4)

  // ICMR base values (adult woman)
  let protein = Math.round(weightKg * 0.83)
  let carbs = Math.round((calories * 0.55) / 4)
  let fat = Math.round((calories * 0.25) / 9)
  let fiber = 25
  let iron = 29
  let calcium = 600
  let folate = 200
  let water = 2.0
  let sodium: number | undefined = undefined

  if (segment === 'pregnant') {
    folate = 500
    iron = 35
    calcium = 1200

    if (trimester === 1) {
      calories += 150
      protein += 10
    } else if (trimester === 2) {
      calories += 350
      protein += 15
      iron = 38
    } else if (trimester === 3) {
      calories += 450
      protein += 22
      iron = 40
    }

    water = 2.5
    carbs = Math.round((calories * 0.55) / 4)
    fat = Math.round((calories * 0.25) / 9)
  }

  if (segment === 'postpartum') {
    iron = 30
    calcium = 1000
    folate = 300
    water = 3.0

    if (isBreastfeeding) {
      calories += 500
      protein += 25
      calcium = 1200
    }

    carbs = Math.round((calories * 0.55) / 4)
    fat = Math.round((calories * 0.25) / 9)
  }

  if (conditions.includes('pcos')) {
    carbs = Math.round((calories * 0.40) / 4)
    protein = Math.max(protein, Math.round(weightKg * 1.0))
    fat = Math.round((calories * 0.30) / 9)
    fiber = 30
  }

  if (conditions.includes('diabetes')) {
    carbs = Math.round((calories * 0.45) / 4)
    fiber = 35
  }

  if (conditions.includes('hypertension')) {
    sodium = 1500
  }

  if (conditions.includes('thyroid')) {
    fiber = 28
  }

  return {
    calories,
    protein,
    carbs,
    fat,
    fiber,
    iron,
    calcium,
    folate,
    water,
    ...(sodium !== undefined ? { sodium } : {}),
  }
}

export const SLOT_CALORIE_SPLIT: Record<string, number> = {
  breakfast: 0.25,
  morning_snack: 0.10,
  lunch: 0.30,
  chai_snack: 0.10,
  dinner: 0.25,
}
