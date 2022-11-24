/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3C366B',
        'secondary': '#B83280',
        'tertiary': '#18CBF8',
        // 'sucess': '#000000',
        // 'warning': '#000000',
        'error': '#ff0000',
        'neutral': '#E2E8F0'

// Primary — usually the main brand color
// Secondary — may be optional)
// Tertiary — may be optional)
// Success — for the accomplished goals and other successful operations
// Warning — use it when you have to warn a user
// Error — as the name suggests, elements displaying Error should use this color
// Neutral — for all kinds of grayish elements
// White & Black– white & black are always these pure colors that never changes.
      },
      boxShadow: {
        'custom': '0px 0px 4px rgba(0,0,0,0.7)'
      }
    },
  },
  plugins: [],
}
