import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface LinkRowProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const LinkRow: React.FC<LinkRowProps> = ({ href, icon, title, desc, domain }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex w-full items-center gap-4 rounded-2xl border border-theme-border/60 bg-theme-card px-4 py-3.5 transition duration-200 hover:border-theme-primary/40 hover:bg-theme-card/70"
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-theme-primary/12 text-theme-primary">
      {icon}
    </span>

    <span className="min-w-0 flex-1">
      <span className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-theme-cardFg">{title}</span>
        <span className="hidden truncate text-[11px] text-theme-cardDesc/60 sm:inline">{domain}</span>
      </span>
      <span className="mt-0.5 block truncate text-xs text-theme-cardDesc">{desc}</span>
    </span>

    <ArrowUpRight className="h-4 w-4 shrink-0 text-theme-cardDesc/40 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-theme-primary" />
  </a>
);
