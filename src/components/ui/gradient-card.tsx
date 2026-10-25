import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export interface GradientCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
  index?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  href,
  icon,
  title,
  desc,
  domain,
  index = '01',
}) => (
  <motion.a
    href={href}
    initial="rest"
    whileHover="hover"
    animate="rest"
    variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.02, y: -4 } }}
    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    className="group relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-white/25 bg-white/55 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.04),0_18px_40px_-26px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/40 dark:border-white/12 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_40px_-26px_rgba(0,0,0,0.8)]"
  >
    <motion.span
      aria-hidden
      variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 6 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="pointer-events-none absolute -bottom-8 -right-6 text-theme-primary/10 dark:text-theme-primary/15"
    >
      <span className="block [&>svg]:h-32 [&>svg]:w-32">{icon}</span>
    </motion.span>

    <div className="relative z-10 flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-theme-border/70 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-theme-cardDesc">
          <span className="h-1.5 w-1.5 rounded-full bg-theme-primary" />
          {domain}
        </span>
        <span className="font-mono text-[12px] tracking-widest text-theme-cardDesc/40 tabular-nums">{index}</span>
      </div>

      <span className="flex-grow">
        <h2 className="mb-2 text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-theme-cardFg">
          {title}
        </h2>
        <p className="max-w-[27ch] text-pretty text-[13px] leading-[1.55] text-theme-cardDesc">{desc}</p>
      </span>

      <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.06em] text-theme-cardFg">
        打开站点
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </motion.a>
);
