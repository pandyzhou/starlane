import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface FolderCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const FolderCard: React.FC<FolderCardProps> = ({ href, icon, title, desc, domain }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex w-full flex-col pt-8 transition-transform duration-300 hover:-translate-y-0.5"
  >
    {/* 文件夹标签页 */}
    <span className="absolute left-0 top-0 flex h-9 items-center gap-1.5 rounded-t-xl border border-b-0 border-theme-border/60 bg-theme-card/90 px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-theme-cardDesc/70 backdrop-blur-md">
      {domain}
    </span>

    {/* 文件夹本体 */}
    <span className="relative flex flex-col gap-3 rounded-2xl rounded-tl-md border border-theme-border/60 bg-theme-card/90 p-5 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <span className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-theme-primary/12 text-theme-primary">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-theme-cardFg">{title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-theme-cardDesc">{desc}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-theme-cardDesc/40 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-theme-primary" />
      </span>
    </span>
  </a>
);
