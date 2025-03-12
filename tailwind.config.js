/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E2725B', // Warm, earthy terracotta
          dark: '#C65D42',    // Deep Clay - Richer, slightly darker terracotta
          light: '#D9674E',   // Burnt Sienna - Vibrant, warm reddish-orange
        },
        dark: {
          DEFAULT: '#3A3A3A', // Dark Contrast - Charcoal Gray
          surface: '#4A4A4A',
          surface2: '#5A5A5A',
        },
        light: {
          DEFAULT: '#F4E1D2', // Neutral - Warm Beige
          secondary: '#E8D1B5', // Soft Highlight - Muted Sand
          muted: '#C0B0A0',
        },
        terracotta: {
          DEFAULT: '#E2725B', // Primary Terracotta
          deep: '#C65D42',    // Deep Clay
          burnt: '#D9674E',   // Burnt Sienna
          beige: '#F4E1D2',   // Warm Beige
          sand: '#E8D1B5',    // Muted Sand
          charcoal: '#3A3A3A' // Charcoal Gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}