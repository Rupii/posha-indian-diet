'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Segment = 'general' | 'pregnant' | 'postpartum'
type DietaryPref = 'veg' | 'egg' | 'non_veg' | 'jain' | 'satvik'
type UnitPref = 'katori' | 'grams'

const STEPS = ['segment', 'region', 'dietary', 'units', 'done'] as const
type Step = typeof STEPS[number]

const REGIONS = [
  { id: 'north', label: 'North India', emoji: '🌾', desc: 'Punjabi, UP, Rajasthan, Delhi' },
  { id: 'south', label: 'South India', emoji: '🌴', desc: 'Tamil Nadu, Karnataka, Kerala, Andhra' },
  { id: 'east', label: 'East India', emoji: '🐟', desc: 'Bengal, Odisha, Bihar, Jharkhand' },
  { id: 'west', label: 'West India', emoji: '🫙', desc: 'Maharashtra, Gujarat, Goa' },
]

const DIETARY_OPTIONS: { id: DietaryPref; label: string; desc: string }[] = [
  { id: 'veg', label: 'Vegetarian', desc: 'No meat, fish, or eggs' },
  { id: 'egg', label: 'Eggetarian', desc: 'Veg + eggs' },
  { id: 'non_veg', label: 'Non-vegetarian', desc: 'All foods' },
  { id: 'jain', label: 'Jain', desc: 'No root vegetables, no meat' },
  { id: 'satvik', label: 'Satvik', desc: 'No onion, garlic, meat' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('segment')
  const [segment, setSegment] = useState<Segment | null>(null)
  const [region, setRegion] = useState<string | null>(null)
  const [dietary, setDietary] = useState<DietaryPref | null>(null)
  const [units, setUnits] = useState<UnitPref | null>(null)

  function nextStep() {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
  }

  function prevStep() {
    const idx = STEPS.indexOf(step)
    if (idx > 0) setStep(STEPS[idx - 1])
  }

  function finish() {
    // TODO: save profile to Supabase
    router.push('/dashboard')
  }

  const progress = ((STEPS.indexOf(step) + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-warm-200">
        <div
          className="h-1 bg-saffron-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pt-12 pb-24">
        <div className="w-full max-w-md">

          {/* Step: Segment */}
          {step === 'segment' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-2">Who is Posha for?</h1>
              <p className="text-warm-500 mb-8">We&apos;ll personalise your plans based on your life stage.</p>
              <div className="space-y-3">
                {[
                  { id: 'general' as Segment, emoji: '🥘', label: 'Just me — everyday nutrition', desc: 'Meal plans, tracking, and recipes for daily healthy eating' },
                  { id: 'pregnant' as Segment, emoji: '🤰', label: "I'm pregnant", desc: 'Week-by-week nutrition, safe foods, supplement tracking' },
                  { id: 'postpartum' as Segment, emoji: '🌸', label: 'I recently delivered', desc: '40-day confinement diet, lactation support, recovery tracking' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSegment(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      segment === opt.id
                        ? 'border-saffron-500 bg-saffron-50'
                        : 'border-warm-200 bg-white hover:border-warm-300'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <p className="font-semibold text-warm-900 mt-1">{opt.label}</p>
                    <p className="text-sm text-warm-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Region */}
          {step === 'region' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-2">Where are you from?</h1>
              <p className="text-warm-500 mb-8">We&apos;ll suggest recipes that match your regional cuisine.</p>
              <div className="grid grid-cols-2 gap-3">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      region === r.id
                        ? 'border-saffron-500 bg-saffron-50'
                        : 'border-warm-200 bg-white hover:border-warm-300'
                    }`}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <p className="font-semibold text-warm-900 mt-2 text-sm">{r.label}</p>
                    <p className="text-xs text-warm-500 mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Dietary */}
          {step === 'dietary' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-2">Dietary preference</h1>
              <p className="text-warm-500 mb-8">This filters every recipe and meal plan we show you.</p>
              <div className="space-y-3">
                {DIETARY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setDietary(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      dietary === opt.id
                        ? 'border-saffron-500 bg-saffron-50'
                        : 'border-warm-200 bg-white hover:border-warm-300'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-warm-900">{opt.label}</p>
                      <p className="text-sm text-warm-500">{opt.desc}</p>
                    </div>
                    {dietary === opt.id && (
                      <span className="text-saffron-500 text-xl">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Units — user must choose, app never decides */}
          {step === 'units' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-2">How do you measure food?</h1>
              <p className="text-warm-500 mb-2">
                You can change this any time — even per individual log entry.
              </p>
              <p className="text-xs text-warm-400 mb-8">
                Posha stores nutrition in grams internally but shows you whatever unit you prefer.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setUnits('katori')}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    units === 'katori'
                      ? 'border-saffron-500 bg-saffron-50'
                      : 'border-warm-200 bg-white hover:border-warm-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">🫙</span>
                    <div>
                      <p className="font-bold text-warm-900 text-lg">Katori mode</p>
                      <p className="text-warm-500 text-sm mt-1">
                        Log in katori, ladle, roti, piece, tbsp. Feels natural for Indian cooking.
                      </p>
                      <p className="text-saffron-600 text-sm mt-2 font-medium">
                        e.g. &quot;1½ katori dal&quot; · &quot;2 roti&quot; · &quot;1 tbsp ghee&quot;
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setUnits('grams')}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                    units === 'grams'
                      ? 'border-saffron-500 bg-saffron-50'
                      : 'border-warm-200 bg-white hover:border-warm-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">⚖️</span>
                    <div>
                      <p className="font-bold text-warm-900 text-lg">Grams mode</p>
                      <p className="text-warm-500 text-sm mt-1">
                        Log by weight in grams. Better for precision tracking with a kitchen scale.
                      </p>
                      <p className="text-saffron-600 text-sm mt-2 font-medium">
                        e.g. &quot;150g dal&quot; · &quot;60g atta&quot; · &quot;5g ghee&quot;
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step: Done */}
          {step === 'done' && (
            <div className="text-center">
              <span className="text-6xl mb-6 block">🎉</span>
              <h1 className="text-2xl font-bold text-warm-900 mb-3">You&apos;re all set!</h1>
              <p className="text-warm-500 mb-8">
                Your personalised meal plan is ready. Let&apos;s start eating well.
              </p>
              <button onClick={finish} className="btn-primary w-full text-base">
                Open my dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      {step !== 'done' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 px-4 py-4 flex gap-3">
          {step !== 'segment' && (
            <button onClick={prevStep} className="btn-secondary flex-1">
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={
              (step === 'segment' && !segment) ||
              (step === 'region' && !region) ||
              (step === 'dietary' && !dietary) ||
              (step === 'units' && !units)
            }
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 'units' ? 'Finish setup' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  )
}
