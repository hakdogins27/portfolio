import { Sun, Moon, MoreHorizontal, PanelLeft, MessageSquare, Terminal as TerminalIcon } from 'lucide-react';

export const TitleBar = ({ 
  activeTab, 
  theme, 
  toggleTheme, 
  toggleSidebar, 
  toggleTerminal,
  toggleChat,
  isSidebarOpen,
  isTerminalOpen,
  isChatOpen
}) => (
  <div className="h-[44px] bg-dark/95 backdrop-blur-xl border-b border-border/40 flex items-center px-4 shrink-0 select-none z-50 transition-colors duration-500">
    {/* macOS Traffic Lights */}
    <div className="flex gap-2 w-12 sm:w-20 shrink-0">
      <div className="traffic-light bg-[#ff5f56] hover:brightness-90 cursor-pointer flex items-center justify-center group" onClick={toggleSidebar}>
        <span className="w-1 h-1 bg-[#580000] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="traffic-light bg-[#ffbd2e]" />
      <div className="traffic-light bg-[#27c93f]" />
    </div>

    {/* Center Document Title */}
    <div className="flex-1 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-text-muted select-none truncate px-4">
      <span className="font-bold text-text-primary tracking-wide font-mono lowercase">anthony.md</span>
      <span className="text-[10px] opacity-40 hidden xs:inline font-mono">— your local markdown portfolio</span>
      <span className="text-[10px] bg-border/40 px-1.5 py-0.5 rounded text-accent-orange font-mono text-[9px] ml-1.5 border border-border/20 uppercase tracking-widest hidden md:inline-block">v1.0.2</span>
    </div>
    
    {/* Window Actions */}
    <div className="flex items-center gap-1 sm:gap-3 shrink-0 ml-auto leading-none">
      <div className="flex items-center gap-0.5 sm:gap-1.5 px-2 border-l border-border/30 mr-1 sm:mr-2">
        <button 
          onClick={toggleSidebar}
          className={`p-1.5 rounded transition-colors ${isSidebarOpen ? 'text-accent-orange bg-sidebar' : 'text-text-muted hover:text-text-primary'}`}
          title="Toggle Explorer"
        >
          <PanelLeft size={15} />
        </button>
        <button 
          onClick={toggleChat}
          className={`p-1.5 rounded transition-colors ${isChatOpen ? 'text-accent-orange bg-sidebar' : 'text-text-muted hover:text-text-primary'}`}
          title="Toggle AI Chat"
        >
          <MessageSquare size={15} />
        </button>
        <button 
          onClick={toggleTerminal}
          className={`p-1.5 rounded transition-colors ${isTerminalOpen ? 'text-accent-orange bg-sidebar' : 'text-text-muted hover:text-text-primary'}`}
          title="Toggle Terminal"
        >
          <TerminalIcon size={15} />
        </button>
      </div>

      <button 
        onClick={toggleTheme}
        className="p-1.5 hover:bg-sidebar rounded-md text-text-muted hover:text-accent-orange active:scale-95 transition-all"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun size={15} className="theme-icon-spin text-accent-orange" />
        ) : (
          <Moon size={15} className="theme-icon-spin text-accent-orange" />
        )}
      </button>
      <button className="text-text-muted hover:text-text-primary hidden sm:block p-1">
        <MoreHorizontal size={15} />
      </button>
    </div>
  </div>
);

export const StatusBar = ({ activeTab }) => (
  <div className="h-[28px] bg-dark/95 backdrop-blur-xl border-t border-border/40 flex items-center px-3 sm:px-4 justify-between shrink-0 text-[10px] sm:text-[11px] text-text-muted select-none z-50 transition-colors duration-500 font-mono">
    <div className="flex items-center gap-3 sm:gap-5">
      <div className="flex items-center gap-1.5 hover:text-text-primary cursor-pointer">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        <span className="font-semibold text-text-primary">local-first</span>
      </div>
      <div className="hidden xs:flex items-center gap-1 opacity-70">
        <span>current_file:</span>
        <span className="text-text-primary font-bold">{activeTab}</span>
      </div>
      <span className="hidden sm:inline opacity-50">MIT License</span>
    </div>
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="flex items-center gap-1.5 text-accent-green">
        <span className="animate-pulse text-[8px]">●</span>
        <span className="font-bold uppercase tracking-tighter text-[9px]">open to work</span>
      </div>
      <div className="hidden sm:block opacity-65">cebu, ph</div>
      <div className="hidden lg:block opacity-40">may 2025</div>
    </div>
  </div>
);
