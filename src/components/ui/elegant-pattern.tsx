import React from 'react';

export const ElegantPattern: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden text-theme-fg">
    <div
      className="absolute inset-0 opacity-[0.05] dark:opacity-[0.09]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 7px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 7px)',
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgb(var(--theme-primary-rgb)/0.22),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgb(var(--theme-secondary-rgb)/0.18),transparent_70%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgb(var(--theme-bg-rgb)/0.55))]" />
  </div>
);
