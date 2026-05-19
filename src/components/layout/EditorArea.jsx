import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Resume } from '../content/Resume';
import { ProjectsTab } from '../content/ProjectsTab';
import { SkillsTab, ContactTab } from '../content/SpecialTabs';

export const EditorArea = ({ activeTab, theme }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'resume.md': return <Resume theme={theme} />;
      case 'projects.ts': return <ProjectsTab />;
      case 'skills.json': return <SkillsTab />;
      case 'contact.env': return <ContactTab />;
      default: return <Resume theme={theme} />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pt-6 md:pt-10 px-6 sm:px-10 md:px-14 font-sans pb-28 relative selection:bg-accent-orange/20 selection:text-text-primary scroll-smooth bg-app no-scrollbar">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
