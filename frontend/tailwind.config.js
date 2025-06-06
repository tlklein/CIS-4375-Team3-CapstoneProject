/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary: '#1d4ed8', // Blue
        secondary: '#10b981' // Green
      }
    },
  },
  plugins: [],
}

