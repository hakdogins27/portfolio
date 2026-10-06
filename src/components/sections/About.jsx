import React from 'react';
import { Reveal, SectionHeader } from '../ui/primitives';

// Verified from GitHub (momentum-au org, Jun–Oct 2026) — update as the numbers grow.
const STATS = [
  { value: '131', label: 'Merged pull requests at Zalio' },
  { value: '4', label: 'Zalio products I build on' },
  { value: 'Cebu', label: 'Based in the Philippines, working hybrid' },
];

export const About = () => (
  <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
    <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
      <div>
        <SectionHeader index="02" eyebrow="About" title="A bit" emphasis="about me." />
        <Reveal className="space-y-5">
          <p className="type-lead">
            I'm a software engineer from Cebu. In 2026 I joined Zalio's founding team, where I build AI products end
            to end — from the marketing studio's video pipeline to the phone calls Alex makes.
          </p>
          <p className="type-lead">
            I work AI-first: coding agents are part of my daily workflow, but I read and own every line that ships. I
            care about the details that make software trustworthy — honest error states, no fake confirmations, and
            data that adds up.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="lg:pt-24">
        <dl className="border-t border-border">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline justify-between gap-6 border-b border-border py-6">
              <dt className="type-caption max-w-[14rem]">{stat.label}</dt>
              <dd className="font-display text-4xl font-bold tracking-[-0.03em] text-text-primary sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);
