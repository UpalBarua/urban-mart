/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#d9d9e2',
          '100': '#d1d2db',
          '200': '#babcca',
          '300': '#959ab1',
          '400': '#6e7491',
          '500': '#555a6d',
          '600': '#3f4355',
          '700': '#303241',
          '800': '#262831',
          '900': '#202127',
          '950': '#000000',
        },
        accent: {
          '50': '#edfff1',
          '100': '#d5ffe0',
          '200': '#aeffc3',
          '300': '#6fff97',
          '400': '#35ff69',
          '500': '#00e93b',
          '600': '#00c22d',
          '700': '#009827',
          '800': '#047724',
          '900': '#066120',
          '950': '#00370e',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
};
