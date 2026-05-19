import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, GraduationCap, Award } from 'lucide-react';

export const EducationSection = ({ education }) => {
  return (
    <div className="space-y-8 sm:space-y-12">
      {education.map((edu, idx) => (
        <div key={idx} className="relative pl-6 sm:pl-10 group">
          {/* Timeline Connector Line */}
          <div className="absolute left-0 top-1.5 bottom-0 w-0.5 bg-border/20 z-0 group-last:bottom-auto group-last:h-8">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-accent-orange origin-top shadow-[0_0_8px_rgba(212,165,116,0.2)]"
            />
          </div>
          
          {/* Timeline Node Ring */}
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

          {/* Premium Education card */}
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/20 pb-4 font-sans">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-dark/60 border border-border/40 text-accent-orange animate-pulse-soft">
                  {idx === 0 ? <GraduationCap size={18} /> : <Award size={18} />}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-orange transition-colors duration-300">
                    {edu.degree}
                  </h3>
                  <p className="text-[10px] font-bold text-accent-orange uppercase tracking-wider mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Dateperiod */}
              <div className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full border border-border/40 bg-sidebar/40 text-text-muted text-[10px] font-semibold select-none tracking-wider uppercase">
                <Calendar size={11} className="text-text-dim" />
                <span>{edu.period}</span>
              </div>
            </div>

            {/* Degree Status / Grade */}
            <div className="flex items-center justify-between mt-4 font-sans select-none">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider shadow-inner ${
                idx === 0 
                  ? 'bg-accent-orange/5 border-accent-orange/20 text-accent-orange' 
                  : 'bg-sidebar/55 border-border/20 text-text-muted'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-accent-orange animate-pulse' : 'bg-border/60'}`} />
                {edu.status}
              </span>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
