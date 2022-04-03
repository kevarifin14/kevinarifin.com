const colors = require("tailwindcss/colors");

const primaryColor = colors.blue;
const primary = {
  light: primaryColor[300],
  DEFAULT: primaryColor[400],
  dark: primaryColor[500],
  ...primaryColor,
};

const lightColor = colors.zinc;
const light = {
  light: colors.white,
  DEFAULT: lightColor[50],
  dark: lightColor[100],
  ...lightColor,
};

const darkColor = colors.zinc;
const dark = {
  light: darkColor[700],
  DEFAULT: darkColor[800],
  dark: darkColor[900],
  ...darkColor,
};

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        light,
        dark,
        primary,
      },
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
