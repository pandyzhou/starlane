import React from 'react';

export const PatternBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-theme-bg" />
    {/* 与卡片同一色系：只用主色，深浅拉开，不再混入副色 */}
    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(var(--theme-primary-rgb)/0.20),transparent_55%,rgb(var(--theme-primary-rgb)/0.14))] opacity-90 dark:opacity-40" />
    {/* 卡片后方的色斑：给毛玻璃提供"可被模糊"的内容 */}
    <div className="absolute left-1/2 top-[38%] h-[42vh] w-[80vw] max-w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--theme-primary-rgb)/0.45),rgb(var(--theme-secondary-rgb)/0.28),transparent)] blur-2xl dark:bg-[radial-gradient(closest-side,rgb(var(--theme-primary-rgb)/0.38),rgb(var(--theme-secondary-rgb)/0.22),transparent)]" />
    <div
      className="absolute -right-24 -top-24 h-[62%] w-[62%] opacity-50 blur-3xl dark:opacity-25"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(var(--theme-primary-rgb) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--theme-primary-rgb) / 0.55) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(circle at 80% 20%, black, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(circle at 80% 20%, black, transparent 72%)',
      }}
    />
  </div>
);
