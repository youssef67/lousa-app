import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      borderRadius: {
        large: '40px'
      },
      colors: {
        'lousatest': {
          light: '#505010',
          DEFAULT: '#FF0010',
          dark: '#00994A'
        },
        'lousa-panel-bg': {
          light: '#00000014',
          dark: '#ffffff14'
        },
        'lousa-input-bg': {
          light: '#f8fcff',
          DEFAULT: '#dfeeff',
          dark: '#dfeeff',
          50: '#f8fcff',
          100: '#b3c4d6', // Attention ! Important color used to bg button when hover
          200: '#e1f1ff',
          300: '#cee9ff',
          400: '#dfeeff',
          500: '#1b334c',
          600: '#aecdfc',
          700: '#8bb0f5',
          800: '#5686eb',
          900: '#2b6adc',
          950: '#1b334c'
        },
        'lousa-text-over-bg': {
          light: '#001B2E',
          DEFAULT: '#DFEEFF',
          dark: '#DFEEFF'
        },
        'lousa-text-over-input': {
          light: '#000000',
          DEFAULT: '#001B2E',
          dark: '#001B2E'
        },
        'lousa-primary': {
          light: '#F2994A',
          DEFAULT: '#F2994A',
          dark: '#F2994A',
          50: '#fef7ee',
          100: '#fdeed7',
          200: '#fad9ae',
          300: '#f6bc7b',
          400: '#f2994a',
          500: '#ee7921',
          600: '#df5f17',
          700: '#b94815',
          800: '#933919',
          900: '#773217',
          950: '#40170a'
        },
        'secondary': {
          50: '#F9F4F4',
          100: '#F4E9E9',
          200: '#E2C7C8',
          300: '#D1A6A6',
          400: '#D0383A',
          500: '#8C2021',
          600: '#7E1D1E',
          700: '#541314',
          800: '#3F0E0F',
          900: '#2A0A0A'
        },
        'lousa-background': {
          light: '#DFEEFF', // E1DEF5 6% filled-input-bg
          dark: '#001B2E'
        },
        'lousa-foreground': {
          light: '#001B2E',
          dark: '#DFEEFF'
        }
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-lousa-background-dark': theme('colors.lousa-background.dark'),
          '--color-lousa-background-light': theme('colors.lousa-background.light'),
          '--color-lousa-foreground-dark': theme('colors.lousa-foreground.dark'),
          '--color-lousa-foreground-light': theme('colors.lousa-foreground.light')
        }
      })
    }
  ]
}
