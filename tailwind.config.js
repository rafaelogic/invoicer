/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss/plugin')
  ],
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}

