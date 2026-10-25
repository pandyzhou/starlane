import React from 'react';
import { Activity, Binary, BookOpen, Crosshair, NotebookPen, Pencil } from 'lucide-react';
import { Clock } from './components/Clock';
import { SearchBar } from './components/SearchBar';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AnimatedDock } from './components/ui/animated-dock';
import { PatternBackground } from './components/ui/pattern-background';
import { GradientCard } from './components/ui/gradient-card';
import { InspectOverlay } from './components/ui/inspect-overlay';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="2 2 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const DOUYIN_PATH =
  'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z';

const DouyinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d={DOUYIN_PATH} fill="#25F4EE" transform="translate(-1.1 0)" />
    <path d={DOUYIN_PATH} fill="#FE2C55" transform="translate(1.1 0)" />
    <path d={DOUYIN_PATH} fill="currentColor" />
  </svg>
);


const AliyunIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.996 4.517h5.291L8.01 6.324 4.153 7.506a1.668 1.668 0 0 0-1.165 1.601v5.786a1.668 1.668 0 0 0 1.165 1.6l3.857 1.183 1.277 1.807H3.996A3.996 3.996 0 0 1 0 15.487V8.513a3.996 3.996 0 0 1 3.996-3.996m16.008 0h-5.291l1.277 1.807 3.857 1.182c.715.227 1.17.889 1.165 1.601v5.786a1.668 1.668 0 0 1-1.165 1.6l-3.857 1.183-1.277 1.807h5.291A3.996 3.996 0 0 0 24 15.487V8.513a3.996 3.996 0 0 0-3.996-3.996m-4.007 8.345H8.002v-1.804h7.995Z" />
  </svg>
);




const TencentCloudIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.6 18h8.8a4.4 4.4 0 0 0 .5-8.77A6.4 6.4 0 0 0 5.5 10.7 3.9 3.9 0 0 0 8.6 18Z" />
  </svg>
);

const DOCK_ITEMS = [
  { link: 'https://github.com/pandyzhou', target: '_blank', Icon: <GithubIcon />, bg: 'bg-[#181717]', label: 'GitHub' },
  { link: 'https://t.me', target: '_blank', Icon: <TelegramIcon />, bg: 'bg-[#26A5E4]', label: 'Telegram' },
  { link: 'https://www.douyin.com/', target: '_blank', Icon: <DouyinIcon />, bg: 'bg-[#000000]', label: '抖音' },
  { link: 'https://home.console.aliyun.com/home/dashboard/ProductAndService', target: '_blank', Icon: <AliyunIcon />, bg: 'bg-[#ff6a00]', label: '阿里云' },
  { link: 'https://console.cloud.tencent.com', target: '_blank', Icon: <TencentCloudIcon />, bg: 'bg-[#0052d9]', label: '腾讯云' },
];

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-fg antialiased relative flex flex-col justify-between selection:bg-theme-primary/30 selection:text-theme-primary">
      {/* 顶部氛围微光 */}
      <PatternBackground />
      <InspectOverlay />
      <div className="fixed inset-0 glow-radial pointer-events-none" />

      {/* 顶部工具栏（主题切换） */}
      <div className="relative z-20 w-full max-w-[96rem] mx-auto px-5 sm:px-8 pt-6 pb-2 flex justify-end">
        <ThemeSwitcher />
      </div>

      {/* 主工作区 */}
      <main className="relative z-10 w-full max-w-[96rem] mx-auto px-5 sm:px-8 pt-6 md:pt-12 pb-32 flex-1 flex flex-col items-center">
        <Clock />
        <SearchBar />
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          <GradientCard
            href="https://excalidraw.com"
            icon={<Pencil />}
            title="Excalidraw"
            desc="手绘风格的白板工具，支持离线使用、多人协作与导出。"
            domain="excalidraw.com"
            index="01"
          />
          <GradientCard
            href="https://www.luogu.com.cn/"
            icon={<Binary />}
            title="洛谷"
            desc="算法竞赛题库与题解社区，覆盖从入门到省选的训练路径。"
            domain="luogu.com.cn"
            index="02"
          />
          <GradientCard
            href="https://blog.blockcorner.top"
            icon={<NotebookPen />}
            title="博客"
            desc="个人博客，记录开发笔记、踩坑过程与一些零散的折腾。"
            domain="blog.blockcorner.top"
            index="03"
          />
          <GradientCard
            href="https://komari.zhouyihub.com"
            icon={<Activity />}
            title="Komari"
            desc="服务器状态监控面板，查看节点负载、流量与在线情况。"
            domain="komari.zhouyihub.com"
            index="04"
          />
          <GradientCard
            href="https://www.eftarkov.com"
            icon={<Crosshair />}
            title="EFTarkov"
            desc="《逃离塔科夫》的资料与数据查询站，枪械、弹药、地图一应俱全。"
            domain="eftarkov.com"
            index="05"
          />
          <GradientCard
            href="https://oi-wiki.org/"
            icon={<BookOpen />}
            title="OI Wiki"
            desc="算法竞赛知识库，从基础语法到高级算法的系统整理。"
            domain="oi-wiki.org"
            index="06"
          />
        </div>
      </main>

      {/* Dock 固定在视口底部 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-5">
        <div className="pointer-events-auto">
          <AnimatedDock items={DOCK_ITEMS} />
        </div>
      </div>
    </div>
  );
};

export default App;
