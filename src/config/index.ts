export interface SearchEngine {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface ProjectItem {
  title: string;
  desc: string;
  url: string;
  icon: string;
  tag: string;
  tagColor: 'emerald' | 'blue' | 'amber' | 'purple' | 'pink' | 'zinc';
}

export const SEARCH_ENGINES: SearchEngine[] = [
  { id: 'google', name: 'Google', icon: 'Search', url: 'https://www.google.com/search?q=' },
  { id: 'baidu', name: '百度', icon: 'Search', url: 'https://www.baidu.com/s?wd=' },
  { id: 'bing', name: 'Bing', icon: 'Search', url: 'https://www.bing.com/search?q=' },
  { id: 'github', name: 'GitHub', icon: 'Github', url: 'https://github.com/search?q=' },
  { id: 'duckduckgo', name: 'DuckDuckGo', icon: 'Shield', url: 'https://duckduckgo.com/?q=' },
  { id: 'bilibili', name: 'Bilibili', icon: 'Tv', url: 'https://search.bilibili.com/all?keyword=' }
];

export const DEFAULT_ENGINE_ID = 'google';

export const PROJECTS: ProjectItem[] = [
  {
    title: "Personal Blog & Docs",
    desc: "基于现代静态架构的个人博客与技术知识库，沉淀日常工程笔记。",
    url: "https://github.com",
    icon: "BookOpen",
    tag: "Production",
    tagColor: "emerald"
  },
  {
    title: "AI Agent Workspace",
    desc: "自动化工作流与智能体中控服务，支持多端自动化调度。",
    url: "https://github.com",
    icon: "Bot",
    tag: "Active",
    tagColor: "blue"
  },
  {
    title: "Turnstile Solver API",
    desc: "基于 Camoufox 的人机验证自动求解后端，提供自动化 Token 接口。",
    url: "http://127.0.0.1:5073",
    icon: "ShieldCheck",
    tag: "Local Service",
    tagColor: "amber"
  },
  {
    title: "Inbucket Mailbox",
    desc: "轻量级临时邮件与捕获服务，用于开发调试与自动化测试。",
    url: "https://inbucket.c5mc.cn/monitor",
    icon: "Mail",
    tag: "Tool",
    tagColor: "purple"
  },
  {
    title: "Cloud Services Console",
    desc: "云端基础设施、边缘计算网络及 Pages 静态托管控制面板。",
    url: "https://dash.cloudflare.com",
    icon: "Cloud",
    tag: "Infra",
    tagColor: "zinc"
  },
  {
    title: "UI Design Inspiration",
    desc: "21st.dev 精选 React & Tailwind 设计工程组件与模板库。",
    url: "https://21st.dev",
    icon: "Sparkles",
    tag: "Design",
    tagColor: "pink"
  }
];
