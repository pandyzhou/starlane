# 疏星弄 · Starlane

个人导航页。一张时钟、一个搜索框、几张常去站点的卡片，底部一条能放大的 Dock，八套可切换的明暗主题。纯前端，没有后端、没有路由、没有状态管理库。

## 功能

- **时钟**：主工作区顶部的当前时间。
- **多引擎搜索**：Google、百度、Bing、GitHub、DuckDuckGo、Bilibili，图标取各自品牌色，下拉切换后记住选择。
- **站点卡片**：当前是 Excalidraw 和洛谷，渐变底 + 等宽徽章 + 3D 悬停反馈。
- **Dock**：GitHub、Telegram、抖音三个入口，固定在视口底部，鼠标靠近时图标按距离弹性放大。
- **主题**：8 套配色（4 亮 4 暗），名称与界面均为中文，选择存在 `localStorage`。
- **标注模式**：按 <kbd>Alt</kbd>+<kbd>I</kbd> 给页面上所有文本块和控件编号，方便指认「第几处要改」；<kbd>Esc</kbd> 关闭。

## 技术栈

React 18 · TypeScript · Vite 6 · Tailwind CSS 3 · lucide-react · motion

## 本地开发

```bash
npm install
npm run dev      # 开发服务器，默认 0.0.0.0:35002
npm run build    # tsc && vite build，唯一的验证手段
npm run preview  # 预览构建产物
```

没有 test / lint / format 脚本，也没有 CI。改完代码跑 `npm run build` 通过即为最低门槛。

## 目录

```
src/
  App.tsx                 页面组装：背景 → 主题切换 → 时钟 → 搜索 → 卡片 → Dock
  components/
    Clock.tsx             时钟
    SearchBar.tsx         搜索框、引擎切换、下拉
    ThemeSwitcher.tsx     主题选择面板
    ui/
      gradient-card.tsx   站点卡片
      animated-dock.tsx   底部 Dock
      pattern-background.tsx  页面背景
      inspect-overlay.tsx 标注模式（Alt+I）
  config/
    themes.json           8 套主题的唯一定义
    themes.ts             类型声明、再导出、变量映射
```

## 主题系统

`src/config/themes.json` 是唯一数据源。每个颜色同时产出 `--theme-xxx`（hex）和 `--theme-xxx-rgb`（`"r g b"` 三通道），后者供 Tailwind 的透明度修饰符（`bg-theme-primary/15`）使用。

变量映射有**两份副本，必须同步修改**：

- `src/config/themes.ts` 的 `VAR_SUFFIX` / `ALPHA_KEYS` —— 运行时切换走这条
- `vite.config.ts` 的 `PROP_MAP` / `ALPHA_KEYS` —— 构建期把主题内联进 `index.html` 的首屏脚本，消除刷新闪白

`localStorage` 的键固定为 `shuxingnong_theme`，改名会让老用户丢失已选主题。

## 部署

`base` 是 `'./'`，产物全部走相对路径，可以直接放到任意子路径下。`public/_headers` 是 Cloudflare Pages / Netlify 的缓存规则格式，构建时原样复制到 `dist/`：`/assets/*` 缓存一年，`index.html` 必须 `max-age=0, must-revalidate`，否则用户会长期停留在指向旧哈希的旧页面。

## 命名

疏星弄，英文名 **Starlane**（star + lane）。仓库沿用 `workbench-nav`。
