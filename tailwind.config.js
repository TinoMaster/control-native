/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#334559",
          200: "#2E3C4C",
          300: "#1E2631",
        },
        primary: {
          50: "#f1f9fe",
          100: "#e2f1fc",
          200: "#bee4f9",
          300: "#85cef4",
          400: "#38b0eb",
          500: "#1b9cdc",
          600: "#0e7cbb",
          700: "#0d6397",
          800: "#0f557d",
          900: "#124668",
          950: "#0c2d45",
        },
      },
    },
  },
  plugins: [],
};
