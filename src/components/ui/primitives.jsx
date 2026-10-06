import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export const EASE = [0.16, 1, 0.3, 1];

// Fades content up once as it scrolls into view.
export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Badge = ({ className = '', children }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold text-text-primary ${className}`}
  >
    {children}
  </span>
);

const BUTTON_VARIANTS = {
  primary: 'bg-brand text-brand-ink hover:brightness-95',
  dark: 'bg-brand-ink text-brand hover:brightness-125',
  solid: 'bg-text-primary text-app hover:opacity-90',
  outline: 'border border-border bg-app text-text-primary hover:bg-dark',
  ghost: 'text-text-primary hover:bg-dark',
};

const BUTTON_SIZES = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
};

export const Button = ({ as: Tag = 'button', variant = 'primary', size = 'md', className = '', ...props }) => (
  <Tag
    className={`inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 active:scale-[0.98] ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
    {...props}
  />
);

// Apple-style text link with a trailing chevron.
export const ChevronLink = ({ as: Tag = 'a', className = '', children, ...props }) => (
  <Tag
    className={`group inline-flex cursor-pointer items-center gap-0.5 text-sm font-semibold text-text-primary hover:underline hover:underline-offset-4 ${className}`}
    {...props}
  >
    {children}
    <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
  </Tag>
);

export const Card = ({ as: Tag = 'div', className = '', ...props }) => (
  <Tag className={`rounded-2xl border border-border bg-card shadow-sm ${className}`} {...props} />
);

// `emphasis` is the closing words of the title, set in the orange serif accent face.
export const SectionHeader = ({ index, eyebrow, title, emphasis, description, center = false }) => (
  <Reveal className={`mb-12 sm:mb-16 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
    {eyebrow && (
      <p className={`type-eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        {index && <span className="text-text-primary">{index}</span>}
        {index && <span aria-hidden="true" className="h-px w-8 bg-border" />}
        {eyebrow}
      </p>
    )}
    <h2 className="type-title mt-5">
      {emphasis ? (
        <>
          {title} <em className="type-accent text-brand">{emphasis}</em>
        </>
      ) : (
        title
      )}
    </h2>
    {description && <p className="type-lead mt-5">{description}</p>}
  </Reveal>
);

// Accessible modal shell: portal, backdrop click / Escape to close, body scroll lock.
export const Modal = ({ onClose, label, className = '', children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-border bg-app shadow-2xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
};

