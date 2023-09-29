/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#222222",

        "light-gray": "rgba(0, 0, 0, 0.75)",
        "light-blue": "rgba(67, 122, 174, 0.95)",
        "medium-blue": "#437AAE",
      },
      boxShadow: {
        'upShadow': "0px -11px 10px 0px rgba(34, 60, 80, 0.2)"
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans'],
        roboto: ['Roboto', 'sans'],
      },
      screens: {
        'phone_sm': '275px',
        'phone_md': '390px',
        'phone_lg': '390px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  darkMode: 'class',
  plugins: []
}