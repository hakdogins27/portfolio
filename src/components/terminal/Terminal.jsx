import React, { useState, useEffect, useRef } from 'react';

export const Terminal = () => {
  const [lines, setLines] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const timeoutRef = useRef(null);
  const scrollRef = useRef(null);

  const terminalData = [
    { text: '$ npm run hire-me', delay: 800, color: 'text-accent-green' },
    { text: '> checking candidate...', delay: 500, color: 'text-text-muted italic' },
    { text: '✓ AI skills verified', delay: 200, color: 'text-accent-green/80' },
    { text: '✓ projects shipped', delay: 200, color: 'text-accent-green/80' },
    { text: '✓ fast learner confirmed', delay: 200, color: 'text-accent-green/80' },
    { text: '✓ vibe coder certified', delay: 200, color: 'text-accent-green/80' },
    { text: ' ', delay: 100 },
    { text: 'ready to deploy 🚀', delay: 600, color: 'text-accent-orange font-bold uppercase tracking-widest' },
    { text: ' ', delay: 100 },
    { text: '$ contact --email', delay: 800, color: 'text-accent-green' },
    { text: '→ mendozaony27@gmail.com', delay: 300, color: 'text-accent-yellow' }
  ];

  useEffect(() => {
    let current = 0;
    const addLine = () => {
      if (current < terminalData.length) {
        const line = terminalData[current];
        if (line) {
          setLines(prev => [...prev, line]);
          current++;
          if (current < terminalData.length) {
            timeoutRef.current = setTimeout(addLine, terminalData[current].delay);
          } else {
            setIsBooting(false);
          }
        }
      }
    };
    addLine();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div 
      className="flex flex-col h-full bg-terminal p-3 font-mono text-[10px] sm:text-[11px] leading-[1.6] select-none cursor-default overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-2 text-text-muted shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
        <span className="font-semibold uppercase tracking-widest text-[9px]">terminal — zsh</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar pr-2"
      >
        {lines.map((l, i) => (
          <div key={i} className={`${l.color || 'text-text-primary'} mb-0.5 flex items-start break-all`}>
            <span>{l.text}</span>
          </div>
        ))}
        {isBooting && (
          <div className="text-text-dim animate-pulse">|</div>
        )}
      </div>
    </div>
  );
};
