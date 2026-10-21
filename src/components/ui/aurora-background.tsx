import React from 'react';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const AURORA =
  '[--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)] [background-image:var(--aurora)]';

const MASK = '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]';

export const AuroraBackground: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('pointer-events-none fixed inset-0 overflow-hidden', className)}>
    <div
      className={cn(
        'absolute -inset-[10px] opacity-45 dark:opacity-50 blur-[10px] will-change-transform animate-aurora',
        '[background-size:300%,_200%] [background-position:50%_50%]',
        AURORA,
        MASK
      )}
    />
    <div
      className={cn(
        'absolute -inset-[10px] opacity-30 dark:opacity-40 blur-[24px] mix-blend-screen will-change-transform animate-aurora',
        '[background-size:200%,_100%] [background-position:50%_50%]',
        AURORA,
        MASK
      )}
    />
  </div>
);
