import React from 'react';

export const SkillsSection = ({ skills }) => {
  return (
    <section id="skills">
      <div className="font-sans text-[10px] font-bold text-[#4e7a5d] mb-6 sm:mb-8 tracking-[0.2em] uppercase">// skills</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {skills.map(g => (
          <div key={g.category} className="p-5 sm:p-6 glass-card rounded-xl hover:border-border transition-all duration-300 pro-shadow">
            <h4 className={`text-[10px] font-black font-sans uppercase tracking-[0.25em] mb-4 sm:mb-6 inline-block border-b border-border/50 pb-1 ${g.color}`}>{g.category}</h4>
            <div className="flex flex-wrap gap-2">
              {g.items.map(s => (
                <span key={s} className="px-2.5 py-1 sm:py-1.5 bg-sidebar/80 backdrop-blur-sm border border-border/60 shadow-[inset_0_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] rounded-lg text-[10px] sm:text-[11px] text-text-primary/90 font-medium hover:-translate-y-0.5 hover:shadow-[inset_0_1px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)] hover:text-text-primary cursor-default transition-all duration-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
