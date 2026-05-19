import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import profileAnimation from '../../assets/profile-animation.mp4';
import profileAnimation2 from '../../assets/profile-animation-2.mp4';

export const Hero = ({ theme }) => {
  const { identity } = portfolioData;
  const videoRefA = React.useRef(null); // dark to light (profileAnimation)
  const videoRefB = React.useRef(null); // light to dark (profileAnimation2)
  const isInitialMount = React.useRef(true);
  const [activeVideo, setActiveVideo] = React.useState(() => {
    return theme === 'light' ? 'A' : 'B';
  });

  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 20 }
    }
  };

  // 1. Seek to stable end frames on initial page mount (no transition animation played)
  React.useEffect(() => {
    const videoA = videoRefA.current;
    const videoB = videoRefB.current;

    const setupInitialFrames = () => {
      if (theme === 'light') {
        if (videoA) videoA.currentTime = videoA.duration || 0;
      } else {
        if (videoB) videoB.currentTime = videoB.duration || 0;
      }
    };

    if (videoA) videoA.addEventListener('loadedmetadata', setupInitialFrames);
    if (videoB) videoB.addEventListener('loadedmetadata', setupInitialFrames);

    if ((videoA && videoA.readyState >= 1) || (videoB && videoB.readyState >= 1)) {
      setupInitialFrames();
    }

    return () => {
      if (videoA) videoA.removeEventListener('loadedmetadata', setupInitialFrames);
      if (videoB) videoB.removeEventListener('loadedmetadata', setupInitialFrames);
    };
  }, []);

  // 2. Play buttery-smooth native transition animation when theme changes
  React.useEffect(() => {
    const videoA = videoRefA.current;
    const videoB = videoRefB.current;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (theme === 'light') {
      if (videoA) {
        videoA.currentTime = 0;
        videoA.playbackRate = 1.0;

        const fallback = setTimeout(() => {
          setActiveVideo('A');
          videoA.removeEventListener('timeupdate', onTimeUpdate);
        }, 150);

        const onTimeUpdate = () => {
          if (videoA.currentTime > 0) {
            clearTimeout(fallback);
            setActiveVideo('A');
            videoA.removeEventListener('timeupdate', onTimeUpdate);
          }
        };

        videoA.addEventListener('timeupdate', onTimeUpdate);
        videoA.play().catch(() => {
          clearTimeout(fallback);
          setActiveVideo('A');
        });
      } else {
        setActiveVideo('A');
      }
    } else {
      if (videoB) {
        videoB.currentTime = 0;
        videoB.playbackRate = 1.0;

        const fallback = setTimeout(() => {
          setActiveVideo('B');
          videoB.removeEventListener('timeupdate', onTimeUpdate);
        }, 150);

        const onTimeUpdate = () => {
          if (videoB.currentTime > 0) {
            clearTimeout(fallback);
            setActiveVideo('B');
            videoB.removeEventListener('timeupdate', onTimeUpdate);
          }
        };

        videoB.addEventListener('timeupdate', onTimeUpdate);
        videoB.play().catch(() => {
          clearTimeout(fallback);
          setActiveVideo('B');
        });
      } else {
        setActiveVideo('B');
      }
    }
  }, [theme]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 sm:px-12 relative overflow-hidden bg-app transition-colors duration-500 pt-28 pb-16"
    >
      {/* Background mesh glow overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
          className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent-purple/3 dark:bg-accent-purple/5 blur-[120px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.12, 1],
            x: [0, -15, 0],
            y: [0, 20, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute bottom-[20%] right-[10%] w-[380px] h-[380px] rounded-full bg-accent-orange/3 dark:bg-accent-orange/5 blur-[130px]" 
        />
      </div>

      <div className="max-w-6xl w-full mx-auto flex flex-col gap-16 md:gap-20 relative z-10">

        {/* Top half: Hero Content Columns */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16">
          {/* Left Side: Bold Text & CTAs (58% width on desktop) */}
          <div className="flex-1 md:max-w-[58%] text-left flex flex-col items-start select-none">

            {/* Top Mini Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-accent-orange/20 bg-accent-orange/5 text-accent-orange font-sans text-[10px] font-bold tracking-wider uppercase mb-6 select-none"
            >
              <MapPin size={11} className="text-accent-orange" />
              <span>Cebu, Philippines</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              <span className="text-[9px] text-text-dim lowercase font-medium">Available for Hire</span>
            </motion.div>

            {/* Cinematic Headline */}
            <motion.h1 
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.03] text-text-primary transition-colors duration-500 font-sans flex flex-wrap"
            >
              {"Anthony S. Mendoza".split("").map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={letterVariants}
                  style={{ display: "inline-block" }}
                  className={char === " " ? "mr-[0.24em]" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Professional Role Title */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl font-black text-accent-orange font-sans tracking-wide uppercase mt-3"
            >
              Software Engineer &amp; AI Agentic Specialist
            </motion.p>

            {/* Professional Pitch Summary */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed mt-6 font-sans font-medium"
            >
              I am a Software Engineer maximizing AI-assisted coding and agentic workflows to build high-performance systems. I specialize in AI Agentic Engineering — orchestrating autonomic loops, multi-agent networks, and real-time backend integrations that scale.
            </motion.p>

            {/* Action Trigger Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto font-sans"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-accent-orange hover:bg-accent-orange/95 text-[#0c0c0e] font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-accent-orange/10 hover:shadow-xl hover:shadow-accent-orange/15 cursor-pointer"
              >
                <span>Explore Shipped Projects</span>
                <ArrowRight size={13} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-border/50 bg-sidebar/30 hover:bg-sidebar text-text-primary hover:border-text-muted/40 font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                <span>Get in Touch</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side: Elegant squircle portrait (42% width on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, rotateY: 12 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              y: [0, -8, 0]
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              rotateY: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.02, rotateY: 6, rotateX: -3 }}
            className="relative shrink-0 w-full sm:w-[350px] md:w-[380px] aspect-[4/5] flex items-center justify-center z-10"
          >
            {/* Premium squircle frame */}
            <div className="w-full h-full rounded-3xl border border-border/40 p-2 bg-card/40 backdrop-blur-md relative overflow-hidden transition-all duration-500 group select-none shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {/* Bulletproof Static Fallback Image for Mobile/Instant Loading */}
              <img
                src={theme === 'light' ? identity.profileNoHat : identity.profilePicture}
                alt={identity.name}
                className="absolute top-2 left-2 right-2 bottom-2 object-cover rounded-2xl filter brightness-[0.96] scale-[1.10] -translate-x-[5%] translate-y-[2%] transition-all duration-500 z-0"
              />

              {/* Video A: Dark to Light transition */}
              <video
                ref={videoRefA}
                src={profileAnimation}
                poster={identity.profileNoHat}
                playsInline
                muted
                preload="auto"
                className={`absolute top-2 left-2 right-2 bottom-2 object-cover rounded-2xl filter brightness-[0.96] scale-[1.10] -translate-x-[5%] translate-y-[2%] transition-all duration-500 ${activeVideo === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
              {/* Video B: Light to Dark transition */}
              <video
                ref={videoRefB}
                src={profileAnimation2}
                poster={identity.profilePicture}
                playsInline
                muted
                preload="auto"
                className={`absolute top-2 left-2 right-2 bottom-2 object-cover rounded-2xl filter brightness-[0.96] scale-[1.10] -translate-x-[5%] translate-y-[2%] transition-all duration-500 ${activeVideo === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom half: Cinematic Marketing Stats Matrix (Full grid-span) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full pt-10 border-t border-border/20 select-none"
        >
          {/* Stat 1: Shipped Systems */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col gap-1 sm:gap-2 group cursor-default"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4.5xl font-black text-text-primary tracking-tight font-sans transition-colors group-hover:text-accent-orange duration-300">
                05+
              </span>
              <span className="w-2 h-2 rounded-full bg-accent-orange shrink-0 animate-pulse" />
            </div>
            <div className="space-y-0.5 sm:space-y-1 font-sans">
              <p className="text-[10px] font-black text-accent-orange uppercase tracking-wider">
                Shipped Platforms
              </p>
              <p className="text-[11px] text-text-muted font-medium leading-relaxed max-w-sm">
                Full-stack web applications built using React, Next.js, databases, and responsive layouts.
              </p>
            </div>
          </motion.div>

          {/* Stat 2: Operational Availability */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col gap-1 sm:gap-2 group cursor-default"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4.5xl font-black text-text-primary tracking-tight font-sans transition-colors group-hover:text-accent-green duration-300">
                99.9%
              </span>
              <span className="w-2 h-2 rounded-full bg-accent-green shrink-0 animate-pulse" />
            </div>
            <div className="space-y-0.5 sm:space-y-1 font-sans">
              <p className="text-[10px] font-black text-accent-green uppercase tracking-wider">
                Operational Uptime
              </p>
              <p className="text-[11px] text-text-muted font-medium leading-relaxed max-w-sm">
                Hosting architectures configured for high availability, reliable data synchronization, and fast page loads.
              </p>
            </div>
          </motion.div>

          {/* Stat 3: Serverless Edge */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col gap-1 sm:gap-2 group cursor-default"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4.5xl font-black text-text-primary tracking-tight font-sans transition-colors group-hover:text-accent-blue duration-300">
                0-Cost
              </span>
              <span className="w-2 h-2 rounded-full bg-accent-blue shrink-0 animate-pulse" />
            </div>
            <div className="space-y-0.5 sm:space-y-1 font-sans">
              <p className="text-[10px] font-black text-accent-blue uppercase tracking-wider">
                Serverless Edge
              </p>
              <p className="text-[11px] text-text-muted font-medium leading-relaxed max-w-sm">
                Leveraging serverless APIs, Firebase database endpoints, and static edge caching systems.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
