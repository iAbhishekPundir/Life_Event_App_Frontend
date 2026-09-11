/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand green, taken directly from the approved prototype's CSS vars
        brand: {
          DEFAULT: '#006a4c',
          light: '#008060',
        },
        accent: {
          DEFAULT: '#11b67a',
          light: '#e6f8f1',
          hover: '#0e9a66',
        },
        surface: '#ffffff',
        canvas: '#f5f5f5',
        hairline: '#e5e5e5',
        ink: {
          DEFAULT: '#111827',
          muted: '#6b7280',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 8px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}
