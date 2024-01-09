/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // => @media (min-width: 640px) { ... }
        'sm': '640px',
        // => @media (min-width: 768px) { ... }
        'md': '768px',
        // => @media (min-width: 1024px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1280px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1600px) { ... }
        '2xl': '1600px',
        // => @media (min-width: 1920px) { ... }
        '3xl': '1920px'
      },
      colors: {
        primary: {
          "DEFAULT": '#09828B',
        },
        secondary: {
          "DEFAULT": '#F59C00',
        }
      },
      fontFamily: {
        poppins: ['"Poppins"'],
      },
    },
  },
  plugins: [],
}