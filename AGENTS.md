# AGENTS.md

## 命令
- `npm run build`（= `tsc && vite build`）是唯一验证手段，改完必须跑通。
- `npm run dev` 常驻在 `0.0.0.0:35002`（带 HMR），不要 kill，也不要另起一个。
- **没有 test / lint / format 脚本，也没有 CI**——没有单测可跑，别假装存在。
- `tsconfig.json` 的 `include` 只有 `src`：`vite.config.ts`、`tailwind.config.js` 不受类型检查，改坏了只有运行时暴露。
- 拉取海外资源（npm、GitHub API）走 `127.0.0.1:7890` 代理。

## 代码风格
- 2 空格缩进、单引号、语句带分号。
- import 顺序：`react` → 第三方 → 本地相对路径；类型用 `import type` 单独一行。
- 组件写 `export const X: React.FC<XProps>`，props 用 `interface XProps`；文件名与组件同名。
- 命名：组件 PascalCase，hook `useXxx`，模块级常量 UPPER_SNAKE。
- TypeScript 开 `strict`，但 `noUnusedLocals`/`noUnusedParameters` 关闭——未使用变量不报错，不可依赖它兜底。
- 无全局错误边界；异步失败必须 catch 并降级为空态（参考 `src/components/ui/search-suggest.ts`）。

## 页面结构
- `src/App.tsx` 组装：`Clock → SearchBar → 卡片网格`，dock 固定视口底部；单列居中，外层 `max-w-[96rem]`。
- 卡片网格是 `repeat(auto-fill, minmax(212px, 1fr))`，不要再写死列数。
- 整页压在一屏内（800px 视口不滚动）；加卡片后要复核高度。

## 主题系统（最易改错）
- `src/config/themes.json` 是唯一数据源，`themes.ts` 只做类型与映射，不含颜色值。
- 变量映射有**两份副本必须同步**：`themes.ts` 的 `VAR_SUFFIX`/`ALPHA_KEYS` 与 `vite.config.ts` 的 `PROP_MAP`/`ALPHA_KEYS`。
- 每个颜色要同时产出 `--theme-x` 与 `--theme-x-rgb`，缺了后者，`bg-theme-primary/15` 这类透明度修饰符会静默失效。
- `localStorage` 键固定为 `shuxingnong_theme`。

## 样式与部署
- 只用语义色类（`bg-theme-card`、`text-theme-fg`、`border-theme-border`…），不写死 `text-white`/`bg-zinc-900`。
- `base: './'` 不要改成 `'/'`，否则子路径托管白屏。
- `public/_headers` 里 `index.html` 必须 `max-age=0, must-revalidate`。
- 临时文件统一放 `temp/`，不要放根目录。
