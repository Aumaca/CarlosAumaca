/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  // Only the frozen 2024 site (v1/) uses Tailwind. The current site uses plain CSS.
  purge: ['./v1/index.html', './v1/src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
