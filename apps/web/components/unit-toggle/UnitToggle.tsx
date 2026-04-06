'use client';

type UnitValue = 'katori' | 'grams';

interface UnitToggleProps {
  value: UnitValue;
  onChange: (v: UnitValue) => void;
  size?: 'sm' | 'md';
}

export default function UnitToggle({ value, onChange, size = 'md' }: UnitToggleProps) {
  const isSmall = size === 'sm';

  const baseBtn =
    'flex items-center gap-1 font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-1';

  const sizeClasses = isSmall
    ? 'px-2.5 py-1 text-xs rounded-full min-h-[32px]'
    : 'px-3.5 py-1.5 text-sm rounded-full min-h-[40px]';

  const activeClasses = 'bg-saffron-500 text-white shadow-sm';
  const inactiveClasses = 'bg-warm-100 text-warm-600 hover:bg-warm-200';

  return (
    <div
      role="group"
      aria-label="Unit toggle"
      className="inline-flex items-center gap-0.5 rounded-full bg-warm-100 p-0.5"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === 'katori'}
        onClick={() => onChange('katori')}
        className={`${baseBtn} ${sizeClasses} ${value === 'katori' ? activeClasses : inactiveClasses}`}
      >
        <span aria-hidden="true">🫙</span>
        <span>Katori</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={value === 'grams'}
        onClick={() => onChange('grams')}
        className={`${baseBtn} ${sizeClasses} ${value === 'grams' ? activeClasses : inactiveClasses}`}
      >
        <span aria-hidden="true">⚖️</span>
        <span>Grams</span>
      </button>
    </div>
  );
}
