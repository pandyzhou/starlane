import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LiquidCard } from './liquid-card';

export interface TiltCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ href, icon, title, desc, domain }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 12,
      ry: (px - 0.5) * 12,
      mx: px * 100,
      my: py * 100,
    });
  };

  const handleLeave = () => {
    setHovering(false);
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: hovering
          ? 'transform 80ms linear'
          : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className="group relative block w-full will-change-transform"
    >
      <LiquidCard className="gap-3 overflow-hidden p-5">
        <span
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(280px circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.22), transparent 65%)`,
          }}
        />

        <div className="relative flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-theme-primary/15 text-theme-primary">
            {icon}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-theme-cardFg">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-theme-cardDesc">{desc}</p>
          </div>
        </div>

        <div className="relative flex items-center justify-between text-[11px] text-theme-cardDesc/80">
          <span className="truncate">{domain}</span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-theme-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </LiquidCard>
    </a>
  );
};
