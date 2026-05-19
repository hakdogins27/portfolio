import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Box } from 'lucide-react';
import sneakylinkPreview from '../../assets/sneakylink-preview.png';

// Helper to command third-party screenshot API to capture landscape tablet (1024x768) or mobile portrait (375x812) and wait 3s for animations
const getPreviewUrl = (url, isTablet) => {
  if (!url) return "";
  if (url.includes("api.microlink.io")) {
    let baseUrl = url.split("&viewport")[0].split("&delay")[0];
    if (isTablet) {
      return `${baseUrl}&viewport.width=1024&viewport.height=768&viewport.isMobile=false&delay=3`;
    } else {
      return `${baseUrl}&viewport.width=375&viewport.height=812&viewport.isMobile=true&delay=3`;
    }
  }
  return url;
};

export const ProjectCard = ({ project, onPreviewClick }) => {
  const projectStyle = {
    bg: "from-accent-orange/5 to-transparent dark:from-accent-orange/10 dark:to-transparent",
    border: "hover:border-accent-orange/30",
    glow: "bg-accent-orange/10",
    accent: "text-accent-orange"
  };

  const isTablet = project.name === "Sneaky Link";

  return (
    <motion.div 
      id={project.name.toLowerCase().replace(/\s+/g, '-')} 
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`group relative bg-white/70 dark:bg-[#0c0c0f]/30 backdrop-blur-xl border border-[#e5e2dd] dark:border-border/20 ${projectStyle.border} rounded-2xl p-5 sm:p-6 hover:shadow-[0_20px_50px_rgba(212,165,116,0.02)] overflow-hidden flex flex-col md:flex-row gap-6 items-center w-full`}
    >
      {/* Dynamic Background Glows */}
      <div className="absolute -right-24 -top-24 w-48 h-48 bg-accent-orange/3 rounded-full blur-[80px] group-hover:bg-accent-orange/6 transition-all duration-700 pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-accent-orange/2 rounded-full blur-[80px] group-hover:bg-accent-orange/4 transition-all duration-700 pointer-events-none" />

      {/* Left Column: Details & Meta */}
      <div className="flex flex-col gap-4 flex-1 justify-between order-2 md:order-1 font-sans w-full">
         <div className="space-y-4">
          {/* Title and Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/20 pb-3">
            <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-orange transition-colors tracking-tight">
              {project.name}
            </h3>
            
            {/* Pulse Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sidebar/55 border border-border/30 text-accent-orange text-[10px] font-semibold tracking-wider uppercase shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
              {project.status}
            </span>
          </div>

          {/* Project Description */}
          <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block">Tech Stack</span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map(tech => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 bg-sidebar/55 text-text-muted text-[10px] font-semibold rounded-lg border border-border/30 hover:border-accent-orange/30 hover:text-text-primary transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2 select-none">
          {project.demo && (
            <motion.button 
              onClick={() => onPreviewClick(project.demo)}
              whileTap={{ scale: 0.96 }}
              className="px-3.5 py-2 bg-sidebar/55 hover:bg-accent-orange/10 text-text-primary hover:text-accent-orange border border-border/30 hover:border-accent-orange/30 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-300 flex items-center gap-2 cursor-pointer"
            >
              <ExternalLink size={13} className="text-accent-orange" />
              Live Demo
            </motion.button>
          )}
          
          {project.github && (
            <motion.a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="px-3.5 py-2 bg-sidebar/55 hover:bg-accent-orange/10 text-text-primary hover:text-accent-orange border border-border/30 hover:border-accent-orange/30 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Github size={13} className="text-accent-orange" />
              Codebase
            </motion.a>
          )}
        </div>
      </div>

      {/* Right Column: Premium Tablet or Smartphone Device Chassis */}
      {isTablet ? (
        <div className="w-full md:w-[45%] shrink-0 flex items-center justify-center order-1 md:order-2 py-4 md:py-0">
          <div 
            onClick={() => onPreviewClick(project.demo)}
            className={`w-full aspect-[1.43/1] relative rounded-[20px] border-[7px] border-[#18181b] bg-gradient-to-br ${projectStyle.bg} overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.45)] group cursor-pointer transition-all duration-500 hover:shadow-[0_25px_55px_rgba(0,0,0,0.6)] select-none`}
            title="Launch Interactive Live Preview"
          >
            {/* Dynamic Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full ${projectStyle.glow} blur-[30px] pointer-events-none`} />

            {/* Tablet Camera Sensor */}
            <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/20 z-30 pointer-events-none" />

            {/* Tablet Viewport Screen */}
            <div className="absolute inset-0 rounded-[12px] overflow-hidden bg-[#0c0c0f] z-10">
              {project.preview ? (
                <>
                  <motion.img 
                    src={sneakylinkPreview} 
                    alt={`${project.name} landscape preview`} 
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-top transition-all duration-300"
                    loading="lazy"
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1.5 text-white font-sans text-[10px] uppercase tracking-wider font-bold z-20"
                  >
                    <ExternalLink size={14} className="text-accent-orange animate-pulse-soft" />
                    <span>Launch Game</span>
                  </motion.div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <Box size={20} className="animate-pulse text-accent-orange" />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full md:w-[35%] shrink-0 flex items-center justify-center order-1 md:order-2 py-4 md:py-0">
          <div 
            onClick={() => onPreviewClick(project.demo)}
            className={`w-[145px] sm:w-[155px] aspect-[9/18.5] relative rounded-[28px] border-[6px] border-[#18181b] bg-gradient-to-b ${projectStyle.bg} overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] group cursor-pointer transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] select-none`}
            title="Launch Interactive Live Preview"
          >
            {/* Dynamic Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full ${projectStyle.glow} blur-[30px] pointer-events-none`} />

            {/* Smartphone Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-[#18181b] rounded-full z-30 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-white/10 rounded-full" />
            </div>

            {/* Smartphone Screen Viewport */}
            <div className="absolute inset-[1px] rounded-[22px] overflow-hidden bg-[#0c0c0f] z-10">
              {project.preview ? (
                <>
                  <motion.img 
                    src={getPreviewUrl(project.preview, false)} 
                    alt={`${project.name} mobile preview`} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-top transition-all duration-300"
                    loading="lazy"
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1.5 text-white font-sans text-[9px] uppercase tracking-widest font-bold z-20"
                  >
                    <ExternalLink size={14} className="text-accent-orange animate-pulse-soft" />
                    <span>Preview</span>
                  </motion.div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <Box size={20} className="animate-pulse text-accent-orange" />
                </div>
              )}
            </div>

            {/* Smartphone Home Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/25 rounded-full z-30 pointer-events-none" />
          </div>
        </div>
      )}
    </motion.div>
  );
};
