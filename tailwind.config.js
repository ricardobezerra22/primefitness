/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#faf4f2',
          100: '#f5e9e4',
          200: '#ebd3ca',
          300: '#ddb7a9',
          400: '#cd9283',
          500: '#bd7563',
          600: '#a85c47',
          700: '#8c4a3a',
          800: '#753f33',
          900: '#62362e',
        }
      }
    },
  },
  plugins: [],
};