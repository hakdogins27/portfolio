import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

export const ExperienceSection = ({ experience }) => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {experience.map((exp, idx) => (
        <div key={idx} className="relative pl-6 sm:pl-10 group">
          {/* Timeline Node Connector Visual */}
          <div className="absolute left-0 top-1.5 bottom-0 w-0.5 bg-border/20 z-0 group-last:bottom-auto group-last:h-8">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-accent-orange origin-top shadow-[0_0_8px_rgba(212,165,116,0.2)]"
            />
          </div>
          
          {/* Chronological Indicator Bubble */}
          <motion.div 
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className={`absolute -left-[5px] top-1.5 w-3 h-3 rounded-full border-2 bg-app z-10 transition-colors duration-300 group-hover:scale-125 ${
              idx === 0 
                ? 'border-accent-orange shadow-[0_0_10px_rgba(212,165,116,0.4)]' 
                : 'border-border/60 group-hover:border-accent-orange'
            }`}
          >
            {idx === 0 && <span className="absolute inset-0.5 rounded-full bg-accent-orange animate-ping" />}
          </motion.div>

          {/* Premium Glassmorphic Experience Card */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ y: -4 }}
            className="bg-white/70 dark:bg-[#0c0c0f]/40 backdrop-blur-xl border border-[#e5e2dd] dark:border-border/30 rounded-2xl p-6 sm:p-8 hover:border-accent-orange/40 hover:shadow-[0_12px_45px_rgba(212,165,116,0.04)] transition-all duration-500 relative overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-accent-orange/3 rounded-full blur-[80px] group-hover:bg-accent-orange/8 transition-all duration-700 pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-border/20 pb-4 font-sans">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-dark/60 border border-border/40 text-accent-orange">
                  <Briefcase size={16} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-orange transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-bold text-accent-orange uppercase tracking-wider">
                      {exp.company}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Period Tag */}
              <div className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full border border-border/40 bg-sidebar/40 text-text-muted text-[10px] font-semibold select-none tracking-wider uppercase">
                <Calendar size={11} className="text-text-dim" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-6 font-medium font-sans">
              {exp.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 font-sans select-none">
              {exp.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 bg-sidebar/55 border border-border/30 rounded-lg text-[10px] text-text-primary font-semibold tracking-wider uppercase hover:border-accent-orange transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
