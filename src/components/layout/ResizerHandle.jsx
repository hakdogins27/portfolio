import React from 'react';

export const ResizerHandle = ({ onMouseDown, type, position }) => {
  const cursor = type === 'terminal' ? 'cursor-row-resize' : 'cursor-col-resize';
  const hoverStyles = {
    sidebar: 'hover:bg-accent-orange/30',
    chat: 'hover:bg-accent-purple/30',
    terminal: 'hover:bg-accent-green/30'
  }[type];

  const posStyles = {
    sidebar: `absolute left-[${position}px] lg:relative`,
    chat: `absolute right-[${position}px] lg:relative`,
    terminal: 'h-[4px] w-full'
  }[type];

  return (
    <div 
      onMouseDown={onMouseDown}
      className={`${type === 'terminal' ? 'h-[4px] w-full' : 'w-[4px] h-full'} ${posStyles} ${cursor} z-[45] ${hoverStyles} transition-colors shrink-0`}
    />
  );
};
