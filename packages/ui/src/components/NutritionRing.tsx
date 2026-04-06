'use client'

import React from 'react'

interface NutritionRingProps {
  calories: number
  target: number
  protein: number  // grams
  carbs: number    // grams
  fat: number      // grams
  size?: number    // px, default 100
}

/**
 * Pure SVG donut chart.
 * Outer ring: calorie progress (amber/saffron-400).
 * Inner ring: macro split (green=protein, orange=carbs, yellow=fat).
 * Center text: calories / target.
 */
export function NutritionRing({
  calories,
  target,
  protein,
  carbs,
  fat,
  size = 100,
}: NutritionRingProps) {
  const cx = size / 2
  const cy = size / 2

  // ── Outer ring (calorie progress) ──────────────────────────────────────────
  const outerStroke = size * 0.1
  const outerR = size / 2 - outerStroke / 2 - 2
  const outerCircumference = 2 * Math.PI * outerR
  const calorieFraction = Math.min(calories / Math.max(target, 1), 1)
  const outerDash = calorieFraction * outerCircumference
  const outerGap = outerCircumference - outerDash

  // ── Inner ring (macro split) ───────────────────────────────────────────────
  const innerStroke = size * 0.09
  const innerR = size / 2 - outerStroke - innerStroke / 2 - 4
  const innerCircumference = 2 * Math.PI * innerR

  const totalMacroGrams = protein + carbs + fat || 1
  const proteinFraction = protein / totalMacroGrams
  const carbsFraction = carbs / totalMacroGrams
  const fatFraction = fat / totalMacroGrams

  // Convert fractions to dash offsets around the circle.
  // SVG strokes start at the 3-o'clock position; rotate -90° so they start at top.
  const proteinDash = proteinFraction * innerCircumference
  const carbsDash = carbsFraction * innerCircumference
  const fatDash = fatFraction * innerCircumference

  // Cumulative offsets (negative stroke-dashoffset shifts start position)
  const proteinOffset = 0
  const carbsOffset = -(proteinDash)
  const fatOffset = -(proteinDash + carbsDash)

  // ── Center text sizing ─────────────────────────────────────────────────────
  const fontSize = size * 0.13
  const subFontSize = size * 0.1
  const labelFontSize = size * 0.09

  const isOverTarget = calories > target

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Nutrition ring: ${calories} of ${target} kcal consumed`}
      role="img"
    >
      {/* ── Track rings (background) ─────────────────────────────────────── */}
      {/* Outer track */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="#fef3c7"
        strokeWidth={outerStroke}
      />

      {/* Inner track */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="#f3f4f6"
        strokeWidth={innerStroke}
      />

      {/* ── Outer ring: calorie progress ─────────────────────────────────── */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke={isOverTarget ? '#ef4444' : '#fbbf24'}
        strokeWidth={outerStroke}
        strokeDasharray={`${outerDash} ${outerGap}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />

      {/* ── Inner ring: macro split ───────────────────────────────────────── */}
      {/* Protein — green */}
      {proteinFraction > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke="#16a34a"
          strokeWidth={innerStroke}
          strokeDasharray={`${proteinDash} ${innerCircumference - proteinDash}`}
          strokeDashoffset={proteinOffset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}

      {/* Carbs — orange */}
      {carbsFraction > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke="#f97316"
          strokeWidth={innerStroke}
          strokeDasharray={`${carbsDash} ${innerCircumference - carbsDash}`}
          strokeDashoffset={carbsOffset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}

      {/* Fat — yellow */}
      {fatFraction > 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke="#eab308"
          strokeWidth={innerStroke}
          strokeDasharray={`${fatDash} ${innerCircumference - fatDash}`}
          strokeDashoffset={fatOffset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}

      {/* ── Center text ──────────────────────────────────────────────────── */}
      <text
        x={cx}
        y={cy - subFontSize * 0.6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill={isOverTarget ? '#ef4444' : '#92400e'}
        fontFamily="system-ui, sans-serif"
      >
        {calories}
      </text>

      <text
        x={cx}
        y={cy + subFontSize * 0.9}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={subFontSize}
        fontWeight="400"
        fill="#b45309"
        fontFamily="system-ui, sans-serif"
      >
        / {target}
      </text>

      <text
        x={cx}
        y={cy + fontSize + subFontSize * 0.6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={labelFontSize}
        fontWeight="400"
        fill="#d97706"
        fontFamily="system-ui, sans-serif"
      >
        kcal
      </text>
    </svg>
  )
}
