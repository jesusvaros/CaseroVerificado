/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Plus Jakarta Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // CaseroOk 2026 palette: forest ground, green actions, lime highlight, coral warnings
        forest: { DEFAULT: '#0E3B26', 600: '#164D33', 500: '#1D5C3D' },
        brand: { DEFAULT: '#1F7A4D', light: '#45B06A', pale: '#8FD46B' },
        lime: { DEFAULT: '#C8F169', soft: '#EAF8D2' },
        coral: { DEFAULT: '#FF6B4A', soft: '#FFE8E1', ink: '#A63218' },
        ink: { DEFAULT: '#10180F', muted: '#56604F', soft: '#3A4535' },
        mist: '#F3F7EE',
        line: '#ECEFE7',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        halo: { '0%, 100%': { transform: 'scale(0.9)', opacity: '0.22' }, '50%': { transform: 'scale(1.12)', opacity: '0.1' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        halo: 'halo 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
