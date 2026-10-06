import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { Button, Reveal } from '../ui/primitives';

// Closing call to action: neutral card with a faint grid and spotlight.
export const Contact = () => {
  const { identity } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };

  const links = [
    { label: 'GitHub', href: `https://${identity.github}` },
    { label: 'LinkedIn', href: `https://${identity.linkedin}` },
    { label: 'Résumé', href: '/Resume.pdf' },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-16 text-center sm:px-12 sm:py-24">
          {/* Subtle grid and spotlight so the block has depth without a loud colour */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(var(--color-border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-border)/0.6)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_30%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-20 -top-24 -z-10 h-80 w-80 rounded-full bg-brand/25 blur-[100px] dark:bg-brand/[0.12]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-16 -z-10 h-80 w-80 rounded-full bg-amber-400/20 blur-[100px] dark:bg-amber-500/[0.10]"
          />

          <p className="type-eyebrow flex items-center justify-center gap-3">
            <span className="text-text-primary">05</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Contact
          </p>
          <h2 className="type-title mx-auto mt-5 max-w-3xl">
            Let's build something{' '}
            <em className="type-accent text-brand">great.</em>
          </h2>
          <p className="type-lead mx-auto mt-5 max-w-md">
            Open to new opportunities in AI automation and full-stack web development.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href={`mailto:${identity.email}`} variant="solid" size="lg">
              <Mail size={17} />
              Email me
            </Button>
            <Button onClick={copyEmail} variant="outline" size="lg" aria-live="polite">
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? 'Copied!' : identity.email}
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-text-muted transition-colors hover:text-text-primary"
                >
                  {label}
                  <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
};
