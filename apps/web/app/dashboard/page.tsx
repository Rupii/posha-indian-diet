'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'
import { getMealsForProfile, MealSlot as LibMealSlot } from '@/lib/meal-data'

const TODAY = new Date()

const B = {
  bg:      '#f3e9d2',
  bgDark:  '#1e2a1a',
  ink:     '#141311',
  ink2:    'rgba(20,19,17,0.7)',
  ink3:    'rgba(20,19,17,0.5)',
  cream:   '#fbf4e1',
  chili:   '#d04528',
  turmeric:'#e8a835',
  moss:    '#4a5a2e',
  plum:    '#6b2d3a',
  display: '"Archivo", "Helvetica Neue", Arial, sans-serif',
  serif:   '"Fraunces", Georgia, serif',
  mono:    '"DM Mono", ui-monospace, Menlo, monospace',
}

const MEAL_ACCENTS   = [B.chili, B.turmeric, B.moss, B.plum, B.bgDark]
const CARD_PALETTES  = [
  { bg: B.chili,    fg: B.cream, acc: B.cream     },
  { bg: B.turmeric, fg: B.ink,   acc: B.ink       },
  { bg: B.cream,    fg: B.ink,   acc: B.chili     },
  { bg: B.moss,     fg: B.cream, acc: B.cream     },
  { bg: B.bgDark,   fg: B.cream, acc: B.turmeric  },
]

interface DashSlot {
  id: string
  slotType: string
  time: string
  dish: string
  sub: string
  calories: number
  done: boolean
}

function getDayLabel(offset: number) {
  if (offset === 0) return 'Today'
  if (offset === 1) return 'Tomorrow'
  const d = new Date(TODAY)
  d.setDate(TODAY.getDate() + offset)
  return d.toLocaleDateString('en-IN', { weekday: 'short' })
}

function getDayDate(offset: number) {
  const d = new Date(TODAY)
  d.setDate(TODAY.getDate() + offset)
  return d.getDate()
}

function StatRing({ size, stroke, value, color, trackColor, label }: {
  size: number; stroke: number; value: number
  color: string; trackColor: string; label: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - Math.max(0, Math.min(1, value)))
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: B.display, fontSize: size > 100 ? 32 : 15, fontWeight: 900, color: B.cream, letterSpacing: -1 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

function StatBar({ value, color, track }: { value: number; color: string; track: string }) {
  return (
    <div style={{ height: 3, background: track, borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
      <div style={{ width: `${Math.min(100, value * 100)}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-11"/>
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h12l-3-3M17 17H5l3 3"/>
    </svg>
  )
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const selectedDay  = Math.min(Math.max(parseInt(searchParams.get('day') ?? '0', 10) || 0, 0), 6)

  const [profile, setProfile] = useState<{
    name?: string; region?: string; state?: string; dietary?: string
  } | null>(null)
  const [doneMeals,    setDoneMeals]    = useState<Set<string>>(new Set())
  const [swappedMeals, setSwappedMeals] = useState<Record<string, number>>({})

  useEffect(() => {
    const raw = localStorage.getItem('poshaProfile')
    if (raw) {
      try { setProfile(JSON.parse(raw)) } catch { setProfile({}) }
    }
  }, [])

  // All meals for this user's region/dietary preference
  const allMeals: LibMealSlot[] = useMemo(() =>
    profile !== null
      ? getMealsForProfile(profile.region ?? 'south', profile.state, profile.dietary)
      : [],
    [profile]
  )

  // Alternative pool per slotType (for SWAP)
  const altPool = useMemo(() => {
    const pool: Record<string, LibMealSlot[]> = {}
    allMeals.forEach(m => {
      if (!pool[m.slotType]) pool[m.slotType] = []
      if (!pool[m.slotType].find(x => x.dish === m.dish)) pool[m.slotType].push(m)
    })
    return pool
  }, [allMeals])

  const dayMeals = allMeals.filter(m => m.day === selectedDay)

  const slots: DashSlot[] = dayMeals.map((m, i) => {
    const id = `${selectedDay}-${i}`
    const swapIdx = swappedMeals[id]
    const meal = swapIdx !== undefined ? (altPool[m.slotType]?.[swapIdx] ?? m) : m
    return {
      id,
      slotType: meal.slotType,
      time:     meal.time,
      dish:     meal.dish,
      sub:      meal.sub,
      calories: meal.calories,
      done:     doneMeals.has(id),
    }
  })

  function toggleDone(id: string) {
    setDoneMeals(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function swapMeal(id: string, slotType: string, currentDish: string) {
    const pool = altPool[slotType] ?? []
    if (pool.length < 2) return
    const currentIdx = swappedMeals[id] ?? pool.findIndex(m => m.dish === currentDish)
    const nextIdx = ((currentIdx === -1 ? 0 : currentIdx) + 1) % pool.length
    setSwappedMeals(prev => ({ ...prev, [id]: nextIdx }))
  }

  const doneSlots    = slots.filter(s => s.done)
  const remainSlots  = slots.filter(s => !s.done)
  const nextMeal     = remainSlots[0] ?? null
  const consumed     = doneSlots.reduce((a, s) => a + s.calories, 0)
  const proteinDone = dayMeals
    .filter((_, i) => doneMeals.has(`${selectedDay}-${i}`))
    .reduce((a, m) => a + (m.protein ?? 0), 0)

  const cal = { current: consumed, target: 2200 }
  const calPct = cal.current / cal.target
  const pctLabel = `${Math.round(calPct * 100)}%`
  const streak = 7

  const nutrition = {
    protein: { current: proteinDone, target: 75 },
    fiber:   { current: 9,           target: 30  },
    water:   { current: 3,           target: 8   },
  }

  const userName = profile?.name ?? 'there'

  const days = Array.from({ length: 7 }, (_, i) => ({
    key: i,
    short: getDayLabel(i),
    num: getDayDate(i),
  }))

  const hour = new Date().getHours()
  const timeOfDay = hour < 12 ? 'MORNING' : hour < 17 ? 'AFTERNOON' : 'EVENING'

  const todayStr = new Date()
    .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    .toUpperCase()
    .replace(', ', ' ')

  return (
    <AppShell activePage="home">

      {/* ═══════════════════════════════════════ MOBILE ═══════ */}
      <div className="md:hidden" style={{ fontFamily: B.display }}>

        {/* Hero */}
        <div style={{ padding: '22px 20px 26px' }}>
          <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase', color: B.chili, fontWeight: 500 }}>
            {timeOfDay} · {cal.current}/{cal.target} KCAL
          </div>
          <h1 style={{ margin: '6px 0 0', fontFamily: B.display, fontSize: 52, letterSpacing: -2.5, lineHeight: 0.88, fontWeight: 900, textTransform: 'uppercase' }}>
            HELLO,<br/>
            <span style={{ fontFamily: B.serif, textTransform: 'none', fontWeight: 400, fontStyle: 'italic', letterSpacing: -1.5 }}>
              {userName}.
            </span>
          </h1>
          <p style={{ margin: '14px 0 0', fontSize: 14.5, color: B.ink2, fontWeight: 500, maxWidth: 300, lineHeight: 1.4 }}>
            {remainSlots.length === 0
              ? 'All meals logged today. Great job!'
              : <>{remainSlots.length} meal{remainSlots.length > 1 ? 's' : ''} left today. Next up —{' '}
                  <b style={{ color: B.chili }}>{nextMeal!.dish.toLowerCase()} at {nextMeal!.slotType}</b>.</>
            }
          </p>
        </div>

        {/* Dark stat card */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ background: B.bgDark, color: B.cream, borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.14, backgroundImage: 'repeating-linear-gradient(45deg, #e8a835 0 1px, transparent 1px 8px)' }}/>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase', opacity: 0.7 }}>TODAY · CALORIES</div>
                <div style={{ fontFamily: B.display, fontSize: 72, fontWeight: 900, letterSpacing: -3, lineHeight: 0.9, marginTop: 4 }}>
                  {cal.current}
                </div>
                <div style={{ fontFamily: B.serif, fontStyle: 'italic', fontSize: 17, opacity: 0.8, marginTop: -4 }}>
                  of {cal.target} kcal
                </div>
              </div>
              <StatRing size={74} stroke={8} value={calPct} color={B.turmeric} trackColor="rgba(255,255,255,0.15)" label={pctLabel} />
            </div>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {[
                { k:'PROTEIN', c:nutrition.protein.current, t:nutrition.protein.target, u:'g',  col:B.turmeric },
                { k:'FIBRE',   c:nutrition.fiber.current,   t:nutrition.fiber.target,   u:'g',  col:'#e6d38f'  },
                { k:'WATER',   c:nutrition.water.current,   t:nutrition.water.target,   u:'',   col:'#8dc7d0'  },
              ].map(x => (
                <div key={x.k}>
                  <div style={{ fontFamily: B.mono, fontSize: 9, letterSpacing: 1.5, opacity: 0.7 }}>{x.k}</div>
                  <div style={{ fontFamily: B.display, fontSize: 22, fontWeight: 900, letterSpacing: -0.8, marginTop: 2 }}>
                    {x.c}<span style={{ opacity: 0.5, fontWeight: 700, fontSize: 12 }}>/{x.t}{x.u}</span>
                  </div>
                  <StatBar value={x.c/x.t} color={x.col} track="rgba(255,255,255,0.12)" />
                </div>
              ))}
            </div>
          </div>

          {/* Streak ribbon */}
          <div style={{ marginTop: 12, background: B.chili, color: B.cream, borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: B.display, fontSize: 54, fontWeight: 900, letterSpacing: -2.5, lineHeight: 1 }}>{streak}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: B.display, fontSize: 15, fontWeight: 800, letterSpacing: -0.3, textTransform: 'uppercase' }}>DAYS IN A ROW.</div>
              <div style={{ fontFamily: B.serif, fontStyle: 'italic', fontSize: 14, opacity: 0.9, marginTop: 1 }}>Dinner holds the streak tonight.</div>
            </div>
            <Link href="/log" style={{ padding: '8px 12px', background: B.cream, color: B.ink, border: 'none', borderRadius: 999, fontFamily: B.display, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none' }}>
              Log →
            </Link>
          </div>
        </div>

        {/* Section heading */}
        <div style={{ padding: '24px 20px 6px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: B.display, fontSize: 24, fontWeight: 900, letterSpacing: -1, textTransform: 'uppercase', margin: 0 }}>THE MENU.</h2>
          <Link href="/meal-plans" style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: B.chili, fontWeight: 700, textDecoration: 'none' }}>
            FULL WEEK →
          </Link>
        </div>

        {/* Day chips */}
        <div className="scrollbar-hide" style={{ padding: '6px 20px 2px', display: 'flex', gap: 6, overflowX: 'auto' }}>
          {days.map((d, i) => {
            const active = selectedDay === i
            return (
              <Link
                key={d.key}
                href={`/dashboard?day=${i}`}
                style={{
                  flexShrink: 0, padding: '8px 12px', borderRadius: 999,
                  border: active ? 'none' : `1.5px solid ${B.ink}`,
                  background: active ? B.ink : 'transparent',
                  color: active ? B.cream : B.ink,
                  fontFamily: B.display, fontWeight: 800, fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: 0.3, textDecoration: 'none', display: 'block',
                }}
              >
                {d.short} · {d.num}
              </Link>
            )
          })}
        </div>

        {/* Meal list */}
        <div style={{ padding: '10px 20px 0' }}>
          {slots.map((slot, idx) => {
            const accent = MEAL_ACCENTS[idx % 5]
            return (
              <div key={slot.id} style={{
                padding: '16px 0',
                borderTop: idx === 0 ? `1.5px solid ${B.ink}` : `1px solid rgba(20,19,17,0.12)`,
                display: 'flex', gap: 12, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 999, flexShrink: 0,
                  background: slot.done ? accent : 'transparent',
                  border: `1.5px solid ${accent}`,
                  display: 'grid', placeItems: 'center',
                  color: slot.done ? B.cream : accent,
                  fontFamily: B.display, fontWeight: 900, fontSize: 14,
                }}>
                  {slot.done ? <CheckIcon /> : `0${idx + 1}`}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: accent, fontWeight: 700 }}>
                      {slot.slotType} · {slot.time}
                    </span>
                    <span style={{ fontFamily: B.display, fontWeight: 900, fontSize: 15 }}>
                      {slot.calories}<span style={{ fontFamily: B.mono, fontSize: 9, letterSpacing: 1, marginLeft: 2, fontWeight: 400, color: B.ink3 }}>KCAL</span>
                    </span>
                  </div>
                  <div style={{ fontFamily: B.display, fontSize: 22, fontWeight: 900, letterSpacing: -0.8, textTransform: 'uppercase', marginTop: 3, lineHeight: 1.05 }}>
                    {slot.dish}
                  </div>
                  <div style={{ fontFamily: B.serif, fontStyle: 'italic', fontSize: 14, color: B.ink2, marginTop: 2 }}>
                    {slot.sub}.
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button
                      onClick={() => toggleDone(slot.id)}
                      style={{
                        padding: '6px 10px', borderRadius: 999,
                        border: `1.5px solid ${slot.done ? accent : B.ink}`,
                        background: slot.done ? accent : 'transparent',
                        fontFamily: B.display, fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5,
                        textTransform: 'uppercase', cursor: 'pointer',
                        color: slot.done ? B.cream : B.ink,
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}
                    >
                      {slot.done ? <><CheckIcon /> DONE</> : 'MARK DONE'}
                    </button>
                    {!slot.done && (
                      <button
                        onClick={() => swapMeal(slot.id, slot.slotType, slot.dish)}
                        style={{
                          padding: '6px 10px', borderRadius: 999,
                          border: `1.5px solid rgba(20,19,17,0.2)`, background: 'transparent',
                          fontFamily: B.display, fontSize: 10.5, fontWeight: 800, letterSpacing: 0.5,
                          textTransform: 'uppercase', cursor: 'pointer', color: B.ink,
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                        }}
                      >
                        <SwapIcon /> SWAP
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          <div style={{ borderBottom: `1.5px solid ${B.ink}` }}/>
        </div>

        {/* Quote */}
        <div style={{ margin: '22px 20px 0', padding: '22px 18px', background: B.chili, color: B.cream, borderRadius: 20 }}>
          <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.8 }}>FROM THE KITCHEN</div>
          <div style={{ fontFamily: B.serif, fontSize: 24, fontStyle: 'italic', fontWeight: 400, marginTop: 8, lineHeight: 1.15, letterSpacing: -0.5 }}>
            &ldquo;Eat like a grandmother, not like an influencer.&rdquo;
          </div>
          <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, opacity: 0.8, marginTop: 10, textTransform: 'uppercase' }}>
            — our one rule
          </div>
        </div>

        <div style={{ height: 24 }}/>
      </div>

      {/* ═══════════════════════════════════════ DESKTOP ══════ */}
      <div className="hidden md:block" style={{ fontFamily: B.display }}>

        {/* Hero 2-col */}
        <div style={{ padding: '40px 40px 32px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32, borderBottom: `1.5px solid ${B.ink}` }}>
          {/* Left */}
          <div>
            <div style={{ fontFamily: B.mono, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: B.chili, fontWeight: 700 }}>
              {timeOfDay} EDITION · {todayStr}
            </div>
            <h1 style={{ margin: '10px 0 0', fontFamily: B.display, fontSize: 120, fontWeight: 900, letterSpacing: -5, lineHeight: 0.86, textTransform: 'uppercase' }}>
              HELLO,<br/>
              <span style={{ fontFamily: B.serif, textTransform: 'none', fontStyle: 'italic', fontWeight: 400, letterSpacing: -4, color: B.chili }}>
                {userName}.
              </span>
            </h1>
            <p style={{ maxWidth: 480, marginTop: 20, fontSize: 16, fontWeight: 500, color: B.ink2, lineHeight: 1.5 }}>
              {remainSlots.length === 0
                ? 'All meals logged today. Well done!'
                : <>{remainSlots.length} meal{remainSlots.length > 1 ? 's' : ''} left in the day.{' '}
                    Next up is{' '}
                    <b style={{ color: B.chili }}>{nextMeal!.dish.toLowerCase()} — {nextMeal!.slotType.toLowerCase()}</b>.</>
              }
            </p>
          </div>

          {/* Right — stat card */}
          <div style={{ background: B.bgDark, color: B.cream, borderRadius: 20, padding: 26, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'repeating-linear-gradient(45deg, #e8a835 0 1px, transparent 1px 10px)' }}/>
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: B.mono, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', opacity: 0.7 }}>TODAY&apos;S INTAKE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 10 }}>
                <StatRing size={140} stroke={10} value={calPct} color={B.turmeric} trackColor="rgba(255,255,255,0.12)" label={pctLabel} />
                <div>
                  <div style={{ fontFamily: B.display, fontSize: 64, fontWeight: 900, letterSpacing: -2.5, lineHeight: 0.9 }}>{cal.current}</div>
                  <div style={{ fontFamily: B.serif, fontStyle: 'italic', fontSize: 18, opacity: 0.8 }}>of {cal.target} kcal</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                {[
                  { k:'PROTEIN', c:nutrition.protein.current, t:nutrition.protein.target, u:'g', col:B.turmeric },
                  { k:'FIBRE',   c:nutrition.fiber.current,   t:nutrition.fiber.target,   u:'g', col:'#e6d38f'  },
                  { k:'WATER',   c:nutrition.water.current,   t:nutrition.water.target,   u:'',  col:'#8dc7d0'  },
                ].map(x => (
                  <div key={x.k}>
                    <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, opacity: 0.7 }}>{x.k}</div>
                    <div style={{ fontFamily: B.display, fontSize: 26, fontWeight: 900, letterSpacing: -1, marginTop: 2 }}>
                      {x.c}<span style={{ opacity: 0.5, fontSize: 14 }}>/{x.t}{x.u}</span>
                    </div>
                    <StatBar value={x.c/x.t} color={x.col} track="rgba(255,255,255,0.12)" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Menu section */}
        <div style={{ padding: '28px 40px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, letterSpacing: -2, textTransform: 'uppercase', margin: 0 }}>
              THE MENU. <span style={{ color: B.chili }}>TODAY.</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {days.map((d, i) => {
                const active = selectedDay === i
                return (
                  <Link
                    key={d.key}
                    href={`/dashboard?day=${i}`}
                    style={{
                      padding: '7px 11px', borderRadius: 999,
                      border: active ? 'none' : `1.5px solid ${B.ink}`,
                      background: active ? B.ink : 'transparent',
                      color: active ? B.cream : B.ink,
                      fontFamily: B.display, fontWeight: 800, fontSize: 11,
                      textTransform: 'uppercase', letterSpacing: 0.3, textDecoration: 'none', display: 'block',
                    }}
                  >
                    {d.short} · {d.num}
                  </Link>
                )
              })}
              <Link href="/meal-plans" style={{
                padding: '10px 16px', borderRadius: 999, border: `1.5px solid ${B.ink}`,
                background: 'transparent', fontFamily: B.display, fontSize: 12, fontWeight: 900,
                letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none', color: B.ink, marginLeft: 6,
              }}>
                SEE FULL WEEK
              </Link>
            </div>
          </div>

          {/* 5-col meal cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {slots.map((slot, idx) => {
              const pal = CARD_PALETTES[idx % 5]
              return (
                <div key={slot.id} style={{
                  background: pal.bg, color: pal.fg, borderRadius: 16, padding: 18,
                  minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, fontWeight: 700, opacity: 0.9 }}>
                        0{idx + 1} · {slot.slotType.toUpperCase()}
                      </span>
                      {slot.done && (
                        <span style={{ width: 22, height: 22, borderRadius: 11, background: pal.acc, color: pal.bg, display: 'grid', placeItems: 'center' }}>
                          <CheckIcon />
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1.5, opacity: 0.7, marginTop: 2 }}>{slot.time.toUpperCase()}</div>
                    <div style={{ fontFamily: B.display, fontWeight: 900, fontSize: 22, letterSpacing: -0.8, textTransform: 'uppercase', marginTop: 14, lineHeight: 1.05 }}>
                      {slot.dish}
                    </div>
                    <div style={{ fontFamily: B.serif, fontStyle: 'italic', fontSize: 14, opacity: 0.85, marginTop: 6 }}>
                      {slot.sub}.
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14 }}>
                    <span style={{ fontFamily: B.display, fontSize: 28, fontWeight: 900, letterSpacing: -1 }}>
                      {slot.calories}<span style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1, marginLeft: 3, fontWeight: 500 }}>KCAL</span>
                    </span>
                    {!slot.done && (
                      <button
                        onClick={() => swapMeal(slot.id, slot.slotType, slot.dish)}
                        style={{
                          padding: '6px 10px', borderRadius: 999, border: `1.5px solid ${pal.acc}`,
                          background: 'transparent', color: pal.acc,
                          fontFamily: B.display, fontSize: 10, fontWeight: 900,
                          letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                        }}
                      >
                        SWAP
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quote + streak strip */}
          <div style={{
            marginTop: 20, background: B.ink, color: B.cream, borderRadius: 20,
            padding: '28px 32px', display: 'grid', gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center', gap: 24,
          }}>
            <div style={{ fontFamily: B.display, fontSize: 96, fontWeight: 900, letterSpacing: -4, color: B.turmeric, lineHeight: 1 }}>
              {streak}
            </div>
            <div>
              <div style={{ fontFamily: B.mono, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', opacity: 0.7 }}>STREAK · SEVEN DAYS</div>
              <div style={{ fontFamily: B.serif, fontStyle: 'italic', fontSize: 28, marginTop: 6, lineHeight: 1.2 }}>
                &ldquo;Eat like a grandmother, not like an influencer.&rdquo;
              </div>
            </div>
            <Link href="/log" style={{
              padding: '12px 18px', borderRadius: 999, background: B.turmeric, color: B.ink,
              fontFamily: B.display, fontSize: 12, fontWeight: 900,
              letterSpacing: 0.5, textTransform: 'uppercase', textDecoration: 'none',
            }}>
              LOG DINNER →
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
