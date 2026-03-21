/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:  '#07090d',
        dark:     '#0d1117',
        card:     '#111820',
        border:   '#1e2d3d',
        gold:     '#FFD700',
        'gold-dark': '#c8a800',
        green:    '#22c55e',
        'green-dark': '#16a34a',
      },
      fontFamily: {
        pixel:  ['"Press Start 2P"', 'monospace'],
        vt:     ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
}
