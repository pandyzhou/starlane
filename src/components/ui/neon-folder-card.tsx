import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './neon-folder.css';

export interface NeonFolderCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  domain: string;
}

export const NeonFolderCard: React.FC<NeonFolderCardProps> = ({ href, icon, title, desc, domain }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${title} — ${desc}`}
    className="nf-root block"
  >
    <span className="nf-sheet nf-sheet-1" aria-hidden />
    <span className="nf-sheet nf-sheet-2" aria-hidden />
    <span className="nf-sheet nf-sheet-3" aria-hidden />

    <span className="nf-card">
      <span className="nf-inner">
        <span className="nf-icon">{icon}</span>
        <span className="min-w-0">
          <span className="nf-title block truncate">{title}</span>
          <span className="nf-meta block truncate">{domain}</span>
        </span>
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-[#00ffff] opacity-70" />
      </span>
    </span>
  </a>
);
