export interface PrakritiOption {
  value: 'vata' | 'pitta' | 'kapha'
  label: string
}

export interface PrakritiQuestion {
  id: string
  question: string
  options: PrakritiOption[]
}

export const PRAKRITI_QUESTIONS: PrakritiQuestion[] = [
  {
    id: 'digestion',
    question: 'How would you describe your digestion speed?',
    options: [
      { value: 'vata', label: 'Irregular — sometimes fast, sometimes slow, often with gas or bloating' },
      { value: 'pitta', label: 'Sharp and strong — I get very hungry and digest quickly' },
      { value: 'kapha', label: 'Slow and steady — I can skip meals without feeling faint' },
    ],
  },
  {
    id: 'body_frame',
    question: 'Which best describes your natural body frame?',
    options: [
      { value: 'vata', label: 'Slim, light, find it hard to gain weight or muscle' },
      { value: 'pitta', label: 'Medium build, well-proportioned, gain and lose weight moderately' },
      { value: 'kapha', label: 'Large, sturdy frame, tend to gain weight easily' },
    ],
  },
  {
    id: 'skin_type',
    question: 'How would you describe your skin?',
    options: [
      { value: 'vata', label: 'Dry, rough, or thin — prone to cracking and coolness' },
      { value: 'pitta', label: 'Oily, warm, prone to redness, acne, or sensitivity' },
      { value: 'kapha', label: 'Thick, oily, and smooth — rarely dries out' },
    ],
  },
  {
    id: 'sleep',
    question: 'How is your sleep pattern?',
    options: [
      { value: 'vata', label: 'Light sleeper, often restless, wake easily, sometimes insomnia' },
      { value: 'pitta', label: 'Moderate — sleep well but wake if there is a problem to solve' },
      { value: 'kapha', label: 'Deep, long sleeper — hard to wake up, feel groggy in the morning' },
    ],
  },
  {
    id: 'stress_response',
    question: 'How do you typically respond to stress?',
    options: [
      { value: 'vata', label: 'I become anxious, fearful, or overwhelmed' },
      { value: 'pitta', label: 'I become irritable, intense, or driven to control things' },
      { value: 'kapha', label: 'I withdraw, feel heavy, or become complacent' },
    ],
  },
  {
    id: 'appetite',
    question: 'How would you describe your appetite?',
    options: [
      { value: 'vata', label: 'Variable — some days very hungry, other days barely interested in food' },
      { value: 'pitta', label: 'Strong and consistent — I get irritable if I skip a meal' },
      { value: 'kapha', label: 'Low to moderate — I can go long periods without eating' },
    ],
  },
  {
    id: 'energy',
    question: 'How is your energy level throughout the day?',
    options: [
      { value: 'vata', label: 'Comes in bursts — high energy then sudden crashes' },
      { value: 'pitta', label: 'Steady and strong, especially mid-morning to afternoon' },
      { value: 'kapha', label: 'Slow to start but even once warmed up; enduring stamina' },
    ],
  },
  {
    id: 'memory',
    question: 'How is your memory and learning style?',
    options: [
      { value: 'vata', label: 'Quick to learn but also quick to forget' },
      { value: 'pitta', label: 'Sharp, detail-oriented — I remember what I focus on well' },
      { value: 'kapha', label: 'Slow to learn but very good long-term retention' },
    ],
  },
  {
    id: 'emotional_tendency',
    question: 'What is your dominant emotional tendency?',
    options: [
      { value: 'vata', label: 'Enthusiasm and creativity, but prone to worry or indecision' },
      { value: 'pitta', label: 'Ambition and confidence, but prone to anger or impatience' },
      { value: 'kapha', label: 'Calm and caring, but prone to attachment or lethargy' },
    ],
  },
  {
    id: 'thirst',
    question: 'How would you describe your thirst?',
    options: [
      { value: 'vata', label: 'Variable — I often forget to drink water' },
      { value: 'pitta', label: 'High — I feel thirsty frequently and prefer cool drinks' },
      { value: 'kapha', label: 'Low — I rarely feel thirsty and prefer warm drinks' },
    ],
  },
]

export function scorePrakritiQuiz(
  answers: Array<{ questionId: string; answer: 'vata' | 'pitta' | 'kapha' }>,
): 'vata' | 'pitta' | 'kapha' {
  const counts: Record<'vata' | 'pitta' | 'kapha', number> = {
    vata: 0,
    pitta: 0,
    kapha: 0,
  }

  for (const { answer } of answers) {
    counts[answer] += 1
  }

  if (counts.vata >= counts.pitta && counts.vata >= counts.kapha) {
    return 'vata'
  }
  if (counts.pitta >= counts.vata && counts.pitta >= counts.kapha) {
    return 'pitta'
  }
  return 'kapha'
}

export interface PrakritiMealBias {
  preferWarm: boolean
  preferLight: boolean
  preferCooling: boolean
  avoidSpicy: boolean
  preferGrounding: boolean
  mealTimingNote: string
  preferredFoods: string[]
  avoidFoods: string[]
}

export function getPrakritiMealBias(
  prakriti: 'vata' | 'pitta' | 'kapha' | 'unknown',
): PrakritiMealBias {
  switch (prakriti) {
    case 'vata':
      return {
        preferWarm: true,
        preferLight: false,
        preferCooling: false,
        avoidSpicy: false,
        preferGrounding: true,
        mealTimingNote:
          'Eat at regular times — vata thrives on routine. Aim for 3 meals a day without skipping. Largest meal at midday.',
        preferredFoods: [
          'ghee',
          'sesame oil',
          'cooked root vegetables',
          'dal',
          'rice',
          'warm milk',
          'banana',
          'mango',
          'almonds (soaked)',
          'ginger',
          'cinnamon',
          'cardamom',
          'oats (cooked)',
          'sweet potato',
          'urad dal',
        ],
        avoidFoods: [
          'raw salads',
          'cold drinks',
          'ice cream',
          'dry crackers',
          'popcorn',
          'carbonated drinks',
          'frozen foods',
          'leftover or stale food',
          'excessive caffeine',
          'bitter melon (excess)',
        ],
      }

    case 'pitta':
      return {
        preferWarm: false,
        preferLight: true,
        preferCooling: true,
        avoidSpicy: true,
        preferGrounding: false,
        mealTimingNote:
          'Do not skip meals — pitta fire needs regular fuel. Avoid eating when angry. Lunch should be the largest meal. Avoid eating late at night.',
        preferredFoods: [
          'coconut',
          'coconut water',
          'coriander',
          'fennel',
          'mint',
          'cucumber',
          'sweet lime',
          'pomegranate',
          'basmati rice',
          'moong dal',
          'leafy greens',
          'ghee (moderate)',
          'amla (Indian gooseberry)',
          'turmeric (small amounts)',
          'cardamom',
        ],
        avoidFoods: [
          'chilli',
          'cayenne',
          'garlic (excess)',
          'onion (raw)',
          'tomato (excess)',
          'vinegar',
          'fermented foods',
          'alcohol',
          'fried foods',
          'sour yoghurt',
          'excess salt',
          'red meat',
          'coffee',
        ],
      }

    case 'kapha':
      return {
        preferWarm: true,
        preferLight: true,
        preferCooling: false,
        avoidSpicy: false,
        preferGrounding: false,
        mealTimingNote:
          'Kapha benefits from intermittent fasting and skipping breakfast occasionally. Eat the lightest meal at dinner. Avoid eating after 7 pm.',
        preferredFoods: [
          'ginger',
          'black pepper',
          'turmeric',
          'mustard seeds',
          'bitter gourd',
          'methi (fenugreek)',
          'lentils',
          'barley',
          'millet',
          'leafy greens',
          'pomegranate',
          'papaya',
          'honey (raw, small amounts)',
          'light soups',
          'sprouts',
        ],
        avoidFoods: [
          'fried foods',
          'heavy sweets',
          'ice cream',
          'cheese',
          'cream',
          'butter (excess)',
          'white flour',
          'white rice (excess)',
          'cold drinks',
          'bananas',
          'avocado (excess)',
          'red meat',
          'refined sugar',
        ],
      }

    case 'unknown':
    default:
      return {
        preferWarm: false,
        preferLight: false,
        preferCooling: false,
        avoidSpicy: false,
        preferGrounding: false,
        mealTimingNote:
          'Complete the Prakriti quiz to receive personalised meal timing advice.',
        preferredFoods: [],
        avoidFoods: [],
      }
  }
}
