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
    className="group relative flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-theme-border bg-theme-card p-4 transition-colors duration-300 hover:border-theme-primary/40 dark:bg-theme-muted/30"
  >
    <div className="relative z-10 flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-theme-border/70 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-theme-cardDesc">
          <span className="h-1.5 w-1.5 rounded-full bg-theme-primary" />
          {domain}
        </span>
        <span className="font-mono text-[12px] tracking-widest text-theme-cardDesc/40 tabular-nums">{index}</span>
      </div>

      <span className="flex-grow">
        <span className="mb-2 flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center [&>img]:h-7 [&>img]:w-7">
            {icon}
          </span>
          <h2 className="text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-theme-cardFg">
            {title}
          </h2>
        </span>
        <p className="max-w-[27ch] text-pretty text-[13px] leading-[1.55] text-theme-cardDesc">{desc}</p>
      </span>

      <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.06em] text-theme-cardFg">
        打开站点
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </motion.a>
);
