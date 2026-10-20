/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 使用 rgb(var(--x) / <alpha-value>) 形式，Tailwind 的透明度修饰符
      // （如 bg-theme-primary/15）才能生效。直接写 var(--x) 会失效。
      colors: {
        theme: {
          bg: "rgb(var(--theme-bg-rgb) / <alpha-value>)",
          fg: "rgb(var(--theme-fg-rgb) / <alpha-value>)",
          card: "rgb(var(--theme-card-rgb) / <alpha-value>)",
          cardFg: "rgb(var(--theme-card-fg-rgb) / <alpha-value>)",
          cardDesc: "rgb(var(--theme-card-desc-rgb) / <alpha-value>)",
          border: "rgb(var(--theme-border-rgb) / <alpha-value>)",
          primary: "rgb(var(--theme-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--theme-secondary-rgb) / <alpha-value>)",
          accent: "rgb(var(--theme-accent-rgb) / <alpha-value>)",
          muted: "rgb(var(--theme-muted-rgb) / <alpha-value>)",
        }
      }
    },
  },
  plugins: [],
}
