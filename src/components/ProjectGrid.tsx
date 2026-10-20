import React from 'react';
import { PROJECTS, ProjectItem } from '../config';
import { 
  Layers, 
  ArrowUpRight, 
  BookOpen, 
  Bot, 
  ShieldCheck, 
  Mail, 
  Cloud, 
  Sparkles,
  Box
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Mail: <Mail className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />
};

const COLOR_MAP: Record<ProjectItem['tagColor'], string> = {
  emerald: 'tag-emerald',
  blue: 'tag-blue',
  amber: 'tag-amber',
  purple: 'tag-purple',
  pink: 'tag-pink',
  zinc: 'tag-zinc'
};

export const ProjectGrid: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-theme-primary" />
          <h2 className="text-sm font-semibold tracking-wide text-theme-fg uppercase">
            My Projects & Workspaces
          </h2>
        </div>
        <span className="text-xs text-theme-fg/50 font-mono">
          {PROJECTS.length} Projects
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((proj, idx) => {
          const tagClass = COLOR_MAP[proj.tagColor] || COLOR_MAP.zinc;
          const displayDomain = proj.url.replace(/^https?:\/\//, '');

          return (
            <a
              key={idx}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card group flex flex-col justify-between p-5 rounded-2xl border border-theme-border/80 bg-theme-card/85 backdrop-blur-md relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-9 h-9 rounded-xl border border-theme-border bg-theme-muted/50 flex items-center justify-center text-theme-primary group-hover:text-theme-primary group-hover:border-theme-primary/50 group-hover:bg-theme-primary/10 transition">
                    {ICON_MAP[proj.icon] || <Box className="w-4 h-4" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagClass}`}>
                      {proj.tag}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-theme-fg/40 group-hover:text-theme-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-150" />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-theme-cardFg mb-1.5 transition">
                  {proj.title}
                </h3>
                <p className="text-xs text-theme-cardDesc leading-relaxed line-clamp-2">
                  {proj.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-theme-border/50 flex items-center text-[11px] text-theme-cardDesc/80 group-hover:text-theme-primary transition font-mono truncate">
                <span>{displayDomain}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
