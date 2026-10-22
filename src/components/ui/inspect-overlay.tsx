import React, { useCallback, useEffect, useState } from 'react';

/** 标注模式：Alt+I 切换，给页面上所有可交互元素和文本节点编号。 */
const COLLECT_TAGS = new Set(['a', 'button', 'input', 'select', 'textarea', 'img']);

const isRenderable = (el: Element) => {
  const cs = getComputedStyle(el);
  if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
  const rect = el.getBoundingClientRect();
  return rect.width >= 6 && rect.height >= 6;
};

const collectTargets = (): HTMLElement[] => {
  const out: HTMLElement[] = [];

  const walk = (el: Element) => {
    if (el.hasAttribute('data-xn-overlay')) return;
    if (!isRenderable(el)) return;

    const tag = el.tagName.toLowerCase();
    const interactive = COLLECT_TAGS.has(tag);
    const hasOwnText = Array.from(el.childNodes).some(
      (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0
    );

    if (interactive || hasOwnText) out.push(el as HTMLElement);
    Array.from(el.children).forEach(walk);
  };

  walk(document.body);
  return out;
};

export const InspectOverlay: React.FC = () => {
  const [active, setActive] = useState(false);
  const [targets, setTargets] = useState<HTMLElement[]>([]);
  const [, forceTick] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.code === 'KeyI' || e.key.toLowerCase() === 'i')) {
        e.preventDefault();
        setActive((v) => !v);
      }
      if (e.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!active) {
      setTargets([]);
      return;
    }
    setTargets(collectTargets());
    const refresh = () => forceTick((n) => n + 1);
    window.addEventListener('scroll', refresh, true);
    window.addEventListener('resize', refresh);
    return () => {
      window.removeEventListener('scroll', refresh, true);
      window.removeEventListener('resize', refresh);
    };
  }, [active]);

  const label = useCallback((index: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const offscreen = rect.bottom < 0 || rect.top > window.innerHeight;
    if (offscreen) return null;
    return (
      <span
        key={index}
        style={{ left: rect.left, top: rect.top }}
        className="absolute flex h-[15px] min-w-[15px] items-center justify-center rounded-[3px] bg-[#ff2d55] px-[3px] font-mono text-[9px] font-bold leading-none text-white shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
      >
        {index}
      </span>
    );
  }, []);

  if (!active) return null;

  return (
    <div
      data-xn-overlay
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {targets.map((el, i) => label(i + 1, el))}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#ff2d55] px-3 py-1 font-mono text-[10px] font-bold text-white shadow-lg">
        标注模式 · 共 {targets.length} 处 · Alt+I 或 Esc 关闭
      </span>
    </div>
  );
};
