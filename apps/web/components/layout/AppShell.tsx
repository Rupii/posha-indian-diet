'use client'

import Link from 'next/link'

// SVG icons — no emojis in navigation
function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  )
}

function IconMeals({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2s-5 2-5 8v5" />
      <path d="M16 15h5v7h-5z" />
    </svg>
  )
}

function IconLog({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function IconRecipes({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="13" y2="11" />
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-forest-500">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-11 5 3 3 9 2 11 2" />
    </svg>
  )
}

const NAV_ITEMS = [
  { id: 'home',    label: 'Home',      href: '/dashboard',  Icon: IconHome },
  { id: 'meals',   label: 'Meal Plan', href: '/meal-plans', Icon: IconMeals },
  { id: 'log',     label: 'Log Food',  href: '/log',        Icon: IconLog },
  { id: 'recipes', label: 'Recipes',   href: '/recipes',    Icon: IconRecipes },
]

export function AppShell({
  children,
  activePage,
}: {
  children: React.ReactNode
  activePage: string
}) {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* ── Top header ───────────────────────────────────────────────── */}
      <header className="bg-white border-b border-warm-200 px-4 md:px-6 h-14 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <IconLeaf />
          <span className="font-bold text-warm-900 text-lg tracking-tight">Posha</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:block text-sm text-warm-400 font-medium">Haritha · T3, Week 33</span>
          <button className="w-9 h-9 rounded-full bg-saffron-100 flex items-center justify-center text-sm font-bold text-saffron-700 hover:bg-saffron-200 transition-colors">
            H
          </button>
        </div>
      </header>

      <div className="flex">
        {/* ── Sidebar (desktop only) ────────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-56 bg-white border-r border-warm-200 sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 pt-5 pb-6">
          <nav className="flex flex-col gap-0.5 px-3 flex-1">
            {NAV_ITEMS.map(({ id, label, href, Icon }) => {
              const active = activePage === id
              return (
                <Link
                  key={id}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-saffron-50 text-saffron-700'
                      : 'text-warm-500 hover:text-warm-900 hover:bg-warm-100'
                  }`}
                >
                  <span className={active ? 'text-saffron-600' : 'text-warm-400'}>
                    <Icon active={active} />
                  </span>
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Pregnancy tracker widget */}
          <div className="mx-3 p-3.5 bg-rose-50 rounded-2xl border border-rose-100">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <p className="text-xs font-semibold text-rose-600">Pregnancy</p>
            </div>
            <p className="text-sm font-semibold text-rose-700">Week 33 · T3</p>
            <p className="text-xs text-rose-400 mt-0.5">Due 25 May 2026</p>
            <Link href="/pregnancy" className="block mt-2.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors">
              View tracker →
            </Link>
          </div>
        </aside>

        {/* ── Main content ──────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 pb-20 md:pb-10">
          {children}
        </main>
      </div>

      {/* ── Bottom nav (mobile only) ──────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 flex z-40 safe-bottom">
        {NAV_ITEMS.map(({ id, label, href, Icon }) => {
          const active = activePage === id
          return (
            <Link
              key={id}
              href={href}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${
                active ? 'text-saffron-600' : 'text-warm-400'
              }`}
            >
              <Icon active={active} />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
