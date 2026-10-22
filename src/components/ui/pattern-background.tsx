import React from 'react';

export const PatternBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden bg-theme-bg">
    {/* #7 Gradient Blur Bg：右上偏浓、左下淡出的单色渐变 */}
    <div className="absolute inset-0 bg-[linear-gradient(215deg,rgb(var(--theme-primary-rgb)/0.30),rgb(var(--theme-primary-rgb)/0.07)_45%,transparent_78%)] dark:bg-[linear-gradient(215deg,rgb(var(--theme-primary-rgb)/0.22),rgb(var(--theme-primary-rgb)/0.05)_45%,transparent_78%)]" />
  </div>
);
