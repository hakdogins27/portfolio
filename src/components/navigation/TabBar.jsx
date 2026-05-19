import React from 'react';
import { X, FileText, Code2, Database, Settings } from 'lucide-react';

export const FileIcon = ({ name, className }) => {
  if (name.endsWith('.ts')) return <Code2 className={`${className} text-accent-blue`} size={14} />;
  if (name.endsWith('.json')) return <Database className={`${className} text-accent-purple`} size={14} />;
  if (name.endsWith('.env')) return <Settings className={`${className} text-accent-yellow`} size={14} />;
  return <FileText className={`${className} text-accent-orange`} size={14} />;
};

export const TabBar = ({ activeTab, setActiveTab, tabs }) => (
  <div className="h-[36px] bg-dark/70 backdrop-blur-md border-b border-border/60 flex shrink-0 overflow-x-auto no-scrollbar select-none scroll-smooth z-40">
    {tabs.map(tab => (
      <div
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`flex items-center px-3 sm:px-4 h-full border-r border-border/50 cursor-pointer text-[10px] sm:text-[11px] relative min-w-[100px] sm:min-w-[120px] group transition-all duration-300 ${
          activeTab === tab ? 'bg-app/90 shadow-inner' : 'bg-transparent text-text-dim hover:bg-sidebar/50'
        }`}
      >
        <FileIcon name={tab} className="mr-1.5 sm:mr-2 shrink-0" />
        <span className="truncate max-w-[80px] sm:max-w-none">{tab}</span>
        {activeTab === tab && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-orange z-10" />
        )}
        <div className="ml-auto opacity-0 sm:group-hover:opacity-100 group-[.active]:opacity-100 p-0.5 rounded-sm hover:bg-border transition-opacity shrink-0">
          <X size={12} />
        </div>
      </div>
    ))}
  </div>
);
