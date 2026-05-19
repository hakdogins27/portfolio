import React from 'react';
import { Mail, Github, Linkedin, Heart, Sparkles } from 'lucide-react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ProjectsTab } from '../content/ProjectsTab';
import { SkillsTab, ContactTab } from '../content/SpecialTabs';
import { CredentialsSection } from '../content/resume/CredentialsSection';
import { CollapsibleChat } from './CollapsibleChat';
import { portfolioData } from '../../data/portfolioData';

export const MainLayout = ({ theme, toggleTheme, isChatOpen, setIsChatOpen }) => {
  const { identity } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-app text-text-primary selection:bg-accent-orange/20 selection:text-text-primary transition-colors duration-500 relative font-sans">

      {/* Premium Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />

      {/* Cinematic Marketing Hero Section */}
      <Hero theme={theme} />

      {/* Single-Page Scrollable Content Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-20 space-y-28 sm:space-y-36 relative z-10">

        {/* Projects Gallery Section */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-10 sm:mb-14 select-none">
            <h2 className="text-2xl sm:text-3.5xl font-black text-text-primary tracking-tight font-sans">
              Shipped Projects
            </h2>
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-[10px] font-sans text-accent-orange bg-accent-orange/5 px-2.5 py-0.5 border border-accent-orange/15 rounded-full uppercase tracking-wider hidden sm:inline-block font-semibold">
              Live Previews
            </span>
          </div>
          <ProjectsTab />
        </section>

        {/* Dynamic Tech Stack Section */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-10 sm:mb-14 select-none">
            <h2 className="text-2xl sm:text-3.5xl font-black text-text-primary tracking-tight font-sans">
              Technical Expertise
            </h2>
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-[10px] font-sans text-accent-orange bg-accent-orange/5 px-2.5 py-0.5 border border-accent-orange/15 rounded-full uppercase tracking-wider hidden sm:inline-block font-semibold">
              Core Tech Stack
            </span>
          </div>
          <SkillsTab />
        </section>

        {/* Academic Journey Timeline */}
        <div id="experience" className="scroll-mt-24">
          <section className="space-y-10 sm:space-y-12">
            <div className="flex items-center gap-3 select-none">
              <h2 className="text-2xl sm:text-3.5xl font-black text-text-primary tracking-tight font-sans">
                Credentials & Academic Foundation
              </h2>
              <div className="h-px flex-1 bg-border/40" />
            </div>
            
            <CredentialsSection />
          </section>
        </div>

        {/* Call to Action & Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <ContactTab />
        </section>

      </main>

      {/* Floating Action Controls */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Glowing AI Assistant Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-all duration-300 relative group overflow-hidden ${
            isChatOpen 
              ? 'bg-accent-orange text-[#0c0c0e] shadow-accent-orange/25' 
              : 'bg-card/60 backdrop-blur-md border border-border/60 text-text-muted hover:text-accent-orange hover:border-accent-orange/30 shadow-black/10'
          }`}
          title="Toggle AI Assistant"
        >
          {/* Pulsing Aura/Glow */}
          <div className="absolute inset-0 bg-accent-orange/15 rounded-2xl blur-[12px] group-hover:blur-[16px] scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          <Sparkles size={20} className={isChatOpen ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
        </button>
      </div>

      {/* Elegant Creative Footer */}
      <footer className="border-t border-border/30 bg-dark/30 py-12 px-6 sm:px-12 transition-colors duration-500 font-sans text-xs text-text-dim select-none">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            <span className="font-bold text-text-primary">{identity.name}</span>
            <span className="opacity-40">© 2026</span>
          </div>

          <div className="flex items-center gap-6 font-sans text-xs font-medium">
            <a href={`mailto:${identity.email}`} className="hover:text-accent-orange transition-colors flex items-center gap-1.5">
              <Mail size={12} />
              <span>Email</span>
            </a>
            <a href={`https://${identity.github}`} target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors flex items-center gap-1.5">
              <Github size={12} />
              <span>GitHub</span>
            </a>
            <a href={`https://${identity.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-accent-purple transition-colors flex items-center gap-1.5">
              <Linkedin size={12} />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 opacity-60 font-sans text-xs">
            <span>Built with</span>
            <Heart size={11} className="text-accent-red animate-pulse" />
            <span>& React</span>
          </div>
        </div>
      </footer>

      {/* Sidebar AI Assistant Panel */}
      <CollapsibleChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};
