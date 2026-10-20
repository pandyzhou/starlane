# AGENTS.md

## 仓库概览
- **项目定位**：疏星弄（`workbench-nav`），个人服务与工作台中控导航 SPA。
- **技术栈**：React 18 + TypeScript + Vite 6 + Tailwind CSS 3 + Lucide Icons。
- **服务环境**：开发服务器运行在 `0.0.0.0:35002`（`base: './'`），后台已有常驻进程并开启 Vite HMR，**切勿随意 kill 或重复启动**。
- **构建输出**：生产产物输出到 `dist/`。

## 核心命令
- **构建与校验**：`npm run build`（等同于 `tsc && vite build`，改动代码后必须以此验证且无报错）。
- **静态预览**：`npm run preview`。
- **网络代理**：拉取或访问海外资源时，统一使用 `7890` 端口代理。

## 关键模块与状态
- **核心数据**：`src/config/index.ts`
  - `SEARCH_ENGINES`：搜索引擎配置（Google, 百度, Bing, GitHub, DuckDuckGo, Bilibili）。
  - `PROJECTS`：导航卡片数据（标题、描述、URL、状态标签与色系）。
- **主题系统**：`src/config/themes.json` + `src/config/themes.ts` + `src/components/ThemeSwitcher.tsx`
  - **唯一数据源是 `themes.json`**，8 套 21st.dev 社区主题（4 亮 + 4 暗）；`themes.ts` 只做类型声明与再导出。
  - 存储键：`localStorage.getItem('shuxingnong_theme')`。
  - 运行机制：`vite.config.ts` 中的 `themeBootPlugin` 在构建时读取 `themes.json`，向 `index.html` 注入首屏同步脚本；该脚本在 React 挂载**之前**写入 `--theme-*` CSS 变量、`<html>` 内联背景色与 `dark`/`light` 类，消除刷新白屏闪烁。
  - **每个颜色同时输出 `--theme-xxx`（hex）和 `--theme-xxx-rgb`（"r g b" 三通道）**。`tailwind.config.js` 使用 `rgb(var(--theme-xxx-rgb) / <alpha-value>)` 形式，这是 Tailwind 透明度修饰符（`bg-theme-primary/15`、`focus-within:ring-theme-primary/20` 等）生效的前提；若直接写 `var(--theme-xxx)`，所有带 `/NN` 的类都不会生成，ring 会退回默认蓝色。
  - **改动主题必须编辑 `themes.json`**；`src/index.css` 的 `:root` 默认值（含 `-rgb` 三通道）需与 `DEFAULT_THEME_ID`（candyland）保持一致，否则首次访问仍会闪烁。

## 核心开发与布局约束
- **保持单列居中布局**：严格维持 `Clock -> SearchBar -> ProjectGrid` 纵向居中流式排布（容器为 `max-w-7xl`、搜索框为 `max-w-3xl`）。**切勿重构为桌面端双栏或侧边栏布局**（用户已明确要求回滚并保持单列）。
- **严禁硬编码颜色**：组件内禁止使用 `text-white`, `text-black`, `bg-zinc-900` 等静态色彩类。必须使用动态语义类（`bg-theme-bg`, `text-theme-fg`, `bg-theme-card`, `text-theme-cardFg`, `text-theme-cardDesc`, `border-theme-border`, `text-theme-primary` 等），否则会导致亮色/暗色主题切换时文字对比度失效。
- **卡片网格规范**：保持 `sm:grid-cols-2 lg:grid-cols-3 gap-4`，确保 6 个项目卡片在桌面端稳定呈现 2 行 3 列。

## 外部与辅助工具
- `register_21st.py`：21st.dev 自动注册与邮箱激活脚本。依赖本地 `http://127.0.0.1:5073`（Turnstile Solver 服务）与 `https://inbucket.c5mc.cn`。
