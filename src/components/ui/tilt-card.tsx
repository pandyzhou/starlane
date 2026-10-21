import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

const SPRING_MOUSE = { stiffness: 200, damping: 15, mass: 0.3 };

const useHoverCapable = () => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return canHover;
};

export interface TiltCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ href, icon, title, desc, domain }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = !reduce && canHover;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const srx = useSpring(rx, SPRING_MOUSE);
  const sry = useSpring(ry, SPRING_MOUSE);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 12);
    rx.set((0.5 - py) * 12);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const transform = useMotionTemplate`perspective(1000px) rotateX(${srx}deg) rotateY(${sry}deg)`;
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(var(--theme-fg-rgb)), transparent 50%)`;

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: 'preserve-3d' }}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-theme-border/80 bg-theme-card/85 p-5 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md will-change-transform"
    >
      <div className="relative flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-theme-primary/15 text-theme-primary">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-theme-cardFg">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-theme-cardDesc">{desc}</p>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between text-[11px] text-theme-cardDesc/80">
        <span className="truncate">{domain}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-theme-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {enabled ? (
        <motion.span
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 opacity-15"
        />
      ) : null}
    </motion.a>
  );
};
