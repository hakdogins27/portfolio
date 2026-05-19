import React from 'react';
import { useTheme } from './hooks/useTheme';
import { usePanels } from './hooks/usePanels';
import { MainLayout } from './components/layout/MainLayout';

function App() {
  const { theme, toggleTheme } = useTheme();
  const panels = usePanels();

  if (!panels.isLoaded) {
    return (
      <div className="h-screen w-screen bg-[#0c0c0e] flex flex-col items-center justify-center text-text-primary select-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
          <span className="font-sans font-black text-lg tracking-tight">
            anthony<span className="text-accent-orange font-light">mendoza</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <MainLayout
      theme={theme}
      toggleTheme={toggleTheme}
      isChatOpen={panels.isChatOpen}
      setIsChatOpen={panels.setIsChatOpen}
    />
  );
}

export default App;
