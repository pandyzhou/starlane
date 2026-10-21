import React from 'react';

export const PatternBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden bg-theme-bg">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_105%,rgb(var(--theme-primary-rgb)/0.5),transparent_72%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_50%_100%,rgb(var(--theme-secondary-rgb)/0.28),transparent_70%)]" />
    <div className="absolute inset-0 dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85),transparent_65%)]" />
  </div>
);
