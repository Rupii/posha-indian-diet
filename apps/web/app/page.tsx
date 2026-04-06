import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-warm-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-bold text-warm-900">Posha</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
          <Link href="/signup" className="btn-primary text-sm py-2 px-4 min-h-0">Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-saffron-100 text-saffron-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span>🇮🇳</span> Built for Indian food culture
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-warm-900 leading-tight mb-4">
          Eat well,<br />
          <span className="text-saffron-600">the Indian way</span>
        </h1>
        <p className="text-warm-600 text-lg mb-8 leading-relaxed">
          Meal plans, recipes, and nutrition tracking that actually understand
          dal, roti, katori portions, and the Indian kitchen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="btn-primary text-base">
            Start for free
          </Link>
          <Link href="/recipes" className="btn-secondary text-base">
            Browse recipes
          </Link>
        </div>
      </section>

      {/* Segment Cards */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <p className="text-center text-warm-500 text-sm mb-6 uppercase tracking-wide font-medium">
          Made for every stage
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SegmentCard
            emoji="🥘"
            title="Everyday Eating"
            subtitle="Balanced Indian meals for daily nutrition goals"
            color="bg-saffron-50 border-saffron-200"
          />
          <SegmentCard
            emoji="🤰"
            title="Pregnancy"
            subtitle="Week-by-week nutrition for pre-delivery women"
            color="bg-rose-50 border-rose-200"
          />
          <SegmentCard
            emoji="🌸"
            title="Post-delivery"
            subtitle="40-day confinement diet, lactation support"
            color="bg-forest-50 border-forest-100"
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-warm-200 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-warm-900 text-center mb-10">
            Finally, nutrition that speaks Indian
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: '🫙', title: 'Katori or grams — you choose', desc: 'Log in katori, ladle, or piece. Or grams. You pick per entry, we never decide for you.' },
              { icon: '🔄', title: 'Meal swap engine', desc: "Don't want dal today? Tap swap and get 3 alternatives with similar nutrition in one tap." },
              { icon: '🧬', title: 'Condition-specific tracks', desc: 'PCOS, diabetes, thyroid, hypertension — plans adjusted for your health profile.' },
              { icon: '🌾', title: 'Millet tracker', desc: 'Hit India\'s Millet Mission goals with jowar, bajra, ragi, and foxtail built into your week.' },
              { icon: '📅', title: '40-day confinement planner', desc: 'Region-specific post-delivery diets: North Indian panjiri to South Indian ragi porridge.' },
              { icon: '🩺', title: 'Doctor-ready export', desc: 'Export your 30-day food log as PDF to share with your gynecologist before appointments.' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="font-semibold text-warm-900 mb-1">{f.title}</h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-warm-900 mb-4">Ready to eat better?</h2>
        <p className="text-warm-500 mb-6">Free to start. No credit card needed.</p>
        <Link href="/signup" className="btn-primary inline-flex text-base">
          Create your free account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 px-6 py-8 text-center text-warm-400 text-sm">
        <p>© 2026 Posha. Nutrition data from IFCT 2017. Always consult your doctor for medical advice.</p>
      </footer>
    </div>
  )
}

function SegmentCard({
  emoji, title, subtitle, color,
}: {
  emoji: string
  title: string
  subtitle: string
  color: string
}) {
  return (
    <Link
      href="/signup"
      className={`card border ${color} hover:shadow-md transition-shadow cursor-pointer`}
    >
      <span className="text-3xl mb-3 block">{emoji}</span>
      <h3 className="font-semibold text-warm-900 mb-1">{title}</h3>
      <p className="text-warm-500 text-sm leading-relaxed">{subtitle}</p>
    </Link>
  )
}
