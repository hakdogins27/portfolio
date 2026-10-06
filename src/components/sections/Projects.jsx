import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { Reveal, SectionHeader } from '../ui/primitives';
import { TechLogo, brandColor } from '../ui/TechLogo';
import { Link } from '../../lib/router';
import { isCompany, prepareTitleMorph, projectPath, splitName, titleTransition } from '../../lib/projects';

// Track the pointer so the hover glow follows the cursor.
const followPointer = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const HoverGlow = ({ size = 420 }) => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    style={{
      background: `radial-gradient(${size}px circle at var(--mx, 0px) var(--my, 50%), rgb(var(--color-brand) / 0.12), transparent 70%)`,
    }}
  />
);

const ArrowCircle = ({ large = false }) => (
  <span
    className={`flex shrink-0 items-center justify-center rounded-full border border-border text-text-primary transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-ink ${
      large ? 'h-14 w-14' : 'h-10 w-10'
    }`}
  >
    <ArrowUpRight size={large ? 22 : 17} className="transition-transform duration-300 group-hover:rotate-45" />
  </span>
);

// The flagship project gets a full-width row with its summary and stack.
const FeaturedProject = ({ project }) => {
  const [title, subtitle] = splitName(project.name);
  return (
    <Link
      href={projectPath(project)}
      onClick={(e) => prepareTitleMorph(project, e.currentTarget)}
      onPointerMove={followPointer}
      className="group relative isolate block overflow-hidden border-b border-border px-2 py-10 sm:px-4 sm:py-12"
    >
      <HoverGlow size={640} />
      <p className="type-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-brand">Featured</span>
        {subtitle && <span>· {subtitle}</span>}
      </p>
      <div className="mt-6 flex items-end justify-between gap-8">
        <div className="min-w-0">
          <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-text-primary transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">
            <span data-title-morph className="inline-block" style={titleTransition(project)}>
              {title}
            </span>
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">{project.summary}</p>
        </div>
        <span className="hidden sm:block">
          <ArrowCircle large />
        </span>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="type-eyebrow">
          {project.credit} · {project.period}
        </span>
        <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Built with">
          {project.stack.slice(0, 6).map((tech) => (
            <li key={tech} className="flex items-center gap-1.5 text-sm text-text-muted">
              <span style={brandColor(tech) ? { color: brandColor(tech) } : undefined}>
                <TechLogo name={tech} size={14} />
              </span>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

const ProjectRow = ({ project }) => {
  const [title, subtitle] = splitName(project.name);
  const meta = `${project.credit} · ${project.period}`;

  return (
    <Link
      href={projectPath(project)}
      onClick={(e) => prepareTitleMorph(project, e.currentTarget)}
      onPointerMove={followPointer}
      className="group relative isolate flex w-full items-center gap-5 overflow-hidden border-b border-border px-2 py-7 sm:gap-8 sm:px-4"
    >
      <HoverGlow />
      <span className="min-w-0 flex-1">
        <span className="block transition-transform duration-300 group-hover:translate-x-1">
          <span data-title-morph className="type-heading inline-block sm:text-[1.75rem]" style={titleTransition(project)}>
            {title}
          </span>
          {subtitle && <span className="ml-3 hidden text-sm text-text-dim sm:inline">{subtitle}</span>}
        </span>
        <span className="type-caption mt-1.5 block sm:text-[15px]">{project.outcome}</span>
        <span className="type-eyebrow mt-3 block md:hidden">{meta}</span>
      </span>
      <span className="type-eyebrow hidden shrink-0 md:block">{meta}</span>
      <ArrowCircle />
    </Link>
  );
};

const Group = ({ label, count, children, className = '' }) => (
  <div className={className}>
    <h3 className="flex items-baseline gap-2 border-b border-border px-2 pb-4 text-sm font-semibold text-text-primary sm:px-4">
      {label}
      <span className="font-mono text-xs font-medium text-text-dim">{count}</span>
    </h3>
    {children}
  </div>
);

const ProjectList = ({ projects }) => (
  <ul>
    {projects.map((project, i) => (
      <li key={project.name}>
        <Reveal delay={i * 0.06}>
          <ProjectRow project={project} />
        </Reveal>
      </li>
    ))}
  </ul>
);

export const Projects = () => {
  const { projects } = portfolioData;
  const [featured, ...company] = projects.filter(isCompany);
  const personal = projects.filter((p) => !isCompany(p));

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeader
        index="01"
        eyebrow="Selected work"
        title="Problems I've"
        emphasis="solved."
        description="Production work at Zalio and real-world builds. Open one to see the problem and how I solved it."
      />
      <Group label="At Zalio" count={company.length + 1}>
        <Reveal>
          <FeaturedProject project={featured} />
        </Reveal>
        <ProjectList projects={company} />
      </Group>
      <Group label="Personal" count={personal.length} className="mt-16">
        <ProjectList projects={personal} />
      </Group>
    </section>
  );
};
