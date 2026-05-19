import React from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({ inputValue, setInputValue, handleSend, isThinking }) => {
  return (
    <form onSubmit={handleSend} className="p-4 border-t border-border bg-dark/10 shrink-0">
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={250}
          className="w-full bg-dark/60 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-2.5 pr-20 text-[12px] outline-none focus:border-accent-orange/50 focus:shadow-[0_0_10px_rgba(212,165,116,0.15)] transition-all duration-300 text-text-primary placeholder:text-text-dim/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] group-hover:border-border"
          placeholder="Ask AI Assistant..."
        />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
          <span className="text-[9px] text-text-dim/30 font-semibold tabular-nums">
            {inputValue.length}/250
          </span>
        </div>
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text-dim hover:text-accent-orange transition-colors disabled:opacity-30 active:scale-95"
          disabled={!inputValue.trim() || isThinking}
        >
          <Send size={14} />
        </button>
      </div>
      <p className="text-[8px] text-text-dim/30 text-center mt-3 uppercase font-bold tracking-widest">Powered by LLaMA 3.1 &amp; Groq</p>
    </form>
  );
};
