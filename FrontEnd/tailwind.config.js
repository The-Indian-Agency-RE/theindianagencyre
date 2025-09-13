/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Newsreader', 'sans-serif'], // Now font-sans uses Newsreader
      },
    },
  },
  plugins: [],
};


