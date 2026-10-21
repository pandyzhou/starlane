export interface SearchEngine {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export const SEARCH_ENGINES: SearchEngine[] = [
  { id: 'google', name: 'Google', icon: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'baidu', name: '百度', icon: 'Baidu', url: 'https://www.baidu.com/s?wd=' },
  { id: 'bing', name: 'Bing', icon: 'Bing', url: 'https://www.bing.com/search?q=' },
  { id: 'github', name: 'GitHub', icon: 'Github', url: 'https://github.com/search?q=' },
  { id: 'duckduckgo', name: 'DuckDuckGo', icon: 'Shield', url: 'https://duckduckgo.com/?q=' },
  { id: 'bilibili', name: 'Bilibili', icon: 'Tv', url: 'https://search.bilibili.com/all?keyword=' }
];

export const DEFAULT_ENGINE_ID = 'google';
