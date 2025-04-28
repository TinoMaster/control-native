/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#334559",
          200: "#2E3C4C",
          300: "#1E2631"
        },
        primary: {
          light: "#008e9e",
          dark: "#015c68"
        }
      }
    }
  },
  plugins: []
};
