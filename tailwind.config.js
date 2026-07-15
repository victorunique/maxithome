/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        warm: {
          bg: {
            light: 'hsl(36, 33%, 97%)',
            dark: 'hsl(215, 25%, 12%)'
          },
          surface: {
            light: 'hsl(36, 25%, 92%)',
            dark: 'hsl(215, 20%, 18%)'
          },
          border: {
            light: 'hsl(36, 12%, 80%)',
            dark: 'hsl(215, 12%, 28%)'
          },
          text: {
            light: 'hsl(24, 15%, 15%)',
            dark: 'hsl(36, 30%, 94%)'
          },
          muted: {
            light: 'hsl(24, 10%, 45%)',
            dark: 'hsl(36, 10%, 70%)'
          },
          accent: {
            light: 'hsl(28, 80%, 48%)',
            dark: 'hsl(38, 90%, 55%)'
          },
          accentLight: {
            light: 'hsl(28, 80%, 94%)',
            dark: 'hsl(38, 90%, 20%)'
          }
        }
      }
    },
  },
  plugins: [],
}
