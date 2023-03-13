/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        success: '#699707',
        error: '#E61610',
        primary: colors.gray,
      },
    },
  },
  plugins: [],
}
