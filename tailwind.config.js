/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: '#C8102E',
        secondaryRed: '#A10E24',
        primaryBlack: '#1A1A1A',
      },
    },
  },
  plugins: [],
}
