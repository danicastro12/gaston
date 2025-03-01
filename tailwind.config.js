/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      mirage: {
        DEFAULT: "#151F2C",
        50: "#6488B5",
        100: "#5C81B1",
        200: "#4F74A5",
        300: "#466894",
        400: "#3E5C82",
        500: "#365071",
        600: "#2E4360",
        700: "#25374F",
        800: "#1D2B3D",
        900: "#151F2C",
        950: "#0C1219",
      },
    },
  },
  extend: {},
  plugins: [],
};
