const { colors } = require('./colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {
      textColor: colors.text,
      colors: colors,
      backgroundColor: colors.background,
      fontFamily: {
        sans: `var(--font-sans)`,
        mono: `var(--font-mono)`,
      },
      borderRadius: {
        sm: '10px',
        md: '12px',
        lg: '18px',
      },
    },
  },
  plugins: [],
}
