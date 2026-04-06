import Link from 'next/link';
import type { Metadata } from 'next';
import ThaliBuilder from '@/components/thali/ThaliBuilder';

export const metadata: Metadata = {
  title: 'Thali Builder',
  description: 'Build your thali and see its nutrition in real time.',
};

export default function ThaliPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-10 bg-white border-b border-warm-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-warm-600 hover:bg-warm-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🍽️</span>
            <h1 className="text-base font-bold text-warm-900">Thali Builder</h1>
          </div>
        </div>
      </header>

      {/* ── Explainer ── */}
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-1">
        <p className="text-sm text-warm-500 leading-relaxed">
          Mix and match to see your thali&apos;s nutrition in real time.
        </p>
      </div>

      {/* ── Builder ── */}
      <main>
        <ThaliBuilder />
      </main>
    </div>
  );
}
