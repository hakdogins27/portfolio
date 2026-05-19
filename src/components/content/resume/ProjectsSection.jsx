import React from 'react';

export const ProjectsSection = ({ projects }) => {
  return (
    <section id="projects">
      <div className="font-mono text-[10px] font-bold text-[#4e7a5d] mb-6 sm:mb-8 tracking-[0.2em] uppercase">// projects</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map(p => (
          <div key={p.name} className="group p-5 sm:p-6 glass-card rounded-xl border-glow relative overflow-hidden transition-all pro-shadow">
            <div className="absolute -right-8 -top-8 w-16 h-16 sm:w-20 sm:h-20 bg-accent-orange/5 rounded-full blur-2xl group-hover:bg-accent-orange/10 transition-colors duration-500" />
            <div className="absolute top-0 right-0 p-3 z-10">
              <span className="px-1.5 py-0.5 bg-accent-orange/10 text-accent-orange text-[8px] font-black rounded-md uppercase tracking-widest border border-accent-orange/20">{p.status}</span>
            </div>
            <div className="flex items-center justify-between mb-3 sm:mb-4 pr-12">
              <h4 className="text-[14px] sm:text-[15px] font-bold text-text-resume group-hover:text-accent-orange tracking-tight truncate">{p.name}</h4>
            </div>
            <p className="text-text-primary/60 text-[11px] sm:text-[12px] mb-4 sm:mb-6 leading-relaxed italic line-clamp-2">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {p.stack.slice(0, 4).map(t => (
                <span key={t} className="px-1.5 py-0.5 bg-sidebar/55 text-text-muted text-[9px] rounded font-mono border border-border/20 group-hover:border-accent-orange/30 group-hover:text-text-primary uppercase tracking-tighter">{t}</span>
              ))}
              {p.stack.length > 4 && <span className="text-[9px] text-text-muted font-mono self-center">+{p.stack.length - 4}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
