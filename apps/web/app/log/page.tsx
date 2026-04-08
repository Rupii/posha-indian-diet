'use client';

import { useState } from 'react';
import UnitToggle from '@/components/unit-toggle/UnitToggle';
import { AppShell } from '@/components/layout/AppShell';

// ─── Types ────────────────────────────────────────────────────────────────────

type UnitValue = 'katori' | 'grams';
type MealSlot = 'breakfast' | 'snack' | 'lunch' | 'chai' | 'dinner';

interface LogEntry {
  id: string;
  name: string;
  amount: number;
  unit: UnitValue;
  mealSlot: MealSlot;
  calories: number;
  protein: number;
  carbs: number;
}

// ─── Placeholder data ─────────────────────────────────────────────────────────

const QUICK_ADD_MEALS: string[] = [
  'Dal tadka',
  'Roti',
  'Rice',
  'Curd',
  'Banana',
  'Chai',
];

const MEAL_SLOTS: { value: MealSlot; label: string }[] = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'snack', label: 'Snack' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'chai', label: 'Chai time' },
  { value: 'dinner', label: 'Dinner' },
];

const PLACEHOLDER_LOG: LogEntry[] = [
  {
    id: '1',
    name: 'Dal tadka',
    amount: 1,
    unit: 'katori',
    mealSlot: 'lunch',
    calories: 198,
    protein: 11,
    carbs: 28,
  },
  {
    id: '2',
    name: 'Roti',
    amount: 2,
    unit: 'grams',
    mealSlot: 'breakfast',
    calories: 140,
    protein: 4,
    carbs: 29,
  },
  {
    id: '3',
    name: 'Chai',
    amount: 1,
    unit: 'katori',
    mealSlot: 'chai',
    calories: 60,
    protein: 2,
    carbs: 9,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NutrientPill({ label, value }: { label: string; value: number }) {
  return (
    <span className="nutrient-pill">
      {label} {value}g
    </span>
  );
}

function RecentLogCard({
  entry,
  onUnitChange,
}: {
  entry: LogEntry;
  onUnitChange: (id: string, unit: UnitValue) => void;
}) {
  const mealLabel =
    MEAL_SLOTS.find((s) => s.value === entry.mealSlot)?.label ?? entry.mealSlot;

  return (
    <div className="card flex items-start justify-between gap-3">
      {/* Left */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-warm-900 truncate">{entry.name}</p>
          <span className="text-xs text-warm-400 bg-warm-100 rounded-full px-2 py-0.5 shrink-0">
            {mealLabel}
          </span>
        </div>

        <p className="text-sm text-warm-500">
          {entry.amount}{' '}
          {entry.unit === 'katori' ? 'katori' : `g`}
          &nbsp;·&nbsp;
          <span className="font-medium text-warm-700">{entry.calories} kcal</span>
        </p>

        <div className="flex flex-wrap gap-1.5">
          <NutrientPill label="Protein" value={entry.protein} />
          <NutrientPill label="Carbs" value={entry.carbs} />
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <UnitToggle
          size="sm"
          value={entry.unit}
          onChange={(v) => onUnitChange(entry.id, v)}
        />
        <button
          type="button"
          className="text-xs text-saffron-500 font-medium hover:text-saffron-600 underline underline-offset-2 min-h-[32px] px-1"
          aria-label={`Edit ${entry.name} entry`}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentLog, setRecentLog] = useState<LogEntry[]>(PLACEHOLDER_LOG);

  // Manual add form state
  const [formName, setFormName] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formUnit, setFormUnit] = useState<UnitValue | null>(null);
  const [formMealSlot, setFormMealSlot] = useState<MealSlot | null>(null);
  const [formError, setFormError] = useState('');

  function handleUnitChange(id: string, unit: UnitValue) {
    setRecentLog((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, unit } : entry))
    );
  }

  function handleQuickAdd(mealName: string) {
    // Placeholder: in production this would open a pre-filled form or call an API
    alert(`Quick-add "${mealName}" — connect to food database to complete.`);
  }

  function handleManualAdd(e: React.FormEvent) {
    e.preventDefault();

    if (!formName.trim()) {
      setFormError('Please enter a food name.');
      return;
    }
    if (!formAmount || Number(formAmount) <= 0) {
      setFormError('Please enter a valid amount.');
      return;
    }
    if (!formUnit) {
      setFormError('Please select a unit (Katori or Grams).');
      return;
    }
    if (!formMealSlot) {
      setFormError('Please select a meal slot.');
      return;
    }

    setFormError('');

    const newEntry: LogEntry = {
      id: String(Date.now()),
      name: formName.trim(),
      amount: Number(formAmount),
      unit: formUnit,
      mealSlot: formMealSlot,
      // Placeholder nutrient data — replace with real API call
      calories: 0,
      protein: 0,
      carbs: 0,
    };

    setRecentLog((prev) => [newEntry, ...prev].slice(0, 10));
    setFormName('');
    setFormAmount('');
    setFormUnit(null);
    setFormMealSlot(null);
  }

  return (
    <AppShell activePage="log">
    <main className="px-4 md:px-8 py-6 space-y-6 max-w-2xl">

      {/* ── Page title ── */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-warm-900">Log Food</h1>
        <span className="text-sm text-warm-400 font-medium">Today</span>
      </header>

      {/* ── Search bar ── */}
      <div className="relative">
        <span
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-400 pointer-events-none"
          aria-hidden="true"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </span>
        <input
          type="search"
          className="input pl-10 pr-4"
          placeholder="Search dal, poha, banana..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search Indian foods"
        />
      </div>

      {/* ── Voice log button ── */}
      <button
        type="button"
        className="btn-secondary flex items-center justify-center gap-2 w-full"
        aria-label="Log with voice"
        onClick={() => alert("Voice logging coming soon! Say: 'ek katori dal'")}
      >
        <span aria-hidden="true">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </span>
        <span>
          Log with voice{' '}
          <span className="text-warm-400 font-normal text-sm">
            — "ek katori dal"
          </span>
        </span>
      </button>

      {/* ── Quick-add section ── */}
      <section aria-labelledby="quick-add-heading">
        <h2 id="quick-add-heading" className="section-title mb-3">
          Quick Add
        </h2>
        <div className="flex flex-wrap gap-2" role="list">
          {QUICK_ADD_MEALS.map((meal) => (
            <button
              key={meal}
              type="button"
              role="listitem"
              onClick={() => handleQuickAdd(meal)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-warm-200 text-sm font-medium text-warm-700
                         hover:border-saffron-500 hover:text-saffron-600 transition-colors
                         min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
            >
              {meal}
            </button>
          ))}
        </div>
      </section>

      {/* ── Recently logged ── */}
      {recentLog.length > 0 && (
        <section aria-labelledby="recent-heading">
          <h2 id="recent-heading" className="section-title mb-3">
            Recently Logged
          </h2>
          <div className="space-y-3">
            {recentLog.slice(0, 3).map((entry) => (
              <RecentLogCard
                key={entry.id}
                entry={entry}
                onUnitChange={handleUnitChange}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Manual add form ── */}
      <section aria-labelledby="manual-add-heading">
        <h2 id="manual-add-heading" className="section-title mb-3">
          Add Manually
        </h2>

        <form
          onSubmit={handleManualAdd}
          noValidate
          className="card space-y-4"
          aria-label="Manually add a food entry"
        >
          {/* Food name */}
          <div className="space-y-1">
            <label htmlFor="food-name" className="text-sm font-medium text-warm-700">
              Food name
            </label>
            <input
              id="food-name"
              type="text"
              className="input"
              placeholder="e.g. Poha, Idli, Rajma..."
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Amount + Unit toggle */}
          <div className="space-y-1">
            <label htmlFor="food-amount" className="text-sm font-medium text-warm-700">
              Amount
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                id="food-amount"
                type="number"
                min="0"
                step="any"
                className="input w-28 shrink-0"
                placeholder="e.g. 1"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
              />
              {/* Unit toggle — no default, must be explicitly picked */}
              <div className="flex flex-col gap-1">
                {formUnit === null && (
                  <span className="text-xs text-warm-400">Pick a unit</span>
                )}
                {formUnit !== null ? (
                  <UnitToggle
                    value={formUnit}
                    onChange={setFormUnit}
                  />
                ) : (
                  <div className="inline-flex items-center gap-0.5 rounded-full bg-warm-100 p-0.5">
                    <button
                      type="button"
                      onClick={() => setFormUnit('katori')}
                      className="px-3.5 py-1.5 rounded-full bg-warm-100 text-warm-500 text-sm font-medium
                                 hover:bg-warm-200 transition-colors min-h-[40px]
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
                    >
                      🫙 Katori
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormUnit('grams')}
                      className="px-3.5 py-1.5 rounded-full bg-warm-100 text-warm-500 text-sm font-medium
                                 hover:bg-warm-200 transition-colors min-h-[40px]
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
                    >
                      ⚖️ Grams
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Meal slot selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-warm-700">Meal slot</p>
            <div
              role="group"
              aria-label="Meal slot"
              className="flex flex-wrap gap-2"
            >
              {MEAL_SLOTS.map((slot) => (
                <button
                  key={slot.value}
                  type="button"
                  aria-pressed={formMealSlot === slot.value}
                  onClick={() => setFormMealSlot(slot.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors min-h-[40px]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500
                    ${
                      formMealSlot === slot.value
                        ? 'bg-saffron-500 text-white border-saffron-500'
                        : 'bg-white text-warm-600 border-warm-200 hover:border-saffron-400'
                    }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error message */}
          {formError && (
            <p role="alert" className="text-sm text-red-600">
              {formError}
            </p>
          )}

          {/* Submit */}
          <button type="submit" className="btn-primary w-full">
            Add to log
          </button>
        </form>
      </section>
    </main>
    </AppShell>
  );
}
