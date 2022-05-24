const colors = require("tailwindcss/colors");

const primaryColor = colors.blue;
const primary = {
  light: primaryColor[300],
  DEFAULT: primaryColor[400],
  dark: primaryColor[500],
  ...primaryColor,
};

const secondaryColor = colors.orange;
const secondary = {
  light: secondaryColor[300],
  DEFAULT: secondaryColor[400],
  dark: secondaryColor[500],
  ...secondaryColor,
};

const lightColor = colors.zinc;
const light = {
  light: colors.white,
  DEFAULT: lightColor[50],
  dark: lightColor[100],
  accent: lightColor[300],
  ...lightColor,
};

const darkColor = colors.zinc;
const dark = {
  accent: darkColor[500],
  light: darkColor[700],
  DEFAULT: darkColor[800],
  dark: darkColor[900],
  ...darkColor,
};

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        light,
        dark,
        primary,
        secondary,
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
