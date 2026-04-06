'use client';

import { useState } from 'react';
import UnitToggle from '@/components/unit-toggle/UnitToggle';

// ─── Types ────────────────────────────────────────────────────────────────────

type UnitPref = 'katori' | 'grams';

interface ThaliItem {
  id: string;
  name: string;
  emoji: string;
  category: 'protein' | 'carb' | 'veg' | 'dairy' | 'condiment' | 'fat';
  grams: number;
  katori: string; // e.g. "1 katori", "1 piece", "1 tsp"
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// ─── Food Catalogue ───────────────────────────────────────────────────────────

const FOOD_CATALOGUE: ThaliItem[] = [
  { id: 'dal',     name: 'Dal',     emoji: '🫕', category: 'protein',   grams: 150, katori: '1 katori',  calories: 210, protein: 12,  carbs: 30,   fat: 5   },
  { id: 'rice',    name: 'Rice',    emoji: '🍚', category: 'carb',      grams: 150, katori: '1 katori',  calories: 195, protein: 4,   carbs: 43,   fat: 0.5 },
  { id: 'roti',    name: 'Roti',    emoji: '🫓', category: 'carb',      grams: 30,  katori: '1 piece',   calories: 80,  protein: 2,   carbs: 15,   fat: 1   },
  { id: 'sabzi',   name: 'Sabzi',   emoji: '🥬', category: 'veg',       grams: 100, katori: '1 katori',  calories: 80,  protein: 3,   carbs: 12,   fat: 4   },
  { id: 'curd',    name: 'Curd',    emoji: '🥛', category: 'dairy',     grams: 150, katori: '1 katori',  calories: 90,  protein: 5,   carbs: 6,    fat: 6   },
  { id: 'pickle',  name: 'Pickle',  emoji: '🫙', category: 'condiment', grams: 10,  katori: '1 tsp',     calories: 15,  protein: 0,   carbs: 2,    fat: 0   },
  { id: 'salad',   name: 'Salad',   emoji: '🥗', category: 'veg',       grams: 80,  katori: '½ katori',  calories: 25,  protein: 1,   carbs: 5,    fat: 2   },
  { id: 'papad',   name: 'Papad',   emoji: '🥙', category: 'condiment', grams: 15,  katori: '1 piece',   calories: 60,  protein: 2,   carbs: 10,   fat: 1   },
  { id: 'ghee',    name: 'Ghee',    emoji: '🧈', category: 'fat',       grams: 5,   katori: '1 tsp',     calories: 45,  protein: 0,   carbs: 0,    fat: 5   },
  { id: 'chutney', name: 'Chutney', emoji: '🟢', category: 'condiment', grams: 20,  katori: '1 tbsp',    calories: 30,  protein: 1,   carbs: 5,    fat: 0   },
  { id: 'paneer',  name: 'Paneer',  emoji: '🧀', category: 'protein',   grams: 50,  katori: '⅓ katori',  calories: 135, protein: 9,   carbs: 0.5,  fat: 10  },
  { id: 'chaas',   name: 'Chaas',   emoji: '🥤', category: 'dairy',     grams: 200, katori: '1 glass',   calories: 40,  protein: 2,   carbs: 4,    fat: 2   },
];

// ─── Balance Score Logic ──────────────────────────────────────────────────────

function getBalanceScore(items: ThaliItem[]): {
  label: string;
  proteinPct: number;
  carbPct: number;
  vegPct: number;
  tip: string | null;
} {
  const totalCal = items.reduce((s, i) => s + i.calories, 0);
  if (totalCal === 0) {
    return { label: 'Add food to see balance', proteinPct: 0, carbPct: 0, vegPct: 0, tip: null };
  }

  const proteinCal = items
    .filter((i) => i.category === 'protein' || i.category === 'dairy')
    .reduce((s, i) => s + i.calories, 0);
  const carbCal = items
    .filter((i) => i.category === 'carb')
    .reduce((s, i) => s + i.calories, 0);
  const vegCal = items
    .filter((i) => i.category === 'veg')
    .reduce((s, i) => s + i.calories, 0);

  const proteinPct = Math.round((proteinCal / totalCal) * 100);
  const carbPct = Math.round((carbCal / totalCal) * 100);
  const vegPct = Math.round((vegCal / totalCal) * 100);

  const isProteinLight = proteinPct < 15;
  const isCarbHeavy = carbPct > 55;

  let label = 'Well balanced';
  let tip: string | null = null;

  if (isCarbHeavy && isProteinLight) {
    label = 'Carb-heavy & Protein-light';
    tip = 'protein-light';
  } else if (isCarbHeavy) {
    label = 'Carb-heavy';
    tip = 'carb-heavy';
  } else if (isProteinLight) {
    label = 'Protein-light';
    tip = 'protein-light';
  }

  return { label, proteinPct, carbPct, vegPct, tip };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BalanceBar({
  proteinPct,
  carbPct,
  vegPct,
  label,
}: {
  proteinPct: number;
  carbPct: number;
  vegPct: number;
  label: string;
}) {
  const restPct = Math.max(0, 100 - proteinPct - carbPct - vegPct);
  const isBalanced = label === 'Well balanced';

  return (
    <div className="card mb-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-warm-700">Balance</span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            isBalanced
              ? 'bg-forest-100 text-forest-600'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Segmented bar */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5 bg-warm-100">
        {proteinPct > 0 && (
          <div
            className="bg-forest-500 transition-all duration-300"
            style={{ width: `${proteinPct}%` }}
            title={`Protein ${proteinPct}%`}
          />
        )}
        {carbPct > 0 && (
          <div
            className="bg-amber-400 transition-all duration-300"
            style={{ width: `${carbPct}%` }}
            title={`Carbs ${carbPct}%`}
          />
        )}
        {vegPct > 0 && (
          <div
            className="bg-green-400 transition-all duration-300"
            style={{ width: `${vegPct}%` }}
            title={`Veg ${vegPct}%`}
          />
        )}
        {restPct > 0 && (
          <div
            className="bg-warm-200 transition-all duration-300"
            style={{ width: `${restPct}%` }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-2">
        <span className="flex items-center gap-1 text-xs text-warm-500">
          <span className="w-2 h-2 rounded-full bg-forest-500 inline-block" />
          Protein {proteinPct}%
        </span>
        <span className="flex items-center gap-1 text-xs text-warm-500">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          Carbs {carbPct}%
        </span>
        <span className="flex items-center gap-1 text-xs text-warm-500">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          Veg {vegPct}%
        </span>
      </div>
    </div>
  );
}

function MacroFooter({
  items,
  unitPref,
}: {
  items: ThaliItem[];
  unitPref: UnitPref | null;
}) {
  const totalCal = items.reduce((s, i) => s + i.calories, 0);
  const totalProtein = items.reduce((s, i) => s + i.protein, 0);
  const totalCarbs = items.reduce((s, i) => s + i.carbs, 0);
  const totalFat = items.reduce((s, i) => s + i.fat, 0);
  const totalGrams = items.reduce((s, i) => s + i.grams, 0);

  return (
    <div className="card mb-3 bg-saffron-50 border-saffron-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-warm-800">Thali totals</span>
        {unitPref === 'grams' && (
          <span className="text-xs text-warm-500">{totalGrams}g total</span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center">
          <p className="text-xl font-bold text-saffron-600">{totalCal}</p>
          <p className="text-xs text-warm-500">kcal</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-forest-500">{totalProtein.toFixed(1)}g</p>
          <p className="text-xs text-warm-500">protein</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-amber-500">{totalCarbs.toFixed(1)}g</p>
          <p className="text-xs text-warm-500">carbs</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-warm-600">{totalFat.toFixed(1)}g</p>
          <p className="text-xs text-warm-500">fat</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ThaliBuilder() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [unitPref, setUnitPref] = useState<UnitPref | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const selectedItems = FOOD_CATALOGUE.filter((f) => selectedIds.has(f.id));
  const balance = getBalanceScore(selectedItems);

  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setSuggestion(null);
  }

  function handleMakeHealthier() {
    const tip = balance.tip;
    if (!tip) {
      setSuggestion('Your thali already looks balanced!');
      return;
    }
    if (tip === 'carb-heavy') {
      const hasRice = selectedIds.has('rice');
      setSuggestion(
        hasRice
          ? 'Try replacing Rice with ragi or bajra roti — they have a lower glycemic index and more fibre.'
          : 'Swap some of your carbs for ragi roti or bajra roti to improve the balance.',
      );
    } else if (tip === 'protein-light') {
      const hasDal = selectedIds.has('dal');
      const hasPaneer = selectedIds.has('paneer');
      if (!hasDal && !hasPaneer) {
        setSuggestion('Add Dal or Paneer to boost protein — both are great plant-based sources.');
      } else if (!hasDal) {
        setSuggestion('Add Dal to your thali — it pairs perfectly with rice or roti and adds protein.');
      } else {
        setSuggestion('Add Paneer or Chaas to your thali for an extra protein boost.');
      }
    }
  }

  const unitLabel = (item: ThaliItem) =>
    unitPref === 'grams' ? `${item.grams}g` : item.katori;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-32 pt-2">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-warm-900">Build your thali</h2>
        <UnitToggle
          value={unitPref ?? 'katori'}
          onChange={(v) => setUnitPref(v)}
          size="sm"
        />
      </div>

      {/* ── Visual thali plate ── */}
      <div className="flex justify-center mb-4">
        <div
          className="relative w-72 h-72 rounded-full bg-amber-50 border-4 border-amber-200 flex flex-wrap content-center justify-center gap-2 p-6 shadow-inner"
          aria-label="Thali plate"
        >
          {selectedItems.length === 0 ? (
            <p className="text-warm-400 text-sm text-center select-none">
              Tap below to add food
            </p>
          ) : (
            selectedItems.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex flex-col items-center bg-white rounded-xl px-2 py-1.5 shadow-sm border border-amber-100 hover:border-saffron-400 transition-colors"
                aria-label={`Remove ${item.name}`}
              >
                <span className="text-xl leading-none">{item.emoji}</span>
                <span className="text-[10px] font-medium text-warm-700 mt-0.5 leading-tight">
                  {item.name}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Balance bar ── */}
      <BalanceBar
        proteinPct={balance.proteinPct}
        carbPct={balance.carbPct}
        vegPct={balance.vegPct}
        label={balance.label}
      />

      {/* ── Macro totals ── */}
      {selectedItems.length > 0 && (
        <MacroFooter items={selectedItems} unitPref={unitPref} />
      )}

      {/* ── Healthier suggestion banner ── */}
      {suggestion && (
        <div className="mb-3 px-4 py-3 rounded-xl bg-forest-50 border border-forest-100 text-sm text-forest-600 flex items-start gap-2">
          <span className="mt-0.5 shrink-0">💡</span>
          <span>{suggestion}</span>
        </div>
      )}

      {/* ── Food selector grid ── */}
      <p className="text-xs font-semibold text-warm-400 uppercase tracking-wider mb-2">
        Add to thali
      </p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {FOOD_CATALOGUE.map((item) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`relative flex flex-col items-center gap-1 rounded-2xl border-2 p-3 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                isSelected
                  ? 'border-saffron-500 bg-saffron-50 shadow-sm'
                  : 'border-warm-200 bg-white hover:border-warm-300 hover:bg-warm-50'
              }`}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? 'Remove' : 'Add'} ${item.name}`}
            >
              {/* Check badge */}
              {isSelected && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-saffron-500 flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                </span>
              )}

              <span className="text-2xl leading-none">{item.emoji}</span>
              <span className="text-xs font-semibold text-warm-800 text-center leading-tight">
                {item.name}
              </span>
              <span className="text-[10px] text-warm-400 text-center leading-tight">
                {unitPref ? unitLabel(item) : item.katori}
              </span>
              <div className="flex gap-1 mt-0.5 flex-wrap justify-center">
                <span className="nutrient-pill bg-saffron-100 text-saffron-700">
                  {item.calories} kcal
                </span>
                <span className="nutrient-pill bg-forest-100 text-forest-600">
                  {item.protein}p
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Action buttons ── */}
      <div className="space-y-2">
        <button
          className="btn-secondary w-full gap-2"
          onClick={handleMakeHealthier}
          disabled={selectedItems.length === 0}
        >
          <span>🌿</span>
          Make it healthier
        </button>

        <button
          className="btn-primary w-full gap-2"
          onClick={() => alert('Meal template saved! (placeholder)')}
          disabled={selectedItems.length === 0}
        >
          <span>💾</span>
          Save as meal template
        </button>
      </div>
    </div>
  );
}
