import React from 'react';
import { Clock } from './components/Clock';
import { SearchBar } from './components/SearchBar';
import { ProjectGrid } from './components/ProjectGrid';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-fg antialiased bg-grid-pattern relative flex flex-col justify-between selection:bg-theme-primary/30 selection:text-theme-primary">
      {/* 顶部氛围微光 */}
      <div className="fixed inset-0 glow-radial pointer-events-none" />

      {/* 顶部工具栏（主题切换） */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-2 flex justify-end">
        <ThemeSwitcher />
      </div>

      {/* 主工作区 */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-6 md:py-12 flex-1 flex flex-col items-center">
        <Clock />
        <SearchBar />
        <ProjectGrid />
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-theme-fg/50 border-t border-theme-border/50 font-mono">
        <p>疏星弄</p>
      </footer>
    </div>
  );
};

export default App;
