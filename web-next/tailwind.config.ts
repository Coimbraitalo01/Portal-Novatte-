import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { darkGreen: '#003602', orange: '#FE4700', brown: '#86450A', sand: '#F7EEE9' } } },
  plugins: [],
} satisfies Config
