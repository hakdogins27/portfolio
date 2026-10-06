import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { EASE, Reveal } from '../ui/primitives';
import { TechLogo, brandColor } from '../ui/TechLogo';
import { Link } from '../../lib/router';
import {
  isCompany,
  pageTitleTransition,
  prepareTitleMorph,
  projectPath,
  rememberOpened,
  splitName,
} from '../../lib/projects';

// One numbered part of the case study: heading on the left, content on the right, hairline above.
// Same hierarchy as the home page: number eyebrow, then a heading whose last word is the serif accent.
const StoryRow = ({ index, title, emphasis, children }) => (
  <Reveal>
    <section className="grid gap-6 border-t border-border py-12 sm:py-16 lg:grid-cols-[260px_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="type-eyebrow flex items-center gap-3">
          <span className="text-text-primary">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-text-primary sm:text-4xl">
          {title} <em className="type-accent text-brand">{emphasis}</em>
        </h2>
      </div>
      <div className="lg:pt-8">{children}</div>
    </section>
  </Reveal>
);

const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

const MetaItem = ({ label, children }) => (
  <div className="border-b border-border py-5 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0">
    <p className="type-eyebrow">{label}</p>
    <div className="mt-2 text-[15px] font-medium text-text-primary">{children}</div>
  </div>
);

// Full case-study page for a single project — editorial layout, no nested cards.
export const ProjectPage = ({ project }) => {
  const { projects } = portfolioData;
  const [title, subtitle] = splitName(project.name);
  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  useEffect(() => {
    rememberOpened(project);
  }, [project]);

  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — Anthony Mendoza`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <main className="relative isolate">
      {/* Soft brand glow behind the title — the only colour block on the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem]"
        style={{ background: 'radial-gradient(50% 70% at 20% 0%, rgb(var(--color-brand) / 0.14), transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-32">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        {/* The title morphs in from the list (view transition); everything around it rises in after. */}
        <header key={project.name} className="mt-14 sm:mt-20">
          <motion.p {...rise(0.05)} className="type-eyebrow flex items-center gap-3">
            <span className="text-brand">{isCompany(project) ? 'Case study' : 'Personal project'}</span>
            {project.period && <span>· {project.period}</span>}
          </motion.p>
          <h1 className="type-display mt-6">
            <span data-title-morph className="inline-block" style={pageTitleTransition(project)}>
              {title}
            </span>
            {subtitle && (
              <motion.span {...rise(0.15)} className="type-accent mt-2 block text-[0.5em] leading-tight text-brand">
                {subtitle}
              </motion.span>
            )}
          </h1>
          <motion.p {...rise(0.22)} className="type-lead mt-8 max-w-2xl">
            {project.summary}
          </motion.p>
        </header>

        {/* Facts strip */}
        <motion.div
          {...rise(0.3)}
          className="mt-14 grid border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-border lg:grid-cols-4"
        >
          <MetaItem label="Role">{project.role}</MetaItem>
          <MetaItem label={isCompany(project) ? 'Company' : 'Type'}>{project.org ?? project.category}</MetaItem>
          <MetaItem label="Year">{project.period ?? '—'}</MetaItem>
          <MetaItem label="Source">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:decoration-text-primary"
              >
                View code
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-text-muted">
                <Lock size={13} />
                Private repository
              </span>
            )}
          </MetaItem>
        </motion.div>

        {/* The facts strip already draws the top rule, so the first row skips its own */}
        <div className="[&>div:first-child>section]:border-t-0">
          <StoryRow index="01" title="The" emphasis="problem">
            <ul className="space-y-4">
              {project.problem.map((item) => (
                <li key={item} className="flex gap-4 text-lg leading-relaxed text-text-primary">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-text-dim" />
                  {item}
                </li>
              ))}
            </ul>
          </StoryRow>

          <StoryRow index="02" title="What I" emphasis="built">
            <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {project.solution.map((item) => (
                <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-text-muted">
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    className="mt-1 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </StoryRow>

          <StoryRow index="03" title="Built" emphasis="with">
            <ul className="flex flex-wrap gap-x-8 gap-y-5">
              {project.stack.map((tech) => (
                <li key={tech} className="flex items-center gap-2.5 text-[15px] font-medium text-text-primary">
                  <span style={brandColor(tech) ? { color: brandColor(tech) } : undefined}>
                    <TechLogo name={tech} size={20} />
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </StoryRow>
        </div>

        {/* Next / previous */}
        <nav aria-label="More projects" className="border-t border-border pt-10">
          <Link
            href={projectPath(prev)}
            onClick={() => prepareTitleMorph(prev, null)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Previous: {splitName(prev.name)[0]}
          </Link>
          <Link
            href={projectPath(next)}
            onClick={(e) => prepareTitleMorph(next, e.currentTarget)}
            className="group mt-8 flex items-end justify-between gap-6"
          >
            <span>
              <span className="type-eyebrow">Next project</span>
              <span className="mt-3 block font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-text-primary transition-colors group-hover:text-brand sm:text-5xl">
                <span data-title-morph className="inline-block">
                  {splitName(next.name)[0]}
                </span>
              </span>
            </span>
            <span className="mb-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-brand-ink transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={22} />
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
};
