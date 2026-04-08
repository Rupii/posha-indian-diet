'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Segment    = 'general' | 'pregnant' | 'postpartum'
type DietaryPref = 'veg' | 'egg' | 'non_veg' | 'jain' | 'satvik'
type UnitPref   = 'katori' | 'grams'

const REGIONS = [
  { id: 'north', label: 'North India',   desc: 'Punjab, UP, Rajasthan, Delhi' },
  { id: 'south', label: 'South India',   desc: 'Tamil Nadu, Karnataka, Kerala, Andhra' },
  { id: 'east',  label: 'East India',    desc: 'Bengal, Odisha, Bihar, Jharkhand' },
  { id: 'west',  label: 'West India',    desc: 'Maharashtra, Gujarat, Goa' },
]

const DIETARY_OPTIONS: { id: DietaryPref; label: string; desc: string }[] = [
  { id: 'veg',     label: 'Vegetarian',      desc: 'No meat, fish, or eggs' },
  { id: 'egg',     label: 'Eggetarian',      desc: 'Veg + eggs' },
  { id: 'non_veg', label: 'Non-vegetarian',  desc: 'All foods including meat & seafood' },
  { id: 'jain',    label: 'Jain',            desc: 'No root vegetables, no meat' },
  { id: 'satvik',  label: 'Satvik',          desc: 'No onion, garlic, or meat' },
]

// Derives trimester from weeks
function getTrimesters(weeks: number): 'T1' | 'T2' | 'T3' {
  if (weeks <= 12) return 'T1'
  if (weeks <= 26) return 'T2'
  return 'T3'
}

function getTrimesterLabel(weeks: number) {
  if (weeks <= 12) return 'First trimester (weeks 1–12)'
  if (weeks <= 26) return 'Second trimester (weeks 13–26)'
  return 'Third trimester (weeks 27–40)'
}

// Base steps — pregnancy step injected conditionally
type BaseStep = 'segment' | 'pregnancy' | 'region' | 'dietary' | 'units' | 'done'

export default function OnboardingPage() {
  const router = useRouter()

  // Redirect if already onboarded
  useEffect(() => {
    if (localStorage.getItem('poshaProfile')) {
      router.replace('/dashboard')
    }
  }, [router])

  const [segment,         setSegment]         = useState<Segment | null>(null)
  const [pregnancyWeeks,  setPregnancyWeeks]  = useState<string>('')
  const [region,          setRegion]          = useState<string | null>(null)
  const [dietary,         setDietary]         = useState<DietaryPref | null>(null)
  const [units,           setUnits]           = useState<UnitPref | null>(null)
  const [step,            setStep]            = useState<BaseStep>('segment')

  // Steps depend on segment choice
  const steps: BaseStep[] = segment === 'pregnant'
    ? ['segment', 'pregnancy', 'region', 'dietary', 'units', 'done']
    : ['segment', 'region', 'dietary', 'units', 'done']

  const stepIndex  = steps.indexOf(step)
  const totalQ     = steps.length - 1 // exclude 'done'
  const qNumber    = stepIndex + 1
  const progress   = (stepIndex / (steps.length - 1)) * 100

  function next() {
    const idx = steps.indexOf(step)
    if (idx < steps.length - 1) setStep(steps[idx + 1])
  }

  function back() {
    const idx = steps.indexOf(step)
    if (idx > 0) setStep(steps[idx - 1])
  }

  function finish() {
    const weeks = parseInt(pregnancyWeeks, 10) || 0
    const profile = {
      segment,
      region,
      dietary,
      units,
      ...(segment === 'pregnant' ? {
        pregnancyWeeks: weeks,
        trimester: getTrimesters(weeks),
      } : {}),
      completedAt: new Date().toISOString(),
    }
    localStorage.setItem('poshaProfile', JSON.stringify(profile))
    router.push('/dashboard')
  }

  const canContinue =
    (step === 'segment'  && !!segment) ||
    (step === 'pregnancy' && parseInt(pregnancyWeeks, 10) >= 4 && parseInt(pregnancyWeeks, 10) <= 42) ||
    (step === 'region'   && !!region) ||
    (step === 'dietary'  && !!dietary) ||
    (step === 'units'    && !!units)

  const weeks = parseInt(pregnancyWeeks, 10) || 0

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Progress bar */}
      <div className="h-1.5 bg-warm-200">
        <div
          className="h-full bg-saffron-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-forest-500">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-11 5 3 3 9 2 11 2" />
          </svg>
          <span className="font-bold text-warm-900">Posha</span>
        </div>
        {step !== 'done' && (
          <span className="text-sm text-warm-400">
            {qNumber} of {totalQ}
          </span>
        )}
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pt-6 pb-32">
        <div className="w-full max-w-md">

          {/* ── Q1: Segment ─────────────────────────────────────── */}
          {step === 'segment' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-1.5">Who is Posha for?</h1>
              <p className="text-warm-500 mb-7">We&apos;ll personalise your meal plan to your life stage.</p>
              <div className="space-y-3">
                {([
                  { id: 'general'   as Segment, icon: '🥘', label: 'Just me — everyday nutrition', desc: 'Meal plans, tracking, and recipes for daily healthy eating' },
                  { id: 'pregnant'  as Segment, icon: '🤰', label: "I'm pregnant",              desc: 'Trimester-aware nutrition, safe foods, supplement tracking' },
                  { id: 'postpartum' as Segment, icon: '🌸', label: 'I recently delivered',      desc: '40-day confinement diet, lactation support, recovery tracking' },
                ] as const).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSegment(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      segment === opt.id
                        ? 'border-saffron-500 bg-saffron-50'
                        : 'border-warm-200 bg-white hover:border-warm-300'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <p className="font-semibold text-warm-900 mt-1">{opt.label}</p>
                    <p className="text-sm text-warm-500 mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Q2 (pregnant only): Pregnancy weeks ─────────────── */}
          {step === 'pregnancy' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-1.5">How far along are you?</h1>
              <p className="text-warm-500 mb-7">
                We use this to show the right nutrients, safe foods, and week-specific guidance.
              </p>

              <div className="card mb-4">
                <label className="block text-sm font-semibold text-warm-700 mb-3">
                  Weeks pregnant
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={4}
                    max={42}
                    value={pregnancyWeeks}
                    onChange={(e) => setPregnancyWeeks(e.target.value)}
                    placeholder="e.g. 33"
                    className="input w-28 text-2xl font-bold text-center"
                    autoFocus
                  />
                  <span className="text-warm-500 font-medium">weeks</span>
                </div>

                {/* Trimester indicator */}
                {weeks >= 4 && weeks <= 42 && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      {(['T1', 'T2', 'T3'] as const).map((t, i) => {
                        const active = getTrimesters(weeks) === t
                        return (
                          <span
                            key={t}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              active ? 'bg-rose-100 text-rose-600' : 'bg-warm-100 text-warm-400'
                            }`}
                          >
                            {t}
                          </span>
                        )
                      })}
                    </div>
                    <span className="text-sm text-warm-600 font-medium">
                      {getTrimesterLabel(weeks)}
                    </span>
                  </div>
                )}
              </div>

              {/* Pregnancy safety notice */}
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
                <div className="mt-0.5 shrink-0">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-amber-600">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Pregnancy-safe filtering on</p>
                  <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                    Posha will flag high-mercury fish (Surmai, Shark), raw papaya, excess methi,
                    and unpasteurised dairy in your meal suggestions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Q3: Region ──────────────────────────────────────── */}
          {step === 'region' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-1.5">Where are you from?</h1>
              <p className="text-warm-500 mb-7">We&apos;ll match recipes to your regional cuisine.</p>
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
                    <p className="font-semibold text-warm-900 text-sm">{r.label}</p>
                    <p className="text-xs text-warm-500 mt-1 leading-snug">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Q4: Dietary preference ──────────────────────────── */}
          {step === 'dietary' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-1.5">Dietary preference</h1>
              <p className="text-warm-500 mb-7">This filters every recipe and meal plan we show you.</p>
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
                      <p className="text-sm text-warm-500 mt-0.5">{opt.desc}</p>
                    </div>
                    {dietary === opt.id && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-saffron-500 shrink-0">
                        <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Q5: Units ───────────────────────────────────────── */}
          {step === 'units' && (
            <div>
              <h1 className="text-2xl font-bold text-warm-900 mb-1.5">How do you measure food?</h1>
              <p className="text-warm-500 mb-1.5">
                You can change this any time — even per individual log entry.
              </p>
              <p className="text-xs text-warm-400 mb-7">
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
                    <span className="text-3xl">🫙</span>
                    <div>
                      <p className="font-bold text-warm-900">Katori mode</p>
                      <p className="text-warm-500 text-sm mt-1">
                        Log in katori, ladle, roti, piece, tbsp. Feels natural for Indian cooking.
                      </p>
                      <p className="text-saffron-600 text-sm mt-2 font-medium">
                        &quot;1½ katori dal&quot; · &quot;2 roti&quot; · &quot;1 tbsp ghee&quot;
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
                    <span className="text-3xl">⚖️</span>
                    <div>
                      <p className="font-bold text-warm-900">Grams mode</p>
                      <p className="text-warm-500 text-sm mt-1">
                        Log by weight. Better for precision tracking with a kitchen scale.
                      </p>
                      <p className="text-saffron-600 text-sm mt-2 font-medium">
                        &quot;150g dal&quot; · &quot;60g atta&quot; · &quot;5g ghee&quot;
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ── Done ────────────────────────────────────────────── */}
          {step === 'done' && (
            <div className="text-center pt-8">
              <div className="w-20 h-20 rounded-full bg-saffron-50 flex items-center justify-center mx-auto mb-5 text-4xl">
                🎉
              </div>
              <h1 className="text-2xl font-bold text-warm-900 mb-3">
                {segment === 'pregnant' ? "You're all set, mama!" : "You're all set!"}
              </h1>
              <p className="text-warm-500 mb-4 leading-relaxed">
                {segment === 'pregnant'
                  ? `Your ${getTrimesters(weeks)}, Week ${weeks} meal plan is ready — with pregnancy-safe filtering enabled.`
                  : 'Your personalised meal plan is ready. Let\'s start eating well.'}
              </p>
              {segment === 'pregnant' && (
                <div className="rounded-2xl bg-rose-50 border border-rose-100 p-3 mb-6 text-left">
                  <p className="text-sm font-semibold text-rose-700 mb-1">Pregnancy-safe mode is ON</p>
                  <ul className="text-xs text-rose-600 space-y-0.5">
                    <li>· High-mercury fish (Surmai, Shark, Swordfish) flagged</li>
                    <li>· Raw papaya, excess methi warnings shown</li>
                    <li>· Unpasteurised dairy highlighted</li>
                    <li>· Week {weeks} nutrient targets applied</li>
                  </ul>
                </div>
              )}
              <button onClick={finish} className="btn-primary w-full text-base">
                Open my dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      {step !== 'done' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 px-4 py-4 flex gap-3">
          {step !== 'segment' && (
            <button onClick={back} className="btn-secondary flex-1">
              Back
            </button>
          )}
          <button
            onClick={next}
            disabled={!canContinue}
            className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 'units' ? 'Finish setup' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  )
}
