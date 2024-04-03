/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
let colors = {
  primary: {
    DEFAULT: "#0fa3b1",
    light: "#66ccd9",
    dark: "#0c8695",
  },
  secondary: {
    DEFAULT: "#b5e2fa",
    light: "#f1f9ff",
    dark: "#85c8f0",
  },
  background: {
    DEFAULT: "#f9f7f3",
    light: "#ffffff",
    dark: "#eceae6",
  },
  accent1: {
    DEFAULT: "#eddea4",
    light: "#fff9e6",
    dark: "#d8c775",
  },
  accent2: {
    DEFAULT: "#f7a072",
    light: "#fff0e6",
    dark: "#e68052",
  },
  accent3: {
    DEFAULT: "#cd8b76",
    light: "#fff4f0",
    dark: "#ab725b",
  },
  accent4: {
    DEFAULT: "#8d3b72",
    light: "#f7f1f6",
    dark: "#6e305a",
  },
};
let zIndex = {
  auto: "auto",
  n: -1,
  0: 0,
  10: 10,
  30: 30,
  over: 9999,
};

module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: colors,
    zIndex: zIndex,

    extend: {
      fontFamily: {
        sans: [
          "Wix Madefor Display",
          "Poppins",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-2%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        bounce: "bounce 3s infinite",
      },
      screens: {
        nav: "836px",
        "3xl": "1865px",
      },
      width: {
        82: "22rem",
        120: "30rem",
        135: "35rem",
      },
      padding: {
        110: "35rem",
        120: "45rem",
        125: "67rem",
        127: "78rem",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar"),
    require("@headlessui/tailwindcss"),
  ],
  //   safelist: [{
  //     pattern: /(bg|text|border)-ultramarine-(50|100_|200_|300|400|500|600|700|800|900|950)/
  // }]
};
