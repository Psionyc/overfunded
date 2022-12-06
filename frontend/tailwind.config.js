/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#7B3FE4",
        bluish: "#306CCC",
        greenish: "#4A9F96",
        greyish: "#D9D9D9",
        "gradient-start": "#AC1F84",
        "gradient-stop": "#350981",
        "dark-bluish":"#0F3B7E",
        "dark-greenish":"#3A726B",
      }
    },
  },
  plugins: [],
}
