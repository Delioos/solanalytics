/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-hard': '#7400B8',
        'purple-soft': '#6930C3',
        'purple-blue': '#5E60CE',
        'deep-blue': '#5390D9',
        'blue-blue': '#4EA8DE',
        'azur-deep': '#48BFE3',
        'azur-azur': '#56CFE1',
        'azur-green': '#64DFDF',
        'green-deep': '#72EFDD',
        'green-mint': '#80FFDB',
      },
    },
  },
  plugins: [],
} 