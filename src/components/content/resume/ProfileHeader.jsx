import { motion, AnimatePresence } from 'framer-motion';

export const ProfileHeader = ({ identity, theme, hasInteracted, videoARef, videoBRef, handleLoadedMetadata }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center text-center md:text-left">
      <div className="shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent-orange/50 shadow-lg shadow-accent-orange/10 relative group bg-[#0a0a0c]">
          <div className="w-full h-full relative">
            <AnimatePresence initial={false}>
              {!hasInteracted ? (
                <motion.div
                  key={theme === 'dark' ? 'with-hat-static' : 'no-hat-static'}
                  className="w-full h-full absolute inset-0 z-40 transform-gpu"
                >
                  <img 
                    src={theme === 'dark' ? identity.profilePicture : identity.profileNoHat} 
                    alt={identity.name}
                    className="w-full h-full object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ) : (
                <>
                  <motion.div
                    key="vid-a"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: theme === 'dark' ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full h-full absolute inset-0 z-20 will-change-[transform,opacity] backface-hidden transform-gpu"
                  >
                    <video
                      key={`dark-vid-${identity.profileAnimation2}`}
                      ref={videoARef}
                      muted
                      playsInline
                      onLoadedMetadata={(e) => handleLoadedMetadata(e.target, 'a')}
                      className="w-full h-full object-cover object-[center_10%] scale-110"
                    >
                      <source src={identity.profileAnimation2} type="video/mp4" />
                    </video>
                  </motion.div>

                  <motion.div
                    key="vid-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: theme === 'light' ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-full h-full absolute inset-0 z-10 will-change-[transform,opacity] backface-hidden transform-gpu"
                  >
                    <video
                      key={`light-vid-${identity.profileAnimation}`}
                      ref={videoBRef}
                      muted
                      playsInline
                      onLoadedMetadata={(e) => handleLoadedMetadata(e.target, 'b')}
                      className="w-full h-full object-cover object-[center_10%] scale-110"
                    >
                      <source src={identity.profileAnimation} type="video/mp4" />
                    </video>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-accent-orange/5 mix-blend-overlay pointer-events-none z-30" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-resume tracking-tight mb-1 sm:mb-2">{identity.name}</h1>
        <div className="flex items-center gap-2 px-2.5 py-1 bg-accent-orange/10 border border-accent-orange/20 rounded-full text-accent-orange text-[9px] font-bold uppercase tracking-widest shadow-sm w-fit mb-4 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse-soft" />
          {identity.availability}
        </div>
        <p className="font-mono text-accent-orange text-[12px] sm:text-sm md:text-base tracking-[0.15em] sm:tracking-widest font-medium mb-6 sm:mb-8">
          {identity.role}
        </p>
      </div>
    </div>
  );
};
