import React from 'react';
import { Terminal } from '../terminal/Terminal';

export const TerminalPanel = ({ isOpen, height }) => {
  return (
    <div 
      style={{ height: isOpen ? height : 0 }}
      className={`${isOpen ? 'flex' : 'hidden'} border-t border-border/60 bg-terminal/95 backdrop-blur-3xl shrink-0 relative overflow-hidden transition-all duration-300 ease-in-out shadow-[inset_0_1px_rgba(255,255,255,0.02)]`}
    >
      <div className="w-full" style={{ height }}>
        <Terminal />
      </div>
    </div>
  );
};
