'use client'

import { useEffect, useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { REGION_STATES } from '@/lib/meal-data'

// ── Boutique tokens ───────────────────────────────────────────────────────────
const B = {
  bg:      '#f3e9d2',
  ink:     '#141311',
  ink2:    'rgba(20,19,17,0.65)',
  ink3:    'rgba(20,19,17,0.4)',
  cream:   '#fbf4e1',
  chili:   '#d04528',
  turmeric:'#e8a835',
  moss:    '#4a5a2e',
  display: '"Archivo", "Helvetica Neue", Arial, sans-serif',
  mono:    '"DM Mono", ui-monospace, Menlo, monospace',
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Gender      = 'male' | 'female' | 'prefer_not_to_say'
type WeightRange = '40–50' | '50–60' | '60–70' | '70–80' | '80–90' | '90–100' | '100+'
type Segment     = 'general' | 'pregnant' | 'postpartum'
type Dietary     = 'veg' | 'egg' | 'non_veg' | 'jain' | 'satvik'
type Units       = 'katori' | 'grams'
type MeatPref    = 'chicken' | 'mutton' | 'fish' | 'eggs' | 'shrimp'
type Step        = 'splash' | 'name' | 'gender' | 'weight' | 'segment' | 'pregnancy' | 'region' | 'state' | 'dietary' | 'meat' | 'units' | 'done'

function getTrimester(weeks: number): 'T1' | 'T2' | 'T3' {
  if (weeks <= 12) return 'T1'
  if (weeks <= 26) return 'T2'
  return 'T3'
}
function getTrimesterLabel(weeks: number) {
  if (weeks <= 12) return 'First trimester (weeks 1–12)'
  if (weeks <= 26) return 'Second trimester (weeks 13–26)'
  return 'Third trimester (weeks 27–40)'
}

const DIETARY_OPTIONS: { id: Dietary; label: string; desc: string }[] = [
  { id: 'veg',     label: 'Vegetarian',     desc: 'No meat, fish, or eggs' },
  { id: 'egg',     label: 'Eggetarian',     desc: 'Veg + eggs' },
  { id: 'non_veg', label: 'Non-vegetarian', desc: 'All foods including meat & seafood' },
  { id: 'jain',    label: 'Jain',           desc: 'No root vegetables, no meat' },
  { id: 'satvik',  label: 'Satvik',         desc: 'No onion, garlic, or meat' },
]

const MEAT_OPTIONS: { id: MeatPref; label: string; emoji: string }[] = [
  { id: 'chicken', label: 'Chicken',       emoji: '🍗' },
  { id: 'mutton',  label: 'Mutton / Goat', emoji: '🥩' },
  { id: 'fish',    label: 'Fish & Seafood',emoji: '🐟' },
  { id: 'eggs',    label: 'Eggs',          emoji: '🥚' },
  { id: 'shrimp',  label: 'Shrimp/Prawns', emoji: '🦐' },
]

const WEIGHT_RANGES: WeightRange[] = ['40–50','50–60','60–70','70–80','80–90','90–100','100+']

// ── Shared button styles ──────────────────────────────────────────────────────
function choiceBtn(active: boolean, style?: React.CSSProperties): React.CSSProperties {
  return {
    border: `2px solid ${active ? B.ink : 'rgba(20,19,17,0.18)'}`,
    background: active ? B.ink : 'transparent',
    color: active ? B.cream : B.ink,
    borderRadius: 14,
    padding: '16px 20px',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'all .15s ease',
    fontFamily: B.display,
    width: '100%',
    ...style,
  }
}

export default function OnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('poshaProfile')) router.replace('/dashboard')
  }, [router])

  const [name,     setName]     = useState('')
  const [gender,   setGender]   = useState<Gender | null>(null)
  const [weight,   setWeight]   = useState<WeightRange | null>(null)
  const [segment,  setSegment]  = useState<Segment | null>(null)
  const [pregWeeks,setPregWeeks]= useState('')
  const [region,   setRegion]   = useState<string | null>(null)
  const [state,    setState]    = useState<string | null>(null)
  const [dietary,  setDietary]  = useState<Dietary | null>(null)
  const [meat,     setMeat]     = useState<MeatPref[]>([])
  const [units,    setUnits]    = useState<Units | null>(null)
  const [step,     setStep]     = useState<Step>('splash')

  // Dynamic step list based on user choices
  const steps: Step[] = (() => {
    const s: Step[] = ['splash','name','gender','weight']
    if (gender === 'female') s.push('segment')
    if (gender === 'female' && segment === 'pregnant') s.push('pregnancy')
    s.push('region')
    s.push('state')
    s.push('dietary')
    if (dietary === 'non_veg') s.push('meat')
    s.push('units','done')
    return s
  })()

  const stepIndex = steps.indexOf(step)
  const total     = steps.length - 1
  const progress  = total > 0 ? (stepIndex / total) * 100 : 0

  function next() {
    const idx = steps.indexOf(step)
    if (idx < steps.length - 1) setStep(steps[idx + 1])
  }
  function back() {
    const idx = steps.indexOf(step)
    if (idx > 0) setStep(steps[idx - 1])
  }

  function finish() {
    const weeks = parseInt(pregWeeks, 10) || 0
    const profile = {
      name: name.trim(),
      gender,
      weightRange: weight,
      segment: gender === 'female' ? (segment ?? 'general') : 'general',
      region,
      state,
      dietary,
      units,
      meatPreferences: dietary === 'non_veg' ? meat : [],
      ...(gender === 'female' && segment === 'pregnant' ? {
        pregnancyWeeks: weeks,
        trimester: getTrimester(weeks),
      } : {}),
      completedAt: new Date().toISOString(),
    }
    localStorage.setItem('poshaProfile', JSON.stringify(profile))
    router.push('/dashboard')
  }

  const weeks = parseInt(pregWeeks, 10) || 0

  const canContinue =
    (step === 'splash') ||
    (step === 'name'     && name.trim().length > 0) ||
    (step === 'gender'   && !!gender) ||
    (step === 'weight'   && !!weight) ||
    (step === 'segment'  && !!segment) ||
    (step === 'pregnancy'&& weeks >= 4 && weeks <= 42) ||
    (step === 'region'   && !!region) ||
    (step === 'state'    /* optional — always passable */) ||
    (step === 'dietary'  && !!dietary) ||
    (step === 'meat'     && meat.length > 0) ||
    (step === 'units'    && !!units)

  const stateList = region ? (REGION_STATES[region] ?? []) : []

  return (
    <div style={{ minHeight: '100vh', background: B.bg, fontFamily: B.display, color: B.ink }}>

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div style={{ padding: '18px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5, textTransform: 'uppercase' }}>
          POSHA<span style={{ color: B.chili }}>.</span>
        </div>
        {step !== 'done' && step !== 'splash' && (
          <span style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1, color: B.ink3, textTransform: 'uppercase' }}>
            {stepIndex} / {total - 1}
          </span>
        )}
      </div>

      {/* ── Progress bar ────────────────────────────────────────────── */}
      {step !== 'splash' && (
        <div style={{ height: 2, background: 'rgba(20,19,17,0.1)', margin: '14px 0 0' }}>
          <div style={{
            height: '100%', background: B.ink,
            width: `${progress}%`, transition: 'width .4s ease',
          }} />
        </div>
      )}

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '40px 24px 120px' }}>

        {/* ── Splash ────────────────────────────────────────────── */}
        {step === 'splash' && (
          <div>
            <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.chili, marginBottom: 16 }}>
              THE INDIA NUTRITION PROBLEM
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 36, lineHeight: 1.05, letterSpacing: -1.2, marginBottom: 4 }}>
              73% of Indians<br/>eat too little<br/>
              <span style={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 400, fontStyle: 'italic', color: B.chili }}>protein.</span>
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(20,19,17,0.65)', lineHeight: 1.6, marginBottom: 28 }}>
              The average Indian gets 47g of protein a day. We need 60g+. Most of us don't even know what we're missing.
            </p>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {[
                { stat: '73%', label: 'protein deficient', source: 'IMRB 2017', color: B.chili },
                { stat: '57%', label: 'women are anaemic', source: 'NFHS-5 2021', color: B.moss },
                { stat: '80%', label: 'vitamin D deficient', source: 'AIIMS study', color: '#6b2d3a' },
                { stat: '47g', label: 'avg daily protein vs 60g needed', source: 'ICMR 2020', color: '#e8a835' },
              ].map(s => (
                <div key={s.stat} style={{
                  background: B.ink, color: B.cream, borderRadius: 16, padding: '18px 16px',
                }}>
                  <div style={{ fontFamily: '"Archivo", sans-serif', fontWeight: 900, fontSize: 36, letterSpacing: -1.5, lineHeight: 1, color: s.color }}>
                    {s.stat}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, lineHeight: 1.3, opacity: 0.9 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 9, letterSpacing: 1, opacity: 0.5, marginTop: 4, textTransform: 'uppercase' }}>
                    {s.source}
                  </div>
                </div>
              ))}
            </div>

            {/* What Posha does */}
            <div style={{
              background: B.turmeric, borderRadius: 16, padding: '18px 20px', marginBottom: 8,
            }}>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: B.ink, opacity: 0.7, marginBottom: 8 }}>
                WHAT POSHA DOES
              </div>
              {[
                'Builds your daily menu from 140+ authentic Indian meals',
                'Tracks real nutrients — not just calories',
                'Adjusts for your region, dietary preference & life stage',
                'No gym-bro advice. Just grandmother-approved food.',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < 3 ? 10 : 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 999, background: B.ink, color: B.cream, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: B.ink }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Name ──────────────────────────────────────────────── */}
        {step === 'name' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>LET&apos;S START</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              WHAT&apos;S YOUR<br />NAME?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              We&apos;ll use this to personalise your experience.
            </p>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && name.trim() && next()}
              placeholder="Your first name"
              style={{
                width: '100%', boxSizing: 'border-box',
                border: `2px solid ${name.trim() ? B.ink : 'rgba(20,19,17,0.2)'}`,
                borderRadius: 12, padding: '18px 20px',
                fontFamily: B.display, fontWeight: 900, fontSize: 24,
                background: 'transparent', color: B.ink, outline: 'none',
                transition: 'border-color .15s',
              }}
            />
          </div>
        )}

        {/* ── Gender ────────────────────────────────────────────── */}
        {step === 'gender' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>ABOUT YOU</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              HI {name.toUpperCase()}.<br />YOUR GENDER?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              Helps us tailor nutrition targets for you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {([
                { id: 'female' as Gender,             label: 'FEMALE' },
                { id: 'male' as Gender,               label: 'MALE' },
                { id: 'prefer_not_to_say' as Gender,  label: 'PREFER NOT TO SAY' },
              ]).map(opt => (
                <button key={opt.id} onClick={() => setGender(opt.id)} style={choiceBtn(gender === opt.id)}>
                  <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: 0.5 }}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Weight Range ──────────────────────────────────────── */}
        {step === 'weight' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>APPROXIMATE</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              YOUR WEIGHT<br />RANGE?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              A rough range is fine — no precision needed.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {WEIGHT_RANGES.map(w => (
                <button key={w} onClick={() => setWeight(w)} style={choiceBtn(weight === w, { padding: '14px 16px' })}>
                  <span style={{ fontWeight: 900, fontSize: 16 }}>{w}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, marginLeft: 4 }}>kg</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Segment (female only) ─────────────────────────────── */}
        {step === 'segment' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>LIFE STAGE</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              WHAT DESCRIBES<br />YOU BEST?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              We&apos;ll personalise your meal plan to your life stage.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {([
                { id: 'general'   as Segment, label: 'EVERYDAY NUTRITION',  desc: 'Meal plans, tracking, and recipes for daily healthy eating' },
                { id: 'pregnant'  as Segment, label: "I'M PREGNANT",         desc: 'Trimester-aware nutrition, safe foods, supplement tracking' },
                { id: 'postpartum'as Segment, label: 'RECENTLY DELIVERED',   desc: '40-day confinement diet, lactation support, recovery tracking' },
              ]).map(opt => (
                <button key={opt.id} onClick={() => setSegment(opt.id)} style={choiceBtn(segment === opt.id)}>
                  <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 0.5, marginBottom: 4 }}>{opt.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 500 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Pregnancy weeks ───────────────────────────────────── */}
        {step === 'pregnancy' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>PREGNANCY</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              HOW FAR<br />ALONG?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              We use this for week-specific nutrition guidance and safe-food filtering.
            </p>
            <div style={{ border: `2px solid rgba(20,19,17,0.18)`, borderRadius: 14, padding: '20px 20px' }}>
              <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>WEEKS PREGNANT</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <input
                  type="number"
                  min={4}
                  max={42}
                  value={pregWeeks}
                  onChange={e => setPregWeeks(e.target.value)}
                  placeholder="e.g. 28"
                  autoFocus
                  style={{
                    width: 96, border: `2px solid ${weeks >= 4 && weeks <= 42 ? B.ink : 'rgba(20,19,17,0.2)'}`,
                    borderRadius: 10, padding: '12px 14px',
                    fontFamily: B.display, fontWeight: 900, fontSize: 26,
                    textAlign: 'center', background: 'transparent', color: B.ink, outline: 'none',
                  }}
                />
                <span style={{ fontSize: 14, color: B.ink2, fontWeight: 600 }}>weeks</span>
              </div>
              {weeks >= 4 && weeks <= 42 && (
                <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                  {(['T1','T2','T3'] as const).map(t => (
                    <span key={t} style={{
                      padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      background: getTrimester(weeks) === t ? B.ink : 'rgba(20,19,17,0.08)',
                      color: getTrimester(weeks) === t ? B.cream : B.ink3,
                    }}>{t}</span>
                  ))}
                  <span style={{ fontSize: 12, color: B.ink2 }}>{getTrimesterLabel(weeks)}</span>
                </div>
              )}
            </div>
            <div style={{ marginTop: 16, borderRadius: 12, background: 'rgba(208,69,40,0.08)', border: `1.5px solid rgba(208,69,40,0.2)`, padding: '14px 16px', display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
              <div>
                <p style={{ fontWeight: 800, fontSize: 12, color: B.chili, marginBottom: 3 }}>Pregnancy-safe filtering ON</p>
                <p style={{ fontSize: 11, color: B.ink2, lineHeight: 1.5 }}>
                  Posha will flag high-mercury fish (Surmai, Shark), raw papaya, excess methi, and unpasteurised dairy in all meal suggestions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Region ────────────────────────────────────────────── */}
        {step === 'region' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>CUISINE</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              YOUR REGIONAL<br />CUISINE?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              We&apos;ll build your meal plan around the flavours you grew up with.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {([
                { id: 'south', label: 'SOUTH INDIA',  sub: 'TN · Karnataka · Kerala · Andhra' },
                { id: 'north', label: 'NORTH INDIA',  sub: 'Punjab · Delhi · UP · Rajasthan' },
                { id: 'east',  label: 'EAST INDIA',   sub: 'Bengal · Odisha · Bihar · Assam' },
                { id: 'west',  label: 'WEST INDIA',   sub: 'Maharashtra · Gujarat · Goa' },
              ]).map(r => (
                <button key={r.id} onClick={() => { setRegion(r.id); setState(null) }} style={choiceBtn(region === r.id, { padding: '18px 16px' })}>
                  <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: 0.5, marginBottom: 6 }}>{r.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.65, lineHeight: 1.4 }}>{r.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── State (optional sub-step) ─────────────────────────── */}
        {step === 'state' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>OPTIONAL</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              YOUR STATE?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 8 }}>
              Refine your meals to state-level flavours. You can skip this.
            </p>
            <button
              onClick={() => { setState(null); next() }}
              style={{
                border: 'none', background: 'none', color: B.ink3, fontFamily: B.display,
                fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textDecoration: 'underline',
                cursor: 'pointer', marginBottom: 24, padding: 0,
              }}
            >
              Skip — use regional defaults
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stateList.map(s => (
                <button key={s.id} onClick={() => setState(s.id)} style={choiceBtn(state === s.id, { padding: '14px 18px' })}>
                  <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: 0.3 }}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Dietary ───────────────────────────────────────────── */}
        {step === 'dietary' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>FOOD PREFERENCES</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              DIETARY<br />PREFERENCE?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              This filters every recipe and meal plan we show you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DIETARY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => setDietary(opt.id)} style={choiceBtn(dietary === opt.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: 0.3 }}>{opt.label.toUpperCase()}</div>
                      <div style={{ fontSize: 12, opacity: 0.65, marginTop: 3 }}>{opt.desc}</div>
                    </div>
                    {dietary === opt.id && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Meat preferences (non-veg only) ───────────────────── */}
        {step === 'meat' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>OPTIONAL REFINE</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              WHAT MEAT<br />DO YOU EAT?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              Select all that apply. At least one required.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MEAT_OPTIONS.map(opt => {
                const active = meat.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    onClick={() => setMeat(prev => active ? prev.filter(m => m !== opt.id) : [...prev, opt.id])}
                    style={choiceBtn(active)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 22 }}>{opt.emoji}</span>
                      <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: 0.3 }}>{opt.label.toUpperCase()}</span>
                      {active && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto' }}>
                          <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Units ─────────────────────────────────────────────── */}
        {step === 'units' && (
          <div>
            <p style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: B.ink3, marginBottom: 12 }}>LAST STEP</p>
            <h1 style={{ fontWeight: 900, fontSize: 34, lineHeight: 1.1, letterSpacing: -1, marginBottom: 8 }}>
              HOW DO YOU<br />MEASURE FOOD?
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, marginBottom: 32 }}>
              You can change this any time.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {([
                { id: 'katori' as Units, emoji: '🫙', label: 'KATORI MODE', sub: '"1½ katori dal" · "2 roti" · "1 tbsp ghee"', desc: 'Log in katori, ladle, roti, piece. Feels natural for Indian cooking.' },
                { id: 'grams'  as Units, emoji: '⚖️', label: 'GRAMS MODE',  sub: '"150g dal" · "60g atta" · "5g ghee"', desc: 'Log by weight. Better for precision tracking with a kitchen scale.' },
              ]).map(opt => (
                <button key={opt.id} onClick={() => setUnits(opt.id)} style={choiceBtn(units === opt.id, { padding: '20px' })}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{opt.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: 0.5, marginBottom: 6 }}>{opt.label}</div>
                      <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 6 }}>{opt.desc}</div>
                      <div style={{ fontFamily: B.mono, fontSize: 11, color: units === opt.id ? B.turmeric : B.ink3 }}>{opt.sub}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Done ──────────────────────────────────────────────── */}
        {step === 'done' && (
          <div style={{ textAlign: 'center', paddingTop: 16 }}>
            <div style={{
              width: 80, height: 80, borderRadius: 40, background: B.ink, color: B.cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 36, margin: '0 auto 28px',
            }}>
              {name ? name[0].toUpperCase() : '✓'}
            </div>
            <h1 style={{ fontWeight: 900, fontSize: 36, lineHeight: 1.1, letterSpacing: -1, marginBottom: 12 }}>
              {segment === 'pregnant' ? `YOU'RE SET,\n${name.toUpperCase()}.` : `ALL SET,\n${name.toUpperCase()}.`}
            </h1>
            <p style={{ color: B.ink2, fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
              {segment === 'pregnant'
                ? `Your ${getTrimester(parseInt(pregWeeks)||0)}, Week ${pregWeeks} meal plan is ready with pregnancy-safe filtering on.`
                : 'Your personalised meal plan is ready. Let\'s start eating well.'}
            </p>
            {segment === 'pregnant' && (
              <div style={{ borderRadius: 14, background: 'rgba(208,69,40,0.08)', border: `1.5px solid rgba(208,69,40,0.2)`, padding: '14px 16px', marginBottom: 28, textAlign: 'left' }}>
                <p style={{ fontWeight: 800, fontSize: 12, color: B.chili, marginBottom: 6 }}>Pregnancy-safe mode is ON</p>
                <ul style={{ fontSize: 11, color: B.ink2, lineHeight: 1.9, margin: 0, padding: 0, listStyle: 'none' }}>
                  <li>· High-mercury fish (Surmai, Shark, Swordfish) flagged</li>
                  <li>· Raw papaya, excess methi warnings shown</li>
                  <li>· Unpasteurised dairy highlighted</li>
                  <li>· Week {pregWeeks} nutrient targets applied</li>
                </ul>
              </div>
            )}
            <button
              onClick={finish}
              style={{
                width: '100%', padding: '18px 20px', borderRadius: 999,
                background: B.ink, color: B.cream, border: 'none', cursor: 'pointer',
                fontFamily: B.display, fontWeight: 900, fontSize: 14, letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Open My Dashboard →
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom nav ──────────────────────────────────────────────── */}
      {step !== 'done' && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          padding: '16px 24px 32px', background: B.bg,
          borderTop: `1.5px solid rgba(20,19,17,0.1)`,
          display: 'flex', gap: 10,
        }}>
          {step !== 'splash' && step !== 'name' && (
            <button
              onClick={back}
              style={{
                flex: 1, padding: '16px 20px', borderRadius: 999,
                border: `2px solid rgba(20,19,17,0.2)`, background: 'transparent',
                color: B.ink, cursor: 'pointer', fontFamily: B.display,
                fontWeight: 900, fontSize: 13, letterSpacing: 0.5, textTransform: 'uppercase',
              }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={step === 'units' ? next : next}
            disabled={!canContinue}
            style={{
              flex: 2, padding: '16px 20px', borderRadius: 999,
              background: canContinue ? B.ink : 'rgba(20,19,17,0.12)',
              color: canContinue ? B.cream : B.ink3,
              border: 'none', cursor: canContinue ? 'pointer' : 'not-allowed',
              fontFamily: B.display, fontWeight: 900, fontSize: 13,
              letterSpacing: 0.5, textTransform: 'uppercase',
              transition: 'all .15s ease',
            }}
          >
            {step === 'units' ? 'Finish Setup →' : step === 'splash' ? "Let's fix this →" : step === 'state' ? (state ? 'Continue →' : 'Skip →') : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  )
}
