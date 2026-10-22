import React, { useRef } from 'react';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export interface DockItemData {
  link: string;
  Icon: React.ReactNode;
  target?: string;
  bg?: string;
  /** 纯图标链接没有可见文字，必须给读屏留名称 */
  label: string;
}

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-16 items-end gap-3 sm:gap-4 rounded-2xl border border-theme-border bg-theme-card/70 px-4 pb-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl',
        className
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} bg={item.bg}>
          <a
            href={item.link}
            target={item.target}
            rel="noopener noreferrer"
            aria-label={item.label}
            className="flex h-full w-full grow items-center justify-center text-white"
          >
            {item.Icon}
          </a>
        </DockItem>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  bg?: string;
}

export const DockItem = ({ mouseX, bg, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  // 用户要求减少动态效果时，图标保持固定尺寸，不做放大
  const calmWidth = useTransform(widthSync, (v) => (reduceMotion ? 40 : v));
  const width = useSpring(calmWidth, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [40, 80], [1, 1.5]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'flex aspect-square w-10 items-center justify-center rounded-[0.9rem] bg-theme-fg',
        bg
      )}
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex h-full w-full grow items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
