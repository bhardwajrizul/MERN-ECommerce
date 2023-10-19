/** @type {import('tailwindcss').Config} */
/*eslint-disable */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': {transform: 'translateX(100%)'},
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'
      }
    },
  },
  
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}