import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const read = (key = 0) => ({
  path: window.location.pathname,
  hash: decodeURIComponent(window.location.hash.slice(1)),
  scrollY: window.history.state?.scrollY ?? null,
  key,
});

const RouterContext = createContext(null);

// Page changes morph with the View Transitions API where the browser supports it (shared project titles
// glide into place); elsewhere, or with reduced motion, the page simply swaps.
const withTransition = (update) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) return update();
  document.startViewTransition(() => flushSync(update));
};

// Minimal history-based router: pushState navigation, back/forward support, and scroll restoration.
export const RouterProvider = ({ children }) => {
  const [route, setRoute] = useState(() => read());

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const onPop = () => {
      const update = () => setRoute((prev) => read(prev.key + 1));
      if (window.location.pathname === document.body.dataset.path) update();
      else withTransition(update);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((url) => {
    // Remember where we were so the back button can return to the same spot.
    window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
    const samePage = new URL(url, window.location.href).pathname === window.location.pathname;
    window.history.pushState({}, '', url);
    const update = () => setRoute((prev) => read(prev.key + 1));
    // Jumping to a section on the same page scrolls; changing pages morphs.
    if (samePage) update();
    else withTransition(update);
  }, []);

  return <RouterContext.Provider value={{ ...route, navigate }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => useContext(RouterContext);

// Anchor that navigates in-app on a plain left click and falls back to normal links otherwise.
export const Link = ({ href, onClick, ...props }) => {
  const { navigate } = useRouter();
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
};
