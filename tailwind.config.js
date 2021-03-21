module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(95, 144, 213)',
      },
      gridTemplateColumns: {
        '1fr-auto': '1fr auto',
        'auto-1fr': 'auto 1fr',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
