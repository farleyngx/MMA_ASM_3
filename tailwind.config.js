/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        netflix: {
          black: "#141414",
          red: "#E50914",
          darkGray: "#181818",
          lightGray: "#E5E5E5",
        }
      }
    },
  },
  plugins: [],
}
