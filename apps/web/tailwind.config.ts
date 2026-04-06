import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Saffron / turmeric palette
        saffron: {
          50:  '#fff8ed',
          100: '#ffefd3',
          200: '#ffdba5',
          300: '#ffbf6d',
          400: '#ff9b32',
          500: '#f4a228', // primary
          600: '#e07b00', // secondary (turmeric)
          700: '#b85e00',
          800: '#934a06',
          900: '#783d08',
        },
        // Forest green for success / health
        forest: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          500: '#2d6a4f',
          600: '#1b4332',
        },
        // Warm neutrals
        warm: {
          50:  '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dd',
          300: '#d4cec4',
          400: '#b8b0a4',
          500: '#8a8278',
          600: '#6b6459',
          700: '#504a42',
          800: '#363028',
          900: '#1e1a15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Minimum touch target 48px (Indian mobile-first)
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
    },
  },
  plugins: [],
}

export default config
