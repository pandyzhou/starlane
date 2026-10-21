import React, { useState, useEffect, useRef } from 'react';
import { THEMES, ThemeItem, DEFAULT_THEME_ID, VAR_SUFFIX, ALPHA_KEYS, hexToRgbTriplet } from '../config/themes';
import { Palette, Check, Sun, Moon } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem('shuxingnong_theme') || DEFAULT_THEME_ID;
  });
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const applyTheme = (theme: ThemeItem) => {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    (Object.keys(VAR_SUFFIX) as Array<keyof typeof VAR_SUFFIX>).forEach(key => {
      const suffix = VAR_SUFFIX[key];
      const value = theme.colors[key];
      root.style.setProperty(`--theme-${suffix}`, value);
      // Tailwind 透明度修饰符（bg-theme-primary/15 等）依赖 -rgb 三通道变量
      if (ALPHA_KEYS.includes(key)) {
        root.style.setProperty(`--theme-${suffix}-rgb`, hexToRgbTriplet(value));
      }
    });

    if (theme.type === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // 下一帧恢复过渡，避免瞬时变色被 transition 拉长
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove('theme-switching'));
    });
  };

  useEffect(() => {
    const active = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
    applyTheme(active);
    localStorage.setItem('shuxingnong_theme', active.id);
  }, [currentThemeId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];
  const lightThemes = THEMES.filter(t => t.type === 'light');
  const darkThemes = THEMES.filter(t => t.type === 'dark');

  return (
    <div className="relative" ref={panelRef}>
      {/* 触发按钮 */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-theme-border bg-theme-card/80 backdrop-blur-md text-xs font-medium text-theme-fg hover:border-theme-primary transition shadow-sm select-none"
        title="切换主题"
      >
        <span
          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
          style={{ backgroundColor: currentTheme.colors.primary }}
        />
        <span className="hidden sm:inline">{currentTheme.displayName}</span>
        <Palette className="w-3.5 h-3.5 text-theme-primary" />
      </button>

      {/* 主题选择面板 */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-32 max-w-[calc(100vw-2rem)] p-2 rounded-2xl border border-theme-border bg-theme-card/95 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 sm:w-72 sm:p-2.5">
          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-0.5">
            {/* 亮色系 */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-500 mb-1 px-1">
                <Sun className="w-3 h-3" />
                <span>亮色系 (4)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {lightThemes.map(t => {
                  const active = t.id === currentThemeId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setCurrentThemeId(t.id);
                      }}
                      className={`flex items-center justify-between p-1.5 rounded-xl border text-xs text-left transition ${
                        active
                          ? 'border-theme-primary bg-theme-primary/10 font-semibold'
                          : 'border-theme-border/60 hover:border-theme-primary/50 hover:bg-theme-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {/* 双色指示球 */}
                        <div
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0 overflow-hidden flex"
                          title={t.name}
                        >
                          <div className="w-1/2 h-full" style={{ backgroundColor: t.colors.background }} />
                          <div className="w-1/2 h-full" style={{ backgroundColor: t.colors.primary }} />
                        </div>
                        <span className="truncate text-[11px]">{t.name}</span>
                      </div>
                      {active && <Check className="w-3.5 h-3.5 text-theme-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 暗色系 */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-indigo-400 mb-1 px-1">
                <Moon className="w-3 h-3" />
                <span>暗色系 (4)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {darkThemes.map(t => {
                  const active = t.id === currentThemeId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setCurrentThemeId(t.id);
                      }}
                      className={`flex items-center justify-between p-1.5 rounded-xl border text-xs text-left transition ${
                        active
                          ? 'border-theme-primary bg-theme-primary/10 font-semibold'
                          : 'border-theme-border/60 hover:border-theme-primary/50 hover:bg-theme-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {/* 双色指示球 */}
                        <div
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0 overflow-hidden flex"
                          title={t.name}
                        >
                          <div className="w-1/2 h-full" style={{ backgroundColor: t.colors.background }} />
                          <div className="w-1/2 h-full" style={{ backgroundColor: t.colors.primary }} />
                        </div>
                        <span className="truncate text-[11px]">{t.name}</span>
                      </div>
                      {active && <Check className="w-3.5 h-3.5 text-theme-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
