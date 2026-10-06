import React from 'react';
import {
  siBetterauth,
  siFastapi,
  siFfmpeg,
  siOpenrouter,
  siDocker,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGoogle,
  siGooglecalendar,
  siGooglegemini,
  siGooglesheets,
  siGreensock,
  siHtml5,
  siJavascript,
  siLivekit,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siPostgresql,
  siPython,
  siRadixui,
  siReact,
  siReactquery,
  siShadcnui,
  siTailwindcss,
  siTanstack,
  siTelegram,
  siTypescript,
  siUnity,
  siVercel,
  siVite,
  siVitest,
  siWebrtc,
  siZod,
} from 'simple-icons';

// First match wins, so more specific names come before general ones.
const MATCHERS = [
  [/tanstack query|react query/i, siReactquery],
  [/tanstack/i, siTanstack],
  [/next\.?js/i, siNextdotjs],
  [/react/i, siReact],
  [/tailwind/i, siTailwindcss],
  [/gsap|scrolltrigger/i, siGreensock],
  [/html/i, siHtml5],
  [/shadcn/i, siShadcnui],
  [/radix/i, siRadixui],
  [/n8n/i, siN8n],
  [/gemini/i, siGooglegemini],
  [/fastapi/i, siFastapi],
  [/python/i, siPython],
  [/ffmpeg/i, siFfmpeg],
  [/openrouter/i, siOpenrouter],
  [/better auth/i, siBetterauth],
  [/firebase|firestore/i, siFirebase],
  [/webrtc|peerjs/i, siWebrtc],
  [/livekit/i, siLivekit],
  [/google sheets/i, siGooglesheets],
  [/google calendar/i, siGooglecalendar],
  [/google workspace/i, siGoogle],
  [/node\.?js/i, siNodedotjs],
  [/telegram/i, siTelegram],
  [/github actions/i, siGithubactions],
  [/github/i, siGithub],
  [/\bgit\b/i, siGit],
  [/vercel/i, siVercel],
  [/vitest/i, siVitest],
  [/vite/i, siVite],
  [/npm/i, siNpm],
  [/typescript/i, siTypescript],
  [/javascript/i, siJavascript],
  [/postgres/i, siPostgresql],
  [/zod/i, siZod],
  [/docker/i, siDocker],
  [/framer/i, siFramer],
  [/unity/i, siUnity],
];

export const findLogo = (name) => MATCHERS.find(([pattern]) => pattern.test(name))?.[1] ?? null;

// Brand colour; near-black or near-white brands fall back to the text colour so they show in both themes.
export const brandColor = (name) => {
  const hex = findLogo(name)?.hex;
  if (!hex) return null;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 60 || luminance > 225 ? null : `#${hex}`;
};

// Monochrome brand logo (inherits text colour); renders nothing when no logo is known.
export const TechLogo = ({ name, size = 16, className = '' }) => {
  const icon = findLogo(name);
  if (!icon) return null;
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={`shrink-0 fill-current ${className}`}>
      <path d={icon.path} />
    </svg>
  );
};
