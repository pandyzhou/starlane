import React from 'react';
import { BookOpen, Bot, Box, Cloud, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Clock } from './components/Clock';
import { SearchBar } from './components/SearchBar';
import { ProjectGrid } from './components/ProjectGrid';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AnimatedDock } from './components/ui/animated-dock';
import { PROJECTS } from './config';

const DOCK_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Bot,
  ShieldCheck,
  Mail,
  Cloud,
  Sparkles,
};

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-fg antialiased bg-grid-pattern relative flex flex-col justify-between selection:bg-theme-primary/30 selection:text-theme-primary">
      {/* 顶部氛围微光 */}
      <div className="fixed inset-0 glow-radial pointer-events-none" />

      {/* 顶部工具栏（主题切换） */}
      <div className="relative z-20 w-full max-w-[96rem] mx-auto px-5 sm:px-8 pt-6 pb-2 flex justify-end">
        <ThemeSwitcher />
      </div>

      {/* 主工作区 */}
      <main className="relative z-10 w-full max-w-[96rem] mx-auto px-5 sm:px-8 py-6 md:py-12 flex-1 flex flex-col items-center">
        <Clock />
        <SearchBar />
        <ProjectGrid />
        <AnimatedDock
          className="mt-16 mb-4"
          items={PROJECTS.map((proj) => {
            const Icon = DOCK_ICONS[proj.icon] || Box;
            return {
              link: proj.url,
              target: '_blank',
              Icon: <Icon className="w-5 h-5" />,
            };
          })}
        />
      </main>
    </div>
  );
};

export default App;
