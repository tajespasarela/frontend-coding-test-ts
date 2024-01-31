const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.-bg-gradient-to-10': {
          'background-image':
            'linear-gradient(-10deg, var(--tw-gradient-stops))',
        },
      })
    }),
  ],
}
