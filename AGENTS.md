# AGENTS.md

## 仓库概览
- **疏星弄（`workbench-nav`）**：单页个人导航站，无后端、无路由、无状态管理库。技术栈 React 18 + TypeScript + Vite 6 + Tailwind CSS 3 + lucide-react。
- 唯一页面由 `src/App.tsx` 组装：`Clock -> SearchBar -> ProjectGrid`，右上角挂 `ThemeSwitcher`。
- **开发服务器已在 `0.0.0.0:35002` 常驻**（`host: 0.0.0.0`、`allowedHosts: true`，公网可达），带 HMR。不要 kill，也不要另起一个。

## 命令
- 唯一验证手段是 `npm run build`（= `tsc && vite build`），改完代码必须跑通。
- **没有 test / lint / format 脚本，也没有 CI**，不要假装存在。
- `tsconfig.json` 的 `include` 只有 `["src"]`：`vite.config.ts` 和 `tailwind.config.js` 不受 `tsc` 检查，改坏了只有运行时才暴露。
- 拉取海外资源（npm、GitHub API）走 `127.0.0.1:7890` 代理。

## 主题系统（最容易改错的地方）
- **`src/config/themes.json` 是唯一数据源**：8 套主题（4 亮 + 4 暗）。`src/config/themes.ts` 只做类型声明、再导出与工具函数，不含颜色值。
- 变量映射存在**两份副本**，改一处必须同步另一处：
  - `src/config/themes.ts` 的 `VAR_SUFFIX` / `ALPHA_KEYS`（运行时切换走这条）
  - `vite.config.ts` 的 `PROP_MAP` / `ALPHA_KEYS`（构建期注入首屏脚本走这条）
- 每个颜色必须同时产出 `--theme-xxx`（hex）和 `--theme-xxx-rgb`（`"r g b"` 三通道）。`tailwind.config.js` 里写的是 `rgb(var(--theme-xxx-rgb) / <alpha-value>)`；缺了 `-rgb` 变量，所有 `/NN` 透明度修饰符（`bg-theme-primary/15`、`focus-within:ring-theme-primary/20`）会静默失效。
- `glowA` / `glowB` **不在** Tailwind 色板里，只作为 `--theme-glow-a/b` 供 `index.css` 的 `.glow-radial` 使用。
- `vite.config.ts` 的 `themeBootPlugin` 在构建期把全部主题内联进 `index.html` 的 `<head>` 脚本，在 React 挂载前写入 CSS 变量、`<html>` 背景色与 `dark`/`light` 类，用来消除刷新闪白。改动它要同步 `src/index.css` 的 `:root` 默认值；当前对应 `DEFAULT_THEME_ID = 'candyland'`，不一致会重新出现闪白。
- `localStorage` 键固定为 `shuxingnong_theme`，首屏脚本和 `ThemeSwitcher` 都读它，改名会让老用户丢失已选主题。

## 样式约束
- 组件内用语义色类（`bg-theme-bg`、`text-theme-fg`、`bg-theme-card`、`text-theme-cardFg`、`text-theme-cardDesc`、`border-theme-border`、`text-theme-primary` 等），不要 `text-white` / `bg-zinc-900` 这类写死颜色，否则明暗切换后对比度失效。唯一例外是 `ThemeSwitcher` 里主题色块的中性描边 `border-black/10`、`border-white/20`。
- **卡片标签色不走 Tailwind**：`project.tagColor` 经 `ProjectGrid` 的 `COLOR_MAP` 映射到 `index.css` 里的 `.tag-*` 类，颜色取自明暗两套 `--tag-<color>-fg/-bg/-border` 变量。新增一个色系要同时改三处：`ProjectItem['tagColor']` 联合类型、`COLOR_MAP`、`index.css` 的 `.light` 与 `.dark` 两组变量。
- **保持单列居中**：`Clock -> SearchBar -> ProjectGrid` 纵向流式，外层容器 `max-w-[96rem]`，搜索框 `max-w-3xl`。不要重构成桌面双栏或侧边栏（曾按要求整体回滚过）。
- 卡片网格固定为 `sm:grid-cols-2 lg:grid-cols-3 gap-4`，6 张卡在桌面端呈 2 行 3 列。

## 部署与缓存
- `base: './'`：产物全部走相对路径，不要改成 `'/'`，否则子路径托管会白屏。
- `public/_headers`（Cloudflare Pages / Netlify 格式）构建时被原样复制到 `dist/`。其中 `/assets/*` 一年 immutable，`index.html` 必须保持 `max-age=0, must-revalidate` —— 改成长缓存会让用户长期停留在指向旧哈希的旧页面。
- 构建产物只有 `dist/`；`dist/` 与 `temp/` 都已列入 `.gitignore`（临时文件统一放 `temp/`，不要放根目录）。
