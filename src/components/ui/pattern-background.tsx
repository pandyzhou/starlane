import React from 'react';

export const PatternBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-theme-bg" />
    {/* 与卡片同一色系：只用主色，深浅拉开，不再混入副色 */}
    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(var(--theme-primary-rgb)/0.20),transparent_55%,rgb(var(--theme-primary-rgb)/0.14))] opacity-90 dark:opacity-40" />
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
