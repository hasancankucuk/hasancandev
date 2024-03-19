/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "dark-MainTheme": '#222222',
        "dark-cardTheme": '#333333',
        "dark-inlineTheme": '#444444',
        "light-MainTheme": '#dddddd',
        "light-cardTheme": '#cccccc',
        "light-inlineTheme": '#bbbbbb',
        "underLine": 'rgba(98, 164, 255, 1)',
      },
      boxShadow: {
        '3xl': '0 0 5px 0 rgba(255,255,255,0.5)',
      }
    },
  },
  plugins: [],
}

