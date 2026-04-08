import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Posha — Eat well, the Indian way',
    template: '%s | Posha',
  },
  description:
    'Personalised Indian nutrition — meal plans, recipes, and tracking built for Indian food culture, portions, and life stages.',
  keywords: ['Indian diet', 'nutrition', 'meal plan', 'pregnancy diet', 'Indian recipes'],
  openGraph: {
    title: 'Posha',
    description: 'Eat well, the Indian way',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4a228',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
