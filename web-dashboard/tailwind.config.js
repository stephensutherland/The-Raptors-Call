/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette pulled from The Raptor mark: near-black navy body,
        // electric cyan/blue as the primary accent, amber as the
        // secondary/alert accent. Use these instead of teal/blue-500/etc
        // so every screen stays visually consistent.
        raptor: {
          void: '#040611',    // page background, darkest
          bg: '#0a0e1c',      // panel/card background
          bg2: '#111834',     // raised panel / hover surface
          line: '#1c2540',    // hairline borders
          cyan: '#22d3ee',    // primary accent
          cyanDim: '#0e7490', // primary accent, muted
          blue: '#3b82f6',    // secondary accent, gradients with cyan
          amber: '#f59e0b',   // warm accent / highlights
          flare: '#fb923c',   // hot accent, used sparingly (active/alert glow)
        },
      },
      boxShadow: {
        'raptor-glow': '0 0 0 1px rgba(34,211,238,0.15), 0 0 24px -4px rgba(34,211,238,0.35)',
        'raptor-glow-amber': '0 0 0 1px rgba(245,158,11,0.15), 0 0 24px -4px rgba(245,158,11,0.35)',
      },
      backgroundImage: {
        'raptor-radial': 'radial-gradient(circle at 50% 0%, rgba(34,211,238,0.14), transparent 60%)',
      },
    },
  },
  plugins: [],
}
