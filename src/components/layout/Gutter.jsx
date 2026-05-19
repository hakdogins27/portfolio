import React from 'react';

export const Gutter = ({ lineCount }) => {
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);
  return (
    <div className="hidden md:flex w-[46px] bg-sidebar border-r border-border/50 flex-col items-center pt-8 shrink-0 select-none">
      {lines.map(n => (
        <div key={n} className={`text-[10px] leading-[1.85] w-full text-right pr-3 font-mono ${n % 5 === 0 ? 'text-text-muted font-bold' : 'text-text-dim/30'}`}>
          {n}
        </div>
      ))}
    </div>
  );
};
