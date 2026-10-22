import React, { useState, useRef, useEffect } from 'react';
import { SearchEngine, SEARCH_ENGINES, DEFAULT_ENGINE_ID } from '../config';
import { BorderBeam } from './ui/border-beam-search';
import { 
  Search, 
  ChevronDown, 
  X 
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="2 2 20 20" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const DuckDuckGoIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#DE5833">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 23C5.925 23 1 18.074 1 12S5.926 1 12 1s11 4.925 11 11-4.925 11-11 11zm10.219-11c0 4.805-3.317 8.833-7.786 9.925-.27-.521-.53-1.017-.749-1.438.645.249 1.93.718 2.208.615.376-.144.282-3.149-.14-3.245-.338-.075-1.632.837-2.141 1.209l.034.156c.078.397.144.993.03 1.247-.001.004-.002.01-.004.013a.218.218 0 0 1-.068.088c-.284.188-1.081.284-1.503.188a.516.516 0 0 1-.064-.02c-.694.396-2.01 1.109-2.25.971-.329-.188-.377-2.676-.329-3.288.035-.46 1.653.286 2.442.679.174-.163.602-.272.98-.31-.57-1.389-.99-2.977-.733-4.105 0 .002.002.002.002.002.356.248 2.73 1.05 3.91 1.027 1.18-.024 3.114-.743 2.903-1.323-.212-.58-2.135.51-4.142.324-1.486-.138-1.748-.804-1.42-1.29.414-.611 1.168.116 2.411-.256 1.245-.371 2.987-1.035 3.632-1.397 1.494-.833-.625-1.177-1.125-.947-.474.22-2.123.637-2.889.82.428-1.516-.603-4.149-1.757-5.3-.376-.376-.951-.612-1.603-.736-.25-.344-.654-.671-1.225-.977a5.772 5.772 0 0 0-3.595-.584l-.024.004-.034.004.004.002c-.148.028-.237.08-.357.098.148.016.705.276 1.057.418-.174.068-.412.108-.596.184a.828.828 0 0 0-.204.056c-.173.08-.303.375-.3.515.84-.086 2.082-.026 2.991.246-.644.09-1.235.258-1.661.482-.016.008-.03.018-.048.028-.054.02-.106.042-.152.066-1.367.72-1.971 2.405-1.611 4.424.323 1.824 1.665 8.088 2.29 11.064-3.973-1.4-6.822-5.186-6.822-9.639C1.781 6.356 6.356 1.781 12 1.781S22.219 6.356 22.219 12zM9.095 9.581a.758.758 0 1 0 0 1.516.758.758 0 0 0 0-1.516zm.338.702a.196.196 0 1 1 0-.392.196.196 0 0 1 0 .392zm4.724-1.043a.65.65 0 1 0 0 1.299.65.65 0 0 0 0-1.3zm.29.601a.168.168 0 1 1 0-.336.168.168 0 0 1 0 .336zM9.313 8.146s-.571-.26-1.125.09c-.554.348-.534.704-.534.704s-.294-.656.49-.978c.786-.32 1.17.184 1.17.184zm5.236-.052s-.41-.234-.73-.23c-.654.008-.831.296-.831.296s.11-.688.945-.55a.84.84 0 0 1 .616.484z" />
  </svg>
);

const BilibiliIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="51.2 51.2 921.6 921.6" fill="#00A1D6">
    <path d="m729.329 373.95c-9.795-5.945-19.062-6.785-19.144-6.785l-1.065-.05c-57.2-3.866-121.165-5.832-190.126-5.832l-13.988.005c-68.956 0-132.925 1.96-190.12 5.831l-1.066.052c-.082 0-9.349.84-19.144 6.784-15.047 9.129-24.273 25.948-27.417 49.97-10.071 76.913-4.383 173.65.19 251.393 2.938 49.966 33.407 62.459 85.048 67.149 10.782.988 69.089 5.867 159.508 5.893v-.005c90.42-.02 148.726-4.905 159.514-5.888 51.64-4.69 82.11-17.183 85.043-67.15 4.577-77.741 10.26-174.479.19-251.391-3.15-24.028-12.376-40.848-27.423-49.977zm-390.99 172.718a23.65 23.65 0 0 1 -31.687-10.845 23.68 23.68 0 0 1 10.844-31.687c2.038-1.004 50.693-24.725 110.541-43.065a23.68 23.68 0 1 1 13.88 45.292c-56.294 17.25-103.111 40.074-103.577 40.305zm268.898 35.886c-.44 2.232-11.269 54.64-50.939 54.64-21.442 0-36.1-14.049-44.984-26.772-8.694 12.708-22.805 26.772-42.655 26.772-35.533 0-50.135-48.266-51.681-53.77a11.366 11.366 0 0 1 21.878-6.17c2.75 9.652 14.13 37.202 29.798 37.202 16.374 0 28.892-23.644 31.985-31.928a11.372 11.372 0 0 1 10.65-7.388h.06a11.376 11.376 0 0 1 10.63 7.506c.107.286 11.965 31.815 34.314 31.815 20.864 0 28.565-35.952 28.641-36.32a11.346 11.346 0 0 1 13.358-8.94 11.361 11.361 0 0 1 8.945 13.353zm110.116-46.736a23.68 23.68 0 0 1 -31.683 10.844c-.47-.23-47.472-23.116-103.572-40.31a23.69 23.69 0 0 1 -15.708-29.583 23.67 23.67 0 0 1 29.578-15.703c59.848 18.34 108.498 42.061 110.551 43.065a23.68 23.68 0 0 1 10.834 31.687z"/>
    <path fillRule="evenodd" d="m849.92 51.2h-675.84c-67.866 0-122.88 55.014-122.88 122.88v675.84c0 67.87 55.014 122.88 122.88 122.88h675.84c67.87 0 122.88-55.01 122.88-122.88v-675.84c0-67.86-55.01-122.88-122.88-122.88zm-36.603 627.45c-2.626 44.58-21.821 78.634-55.516 98.49-25.682 15.134-54.175 19.486-81.137 21.938-32.455 2.95-92.718 6.098-164.664 6.119-71.941-.02-132.209-3.164-164.664-6.119-26.962-2.452-55.455-6.804-81.132-21.939-33.695-19.855-52.89-53.903-55.51-98.483-4.706-80.133-10.574-179.855.194-262.108 10.654-81.383 70.102-104.976 100.612-106.168a2482.642 2482.642 0 0 1 81.423-4.086c-7.536-8.535-19.88-23.322-28.815-38.114-13.737-22.737 8.53-41.687 8.53-41.687s23.68-20.367 44.528 5.213c15.698 19.266 38.38 55.997 48.62 72.954l53.207-.215c13.26 0 26.332.072 39.22.215 10.24-16.957 32.92-53.683 48.619-72.954 20.843-25.58 44.528-5.213 44.528-5.213s22.262 18.95 8.525 41.687c-8.934 14.792-21.279 29.579-28.815 38.114 28.36.978 55.562 2.34 81.423 4.08 30.515 1.198 89.958 24.791 100.613 106.174 10.778 82.248 4.915 181.97.21 262.103z"/>
  </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const BingIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="5 3 13 18">
    <path fill="#008373" d="M5 3v16l3.72 2L18 15.82v-4.09L9.77 8.95l1.61 3.89L13.94 14L8.7 16.92V4.27z" />
  </svg>
);

const BaiduIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#2932E1" d="M9.154 0C7.71 0 6.54 1.658 6.54 3.707c0 2.051 1.171 3.71 2.615 3.71 1.446 0 2.614-1.659 2.614-3.71C11.768 1.658 10.6 0 9.154 0zm7.025.594C14.86.58 13.347 2.589 13.2 3.927c-.187 1.745.25 3.487 2.179 3.735 1.933.25 3.175-1.806 3.422-3.364.252-1.555-.995-3.364-2.362-3.674a1.218 1.218 0 0 0-.261-.03zM3.582 5.535a2.811 2.811 0 0 0-.156.008c-2.118.19-2.428 3.24-2.428 3.24-.287 1.41.686 4.425 3.297 3.864 2.617-.561 2.262-3.68 2.183-4.362-.125-1.018-1.292-2.773-2.896-2.75zm16.534 1.753c-2.308 0-2.617 2.119-2.617 3.616 0 1.43.121 3.425 2.988 3.362 2.867-.063 2.553-3.238 2.553-3.988 0-.745-.62-2.99-2.924-2.99zm-8.264 2.478c-1.424.014-2.708.925-3.323 1.947-1.118 1.868-2.863 3.05-3.112 3.363-.25.309-3.61 2.116-2.864 5.42.746 3.301 3.365 3.237 3.365 3.237s1.93.19 4.171-.31c2.24-.495 4.17.123 4.17.123s5.233 1.748 6.665-1.616c1.43-3.364-.808-5.109-.808-5.109s-2.99-2.306-4.736-4.798c-1.072-1.665-2.348-2.268-3.528-2.257zm-2.234 3.84l1.542.024v8.197H7.758c-1.47-.291-2.055-1.292-2.13-1.462-.072-.173-.488-.976-.268-2.343.635-2.049 2.447-2.196 2.447-2.196h1.81zm3.964 2.39v3.881c.096.413.612.488.612.488h1.614v-4.343h1.689v5.782h-3.915c-1.517-.39-1.59-1.465-1.59-1.465v-4.317zm-5.458 1.147c-.66.197-.978.708-1.05.928-.076.22-.247.78-.1 1.269.294 1.095 1.248 1.144 1.248 1.144h1.37v-3.34z" />
  </svg>
);

const ICON_MAP: Record<string, React.ReactNode> = {
  Search: <Search className="w-[18px] h-[18px]" />,
  Google: <GoogleIcon className="w-[18px] h-[18px]" />,
  Bing: <BingIcon className="w-[18px] h-[18px]" />,
  Baidu: <BaiduIcon className="w-[18px] h-[18px]" />,
  Github: <GithubIcon className="w-[18px] h-[18px]" />,
  Shield: <DuckDuckGoIcon className="w-[18px] h-[18px]" />,
  Tv: <BilibiliIcon className="w-[18px] h-[18px]" />
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
      <div className="relative group" ref={dropdownRef}>
        <BorderBeam
          size="line"
          colorVariant="colorful"
          duration={3.1}
          theme="dark"
          glowSize={0.55}
          brightness={1.15}
          className="w-full"
        >
        <div className="relative flex items-center w-full rounded-2xl border-2 border-theme-border bg-theme-card/85 backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-14px_rgba(0,0,0,0.18)] transition duration-200 focus-within:border-theme-primary focus-within:ring-4 focus-within:ring-theme-primary/20">
          
          {/* 搜索引擎选择器 */}
          <div>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-4 pr-3 py-3.5 text-sm font-medium text-theme-fg hover:opacity-90 transition rounded-l-2xl select-none"
            >
              <span className="w-[18px] h-[18px] shrink-0 flex items-center justify-center text-theme-primary">
                {ICON_MAP[currentEngine.icon] || <Search className="w-[18px] h-[18px]" />}
              </span>
              <span className="text-xs font-medium tracking-wide">{currentEngine.name}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-theme-fg/50 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
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
        </BorderBeam>

        {/* 下拉列表放在 BorderBeam 之外，否则会被它的 overflow-hidden 裁掉 */}
        {dropdownOpen && (
          <div className="absolute top-full left-[2px] mt-1 w-[8.5rem] rounded-2xl border border-theme-border bg-theme-card/95 backdrop-blur-xl p-1.5 z-50">
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
                    className={`flex items-center w-full px-1 py-1.5 text-xs rounded-lg transition ${
                      isSelected 
                        ? 'bg-theme-primary/15 text-theme-primary font-medium' 
                        : 'text-theme-fg/80 hover:bg-theme-primary/10 hover:text-theme-fg'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-3.5 h-3.5 shrink-0 flex items-center justify-center [&>svg]:w-3.5 [&>svg]:h-3.5 ${isSelected ? 'text-theme-primary' : 'text-theme-fg/60'}`}>
                        {ICON_MAP[engine.icon] || <Search className="w-3.5 h-3.5" />}
                      </span>
                      <span className="truncate">{engine.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
