import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ theme, toggleTheme, activeTab, isChatOpen, setIsChatOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-app/85 backdrop-blur-md border-b border-border/20 z-50 flex items-center justify-between px-6 sm:px-12 select-none transition-all duration-500">
        {/* Sleek Minimalist Logo */}
        <div
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="font-sans font-black text-sm tracking-tight text-text-primary transition-colors duration-300">
            anthony<span className="text-accent-orange font-light">mendoza</span>
          </span>
        </div>

        {/* Premium Clean Nav Anchors */}
        <div className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold text-text-muted">
          <button onClick={() => scrollTo('projects')} className="hover:text-text-primary transition-colors py-1 cursor-pointer">
            Projects
          </button>
          <button onClick={() => scrollTo('skills')} className="hover:text-text-primary transition-colors py-1 cursor-pointer">
            Skills
          </button>
          <button onClick={() => scrollTo('experience')} className="hover:text-text-primary transition-colors py-1 cursor-pointer">
            Experience
          </button>
          <button onClick={() => scrollTo('education')} className="hover:text-text-primary transition-colors py-1 cursor-pointer">
            Certificates
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-border/30 rounded-lg text-text-muted hover:text-accent-orange active:scale-95 transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="theme-icon-spin text-accent-orange" />
            ) : (
              <Moon size={16} className="theme-icon-spin text-accent-orange" />
            )}
          </button>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden hover:bg-border/30 rounded-lg text-text-muted hover:text-text-primary active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X size={18} className="text-accent-orange" /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 bg-app/95 backdrop-blur-xl border-b border-border/20 z-40 flex flex-col p-6 gap-4 shadow-2xl md:hidden font-sans font-semibold text-xs text-text-muted"
          >
            <button 
              onClick={() => { scrollTo('projects'); setIsOpen(false); }} 
              className="w-full text-left py-2 hover:text-accent-orange transition-colors cursor-pointer border-b border-border/10 pb-2 uppercase tracking-wider"
            >
              Projects
            </button>
            <button 
              onClick={() => { scrollTo('skills'); setIsOpen(false); }} 
              className="w-full text-left py-2 hover:text-accent-orange transition-colors cursor-pointer border-b border-border/10 pb-2 uppercase tracking-wider"
            >
              Skills
            </button>
            <button 
              onClick={() => { scrollTo('experience'); setIsOpen(false); }} 
              className="w-full text-left py-2 hover:text-accent-orange transition-colors cursor-pointer border-b border-border/10 pb-2 uppercase tracking-wider"
            >
              Experience
            </button>
            <button 
              onClick={() => { scrollTo('education'); setIsOpen(false); }} 
              className="w-full text-left py-2 hover:text-accent-orange transition-colors cursor-pointer uppercase tracking-wider"
            >
              Certificates
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
