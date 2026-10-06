export const splitName = (name) => name.split(' — ');

export const isCompany = (project) => project.category === 'Company work';

export const projectSlug = (project) =>
  splitName(project.name)[0]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const projectPath = (project) => `/work/${projectSlug(project)}`;

// Title morphs between the project list and a project page (View Transitions). Only the project being
// opened — or just left — may carry the shared name; any other named title would animate on its own.
const morphName = (project) => `project-${projectSlug(project)}`;
let lastOpened = null;

export const rememberOpened = (project) => {
  lastOpened = projectSlug(project);
};

// Style for a title in the list: named only for the project the reader is coming back from.
export const titleTransition = (project) =>
  projectSlug(project) === lastOpened ? { viewTransitionName: morphName(project) } : undefined;

// Style for the title on the project's own page: always named.
export const pageTitleTransition = (project) => ({ viewTransitionName: morphName(project) });

// Call from a link's onClick, before navigating: clears every other title's name and names the one
// inside the clicked link (if any), so only that title morphs.
export const prepareTitleMorph = (project, link) => {
  document.querySelectorAll('[data-title-morph]').forEach((el) => {
    el.style.viewTransitionName = '';
  });
  const title = link?.querySelector('[data-title-morph]');
  if (title) title.style.viewTransitionName = morphName(project);
  rememberOpened(project);
};
