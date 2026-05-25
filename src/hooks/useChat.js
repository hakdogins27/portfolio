import { useState, useRef, useEffect } from 'react';
import { portfolioDataText } from '../data/portfolioDataText';
import { personalQnA } from '../data/personalQnA';
import { assistantRules } from '../data/assistantRules';

export const useChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm Anthony. Welcome to my portfolio! Ask me anything about my projects, technical expertise, or experience." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const lastSentRef = useRef(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    // Client-side cooldown: 3s between requests to reduce 429s
    const now = Date.now();
    if (now - lastSentRef.current < 3000) return;
    lastSentRef.current = now;

    const query = inputValue.trim().slice(0, 250);
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsThinking(true);

    try {
      const systemPrompt = `${assistantRules.persona} ${assistantRules.strictMode} ${assistantRules.fallback} ${assistantRules.security} ${assistantRules.tone}\n\nCore Knowledge Base:\n${JSON.stringify(portfolioDataText)}\n\nPersonal Q&A:\n${JSON.stringify(personalQnA)}`;
      
      let response;
      if (import.meta.env.DEV && import.meta.env.VITE_GROQ_API_KEY) {
        // Local Dev: Direct call for speed/simplicity
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY.trim()}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: query }],
            temperature: 0.5,
            max_tokens: 500
          })
        });
      } else {
        // Production: Call the secure Vercel Proxy
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(response.status === 429 ? '429' : (data.error?.message || 'API Error'));
      
      setMessages(p => [...p, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (err) {
      const is429 = err.message === '429';
      setMessages(p => [
        ...p,
        {
          role: 'assistant',
          content: is429
            ? "I'm receiving a lot of questions right now — please wait a moment and try again! You can also reach me directly at mendozaony27@gmail.com 📬"
            : "I'm sorry, but my chat system is currently experiencing a brief connection issue. Please try again in a few moments, or feel free to reach out to me directly at mendozaony27@gmail.com!"
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return { messages, inputValue, setInputValue, isThinking, scrollRef, handleSend };
};
