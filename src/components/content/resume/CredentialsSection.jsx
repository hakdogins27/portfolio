import React, { useState, useEffect } from 'react';
import { Calendar, Award, Eye, X } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import hackathonCert from '../../../assets/Anthony Mendoza.png';
import lifewoodCert from '../../../assets/Lifewood_COC.jpeg';


export const CredentialsSection = () => {
  const { education } = portfolioData;
  const [activeCert, setActiveCert] = useState(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const certificates = [
    {
      title: "Software Developer Intern",
      issuer: "Lifewood Technologies",
      period: "Internship",
      detail: "Software Developer Intern focusing on AI integrations, backend automation, and OJT technical workflows.",
      image: lifewoodCert
    },
    {
      title: "Hackathon Competitor",
      issuer: "Collaborative Game Hackathon",
      period: "Hackathon",
      detail: "Participated in a team-based hackathon dedicated to designing, programming, and launching a custom game.",
      image: hackathonCert
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto text-text-primary transition-all duration-500 font-sans pt-4">
      
      {/* Education Timeline Header Label */}
      <div className="mb-8 select-none border-l-2 border-accent-orange pl-3 text-left">
        <h3 className="text-xs font-bold text-accent-orange tracking-widest uppercase font-sans">
          Academic Timeline
        </h3>
      </div>

      {/* Central Cardless Timeline */}
      <div className="relative pl-8 sm:pl-10 border-l border-border/30 ml-4 sm:ml-6 space-y-12 py-2 mb-16">
        {education.map((edu, idx) => (
          <div key={idx} className="relative group">
            
            {/* Animated Timeline Connector Node */}
            <div className={`absolute -left-[39px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 bg-app flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${
              idx === 0 
                ? 'border-accent-orange shadow-[0_0_8px_rgba(212,165,116,0.3)]' 
                : 'border-border/60 group-hover:border-accent-orange'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                idx === 0 ? 'bg-accent-orange' : 'bg-border/60 group-hover:bg-accent-orange'
              }`} />
            </div>

            {/* Content block */}
            <div className="space-y-1.5 select-none">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                <h4 className="text-sm sm:text-base font-black tracking-wide text-text-primary group-hover:text-accent-orange transition-colors duration-300">
                  {edu.level}
                </h4>
                
                <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-0.5 rounded-full border border-border/30 bg-sidebar/35 text-[9px] sm:text-[10px] font-sans font-bold text-text-muted uppercase tracking-wider">
                  <Calendar size={10} className="text-text-dim" />
                  {edu.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-text-muted font-semibold">
                {edu.institution}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Elegant Divider */}
      <div className="w-full h-px bg-border/20 mb-12" />

      {/* Certificates Section Header Label */}
      <div 
        id="education" 
        className="scroll-mt-24 mb-8 select-none border-l-2 border-accent-orange pl-3 text-left"
      >
        <h3 className="text-xs font-bold text-accent-orange tracking-widest uppercase font-sans flex items-center gap-1.5">
          <Award size={13} className="text-accent-orange" />
          <span>Professional Credentials</span>
        </h3>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {certificates.map((cert, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveCert(cert)}
            className="flex flex-col border border-border/20 hover:border-accent-orange/40 bg-sidebar/10 hover:bg-sidebar/20 rounded-2xl p-4 transition-all duration-350 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-orange/5 group cursor-pointer"
          >
            {/* Image Thumbnail with Glass Overlay */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-sidebar/40 mb-4 border border-border/10 flex items-center justify-center select-none">
              <img 
                src={cert.image} 
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Telemetry overlay button */}
              <div className="absolute inset-0 bg-accent-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0c0c0e]/85 border border-border/30 shadow-lg text-[10px] font-black uppercase text-accent-orange tracking-wider scale-90 group-hover:scale-100 transition-all duration-300">
                  <Eye size={12} />
                  <span>View Document</span>
                </div>
              </div>
            </div>

            {/* Cert Description info */}
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-black text-text-primary group-hover:text-accent-orange transition-colors duration-300 line-clamp-1">
                  {cert.title}
                </h4>
                <span className="inline-flex items-center text-[9px] px-2 py-0.5 rounded-full bg-accent-orange/15 text-accent-orange font-bold shrink-0 uppercase tracking-wider">
                  {cert.period}
                </span>
              </div>

              <p className="text-[10px] text-text-dim font-bold uppercase tracking-wider">
                {cert.issuer}
              </p>

              <p className="text-[11px] text-text-muted leading-relaxed font-semibold mt-2">
                {cert.detail}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Fullscreen Certificate Modal Lightbox */}
      {activeCert && (
        <div 
          onClick={() => setActiveCert(null)}
          className="fixed inset-0 z-50 bg-app/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 select-none cursor-pointer"
        >
          {/* Large Image Frame */}
          <div 
            className="relative flex flex-col max-w-full max-h-[90vh] rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card cursor-default" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button inside the frame */}
            <button 
              onClick={() => setActiveCert(null)}
              className="absolute top-3 right-3 p-1.5 rounded-lg border border-border/30 bg-sidebar/70 hover:bg-sidebar text-text-primary hover:text-accent-orange transition-all duration-200 cursor-pointer z-10"
              title="Close"
            >
              <X size={16} />
            </button>

            <div className="flex items-center justify-center p-4 bg-sidebar/20 dark:bg-black/20">
              <img 
                src={activeCert.image} 
                alt={activeCert.title} 
                className="max-w-full max-h-[60vh] sm:max-h-[65vh] object-contain rounded-xl shadow-lg"
              />
            </div>
            {/* Modal Bottom Caption */}
            <div className="w-full bg-sidebar/40 dark:bg-[#0c0c0e]/95 border-t border-border/30 p-4 text-left">
              <h4 className="text-xs sm:text-sm font-black text-accent-orange uppercase tracking-wider">
                {activeCert.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-text-muted font-semibold mt-1">
                Issued by {activeCert.issuer} • {activeCert.period}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
