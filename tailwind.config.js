/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        '14px-11px': '14px 11px',
        '14px-10px': '14px 10px',
      },
      
      backgroundPosition: {
        'right-3': 'right 0.675rem center',
        'inset-inline-end-center': 'inset-inline-end 0.55rem center',
      },
      textShadow: {
        none: 'none',
      },
      colors: {
        primary: '#1d4ed8',
        'primary-dark': '#1e40af',
        'primary-light': '#3b82f6',
        secondary: '#F9F9F9',
         'secondary-active': '#F9F9F9',
         'secondary-light': '#F9F9F9',
         'secondary-clarity': '#f9f9f933',
         'secondary-inverse': '#4B5675',
        success: '#16a34a',
        danger:'#dc2626',
        light: '#f3f4f6',
        'light-active': '#fcfcfc',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        inherit: 'inherit',
        '2sm': ['.8125m', {'lineHeight': '1.125rem'}],
      },
      fontWeight: {
        inherit: 'inherit',
      },
      minHeight: {
        'screen-minus-6rem': 'calc(100vh - 6rem)',
        'screen-minus-14rem': 'calc(100vh - 14rem)',
      },
      zIndex: {
        '-1': '-1',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
      },
      spacing: {
        '1.25': '0.3125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '15': '3.75rem',
        '17.5': '4.375rem',
        '18': '4.5rem',
        '50': '12.5rem',
        '70': '17.5rem',
        '71': '18.75rem',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      }
      addUtilities(newUtilities, ['reponsive', 'hover'])
    }
  ],
}

