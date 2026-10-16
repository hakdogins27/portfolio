import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const imageVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 20 : -20 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -20 : 20 }),
};

export const ProjectGallery = ({ projectName, outputs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const swipeStart = useRef(null);
  const outputCount = outputs.length;
  const prefersReducedMotion = useReducedMotion();

  if (outputCount === 0) return null;

  const activeOutput = outputs[activeIndex];
  const previousIndex = (activeIndex - 1 + outputCount) % outputCount;
  const nextIndex = (activeIndex + 1) % outputCount;
  const goTo = (index, direction = index >= activeIndex ? 1 : -1) => {
    setSlideDirection(direction);
    setActiveIndex((index + outputCount) % outputCount);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'touch') return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    const direction = deltaX < 0 ? 1 : -1;
    setSlideDirection(direction);
    setActiveIndex((index) => (index + direction + outputCount) % outputCount);
  };

  return (
    <section
      aria-label={`${projectName} project previews`}
      aria-roledescription="carousel"
      className="space-y-4"
    >
      <figure className="overflow-hidden rounded-2xl border border-border bg-dark">
        <div
          className={`touch-pan-y select-none ${outputCount > 1 ? 'relative aspect-[36/25] overflow-hidden' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { swipeStart.current = null; }}
        >
          <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
            <motion.img
              key={activeOutput.image}
              custom={slideDirection}
              variants={imageVariants}
              initial={prefersReducedMotion ? false : 'enter'}
              animate="center"
              exit={prefersReducedMotion ? undefined : 'exit'}
              transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              src={activeOutput.image}
              alt={activeOutput.alt}
              loading="lazy"
              decoding="async"
              draggable="false"
              className={`block w-full ${outputCount > 1 ? 'absolute inset-0 h-full object-contain' : 'h-auto'}`}
            />
          </AnimatePresence>
        </div>
        <figcaption className="flex flex-col gap-3 border-t border-border px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-5">
          <div>
            <p className="text-sm font-semibold text-text-primary">{activeOutput.title}</p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-text-muted">{activeOutput.caption}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {outputCount > 1 && (
              <>
                <p className="whitespace-nowrap text-sm text-text-muted" aria-live="polite" aria-atomic="true">
                  {activeIndex + 1} of {outputCount}: {activeOutput.title}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={`Previous preview: ${outputs[previousIndex].title}`}
                    onClick={() => goTo(previousIndex, -1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-brand hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <ArrowLeft size={17} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Next preview: ${outputs[nextIndex].title}`}
                    onClick={() => goTo(nextIndex, 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-brand hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
            <a
              href={activeOutput.image}
              target="_blank"
              rel="noreferrer"
              className="inline-flex whitespace-nowrap items-center gap-1 text-sm font-medium text-text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-text-primary"
            >
              Open full-size image
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </figcaption>
      </figure>

      {outputCount > 1 && (
        <>
          <p className="mb-1 text-xs text-text-muted">Scroll sideways to browse all previews <span aria-hidden="true">→</span></p>
          <div role="group" aria-label="Choose a project preview" className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain py-1 pb-3">
            {outputs.map((output, index) => (
              <button
                key={output.title}
                type="button"
                aria-label={`Show ${output.title} preview`}
                aria-pressed={index === activeIndex}
                onClick={() => goTo(index)}
                className={`w-32 shrink-0 snap-start rounded-xl border p-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-40 ${
                  index === activeIndex
                    ? 'border-brand bg-brand/10'
                    : 'border-border hover:border-text-dim'
                }`}
              >
                <img
                  src={output.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full rounded-lg object-cover"
                />
                <span className="mt-2 block truncate px-1 pb-1 text-xs font-medium text-text-primary">
                  {output.title}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
