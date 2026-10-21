import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export interface GradientCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
  tone?: 'primary' | 'secondary';
}

const TONES = {
  primary: 'from-theme-primary/20 to-theme-secondary/10',
  secondary: 'from-theme-secondary/25 to-theme-primary/10',
} as const;

export const GradientCard: React.FC<GradientCardProps> = ({
  href,
  icon,
  title,
  desc,
  domain,
  tone = 'primary',
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial="rest"
    whileHover="hover"
    animate="rest"
    variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.02, y: -4 } }}
    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-theme-border/50 bg-gradient-to-br p-6 ${TONES[tone]}`}
  >
    <motion.span
      aria-hidden
      variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: 6 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="pointer-events-none absolute -bottom-8 -right-6 text-theme-primary/15"
    >
      <span className="block [&>svg]:h-32 [&>svg]:w-32">{icon}</span>
    </motion.span>

    <div className="relative z-10 flex h-full flex-col">
      <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-theme-bg/60 px-3 py-1 text-[11px] font-medium text-theme-cardDesc backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-theme-primary" />
        {domain}
      </span>

      <span className="flex-grow">
        <h3 className="mb-1.5 text-xl font-bold tracking-tight text-theme-cardFg">{title}</h3>
        <p className="max-w-[26ch] text-xs leading-relaxed text-theme-cardDesc">{desc}</p>
      </span>

      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-theme-cardFg">
        打开站点
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </motion.a>
);
