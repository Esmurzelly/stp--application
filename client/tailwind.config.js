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

        "landing-headline": "#3B668D",
        "landing-description": "#2B4964",
        "landing-gray": "#79788F",
        "landing-headline-mobile": "#204971",
        "landing-form-text": "#3B3F8D",
        "landing-form-placeholder": "#ADADAD",
        "landing-form-field": "#F3F3F3",
        "landing-faq-question": "#46637E",
        "landing-faq-answer": "#878787",

        "landing-button": "rgba(90, 196, 255, 1)"
      },
      backgroundImage: {
        "about-pattern": "url('/src/assets/landing/backgrounds/bg-about.svg')",
        "bottom-pattern": "url('/src/assets/landing/backgrounds/bg-bottom.svg')",
        "adv-mobile-pattern": "url('/src/assets/landing/backgrounds/bg-adv-mobile.svg')",
        "faq-pattern": "url('/src/assets/landing/backgrounds/bg-faq.svg')",
        "get-in-touchsvg-pattern": "url('/src/assets/landing/backgrounds/bg-get-in-touch.svg')",
        "instruction-mobile-pattern": "url('/src/assets/landing/backgrounds/bg-instruction-mobile.svg')",
        "top-pattern": "url('/src/assets/landing/backgrounds/bg-top.svg')"
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