import { heroui } from '@heroui/react'

const blackPrimary = {
  50: '#f4f4f5',
  100: '#e4e4e7',
  200: '#d4d4d8',
  300: '#a1a1aa',
  400: '#71717a',
  500: '#52525b',
  600: '#3f3f46',
  700: '#27272a',
  800: '#18181b',
  900: '#0b0b0d',
  DEFAULT: '#000000',
  foreground: '#ffffff'
}

export default heroui({
  themes: {
    light: {
      colors: {
        primary: blackPrimary
      }
    },
    dark: {
      colors: {
        primary: blackPrimary
      }
    }
  }
})
