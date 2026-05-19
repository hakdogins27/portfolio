import React from 'react';
import { MessageSquare, Terminal as TerminalIcon } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export const ContextNavigation = ({ activeTab, scrollTo, toggleChat, toggleTerminal }) => {
  let sections = [];

  if (activeTab === 'resume.md') {
    sections = [
      { id: 'identity', label: '# identity' },
      { id: 'experience', label: '## experience' },
      { id: 'projects', label: '## projects' },
      { id: 'skills', label: '## skills' },
      { id: 'education', label: '## education' },
    ];
  } else if (activeTab === 'projects.ts') {
    sections = portfolioData.projects.map(p => ({
      id: p.name.toLowerCase().replace(/\s+/g, '-'),
      label: `## ${p.name.toLowerCase().replace(/\s+/g, '-')}`
    }));
  } else if (activeTab === 'skills.json') {
    sections = portfolioData.skills.map(s => ({
      id: s.category.toLowerCase().replace(/\s+/g, '-'),
      label: `## ${s.category.toLowerCase().replace(/\s+/g, '-')}`
    }));
  } else if (activeTab === 'contact.env') {
    sections = [
      { id: 'contact', label: '# contact' }
    ];
  }

  return (
    <>
      <div className="border-t border-border/30 mt-5 pt-5 px-3">
        <div className="text-[9px] font-mono font-bold text-text-dim/60 uppercase tracking-widest mb-3 pl-2">// document outline</div>
        <div className="space-y-0.5">
          {sections.map(s => (
            <div 
              key={s.id} 
              onClick={() => scrollTo(s.id)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer text-[11px] font-mono text-text-dim hover:text-text-primary hover:bg-border/20 group transition-all duration-200"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-orange opacity-40 group-hover:opacity-100 transition-all duration-300" />
              <span className="truncate">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/30 mt-5 pt-5 px-3 mb-6">
        <div className="text-[9px] font-mono font-bold text-text-dim/60 uppercase tracking-widest mb-3 pl-2">// active services</div>
        <div className="space-y-0.5">
          <div 
            onClick={toggleChat}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer text-[11px] font-mono text-text-dim hover:text-text-primary hover:bg-border/20 transition-all duration-200"
          >
            <MessageSquare size={13} className="text-accent-orange" />
            <span>copilot_chat</span>
          </div>
          <div 
            onClick={toggleTerminal}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer text-[11px] font-mono text-text-dim hover:text-text-primary hover:bg-border/20 transition-all duration-200"
          >
            <TerminalIcon size={13} className="text-accent-orange" />
            <span>sandbox_term</span>
          </div>
        </div>
      </div>
    </>
  );
};
