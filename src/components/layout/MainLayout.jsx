import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Projects } from '../sections/Projects';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';
import { ProjectPage } from '../sections/ProjectPage';
import { portfolioData } from '../../data/portfolioData';
import { useRouter } from '../../lib/router';
import { projectSlug } from '../../lib/projects';

// Thin reading-progress line pinned to the top of the viewport.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, viewTransitionName: 'scroll-progress' }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-brand"
    />
  );
};

export const MainLayout = ({ theme, toggleTheme }) => {
  const { identity, projects } = portfolioData;
  const { path, hash, scrollY, key } = useRouter();
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const project = slug ? projects.find((p) => projectSlug(p) === slug) : null;

  // Unknown project addresses fall back to the home page.
  useEffect(() => {
    if (path !== '/' && !project) window.history.replaceState(null, '', '/');
  }, [path, project]);

  // After every navigation: glide to a section on the same page, or — on a page change — jump to the
  // section, restore the previous position, or start at the top. Runs in the layout phase so a page
  // transition captures the new page already scrolled into place.
  const previousPath = useRef(null);
  useLayoutEffect(() => {
    const samePage = previousPath.current === path;
    previousPath.current = path;
    document.body.dataset.path = path;
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant' });
    else if (!samePage || scrollY !== null) window.scrollTo({ top: scrollY ?? 0, behavior: 'instant' });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen bg-app font-sans text-text-primary">
        <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.03] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-screen" />

        <ScrollProgress />
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {project ? (
          <ProjectPage project={project} />
        ) : (
          <main>
            <Hero />
            <Projects />
            <About />
            <Skills />
            <Experience />
            <Contact />
          </main>
        )}

        <footer className="bg-dark">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-border px-6 py-6 type-caption text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © {new Date().getFullYear()} {identity.name}. All rights reserved.</p>
            <p>{identity.location}</p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
};
