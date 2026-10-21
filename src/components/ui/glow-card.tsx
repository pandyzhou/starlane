import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface GlowCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({ href, icon, title, desc, domain }) => {
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-theme-border/60 bg-theme-card p-5 transition-colors duration-300 hover:border-theme-border"
    >
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(280px circle at ${glow.x}px ${glow.y}px, rgb(var(--theme-primary-rgb) / 0.1), transparent 65%)`,
        }}
      />

      <div className="relative flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-theme-primary/12 text-theme-primary">
          {icon}
        </span>
        <ArrowUpRight className="h-4 w-4 text-theme-cardDesc/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-theme-primary" />
      </div>

      <div className="relative mt-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-theme-cardFg">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-theme-cardDesc">{desc}</p>
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-[11px] text-theme-cardDesc/60">
        <span className="h-px w-4 bg-current opacity-40" />
        {domain}
      </div>
    </a>
  );
};
