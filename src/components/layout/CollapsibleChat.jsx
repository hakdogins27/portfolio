import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIChat } from '../navigation/AIChat';
import { X } from 'lucide-react';

export const CollapsibleChat = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="fixed top-[80px] bottom-6 right-4 w-[380px] md:w-[420px] max-w-[calc(100vw-32px)] z-[9999] bg-white/95 dark:bg-[#0a0a0c]/90 backdrop-blur-2xl border border-[#e5e2dd] dark:border-border/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col transition-colors duration-500"
        >
          <div className="flex-1 flex flex-col min-h-0 relative">
            <div className="h-10 border-b border-border/20 flex items-center px-4 justify-between shrink-0 bg-dark/30">
              <span className="text-[10px] font-mono font-bold text-accent-orange tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                ai_assistant
              </span>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-primary rounded-lg transition-colors cursor-pointer"
                title="Close AI Assistant"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <AIChat />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
