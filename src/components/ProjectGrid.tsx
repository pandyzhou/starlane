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
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  zinc: 'bg-zinc-800 text-zinc-300 border-zinc-700'
};

export const ProjectGrid: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-400" />
          <h2 className="text-sm font-semibold tracking-wide text-zinc-200 uppercase">
            My Projects & Workspaces
          </h2>
        </div>
        <span className="text-xs text-zinc-500 font-mono">
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
              className="bento-card group flex flex-col justify-between p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-9 h-9 rounded-xl border border-zinc-800 bg-zinc-800/50 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-zinc-700 transition">
                    {ICON_MAP[proj.icon] || <Box className="w-4 h-4" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagClass}`}>
                      {proj.tag}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-150" />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white mb-1.5 transition">
                  {proj.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {proj.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/50 flex items-center text-[11px] text-zinc-500 group-hover:text-zinc-400 transition font-mono truncate">
                <span>{displayDomain}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
