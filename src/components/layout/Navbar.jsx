import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
const useScrollState = () => {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < 6) return;
      last = y;
      setState({ scrolled: y > 12, hidden: delta > 0 && y > 480 });
    };
    setState({ scrolled: window.scrollY > 12, hidden: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
};

// Wordmark: gradient name, live status dot, and a role line that turns into "Back to top" on hover.
const Logo = ({ onClick, compact }) => (
  <Link href="/#home" onClick={onClick} className="group flex items-center gap-3" aria-label="Anthony Mendoza — back to top">
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-brand/15" />
    </span>
    <span className="leading-none">
      <span className="block bg-gradient-to-r from-text-primary via-text-primary to-text-dim bg-clip-text font-display text-[15px] font-extrabold tracking-tight text-transparent">
        Anthony Mendoza
      </span>
      <span
        className={`block overflow-hidden text-[11px] font-medium text-text-dim transition-all duration-500 ${
          compact ? 'mt-0 h-0 opacity-0' : 'mt-1 h-3.5 opacity-100'
        }`}
      >
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
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
  const { scrolled, hidden } = useScrollState();
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const highlight = hovered ?? active;
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:pt-4 ${
        hidden && !open ? '-translate-y-[130%]' : 'translate-y-0'
      }`}
    >
      <div
        className={`mx-auto rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'max-w-[52rem]' : 'max-w-[69rem]'
        } ${
          scrolled || open
            ? 'border-border bg-app/75 shadow-lg shadow-black/[0.06] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          className={`flex items-center justify-between gap-4 px-3 transition-all duration-500 sm:px-4 ${
            scrolled ? 'h-14' : 'h-16'
          }`}
        >
          <Logo onClick={() => setOpen(false)} compact={scrolled} />

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
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
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
              transition={{ duration: 0.35, ease: EASE }}
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
