'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const profile = localStorage.getItem('poshaProfile')
    router.replace(profile ? '/dashboard' : '/onboarding')
  }, [router])

  // Brief loading state while we check localStorage
  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-[3px] border-saffron-200 border-t-saffron-500 animate-spin mx-auto mb-4" />
        <p className="text-warm-400 text-sm">Loading Posha…</p>
      </div>
    </div>
  )
}
