/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./public/index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '2rem',
    },
    extend: {
      colors: {
        black: {
          background: '#1f2128',
        },
        primary: '#fcfcfd',
      },
    },
  },
}
