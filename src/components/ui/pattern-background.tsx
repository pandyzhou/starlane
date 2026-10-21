import React from 'react';

export const PatternBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-theme-bg" />
    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(var(--theme-secondary-rgb)/0.38),transparent_45%,rgb(var(--theme-primary-rgb)/0.32))] opacity-90 dark:opacity-45" />
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
