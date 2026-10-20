import React from 'react';
import { Clock } from './components/Clock';
import { SearchBar } from './components/SearchBar';
import { ProjectGrid } from './components/ProjectGrid';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased bg-grid-pattern relative flex flex-col justify-between selection:bg-zinc-800 selection:text-zinc-100">
      {/* 顶部氛围微光 */}
      <div className="fixed inset-0 glow-radial pointer-events-none" />

      {/* 主工作区 */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-5 py-12 md:py-20 flex-1 flex flex-col items-center">
        <Clock />
        <SearchBar />
        <ProjectGrid />
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-zinc-600 border-t border-zinc-900">
        <p>Built with Vite + React + Tailwind · Deployable to Cloudflare & EdgeOne Pages</p>
      </footer>
    </div>
  );
};

export default App;
