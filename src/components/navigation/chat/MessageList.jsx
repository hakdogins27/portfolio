import React from 'react';
import { MessageSquare } from 'lucide-react';

export const MessageList = ({ messages, isThinking, scrollRef }) => {
  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4"
    >
      {messages.map((m, i) => (
        <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[90%] p-3 rounded-2xl text-[12px] leading-relaxed transition-all duration-300 ${
            m.role === 'user' 
              ? 'bg-accent-orange/10 backdrop-blur-md border border-accent-orange/30 text-text-primary rounded-tr-none shadow-[0_4px_12px_rgba(217,119,6,0.08)] shadow-inner' 
              : 'glass-card border-border/80 text-text-muted rounded-tl-none pro-shadow'
          }`}>
            {m.content}
          </div>
          <span className="text-[9px] text-text-dim/40 mt-1 uppercase font-bold tracking-tighter">
            {m.role === 'user' ? 'Guest' : 'Anthony'}
          </span>
        </div>
      ))}
      {isThinking && (
        <div className="flex items-center gap-2 text-text-dim italic text-[11px] animate-pulse pl-2">
          <MessageSquare size={12} />
          <span>Thinking...</span>
        </div>
      )}
    </div>
  );
};
