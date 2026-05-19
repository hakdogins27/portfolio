import React from 'react';
import { FileExplorer } from './sidebar/FileExplorer';
import { ContextNavigation } from './sidebar/ContextNavigation';

export const Sidebar = ({ activeTab, setActiveTab, tabs, panels }) => {
  const { setIsChatOpen, setIsTerminalOpen } = panels;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar py-3 select-none">
      <FileExplorer tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContextNavigation 
        activeTab={activeTab} 
        scrollTo={scrollTo} 
        toggleChat={() => setIsChatOpen(p => !p)}
        toggleTerminal={() => setIsTerminalOpen(p => !p)}
      />
    </div>
  );
};
