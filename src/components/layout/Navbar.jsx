import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { EASE } from '../ui/primitives';
import { Link, useRouter } from '../../lib/router';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// Tracks which section currently sits under the upper part of the viewport.
const useActiveSection = (path) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    ['home', ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [path]);

  return active;
};

// `scrolled` compacts the header; `hidden` tucks it away while reading downwards and brings it back
// the moment the reader scrolls up.
const COMPACT_ENTER_Y = 24;
const COMPACT_EXIT_Y = 8;
const HIDE_AFTER_Y = 480;
const HIDE_SCROLL_DISTANCE = 24;
const REVEAL_SCROLL_DISTANCE = 12;

const useScrollState = (pauseHide) => {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  const stateRef = useRef(state);
  const pauseHideRef = useRef(pauseHide);
  pauseHideRef.current = pauseHide;

  useEffect(() => {
    let lastY = window.scrollY;
    let lastDirection = 0;
    let directionDistance = 0;
    let frame = null;

    const initial = { scrolled: lastY > COMPACT_ENTER_Y, hidden: false };
    stateRef.current = initial;
    setState(initial);

    const commit = (next) => {
      const previous = stateRef.current;
      if (previous.scrolled === next.scrolled && previous.hidden === next.hidden) return;
      stateRef.current = next;
      setState(next);
    };

    const update = () => {
      frame = null;
      const y = window.scrollY;
      const previousY = lastY;
      const delta = y - lastY;
      lastY = y;

      let { scrolled, hidden } = stateRef.current;
      if (!scrolled && y > COMPACT_ENTER_Y) scrolled = true;
      else if (scrolled && y < COMPACT_EXIT_Y) scrolled = false;

      if (pauseHideRef.current) {
        hidden = false;
        lastDirection = 0;
        directionDistance = 0;
      } else if (Math.abs(delta) > 0.25) {
        const direction = Math.sign(delta);
        const traveled = direction > 0 && y > HIDE_AFTER_Y
          ? y - Math.max(previousY, HIDE_AFTER_Y)
          : direction > 0 ? 0 : Math.abs(delta);
        directionDistance = direction === lastDirection
          ? directionDistance + traveled
          : traveled;
        lastDirection = direction;

        if (direction > 0 && y > HIDE_AFTER_Y && directionDistance >= HIDE_SCROLL_DISTANCE) {
          hidden = true;
        } else if (direction < 0 && hidden && directionDistance >= REVEAL_SCROLL_DISTANCE) {
          hidden = false;
        }
      }

      commit({ scrolled, hidden });
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!pauseHide) return;
    const previous = stateRef.current;
    if (!previous.hidden) return;
    const next = { ...previous, hidden: false };
    stateRef.current = next;
    setState(next);
  }, [pauseHide]);

  return state;
};

// Wordmark: gradient name, live status dot, and a role line that turns into "Back to top" on hover.
const Logo = ({ onClick, compact, reduceMotion }) => (
  <Link href="/#home" onClick={onClick} className="group flex items-center gap-3" aria-label="Anthony Mendoza — back to top">
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className={`absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 ${reduceMotion ? 'hidden' : 'animate-ping'}`} />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand/15" />
    </span>
    <span className="leading-none">
      <span className="block bg-gradient-to-r from-text-primary via-text-primary to-text-dim bg-clip-text font-display text-[15px] font-extrabold tracking-tight text-transparent">
        Anthony Mendoza
      </span>
      <span
        className={`block overflow-hidden text-[11px] font-medium text-text-dim ${reduceMotion ? 'transition-none' : 'transition-[height,opacity,margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]'} ${
          compact ? 'mt-0 h-0 opacity-0' : 'mt-1 h-3.5 opacity-100'
        }`}
      >
        <span className={`block ${reduceMotion ? '' : 'transition-transform duration-300 ease-out group-hover:-translate-y-full'}`}>
          <span className="block h-3.5">Software Engineer</span>
          <span className="block h-3.5 text-text-primary">Back to top ↑</span>
        </span>
      </span>
    </span>
  </Link>
);

// Floating glass header with a sliding hover pill and a primary call to action.
export const Navbar = ({ theme, toggleTheme }) => {
  const { path } = useRouter();
  const activeSection = useActiveSection(path);
  // Nothing is highlighted while reading a project page.
  const active = path === '/' ? activeSection : null;
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const { scrolled, hidden } = useScrollState(open || hasFocusWithin);
  const reduceMotion = useReducedMotion();
  const highlight = hovered ?? active;
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      onFocusCapture={() => setHasFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocusWithin(false);
      }}
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 ${reduceMotion ? 'transition-none' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'} sm:px-6 sm:pt-4 ${
        hidden && !open ? '-translate-y-[130%]' : 'translate-y-0'
      }`}
    >
      <div
        className={`mx-auto rounded-2xl border ${reduceMotion ? 'transition-none' : 'transition-[max-width,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]'} ${
          scrolled ? 'max-w-[52rem]' : 'max-w-[69rem]'
        } ${
          scrolled || open
            ? 'border-border bg-app/75 shadow-lg shadow-black/[0.06] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-4 px-3 ${reduceMotion ? 'transition-none' : 'transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]'} sm:px-4 ${
            scrolled ? 'h-14' : 'h-16'
          }`}
        >
          <Logo onClick={() => setOpen(false)} compact={scrolled} reduceMotion={reduceMotion} />

          <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
            {LINKS.map(({ id, label }) => (
              <li key={id} className="relative">
                <Link
                  href={`/#${id}`}
                  onMouseEnter={() => setHovered(id)}
                  className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === id || hovered === id ? 'text-text-primary' : 'text-text-muted'
                  }`}
                >
                  {label}
                </Link>
                {highlight === id && (
                  <motion.span
                    layoutId="nav-highlight"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-dark"
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:text-text-primary"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <ThemeIcon size={15} />
            </button>
            <Link
              href="/#contact"
              className="hidden h-9 items-center gap-1 rounded-full bg-brand px-4 text-sm font-semibold text-brand-ink transition-all hover:brightness-95 active:scale-[0.98] sm:inline-flex"
            >
              Let's talk
              <ArrowUpRight size={15} />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-text-primary md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
              className="overflow-hidden md:hidden"
            >
              <ul className="border-t border-border px-2 py-2">
                {LINKS.map(({ id, label }) => (
                  <li key={id}>
                    <Link
                      href={`/#${id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-3 py-3 text-base font-semibold transition-colors hover:bg-dark ${
                        active === id ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-4">
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="flex h-11 items-center justify-center gap-1 rounded-full bg-brand text-sm font-semibold text-brand-ink"
                >
                  Let's talk
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
