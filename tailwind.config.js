module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#407acd',
          800: '#4f85d1',
          700: '#5f90d5',
          600: '#6f9bd9',
          500: '#7ea6dd',
          400: '#8eb0e1',
          300: '#9dbbe5',
          200: '#adc6e9',
          100: '#bcd1ed',
          50: '#ccdbf2',
          DEFAULT: '#5f90d5',
        },
      },
      gridTemplateColumns: {
        'auto-auto-1fr': 'auto auto 1fr',
        '1fr-auto': '1fr auto',
        'auto-1fr': 'auto 1fr',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              color: '#4B5563',
            },
            li: {
              color: '#4B5563',
            }
          },
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
