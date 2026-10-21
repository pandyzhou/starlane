import React, { useState, useRef, useEffect } from 'react';
import { SearchEngine, SEARCH_ENGINES, DEFAULT_ENGINE_ID } from '../config';
import { 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  Shield, 
  Tv 
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ICON_MAP: Record<string, React.ReactNode> = {
  Search: <Search className="w-4 h-4" />,
  Github: <GithubIcon className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Tv: <Tv className="w-4 h-4" />
};

export const SearchBar: React.FC = () => {
  const [currentEngine, setCurrentEngine] = useState<SearchEngine>(() => {
    return SEARCH_ENGINES.find(e => e.id === DEFAULT_ENGINE_ID) || SEARCH_ENGINES[0];
  });
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 全局快捷键 ⌘K / Ctrl+K / / 聚焦
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        inputRef.current?.blur();
        setDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const targetUrl = currentEngine.url + encodeURIComponent(trimmed);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="w-full max-w-3xl mb-16 relative z-30">
      <div className="relative group">
        <div className="relative flex items-center w-full rounded-2xl border border-theme-border bg-theme-card/85 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-14px_rgba(0,0,0,0.18)] transition duration-200 focus-within:border-theme-primary focus-within:ring-4 focus-within:ring-theme-primary/20">
          
          {/* 搜索引擎选择器 */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-4 pr-3 py-3.5 text-sm font-medium text-theme-fg hover:opacity-90 transition rounded-l-2xl hover:bg-theme-muted/40 select-none"
            >
              <span className="w-4 h-4 flex items-center justify-center text-theme-primary">
                {ICON_MAP[currentEngine.icon] || <Search className="w-4 h-4" />}
              </span>
              <span className="text-xs font-medium tracking-wide">{currentEngine.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-theme-fg/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* 下拉列表 */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-theme-border bg-theme-card/95 backdrop-blur-xl p-1.5 shadow-2xl z-50">
                <div className="text-[10px] font-semibold text-theme-fg/50 px-2 py-1 tracking-wider uppercase">
                  选择搜索引擎
                </div>
                <div className="space-y-0.5">
                  {SEARCH_ENGINES.map(engine => {
                    const isSelected = engine.id === currentEngine.id;
                    return (
                      <button
                        key={engine.id}
                        type="button"
                        onClick={() => {
                          setCurrentEngine(engine);
                          setDropdownOpen(false);
                          inputRef.current?.focus();
                        }}
                        className={`flex items-center justify-between w-full px-2.5 py-1.5 text-xs rounded-lg transition ${
                          isSelected 
                            ? 'bg-theme-primary/15 text-theme-primary font-medium' 
                            : 'text-theme-fg/80 hover:bg-theme-muted/50 hover:text-theme-fg'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={isSelected ? 'text-theme-primary' : 'text-theme-fg/60'}>
                            {ICON_MAP[engine.icon] || <Search className="w-3.5 h-3.5" />}
                          </span>
                          <span>{engine.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-theme-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-[1px] bg-theme-border" />

          {/* 搜索框 */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="输入关键词，回车即搜..."
            className="flex-1 bg-transparent px-4 py-3.5 text-sm md:text-base text-theme-fg placeholder:text-theme-fg/40 outline-none w-full"
          />

          {/* 清除按钮 */}
          <div className="flex items-center gap-1.5 pr-3.5">
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="text-theme-fg/50 hover:text-theme-fg p-1 rounded-md transition"
                title="清空内容"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
