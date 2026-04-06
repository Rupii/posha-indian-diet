import React from 'react'

interface NutrientBadgeProps {
  tag: string
}

interface BadgeConfig {
  emoji: string
  label: string
  bg: string
  text: string
  border: string
}

const TAG_MAP: Record<string, BadgeConfig> = {
  'iron-rich': {
    emoji: '🩸',
    label: 'Iron-rich',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  'high-protein': {
    emoji: '💪',
    label: 'High Protein',
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-200',
  },
  'calcium-rich': {
    emoji: '🦴',
    label: 'Calcium-rich',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  'low-GI': {
    emoji: '📉',
    label: 'Low GI',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
  'folate-rich': {
    emoji: '🌿',
    label: 'Folate-rich',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  galactagogue: {
    emoji: '🤱',
    label: 'Galactagogue',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  millet: {
    emoji: '🌾',
    label: 'Millet',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  cooling: {
    emoji: '❄️',
    label: 'Cooling',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
}

/**
 * Fallback config for unrecognised tags.
 * Shows the raw tag text with a neutral orange palette.
 */
function fallbackConfig(tag: string): BadgeConfig {
  return {
    emoji: '🏷️',
    label: tag.replace(/-/g, ' '),
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
  }
}

export function NutrientBadge({ tag }: NutrientBadgeProps) {
  const config = TAG_MAP[tag] ?? fallbackConfig(tag)

  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-2 py-0.5
        rounded-full
        border
        text-xs font-medium
        ${config.bg} ${config.text} ${config.border}
      `}
      title={config.label}
    >
      <span aria-hidden="true">{config.emoji}</span>
      {config.label}
    </span>
  )
}
