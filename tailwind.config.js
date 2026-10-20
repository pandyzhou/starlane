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
        theme: {
          bg: "var(--theme-bg)",
          fg: "var(--theme-fg)",
          card: "var(--theme-card)",
          cardFg: "var(--theme-card-fg)",
          cardDesc: "var(--theme-card-desc)",
          border: "var(--theme-border)",
          primary: "var(--theme-primary)",
          secondary: "var(--theme-secondary)",
          accent: "var(--theme-accent)",
          muted: "var(--theme-muted)",
        }
      }
    },
  },
  plugins: [],
}
