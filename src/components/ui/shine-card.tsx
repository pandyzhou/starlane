import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ShineCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const ShineCard: React.FC<ShineCardProps> = ({ href, icon, title, desc, domain }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={
      {
        '--border-width': '1px',
        '--border-radius': '16px',
        '--duration': '14s',
        '--mask-linear-gradient': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        '--background-radial-gradient':
          'radial-gradient(transparent, transparent, rgb(var(--theme-primary-rgb)), rgb(var(--theme-secondary-rgb)), transparent, transparent)',
      } as React.CSSProperties
    }
    className="group relative flex w-full flex-col rounded-2xl border border-theme-border/60 bg-theme-card p-5
      before:absolute before:inset-0 before:rounded-[inherit] before:p-[--border-width] before:content-['']
      before:bg-shine-size before:[background-image:var(--background-radial-gradient)]
      before:[mask:var(--mask-linear-gradient)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]
      before:opacity-0 before:transition-opacity before:duration-300
      motion-safe:before:animate-shine group-hover:before:opacity-100"
  >
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-theme-primary/12 text-theme-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-theme-cardFg">{title}</span>
        <span className="block truncate text-[11px] text-theme-cardDesc/70">{domain}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-theme-cardDesc/40 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-theme-primary" />
    </div>

    <p className="mt-3 text-xs leading-relaxed text-theme-cardDesc">{desc}</p>
  </a>
);
