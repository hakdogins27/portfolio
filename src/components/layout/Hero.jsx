import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { Badge, ChevronLink, EASE } from '../ui/primitives';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

// Each word rises out of its own mask, one after another.
const Words = ({ text, start = 0 }) =>
  text.split(' ').map((word, i) => (
    <span key={`${word}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: start + i * 0.07, ease: EASE }}
      >
        {word}
        {'\u00a0'}
      </motion.span>
    </span>
  ));

export const Hero = () => {
  const { identity } = portfolioData;
  const sectionRef = useRef(null);
  // The name watermark drifts up and fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative isolate overflow-hidden">
      {/* Editorial name watermark along the bottom of the hero, with a soft colour glow behind it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem] [mask-image:linear-gradient(to_bottom,transparent,#000_35%,#000_55%,transparent)]"
      >
        <div className="absolute bottom-0 left-[12%] h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[130px] dark:bg-brand/[0.12]" />
        <div className="absolute -bottom-8 right-[12%] h-[26rem] w-[26rem] rounded-full bg-amber-400/20 blur-[130px] dark:bg-amber-500/[0.10]" />
      </div>
      <motion.div
        aria-hidden="true"
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center overflow-hidden"
      >
        <span className="translate-y-[34%] select-none whitespace-nowrap font-display text-[min(11.5vw,15rem)] font-extrabold leading-none tracking-tighter text-text-primary/[0.07] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_85%)]">
          Anthony Mendoza
        </span>
      </motion.div>

      <div className="mx-auto max-w-6xl px-6 pb-[min(13vw,17rem)] pt-32 sm:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div {...fadeUp(0)}>
          <Badge className="rounded-full px-3 py-1 font-medium">
            <span className="h-2 w-2 rounded-full bg-brand ring-2 ring-brand/30" />
            Currently building at Zalio
          </Badge>
        </motion.div>

        <h1 className="type-display mt-8">
          <Words text="I build products" start={0.1} />
          <br />
          <span className="type-accent text-brand">
            <Words text="from idea" start={0.32} />
          </span>
          <span className="relative isolate whitespace-nowrap">
            {/* Highlight sweeps in once the words have landed */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0, rotate: -1 }}
              animate={{ scaleX: 1, rotate: -1 }}
              transition={{ duration: 0.7, delay: 0.85, ease: EASE }}
              className="absolute inset-x-[-0.1em] bottom-[0.06em] top-[0.18em] -z-10 origin-left rounded-xl bg-brand"
            />
            <span className="text-brand-ink">
              <Words text="to production." start={0.5} />
            </span>
          </span>
        </h1>

        <motion.p {...fadeUp(0.14)} className="type-lead mx-auto mt-8 max-w-2xl text-balance">
          I'm {identity.name.split(' ')[0]}, a full-stack software engineer. I build web products end to end — the
          interface, the backend behind it, and the AI features inside.
        </motion.p>

        <motion.div {...fadeUp(0.22)} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <ChevronLink href="#work">View my work</ChevronLink>
          <ChevronLink href="/Resume.pdf" download="Anthony_Mendoza_Resume.pdf">
            Download résumé
          </ChevronLink>
        </motion.div>
      </div>
      </div>
    </section>
  );
};
