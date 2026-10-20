import React from 'react';
import { Clock } from './components/Clock';
import { SearchBar } from './components/SearchBar';
import { ProjectGrid } from './components/ProjectGrid';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased bg-grid-pattern relative flex flex-col justify-between selection:bg-[#ff99cc]/30 selection:text-[#ff99cc]">
      {/* 顶部氛围微光 */}
      <div className="fixed inset-0 glow-radial pointer-events-none" />

      {/* 主工作区 */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-5 py-12 md:py-20 flex-1 flex flex-col items-center">
        <Clock />
        <SearchBar />
        <ProjectGrid />
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-zinc-500 border-t border-[#444444]/40 font-mono">
        <p>疏星弄 · tendouaris.cn</p>
      </footer>
    </div>
  );
};

export default App;
