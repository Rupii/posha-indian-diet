import React from 'react'

interface StreakCounterProps {
  days: number
  label?: string
}

/**
 * Displays a flame emoji + streak count + optional label.
 * Adds a CSS pulse animation when days > 0 to draw attention to the streak.
 *
 * The pulse keyframes are injected once via a <style> tag so this component
 * stays dependency-free (no Framer Motion / react-spring required).
 */
export function StreakCounter({ days, label = 'day streak' }: StreakCounterProps) {
  const isActive = days > 0

  return (
    <div className="inline-flex flex-col items-center gap-1 select-none">
      {/* Style tag for pulse animation — Tailwind's `animate-pulse` scales opacity
          but we want a scale-based heartbeat feel instead. */}
      {isActive && (
        <style>{`
          @keyframes posha-streak-pulse {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.15); }
          }
          .posha-streak-flame {
            animation: posha-streak-pulse 1.4s ease-in-out infinite;
            display: inline-block;
          }
        `}</style>
      )}

      {/* Flame */}
      <span
        className={isActive ? 'posha-streak-flame' : ''}
        aria-hidden="true"
        style={{ fontSize: '2rem', lineHeight: 1 }}
      >
        🔥
      </span>

      {/* Count */}
      <span
        className={`
          text-3xl font-extrabold leading-none tracking-tight
          ${isActive ? 'text-amber-500' : 'text-gray-300'}
        `}
        aria-label={`${days} ${label}`}
      >
        {days}
      </span>

      {/* Label */}
      {label && (
        <span
          className={`text-xs font-medium ${isActive ? 'text-amber-600' : 'text-gray-400'}`}
          aria-hidden="true"
        >
          {label}
        </span>
      )}
    </div>
  )
}
