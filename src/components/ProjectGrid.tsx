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
  emerald: 'bg-[#33cc33]/15 text-[#33cc33] border-[#33cc33]/30',
  blue: 'bg-[#87ceeb]/15 text-[#87ceeb] border-[#87ceeb]/30',
  amber: 'bg-[#facc15]/15 text-[#facc15] border-[#facc15]/30',
  purple: 'bg-[#d8b4fe]/15 text-[#d8b4fe] border-[#d8b4fe]/30',
  pink: 'bg-[#ff99cc]/15 text-[#ff99cc] border-[#ff99cc]/30',
  zinc: 'bg-[#444444]/50 text-zinc-300 border-[#444444]'
};

export const ProjectGrid: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#87ceeb]" />
          <h2 className="text-sm font-semibold tracking-wide text-[#f7f9fa] uppercase">
            My Projects & Workspaces
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
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
              className="bento-card group flex flex-col justify-between p-5 rounded-2xl border border-[#444444]/70 bg-[#2f3436]/60 backdrop-blur-md relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-9 h-9 rounded-xl border border-[#444444] bg-[#1a1d23]/60 flex items-center justify-center text-[#ff99cc] group-hover:text-white group-hover:border-[#ff99cc]/50 group-hover:bg-[#ff99cc]/10 transition">
                    {ICON_MAP[proj.icon] || <Box className="w-4 h-4" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagClass}`}>
                      {proj.tag}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#ff99cc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-150" />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-[#f7f9fa] group-hover:text-white mb-1.5 transition">
                  {proj.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  {proj.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#444444]/40 flex items-center text-[11px] text-zinc-400 group-hover:text-[#87ceeb] transition font-mono truncate">
                <span>{displayDomain}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
