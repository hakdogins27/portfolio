import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { Reveal, SectionHeader } from '../ui/primitives';
import { TechLogo, brandColor } from '../ui/TechLogo';

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

// Brand-coloured logo with its name always visible.
const LogoTile = ({ name }) => {
  const brand = brandColor(name);
  return (
    <motion.li variants={itemVariants} className="group flex w-20 flex-col items-center gap-2 text-center sm:w-24">
      <span
        style={brand ? { color: brand } : undefined}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-text-primary shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-text-dim group-hover:shadow-lg sm:h-16 sm:w-16"
      >
        <TechLogo name={name} size={28} />
      </span>
      <span className="text-xs font-medium leading-tight text-text-muted">{name}</span>
    </motion.li>
  );
};

export const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section
      id="skills"
      className="scroll-mt-16 border-y border-border bg-gradient-to-b from-brand/[0.04] via-dark/50 to-dark/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index="03"
          eyebrow="Skills"
          title="What I"
          emphasis="work with."
          description="The stack I use day to day at Zalio and in my own projects."
        />
        <div className="border-t border-border">
          {skills.map((group) => (
            <Reveal key={group.category}>
              <div className="grid gap-5 border-b border-border py-8 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-10">
                <h3 className="type-eyebrow">{group.category}</h3>
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-wrap gap-x-2 gap-y-5"
                >
                  {group.items.map((item) => (
                    <LogoTile key={item} name={item} />
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
