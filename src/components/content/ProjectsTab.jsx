import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, ExternalLink, Loader2, ShieldAlert } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { ProjectCard } from './ProjectCard';

const LivePreviewModal = ({ url, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0); // For forcing refresh

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleRefresh = () => {
    setLoading(true);
    setKey(prev => prev + 1);
  };

  const domain = url.replace('https://', '').replace('/', '');

  return createPortal(
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/70 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-full max-w-6xl h-[85vh] bg-white dark:bg-[#0c0c0e] border border-[#e5e2dd] dark:border-border/40 rounded-2xl flex flex-col overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sleek Minimalist Header */}
        <div className="h-14 px-5 flex items-center justify-between bg-[#faf9f6] dark:bg-[#0b0b0c] border-b border-[#e5e2dd] dark:border-border/20 shrink-0 font-sans">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse-soft" />
            <span className="font-bold text-sm text-text-primary">Live Preview</span>
            <span className="text-[10px] bg-black/5 dark:bg-border/40 px-2 py-0.5 rounded text-text-muted font-sans border border-[#e5e2dd] dark:border-border/20 uppercase tracking-wider hidden xs:inline-block">
              {domain}
            </span>
          </div>

          <div className="flex items-center gap-3 select-none">
            <button 
              onClick={handleRefresh}
              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
              title="Refresh Preview"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-accent-orange' : 'text-text-muted'} />
            </button>
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sidebar/55 hover:bg-accent-orange/10 border border-border/30 hover:border-accent-orange/30 text-text-primary hover:text-accent-orange text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
              title="Open Site in New Tab"
            >
              <ExternalLink size={12} />
              Open Site
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary text-text-muted rounded-xl transition-all cursor-pointer"
              title="Close Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div className="flex-1 bg-white relative">
          
          {/* Loading Indicator Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white dark:bg-[#0c0c0e] flex flex-col items-center justify-center gap-3 z-50">
              <Loader2 size={36} className="text-accent-orange animate-spin" />
              <span className="font-sans text-xs text-text-muted uppercase tracking-widest animate-pulse font-semibold">Connecting to live environment...</span>
            </div>
          )}

          {/* Embedded Live Iframe */}
          <iframe 
            key={key}
            src={url}
            title="Project Live Preview"
            className="w-full h-full border-none"
            onLoad={() => setLoading(false)}
          />

          {/* Bottom Alert / Fallback notice */}
          <div className="absolute bottom-4 right-4 z-40 bg-white/95 dark:bg-[#0b0b0c]/95 backdrop-blur-md border border-[#e5e2dd] dark:border-border/30 rounded-xl p-3.5 max-w-xs shadow-2xl flex gap-2 items-start text-[10px] font-sans text-[#b47a18] dark:text-[#ffbd2e]">
            <ShieldAlert size={14} className="shrink-0 mt-0.5 text-[#b47a18] dark:text-[#ffbd2e]" />
            <div>
              <span className="font-bold uppercase tracking-wide">Sandbox Preview:</span> If content blocks or connection errors show, click <a href={url} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-accent-orange transition-colors">Open Site</a>.
            </div>
          </div>

        </div>

      </motion.div>
    </motion.div>,
    document.body
  );
};

const CATEGORIES = ["All", "AI & Automation", "Web Applications", "Interactive Design"];

const PROJECT_CATEGORIES = {
  "SAM — Service Automation Manager": "AI & Automation",
  "Prodea — AI Project Architect": "AI & Automation",
  "BK Basketball League Platform": "Web Applications",
  "1906L Breakdown Scroll Experience": "Interactive Design",
  "Sneaky Link": "Interactive Design"
};

export const ProjectsTab = () => {
  const { projects } = portfolioData;
  const [activePreview, setActivePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === "All") return true;
    return PROJECT_CATEGORIES[project.name] === selectedCategory;
  });

  // Reset active index when category filter changes
  useEffect(() => {
    setActiveProjectIndex(0);
  }, [selectedCategory]);

  // Preload active and next project preview screenshots (sliding window optimization)
  useEffect(() => {
    if (!filteredProjects.length) return;
    
    const activeProj = filteredProjects[activeProjectIndex];
    const nextIndex = (activeProjectIndex + 1) % filteredProjects.length;
    const nextProj = filteredProjects[nextIndex];
    
    const targets = [activeProj];
    if (filteredProjects.length > 1 && nextProj && nextProj !== activeProj) {
      targets.push(nextProj);
    }
    
    targets.forEach(project => {
      const isTablet = project.name === "Sneaky Link";
      const url = project.preview;
      if (url && url.includes("api.microlink.io")) {
        const baseUrl = url.split("&viewport")[0].split("&delay")[0];
        const previewUrl = isTablet
          ? `${baseUrl}&viewport.width=1024&viewport.height=768&viewport.isMobile=false&delay=3`
          : `${baseUrl}&viewport.width=375&viewport.height=812&viewport.isMobile=true&delay=3`;
        
        const img = new Image();
        img.src = previewUrl;
      }
    });
  }, [filteredProjects, activeProjectIndex]);

  const activeProject = filteredProjects[activeProjectIndex] || filteredProjects[0];

  return (
    <div className="pb-4">
      {/* Premium Minimalist Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-8 justify-start select-none font-sans">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer transition-colors duration-300 z-10 ${
                isActive 
                  ? 'text-[#0c0c0e]' 
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProjectFilter"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-accent-orange rounded-xl -z-10 shadow-lg shadow-accent-orange/15"
                />
              )}
              {category}
            </button>
          );
        })}
      </div>

      {/* Showcase Dashboard Layout Container */}
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-stretch">
        
        {/* Mobile Horizontal Carousel Tabs (Shown only on small viewports) */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-3 no-scrollbar scroll-smooth w-full select-none">
          {filteredProjects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;
            const shortName = project.name.split(" — ")[0];
            return (
              <button
                key={project.name}
                onClick={() => setActiveProjectIndex(idx)}
                className={`relative px-4 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all duration-300 shrink-0 ${
                  isActive
                    ? 'border-accent-orange/40 bg-accent-orange/10 text-accent-orange'
                    : 'border-border/30 bg-[#0c0c0f]/20 text-text-muted hover:text-text-primary'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>

        {/* Desktop Vertical Selector Sidebar (Shown on larger viewports) */}
        <div className="hidden md:flex flex-col gap-3 w-[34%] shrink-0 select-none">
          {filteredProjects.map((project, idx) => {
            const isActive = activeProjectIndex === idx;
            const shortName = project.name.split(" — ")[0];
            const categoryLabel = PROJECT_CATEGORIES[project.name];

            const activeColor = isActive 
              ? "border-accent-orange/20 text-accent-orange bg-accent-orange/5" 
              : "border-border/20 text-text-dim/80 bg-sidebar/30";

            return (
              <button
                key={project.name}
                onClick={() => setActiveProjectIndex(idx)}
                className={`relative w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-1 overflow-hidden group ${
                  isActive
                    ? 'border-border/60 shadow-md bg-white/80 dark:bg-[#0c0c0f]/40'
                    : 'border-border/20 bg-transparent hover:bg-[#0c0c0f]/15 hover:border-border/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectListSelector"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent-orange"
                  />
                )}
                
                <div className="flex items-center justify-between gap-2 w-full font-sans">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${activeColor} border`}>
                    {categoryLabel}
                  </span>
                  <span className="text-[8px] font-semibold text-text-dim uppercase tracking-widest">
                    {project.status}
                  </span>
                </div>
                
                <span className={`text-xs font-bold font-sans tracking-tight mt-1.5 transition-colors duration-300 ${
                  isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'
                }`}>
                  {shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Project Showcase Card */}
        <div className="flex-1 min-w-0">
          {activeProject && (
            <ProjectCard 
              project={activeProject} 
              onPreviewClick={setActivePreview}
            />
          )}
        </div>

      </div>

      {/* Global Interactive Iframe Preview Overlay */}
      <AnimatePresence>
        {activePreview && (
          <LivePreviewModal 
            url={activePreview} 
            onClose={() => setActivePreview(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};
