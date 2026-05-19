import React from 'react';
import { Sparkles } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { MessageList } from './chat/MessageList';
import { ChatInput } from './chat/ChatInput';

export const AIChat = () => {
  const { messages, inputValue, setInputValue, isThinking, scrollRef, handleSend } = useChat();

  return (
    <div className="flex flex-col h-full bg-sidebar select-none transition-all">
      <div className="p-4 border-b border-border flex items-center justify-between bg-dark/20 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent-orange" />
          <span className="text-[11px] font-black uppercase tracking-widest text-text-primary">AI Assistant</span>
        </div>
      </div>

      <MessageList messages={messages} isThinking={isThinking} scrollRef={scrollRef} />
      <ChatInput 
        inputValue={inputValue} setInputValue={setInputValue} 
        handleSend={handleSend} isThinking={isThinking} 
      />
    </div>
  );
};
