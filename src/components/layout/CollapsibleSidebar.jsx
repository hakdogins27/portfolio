import React from 'react';
import { Sidebar } from '../navigation/Sidebar';

export const CollapsibleSidebar = ({ isOpen, width, activeTab, setActiveTab, tabs, panels }) => {
  return (
    <aside 
      style={{ width: isOpen ? width : 0 }}
      className={`${isOpen ? 'flex' : 'hidden'} flex-col bg-sidebar/80 backdrop-blur-xl border-r border-border/60 shrink-0 absolute lg:relative z-40 h-full lg:h-auto shadow-2xl lg:shadow-none overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <div className="w-[200px] min-w-[200px] h-full" style={{ width }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} panels={panels} />
      </div>
    </aside>
  );
};
