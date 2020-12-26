const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['src/**/*.tsx'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      addUtilities({
        '.writing-horizontal': {
          'writing-mode': 'horizontal-tb',
        },
        '.writing-vertical': {
          'writing-mode': 'vertical-rl',
        },
        '.writing-vertical-lr': {
          'writing-mode': 'vertical-lr',
        },
      });
    }),
  ],
};
