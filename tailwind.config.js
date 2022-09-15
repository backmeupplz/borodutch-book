const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        'primary-highlighted': 'var(--primary-highlighted)',
        'primary-active': 'var(--primary-active)',
        secondary: 'var(--secondary)',
        'highlighted-background': 'var(--highlighted-background)',
        'active-background': 'var(--active-background)',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
        title: ['EB Garamond', ...defaultTheme.fontFamily.serif],
      },
    },
  },
}
