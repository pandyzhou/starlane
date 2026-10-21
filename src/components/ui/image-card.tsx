import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ImageCardProps {
  href: string;
  image: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ href, image, icon, title, desc, domain }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-theme-border/70 bg-theme-card shadow-[0_12px_32px_-18px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)]"
  >
    <div className="relative aspect-[16/9] overflow-hidden bg-theme-muted/30">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />
    </div>

    <div className="flex flex-1 flex-col gap-2 px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-theme-primary/15 text-theme-primary">
          {icon}
        </span>
        <h3 className="truncate text-sm font-semibold text-theme-cardFg">{title}</h3>
        <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-theme-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <p className="text-xs leading-relaxed text-theme-cardDesc">{desc}</p>
      <span className="text-[11px] text-theme-cardDesc/70">{domain}</span>
    </div>
  </a>
);
