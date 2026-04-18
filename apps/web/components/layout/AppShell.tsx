'use client'

import Link from 'next/link'

const B = {
  bg:      '#f3e9d2',
  bgDark:  '#1e2a1a',
  ink:     '#141311',
  ink2:    'rgba(20,19,17,0.7)',
  cream:   '#fbf4e1',
  chili:   '#d04528',
  turmeric:'#e8a835',
  display: '"Archivo", "Helvetica Neue", Arial, sans-serif',
  mono:    '"DM Mono", ui-monospace, Menlo, monospace',
}

const DESKTOP_NAV = [
  { label: 'TODAY',    href: '/dashboard',  id: 'home'    },
  { label: 'MENU',     href: '/meal-plans', id: 'meals'   },
  { label: 'LOG',      href: '/log',        id: 'log'     },
  { label: 'COOKBOOK', href: '/recipes',    id: 'recipes' },
  { label: 'CARE',     href: '/pregnancy',  id: 'care'    },
  { label: 'JOURNAL',  href: '#',           id: 'journal' },
]

const MOBILE_NAV_LEFT  = [
  { id: 'home',  label: 'HOME', href: '/dashboard'  },
  { id: 'meals', label: 'MENU', href: '/meal-plans' },
]
const MOBILE_NAV_RIGHT = [
  { id: 'recipes', label: 'COOK', href: '/recipes'  },
  { id: 'care',    label: 'ME',   href: '/pregnancy' },
]

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  )
}

export function AppShell({
  children,
  activePage,
}: {
  children: React.ReactNode
  activePage: string
}) {
  const today = new Date()
  const dateStr = today
    .toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    .toUpperCase()
    .replace(', ', ' · ')

  return (
    <div style={{ minHeight: '100vh', background: B.bg, color: B.ink, fontFamily: B.display }}>

      {/* ── Desktop top nav ──────────────────────────────── */}
      <header
        className="hidden md:flex items-center justify-between sticky top-0 z-40"
        style={{ padding: '16px 40px', borderBottom: `1.5px solid ${B.ink}`, background: B.bg }}
      >
        <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -1, textTransform: 'uppercase' }}>
          POSHA<span style={{ color: B.chili }}>.</span>
        </div>
        <nav className="flex gap-5">
          {DESKTOP_NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                color: activePage === item.id ? B.chili : B.ink,
                fontFamily: B.display,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/log"
          style={{
            background: B.ink, color: B.cream, borderRadius: 999,
            padding: '10px 16px', fontFamily: B.display,
            fontSize: 12, fontWeight: 900, letterSpacing: 0.5,
            textTransform: 'uppercase', display: 'inline-flex',
            alignItems: 'center', gap: 6, textDecoration: 'none',
          }}
        >
          + LOG A MEAL
        </Link>
      </header>

      {/* ── Mobile top bar ────────────────────────────────── */}
      <div
        className="md:hidden flex items-center justify-between sticky top-0 z-40"
        style={{ padding: '12px 20px 0', background: B.bg }}
      >
        <div style={{ fontFamily: B.display, fontWeight: 900, fontSize: 22, letterSpacing: -1, textTransform: 'uppercase' }}>
          POSHA<span style={{ color: B.chili }}>.</span>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: B.mono, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: B.ink2 }}>
            {dateStr}
          </span>
          <div style={{
            width: 30, height: 30, borderRadius: 15, background: B.ink, color: B.cream,
            display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 13,
          }}>
            H
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <main className="pb-28 md:pb-10">
        {children}
      </main>

      {/* ── Mobile floating pill nav ──────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50" style={{ padding: '10px 14px 24px' }}>
        <div style={{
          background: B.ink, color: B.cream, borderRadius: 999,
          padding: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {MOBILE_NAV_LEFT.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                padding: '8px 14px', borderRadius: 999,
                background: activePage === item.id ? B.cream : 'transparent',
                color: activePage === item.id ? B.ink : B.cream,
                fontFamily: B.display, fontWeight: 900, fontSize: 11,
                letterSpacing: 0.5, textDecoration: 'none', textTransform: 'uppercase',
                display: 'block',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/log"
            style={{
              width: 46, height: 46, borderRadius: 23, background: B.chili,
              color: B.cream, display: 'grid', placeItems: 'center', flexShrink: 0,
            }}
          >
            <PlusIcon />
          </Link>
          {MOBILE_NAV_RIGHT.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              style={{
                padding: '8px 14px', borderRadius: 999,
                background: activePage === item.id ? B.cream : 'transparent',
                color: activePage === item.id ? B.ink : B.cream,
                fontFamily: B.display, fontWeight: 900, fontSize: 11,
                letterSpacing: 0.5, textDecoration: 'none', textTransform: 'uppercase',
                display: 'block',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
