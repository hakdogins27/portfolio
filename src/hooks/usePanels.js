import { useState, useEffect } from 'react';
import { usePanelResizing } from './usePanelResizing';

export const usePanels = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [resizing, setResizing] = useState(null);

  const dimensions = usePanelResizing(resizing, setResizing);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
      if (window.innerWidth >= 1440) setIsTerminalOpen(true);
    };
    handleResize();
    return () => clearTimeout(timer);
  }, []);

  return {
    isLoaded, resizing, setResizing, ...dimensions,
    isSidebarOpen, setIsSidebarOpen,
    isChatOpen, setIsChatOpen,
    isTerminalOpen, setIsTerminalOpen
  };
};
