import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, ExternalLink, Cpu } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

// Unified high-fidelity SVG TechIcon component rendering official vector logos
const TechIcon = ({ name }) => {
  // Normalize the name string for case-insensitive matching
  const cleanName = name.toLowerCase().split(' (')[0].split(' / ')[0].trim();

  switch (cleanName) {
    case 'python':
      return (
        <svg viewBox="0 0 110 110" className="w-3.5 h-3.5 shrink-0 text-[#3776ab] hover:text-[#ffd43b] transition-colors duration-300">
          <path fill="currentColor" d="M55 2.5C26 2.5 27.5 15 27.5 15L27.6 27.5H55V31.25H16.25C16.25 31.25 2.5 29.75 2.5 58.75C2.5 87.75 15 86.25 15 86.25H23.75V73.75C23.75 73.75 22.25 51.25 45 51.25H73.75C73.75 71.25 61.25 73.75 61.25 73.75L61.25 86.25H33.75C33.75 86.25 33.75 97.5 55 97.5C76.25 97.5 82.5 86.25 82.5 86.25L82.5 73.75H55V70H93.75C93.75 70 107.5 71.5 107.5 42.5C107.5 13.5 95 15 95 15H86.25V27.5C86.25 27.5 87.75 50 65 50H36.25C36.25 50 27.5 46.25 27.5 27.5C27.5 8.75 55 2.5 55 2.5zM41.25 15C44.7 15 47.5 17.8 47.5 21.25C47.5 24.7 44.7 27.5 41.25 27.5C37.8 27.5 35 24.7 35 21.25C35 17.8 37.8 15 41.25 15zm27.5 67.5C72.2 82.5 75 85.3 75 88.75C75 92.2 72.2 95 68.75 95C65.3 95 62.5 92.2 62.5 88.75C62.5 85.3 65.3 82.5 68.75 82.5z"/>
        </svg>
      );
    case 'next.js':
      return (
        <svg viewBox="0 0 128 128" className="w-3.5 h-3.5 shrink-0 text-text-primary">
          <path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c18.5 0 35.1-7.9 46.8-20.5L62.2 50.8c-1.8-2.3-4.8-3.6-7.8-3.6H46.1v28h5.7v-21.7h1.4l33.2 42.6c11.5-11.2 18.6-26.8 18.6-44.1C105 28.7 76.3 0 64 0zm-7.9 75.2v21.7h-5.7V75.2h5.7z"/>
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-3.5 h-3.5 shrink-0 text-[#61dafb]">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1.2" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'zustand':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-accent-orange" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'tailwind css':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#38bdf8]">
          <path fill="currentColor" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.002 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.513 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
        </svg>
      );
    case 'gsap':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#88ce02]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    case 'html5 canvas':
      return (
        <svg viewBox="0 0 512 512" className="w-3.5 h-3.5 shrink-0 text-[#e34f26]">
          <path fill="currentColor" d="M64 32l32 384 160 48 160-48 32-384H64zm280 144H200v48h144v48H200v48h144v48H152v-240h240v48z"/>
        </svg>
      );
    case 'shadcn ui':
      return (
        <svg viewBox="0 0 256 256" className="w-3.5 h-3.5 shrink-0 text-text-primary">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="18" d="M128 40 L40 128 L128 216 L216 128 Z"/>
        </svg>
      );
    case 'n8n workflow orchestration':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#ff6d5a]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
        </svg>
      );
    case 'llm apis':
    case 'prompt engineering':
    case 'structured markdown architecture':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-accent-orange" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case 'cloud firestore':
      return (
        <svg viewBox="0 0 116.3 160" className="w-3.5 h-3.5 shrink-0 text-[#ffa000]">
          <path fill="currentColor" d="M8.2 119.8l7.6-58.8L47.5 12.1c1-1.4 3-1.4 4 0l31.7 48.9-7.6-58.8c-.3-2-2.7-2.9-4.2-1.5L8.2 119.8z"/>
        </svg>
      );
    case 'firebase authentication':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#ffa000]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'peerjs':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-accent-green" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case 'google sheets api':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#0f9d58]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      );
    case 'telegram bot api':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#0088cc]">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.2-.01-.08.02-1.42.9-4.01 2.65-.38.26-.72.39-1.03.38-.34-.01-1-.2-1.49-.36-.6-.19-1.08-.3-1.04-.63.02-.17.26-.35.72-.53 2.82-1.23 4.7-2.04 5.64-2.43 2.69-1.11 3.24-1.3 3.61-1.3.08 0 .26.02.38.12.1.08.13.19.14.28 0 .07.01.2.01.36z"/>
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#f05032]">
          <path fill="currentColor" d="M23.384 11.616L12.384.616c-.82-.82-2.148-.82-2.968 0L8.148 1.884l3.148 3.148c.616-.205 1.332-.07 1.848.445.52.52.652 1.25.437 1.859l3.148 3.148c.61-.215 1.34-.082 1.86.438.742.742.742 1.945 0 2.688-.742.742-1.945.742-2.688 0-.52-.52-.653-1.25-.438-1.86L12.316 9.6c-.215.215-.55.348-.902.348-.352 0-.688-.133-.902-.348-.52-.52-.653-1.25-.438-1.86L6.926 4.592c-.215.215-.55.348-.902.348-.742 0-1.344-.602-1.344-1.344 0-.352.133-.688.348-.902L1.884 5.926l2.708 2.708c-.215.215-.348.55-.348.902 0 .742.602 1.344 1.344 1.344.352 0 .688-.133.902-.348l3.148 3.148c-.215.61-.082 1.34.438 1.86.742.742 1.945.742 2.688 0 .52-.52.653-1.25.438-1.86l3.148-3.148c.215.215.55.348.902.348.352 0 .688-.133.902-.348l6.832 6.832c.82.82 2.148.82 2.968 0l11.0-11.0c.82-.82.82-2.148 0-2.968z"/>
        </svg>
      );
    case 'vercel hosting':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-text-primary">
          <path fill="currentColor" d="M24 22.525H0L12 1.475L24 22.525Z"/>
        </svg>
      );
    case 'vite bundler':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#bd34fe]">
          <path fill="currentColor" d="M19.98 2.45L12 0L4.02 2.45c-.27.08-.47.3-.5.58L2.02 17.5c-.04.4.15.78.5 1L12 24l9.48-5.5c.35-.22.54-.6.5-1L20.48 3.03c-.03-.28-.23-.5-.5-.58zM12 19.5v-15l6.5 2L12 19.5z"/>
        </svg>
      );
    case 'postman apis':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#ff6c37]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5" />
          <path d="M12 2C8.69 2 6 4.69 6 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6Z" />
        </svg>
      );
    case 'npm package structure':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#cb3837]" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M20 4H4v16h8V8h4v12h4V4z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

export const SkillsTab = () => {
  const { skills } = portfolioData;
  const [hoveredCategory, setHoveredCategory] = React.useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 220, damping: 20 } 
    }
  };

  const marqueeSkills = [
    "AI DEVELOPMENT & INTEGRATION",
    "PYTHON PROGRAMMING",
    "WORKFLOW AUTOMATION",
    "FULL-STACK DEVELOPMENT",
    "REAL-TIME DATABASES",
    "FRONTEND ENGINEERING",
    "API DESIGN & TESTING",
    "CLOUD DEPLOYMENTS",
    "INTERACTIVE USER INTERFACES"
  ];

  const categoryStyles = {
    "Frontend & UI Engineering": {
      hover: "group-hover:border-accent-orange/30 group-hover:shadow-[0_0_25px_rgba(212,165,116,0.02)]"
    },
    "AI & Workflow Automation": {
      hover: "group-hover:border-accent-orange/30 group-hover:shadow-[0_0_25px_rgba(212,165,116,0.02)]"
    },
    "Backend & Real-Time DBs": {
      hover: "group-hover:border-accent-orange/30 group-hover:shadow-[0_0_25px_rgba(212,165,116,0.02)]"
    },
    "Tools & Deployment": {
      hover: "group-hover:border-accent-orange/30 group-hover:shadow-[0_0_25px_rgba(212,165,116,0.02)]"
    }
  };

  return (
    <div className="pb-4">
      {/* Dynamic Keyframe style injector for the infinite scroll ticker banner */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee-drift 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Infinite Scrolling Marquee specialties banner (full viewport edge-to-edge bleed) */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-3 bg-[#faf9f6]/90 dark:bg-[#0c0c0f]/40 border-y border-[#e5e2dd] dark:border-border/30 mb-8 sm:mb-10 select-none">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-app to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-app to-transparent z-10 pointer-events-none" />
        
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          {[...marqueeSkills, ...marqueeSkills].map((text, mIdx) => (
            <div key={mIdx} className="flex items-center gap-8 font-sans font-black text-[10px] sm:text-xs tracking-[0.25em] text-text-muted/65 hover:text-text-primary transition-colors duration-300">
              <span>{text}</span>
              <span className="text-accent-orange font-light">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Symmetrical 2x2 grid of full-width category cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      >
        {skills.map((group, idx) => {
          const style = categoryStyles[group.category] || { hover: "group-hover:border-border/50" };

          return (
            <motion.div 
              key={idx}
              variants={cardVariants}
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
              animate={{ 
                opacity: hoveredCategory === null || hoveredCategory === idx ? 1 : 0.65
              }}
              transition={{ duration: 0.25 }}
              className={`p-6 sm:p-8 bg-white/70 dark:bg-[#0c0c0f]/30 backdrop-blur-xl border border-[#e5e2dd] dark:border-border/30 rounded-2xl transition-all duration-500 group relative overflow-hidden ${style.hover}`}
            >
              {/* Left edge colored border bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border/40 group-hover:bg-accent-orange transition-colors duration-500" />

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#faf9f6] dark:bg-dark/60 border border-[#e5e2dd] dark:border-border/40 text-accent-orange">
                  <Cpu size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-black font-sans uppercase tracking-widest text-accent-orange">
                    {group.category}
                  </h4>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill, sIdx) => (
                  <motion.div 
                    key={sIdx} 
                    whileHover={{ scale: 1.035, y: -1 }}
                    transition={{ type: "spring", stiffness: 450, damping: 15 }}
                    className="flex items-center gap-2 px-3 py-2 bg-[#faf9f6]/90 dark:bg-[#121216]/45 border border-[#e5e2dd] dark:border-border/20 rounded-xl text-[11px] sm:text-xs text-text-primary font-bold font-sans shadow-sm select-none hover:border-border/50 hover:bg-[#e5e2dd]/60 dark:hover:bg-[#121216]/65 transition-all duration-300 cursor-default"
                  >
                    <TechIcon name={skill} />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export const ContactTab = () => {
  const { identity } = portfolioData;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 25,
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div id="contact" className="w-full max-w-4xl mx-auto py-12 sm:py-16 select-none font-sans">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col md:flex-row gap-12 sm:gap-16 items-start justify-between"
      >
        
        {/* Left Column: Bold Header & Bio Pitch */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-start text-left md:max-w-[42%] shrink-0"
        >
          <div className="mb-4 select-none border-l-2 border-accent-orange pl-3">
            <h3 className="text-xs font-bold text-accent-orange tracking-widest uppercase">
              Get In Touch
            </h3>
          </div>
          <h2 className="text-3xl sm:text-4.5xl font-black text-text-primary tracking-tight leading-none mt-2">
            Let's Connect
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-semibold mt-4">
            Have an exciting project, AI integration challenge, or full-stack opportunity? Let's build something outstanding together.
          </p>
          
          <a 
            href="/Resume.pdf" 
            download="Anthony_Mendoza_Resume.pdf"
            className="inline-block mt-8"
          >
            <motion.button 
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.03 }}
              className="w-full px-6 py-3.5 bg-accent-orange hover:bg-accent-orange/95 text-[#0c0c0e] font-black text-xs rounded-xl transition-all duration-300 shadow-md shadow-accent-orange/10 hover:shadow-lg hover:shadow-accent-orange/20 cursor-pointer tracking-widest uppercase"
            >
              Download Full Resume (PDF)
            </motion.button>
          </a>
        </motion.div>

        {/* Right Column: Sleek flat list cards directly on canvas background */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 w-full flex flex-col divide-y divide-border/10"
        >
          
          {/* Email Row */}
          <a 
            href={`mailto:${identity.email}`}
            className="flex items-center justify-between py-5 w-full group/item hover:border-accent-orange/40 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-[#faf9f6] dark:bg-sidebar/35 border border-[#e5e2dd] dark:border-border/10 text-accent-orange group-hover/item:scale-105 transition-all">
                <Mail size={16} />
              </div>
              <div className="min-w-0 font-sans text-left">
                <p className="text-[9px] text-text-dim font-bold uppercase tracking-widest">Email Address</p>
                <p className="text-xs sm:text-sm text-text-primary group-hover/item:text-accent-orange transition-colors font-semibold mt-0.5">{identity.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handleCopy}
                className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all duration-300 ${
                  copied 
                    ? 'bg-accent-green/10 border-accent-green/30 text-accent-green animate-pulse-soft' 
                    : 'bg-[#faf9f6] dark:bg-sidebar/50 border-[#e5e2dd] dark:border-border/20 text-text-muted hover:text-text-primary hover:border-text-muted'
                }`}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <ExternalLink size={12} className="text-text-dim opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
            </div>
          </a>

          {/* GitHub Row */}
          <a 
            href={`https://${identity.github}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-between py-5 w-full group/item transition-colors duration-300"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-[#faf9f6] dark:bg-sidebar/35 border border-[#e5e2dd] dark:border-border/10 text-accent-orange group-hover/item:scale-105 transition-all">
                <Github size={16} />
              </div>
              <div className="min-w-0 font-sans text-left">
                <p className="text-[9px] text-text-dim font-bold uppercase tracking-widest">GitHub Repository</p>
                <p className="text-xs sm:text-sm text-text-primary group-hover/item:text-accent-orange transition-colors font-semibold mt-0.5">@anthony-mendoza</p>
              </div>
            </div>
            <ExternalLink size={12} className="text-text-dim opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
          </a>

          {/* LinkedIn Row */}
          <a 
            href={`https://${identity.linkedin}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-between py-5 w-full group/item transition-colors duration-300"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-[#faf9f6] dark:bg-sidebar/35 border border-[#e5e2dd] dark:border-border/10 text-accent-orange group-hover/item:scale-105 transition-all">
                <Linkedin size={16} />
              </div>
              <div className="min-w-0 font-sans text-left">
                <p className="text-[9px] text-text-dim font-bold uppercase tracking-widest">LinkedIn Profile</p>
                <p className="text-xs sm:text-sm text-text-primary group-hover/item:text-accent-orange transition-colors font-semibold mt-0.5">in/anthony-mendoza</p>
              </div>
            </div>
            <ExternalLink size={12} className="text-text-dim opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
          </a>

          {/* Location Row */}
          <div 
            className="flex items-center justify-between py-5 w-full group/item transition-colors duration-300"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-2.5 rounded-xl bg-[#faf9f6] dark:bg-sidebar/35 border border-[#e5e2dd] dark:border-border/10 text-text-muted">
                <MapPin size={16} />
              </div>
              <div className="min-w-0 font-sans text-left">
                <p className="text-[9px] text-text-dim font-bold uppercase tracking-widest">Office Location</p>
                <p className="text-xs sm:text-sm text-text-primary font-semibold mt-0.5">{identity.location}</p>
              </div>
            </div>
            <span className="text-[8px] font-black uppercase text-accent-orange bg-accent-orange/10 border border-accent-orange/20 rounded-md px-2 py-0.5 tracking-wider">
              Work Location
            </span>
          </div>

        </motion.div>

      </motion.div>
    </div>
  );
};
