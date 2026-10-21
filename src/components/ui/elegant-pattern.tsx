import React from 'react';

export const ElegantPattern: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[linear-gradient(to_right,rgb(var(--theme-border-rgb)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--theme-border-rgb)/0.45)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgb(var(--theme-border-rgb)/0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--theme-border-rgb)/0.55)_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgb(var(--theme-primary-rgb)/0.28),transparent)]" />
  </div>
);
