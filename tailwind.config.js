/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './resources/views/**/*.blade.php',
      './resources/assets/js/**/*.js'
  ],
  theme: {
      fontFamily:{
          body: ['Cabin', 'sans-serif'],
      },
      screens:{
          'x-sm' : '400px',
          'xx-sm': '330px',
          'sm': '640px',
          'md': '768px',
          'x-md': '900px',
          'lg': '1024px',
          'xl': '1280px',
      },
      fontSize: {
          'sm': '.875rem',
          'base': '1rem',
          'lg': '1.125rem',
          'xl': '1.3125rem',
          '2xl': '1.75rem',
          '3xl': '2.0625rem',
          '4xl': '2.375rem',
          '5xl': '3.25rem',
          '6xl': '6.325rem',
      },
      inset: {
          '0': 0,
          auto: 'auto',
          '1/2': '50%',
          '8px': '8px',
          '16px': '16px',
          '60px': '60px',
          '77px': '77px',
          '93px' : '93px',
          '133px': '133px',
          '169px': '169px',
          groupVariants: ["hover"]
      },
      colors:{
          white: '#ffffff',
          black:'#000000',
          light_grey: '#f8f8f8',
          transparent: 'transparent',
          classicblue: {
              '100': '#7CA0D0',
              '200': '#6993C9',
              '300': '#5685C2',
              '400': '#4478BB',
              '500': '#3E6FAE',
              '600': '#366096',
              '700': '#2F5483',
              '800': '#294870',
              '900': '#223C5E'
          },
          purple: {
              '100': '#B087C5',
              '200': '#A575BD',
              '300': '#9A64B4',
              '400': '#8E53AC',
              '500': '#7C4896',
              '600': '#6C3F83',
              '700': '#5B356E',
              '800': '#4A2B5A',
              '900': '#41264F'
          },
          grey: {
              '100': '#E6E6E6',
              '200': '#D4D4D4',
              '300': '#B3B3B3',
              '400': '#999999',
              '500': '#8C8C8C',
              '600': '#707070',
              '700': '#616161',
              '800': '#525252',
              '900': '#404040',
          },
          red: {
              '100': '#ffe5e5',
              '500': '#db3939',
              '900': '#ff0000',
          }
      },
      extend: {
          width: {
              "48%": "48%",
          },
          maxWidth: {
              "5xl": "62.5rem",
              "7xl": "80rem",
          },
          transitionDuration: {
              '10': '10ms',
              '50': '50ms',
              '70': '70ms',
          },
          rotate: {
              '30': '30deg',
              '135': '135deg',
              '150': '150deg',
          },
          boxShadow: {
              focus: 'inset 0 -4px 0 0 #d7d7d7',
              'globalFac': '0 6px 16px 0 rgba(0, 0, 0, 0.12)'

          },
      },
  },
  plugins: [
      require('@tailwindcss/typography'),
  ],
}


