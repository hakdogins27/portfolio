import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FileIcon } from '../TabBar';

export const FileExplorer = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="px-3 mb-2 select-none">
      <div className="text-[9px] font-mono font-bold text-text-dim/60 uppercase tracking-widest mb-3 pl-2">// context library</div>
      <div className="flex items-center gap-1.5 text-[11px] text-text-primary mb-2 font-bold font-mono pl-2">
        <ChevronDown size={12} className="text-text-muted/80" />
        <span>anthony-portfolio</span>
      </div>
      <div className="ml-4 space-y-0.5">
        {tabs.map(file => (
          <div 
            key={file} 
            onClick={() => setActiveTab(file)}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer text-[11px] font-mono font-medium transition-all duration-200 ${
              activeTab === file 
                ? 'bg-border/60 text-text-primary shadow-sm border border-border/20' 
                : 'text-text-dim hover:bg-border/20 hover:text-text-primary'
            }`}
          >
            <FileIcon name={file} className="shrink-0" />
            <span className="truncate">{file}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
