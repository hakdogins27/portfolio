import { useState, useEffect } from 'react';

export const usePanelResizing = (resizing, setResizing) => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [chatWidth, setChatWidth] = useState(300);
  const [terminalHeight, setTerminalHeight] = useState(200);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizing) return;
      if (resizing === 'sidebar') setSidebarWidth(Math.max(160, Math.min(e.clientX, window.innerWidth / 3)));
      else if (resizing === 'chat') setChatWidth(Math.max(220, Math.min(window.innerWidth - e.clientX, window.innerWidth / 2.5)));
      else if (resizing === 'terminal') setTerminalHeight(Math.max(100, Math.min(window.innerHeight - e.clientY, window.innerHeight / 2)));
    };

    const handleMouseUp = () => setResizing(null);

    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = resizing === 'terminal' ? 'row-resize' : 'col-resize';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, setResizing]);

  return { sidebarWidth, chatWidth, terminalHeight };
};
