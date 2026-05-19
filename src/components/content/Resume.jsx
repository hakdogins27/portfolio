import { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { ProfileHeader } from './resume/ProfileHeader';
import { IdentityInfo } from './resume/IdentityInfo';
import { ExperienceSection } from './resume/ExperienceSection';
import { ProjectsSection } from './resume/ProjectsSection';
import { SkillsSection } from './resume/SkillsSection';
import { EducationSection } from './resume/EducationSection';

export const Resume = ({ theme }) => {
  const { identity, experience, projects, skills, education } = portfolioData;
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isFirstRender = useRef(true);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setHasInteracted(true);
    setIsAnimating(true);
    
    const targetRef = theme === 'dark' ? videoARef : videoBRef;
    if (targetRef.current) {
      targetRef.current.currentTime = 0;
      targetRef.current.play().catch(console.error);
    }

    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [theme]);

  const handleLoadedMetadata = (video) => {
    if (!isAnimating) video.currentTime = video.duration;
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <section id="identity">
        <ProfileHeader 
          identity={identity} theme={theme} hasInteracted={hasInteracted}
          videoARef={videoARef} videoBRef={videoBRef} handleLoadedMetadata={handleLoadedMetadata}
        />
        <IdentityInfo identity={identity} />
      </section>
      
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <EducationSection education={education} />

      <div className="hidden" aria-hidden="true">
        <video preload="none"><source src={identity.profileAnimation} type="video/mp4" /></video>
        <video preload="none"><source src={identity.profileAnimation2} type="video/mp4" /></video>
      </div>
    </div>
  );
};
