/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a1d23",
        card: "#2f3436",
        border: "#444444",
        foreground: "#f7f9fa",
        muted: {
          DEFAULT: "#444444",
          foreground: "#a1a1aa"
        },
        primary: {
          DEFAULT: "#ff99cc",
          foreground: "#1a1d23"
        },
        secondary: {
          DEFAULT: "#33cc33",
          foreground: "#1a1d23"
        },
        accent: {
          DEFAULT: "#87ceeb",
          foreground: "#1a1d23"
        },
        candy: {
          pink: "#ff99cc",
          green: "#33cc33",
          blue: "#87ceeb",
          yellow: "#facc15",
          purple: "#d8b4fe",
          bg: "#1a1d23",
          card: "#2f3436",
          border: "#444444"
        }
      }
    },
  },
  plugins: [],
}
