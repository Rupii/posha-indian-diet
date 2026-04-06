'use client'

import React from 'react'

interface MealSlotCardProps {
  slotType: string
  time: string
  recipeName: string
  serving: string
  calories: number
  tags: string[]
  isDone?: boolean
  onSwap?: () => void
  onLog?: () => void
}

export function MealSlotCard({
  slotType,
  time,
  recipeName,
  serving,
  calories,
  tags,
  isDone = false,
  onSwap,
  onLog,
}: MealSlotCardProps) {
  return (
    <div
      className={`
        relative bg-white border rounded-2xl p-4 shadow-sm
        transition-all duration-200
        ${isDone
          ? 'border-green-200 opacity-70'
          : 'border-amber-100 hover:shadow-md'
        }
      `}
    >
      {/* Done checkmark overlay badge */}
      {isDone && (
        <span className="absolute top-3 right-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}

      {/* Slot header */}
      <div className="flex items-baseline gap-2 mb-1">
        <h4 className="text-sm font-semibold text-amber-800 capitalize">
          {slotType}
        </h4>
        <span className="text-xs text-amber-400">{time}</span>
      </div>

      {/* Recipe name */}
      <p className={`font-medium text-base mb-0.5 ${isDone ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
        {recipeName}
      </p>

      {/* Serving + calories row */}
      <div className="flex items-center gap-3 mb-2 text-sm text-amber-600">
        <span>{serving}</span>
        <span className="text-amber-300">·</span>
        <span className="font-semibold text-amber-700">{calories} kcal</span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-orange-50 border border-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full capitalize"
            >
              {tag.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      )}

      {/* Action buttons — hidden when done */}
      {!isDone && (onSwap || onLog) && (
        <div className="flex gap-2 mt-1">
          {onSwap && (
            <button
              onClick={onSwap}
              className="flex-1 py-1.5 px-3 text-xs font-medium rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 active:bg-amber-100 transition-colors duration-150"
            >
              Swap
            </button>
          )}
          {onLog && (
            <button
              onClick={onLog}
              className="flex-1 py-1.5 px-3 text-xs font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 active:bg-green-700 transition-colors duration-150"
            >
              Log meal
            </button>
          )}
        </div>
      )}
    </div>
  )
}
