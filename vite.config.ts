import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const themesFile = fileURLToPath(new URL('./src/config/themes.json', import.meta.url))

const PROP_MAP: Record<string, string> = {
  background: 'bg',
  foreground: 'fg',
  card: 'card',
  cardFg: 'card-fg',
  cardDesc: 'card-desc',
  border: 'border',
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  muted: 'muted',
  glowA: 'glow-a',
  glowB: 'glow-b'
}

/** 需要额外输出 rgb 三通道的键，供 Tailwind 透明度修饰符使用 */
const ALPHA_KEYS = [
  'background',
  'foreground',
  'card',
  'cardFg',
  'cardDesc',
  'border',
  'primary',
  'secondary',
  'accent',
  'muted'
]

function hexToRgbTriplet(hex: string): string {
  const raw = String(hex).replace('#', '').trim()
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const n = parseInt(full, 16)
  if (Number.isNaN(n)) return '0 0 0'
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
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
          const entries: string[] = []
          for (const [k, v] of Object.entries(t.colors)) {
            const suffix = PROP_MAP[k] || '--theme-' + k
            entries.push(`${JSON.stringify('--theme-' + suffix)}:${JSON.stringify(v)}`)
            if (ALPHA_KEYS.includes(k)) {
              entries.push(
                `${JSON.stringify('--theme-' + suffix + '-rgb')}:${JSON.stringify(hexToRgbTriplet(v))}`
              )
            }
          }
          return `${JSON.stringify(t.id)}:[${JSON.stringify(t.type)},{${entries.join(',')}}]`
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
    allowedHosts: true,
    // 本地没有边缘函数运行时，开发时把 /api/suggest 直连到 Bilibili
    proxy: {
      '/api/suggest': {
        target: 'https://s.search.bilibili.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/suggest/, '/main/suggest'),
        headers: { Referer: 'https://search.bilibili.com/' }
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})