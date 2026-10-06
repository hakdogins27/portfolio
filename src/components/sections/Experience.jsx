import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { Modal, Reveal, SectionHeader } from '../ui/primitives';
import { TechLogo, brandColor } from '../ui/TechLogo';
import hackathonCert from '../../assets/Anthony Mendoza.png';
import lifewoodCert from '../../assets/Lifewood_COC.jpeg';

const CERTIFICATES = [
  { title: 'Software Developer Intern', issuer: 'Lifewood Technologies', image: lifewoodCert },
  { title: 'Hackathon Competitor', issuer: 'Collaborative Game Hackathon', image: hackathonCert },
];

const CertificateModal = ({ cert, onClose }) => (
  <Modal onClose={onClose} label={cert.title} className="w-full max-w-4xl">
    <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-text-primary">{cert.title}</p>
        <p className="truncate text-xs text-text-muted">{cert.issuer}</p>
      </div>
      <button
        onClick={onClose}
        className="cursor-pointer rounded-full p-2 text-text-muted transition-colors hover:bg-dark hover:text-text-primary"
        aria-label="Close certificate"
      >
        <X size={16} />
      </button>
    </div>
    <div className="bg-dark p-4">
      <img src={cert.image} alt={cert.title} className="mx-auto max-h-[75vh] w-auto rounded-md object-contain" />
    </div>
  </Modal>
);

// Timeline node in the company's accent colour; the current role pulses.
const Node = ({ accent, current }) => (
  <span aria-hidden="true" className="absolute left-0 top-[3px] flex h-3 w-3 items-center justify-center">
    {current && (
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: accent }} />
    )}
    <span
      className="relative h-3 w-3 rounded-full ring-4 ring-app"
      style={{ backgroundColor: accent, boxShadow: current ? `0 0 18px 2px ${accent}` : undefined }}
    />
  </span>
);

const NowPill = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-app px-2.5 py-0.5 text-xs font-medium text-text-primary">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
    Now
  </span>
);

const Role = ({ job, index }) => (
  <Reveal delay={index * 0.1}>
    <article className="relative isolate pb-14 pl-10 sm:pl-12">
      <Node accent={job.accent} current={job.current} />
      {job.current && (
        // Soft spotlight behind the current role
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 -top-16 -z-10 h-72 w-[min(36rem,100%)]"
          style={{
            background: `radial-gradient(closest-side, color-mix(in srgb, ${job.accent} 14%, transparent), transparent)`,
          }}
        />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <p className="type-eyebrow">{job.period}</p>
        {job.current && <NowPill />}
      </div>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.025em] text-text-primary sm:text-3xl">
        {job.title}
        {job.tag && (
          // The founding-team part of the title is the headline, so it gets the colour.
          <>
            {' '}
            <span className="whitespace-nowrap rounded-lg bg-brand px-2 text-brand-ink">{job.tag}</span>
          </>
        )}
      </h3>
      <p className="mt-1.5 text-[15px] font-medium" style={{ color: job.accent }}>
        {job.company}
        {job.role && <span className="text-text-muted"> · {job.role}</span>}
      </p>

      <ul className="mt-6 space-y-3">
        {job.points.map((point) => (
          <li key={point} className="type-body flex gap-3">
            <ArrowRight size={15} className="mt-[0.3em] shrink-0" style={{ color: job.accent }} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>

      {job.stack && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-app/60 px-3 py-1 text-xs font-medium text-text-muted"
            >
              <span style={brandColor(tech) ? { color: brandColor(tech) } : undefined}>
                <TechLogo name={tech} size={13} />
              </span>
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  </Reveal>
);

// Vertical rail that fills with colour as the timeline scrolls through the viewport.
const Timeline = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div ref={ref} className="relative [&>div:last-child>article]:pb-0">
      <span aria-hidden="true" className="absolute bottom-0 left-[5.5px] top-2 w-px bg-border" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: fill }}
        className="absolute bottom-0 left-[5.5px] top-2 w-px origin-top bg-text-primary"
      />
      {children}
    </div>
  );
};

const Certificate = ({ cert, onOpen }) => (
  <button
    onClick={onOpen}
    className="group block w-full cursor-pointer text-left"
    aria-label={`View certificate: ${cert.title}`}
  >
    <span className="block aspect-[4/3] overflow-hidden rounded-xl border border-border bg-dark">
      <img
        src={cert.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </span>
    <span className="mt-3 flex items-start justify-between gap-2">
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-text-primary">{cert.title}</span>
        <span className="type-caption mt-0.5 block text-xs">{cert.issuer}</span>
      </span>
      <ArrowUpRight
        size={15}
        className="mt-0.5 shrink-0 text-text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text-primary"
      />
    </span>
  </button>
);

export const Experience = () => {
  const { experience } = portfolioData;
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <SectionHeader
            index="04"
            eyebrow="Experience"
            title="Where I've"
            emphasis="been."
            description="From internship to the founding team at Zalio, shipping production AI products."
          />
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-2">
          <Timeline>
            {experience.map((job, i) => (
              <Role key={`${job.company}-${job.period}`} job={job} index={i} />
            ))}
          </Timeline>
        </div>

        <Reveal className="lg:col-start-1 lg:row-start-2 lg:self-end">
          <p className="type-eyebrow">Certificates</p>
          <ul className="mt-5 grid grid-cols-2 gap-4">
            {CERTIFICATES.map((cert) => (
              <li key={cert.title}>
                <Certificate cert={cert} onOpen={() => setActiveCert(cert)} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeCert && <CertificateModal cert={activeCert} onClose={() => setActiveCert(null)} />}
      </AnimatePresence>
    </section>
  );
};
