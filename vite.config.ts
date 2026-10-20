import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const themesFile = fileURLToPath(new URL('./src/config/themes.json', import.meta.url))

const PROP_MAP: Record<string, string> = {
  background: '--theme-bg',
  foreground: '--theme-fg',
  card: '--theme-card',
  cardFg: '--theme-card-fg',
  cardDesc: '--theme-card-desc',
  border: '--theme-border',
  primary: '--theme-primary',
  secondary: '--theme-secondary',
  accent: '--theme-accent',
  muted: '--theme-muted',
  glowA: '--theme-glow-a',
  glowB: '--theme-glow-b'
}

/**
 * 首屏主题注入：在 HTML 解析阶段同步读取 localStorage 并写入 CSS 变量，
 * 避免 React 挂载前出现默认浅色背景（白屏闪烁）。
 */
function themeBootPlugin(): Plugin {
  return {
    name: 'theme-boot',
    transformIndexHtml() {
      const themes = JSON.parse(readFileSync(themesFile, 'utf-8')) as Array<{
        id: string
        type: string
        colors: Record<string, string>
      }>
      const map = themes
        .map((t) => {
          const varEntries = Object.entries(t.colors)
            .map(([k, v]) => `${JSON.stringify(PROP_MAP[k] || ('--theme-' + k))}:${JSON.stringify(v)}`)
            .join(',')
          return `${JSON.stringify(t.id)}:[${JSON.stringify(t.type)},{${varEntries}}]`
        })
        .join(',')

      const script = `(function(){try{var M={${map}};var d=document.documentElement;var t=M[localStorage.getItem('shuxingnong_theme')]||M[${JSON.stringify(
        themes[0].id
      )}];var ty=t[0];var co=t[1];for(var k in co){d.style.setProperty(k,co[k])}d.style.backgroundColor=co['--theme-bg'];d.classList.remove('dark','light');d.classList.add(ty==='dark'?'dark':'light')}catch(e){}})();`

      return [
        {
          tag: 'script',
          children: script,
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [themeBootPlugin(), react()],
  server: {
    host: '0.0.0.0',
    port: 35002,
    allowedHosts: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})