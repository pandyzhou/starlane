import React from 'react';

export const PatternBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden bg-theme-bg">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgb(var(--theme-muted-rgb)/0.6),transparent_72%)] dark:bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgb(var(--theme-primary-rgb)/0.18),transparent_72%)]" />
  </div>
);
