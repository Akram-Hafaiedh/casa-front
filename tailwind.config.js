/** @type {import('tailwindcss').Config} */

const makeColor = (name) => ({
  DEFAULT: `rgb(var(--color-${name}) / <alpha-value>)`,
  50: `rgb(var(--color-${name}) / <alpha-value>)`,
  100: `rgb(var(--color-${name}) / <alpha-value>)`,
  200: `rgb(var(--color-${name}) / <alpha-value>)`,
  300: `rgb(var(--color-${name}) / <alpha-value>)`,
  400: `rgb(var(--color-${name}) / <alpha-value>)`,
  500: `rgb(var(--color-${name}) / <alpha-value>)`,
  600: `rgb(var(--color-${name}) / <alpha-value>)`,
  700: `rgb(var(--color-${name}) / <alpha-value>)`,
  800: `rgb(var(--color-${name}) / <alpha-value>)`,
  900: `rgb(var(--color-${name}) / <alpha-value>)`,
  950: `rgb(var(--color-${name}) / <alpha-value>)`,
  active: `rgb(var(--color-${name}-active) / <alpha-value>)`,
  light: `rgb(var(--color-${name}-light) / <alpha-value>)`,
  dark: `rgb(var(--color-${name}-dark) / <alpha-value>)`,
  clarity: `rgb(var(--color-${name}-clarity))`,
  inverse: `rgb(var(--color-${name}-inverse) / <alpha-value>)`
})
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '92rem',
        '9xl': '102rem',
      },
      lineHeight: {
        '4.5': '1.125rem',
      },
      backgroundSize: {
        '14px-11px': '14px 11px',
        '14px-10px': '14px 10px',
      },  
      backgroundPosition: {
        'right-3': 'right 0.675rem center',
        'inset-inline-end-center': 'inset-inline-end 0.55rem center',
      },
      borderRadius: {
        'none': '0px',
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl' : '1rem',
        '2-5xl': '1.375rem',
        '2-25xl': '1.125rem',
        'circle': '50%',
        'third': '33.333333%',
        'two-thirds': '66.666667%',
        'three-quarters': '75%',
        'four-fifths': '80%',
        'five-sixths': '83.333333%',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
        5: '5px',
        6: '6px',
        7: '7px',
        9: '9px',
        10: '10px',
      },
      colors: {
        brand: makeColor('brand'),
        primary: makeColor('primary'),
        secondary: makeColor('secondary'),
        success: makeColor('success'),
        info: makeColor('info'), 
        danger: makeColor('danger'),
        warning: makeColor('warning'),
        dark: makeColor('dark'),
        light: makeColor('light'),
        coal: {
          100: 'rgb(var(--color-coal-100))',
          200: 'rgb(var(--color-coal-200))',
          300: 'rgb(var(--color-coal-300))',
          400: 'rgb(var(--color-coal-400))',
          500: 'rgb(var(--color-coal-500))',
          600: 'rgb(var(--color-coal-600))',
          700: 'rgb(var(--color-coal-700))',
          800: 'rgb(var(--color-coal-800))',
          900: 'rgb(var(--color-coal-900))',
          dark: 'rgb(var(--color-coal-dark))',
        },
        current: 'currentColor',
        transparent: 'transparent',
        black: '#000',
        white: '#fff'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        inherit: ['inherit', { lineHeight: 'inherit' }],
        '2xs': ['0.6875rem', { lineHeight: '1' }],
        '3xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '4xs': ['0.5625rem', { lineHeight: '0.6875rem' }],
        '1-5xl': ['1.375rem', { lineHeight: '1.8125rem' }],
        '2sm': ['0.8125rem', { lineHeight: '1.125rem' }],
        '2xl': ['.8125rem', { lineHeight: '1' }],
        '2-5xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      fontWeight: {
        inherit: 'inherit',
      },
      minHeight: {
        'screen-minus-6rem': 'calc(100vh - 6rem)',
        'screen-minus-14rem': 'calc(100vh - 14rem)',
      }
    },
  },
  plugins: []
}
