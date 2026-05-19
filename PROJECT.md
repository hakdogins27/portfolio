# PROJECT.md (LIVING SYSTEM CONTEXT)

---

## 1. PROJECT OVERVIEW

- **Project Name**: Anthony S. Mendoza Portfolio
- **Description**: A premium, modern minimalist personal portfolio website styled as a professional **split-column CV Dashboard**. It balances high-end typography, fluid scroll animations, and clean resume layouts to present high-impact skills in AI solutions, workflow automation, and full-stack web systems.
- **Problem it solves**: Replaces generic resumes with a highly visual, interactive dashboard that directly proves product design quality and engineering standards.
- **Target audience**: Elite recruiters, hiring managers, startup founders, and technical partners.
- **Core goal**: Create an impressive first impression that communicates high-value business skills through visual clarity, smooth interactions, and easy navigation.

This file is NOT final — it evolves as the project grows.

---

## 2. CURRENT STATE (LIVE SYSTEM STATUS)

This section reflects what is ACTUALLY built and live right now.

### Completed Features:
- **Professional split-screen CV Header**: A gorgeous landing header card featuring a circular glowing profile photo, name badge (`❤️ 8`), Cebu location pin, primary title, executive profile narrative statement, quick call-to-actions, and an integrated right-column displaying highlights of latest education, latest experience, and direct contact grids separated by a vertical border line.
- **Single-Page Scrolling Layout**: A clean, unified layout with a sticky glass-like navigation bar, responsive boundaries, and a clean creative footer.
- **Mobile & Desktop Compatibility**: Fully optimized for phones, tablets, and desktops with no horizontal scrolling issues.
- **Shipped Projects Gallery**: A grid displaying live projects (SneakyLinkk, New Balance 1906L scroll showcase, BK Basketball stats, Prodea AI architect, SAM automation manager) with instant screenshots, clean tech badges, and direct links to code and live previews.
- **Synchronized Theme System**: Effortless switching between light and dark modes with smooth, coordinated transitions.
- **Specialized Content Sections**:
  - **Categorized Skills**: A clean display grouping development, AI, automation, database, and hosting skills with zero monospace styling.
  - **Work Experience & Education**: Well-structured timelines highlighting internships, academic achievements (Candidate for President's Lister), and self-directed specializations in sleek sans-serif typography.

### In Progress:
- **Refined Scroll Animations**: Extending scroll-based breakdowns to make section entries even more fluid.

---

## 3. FEATURE BACKLOG (EVOLVING ROADMAP)

### Planned Enhancements:
- **Dynamic Project Blueprints**: Clickable sheets that expand to reveal detailed project goals, problems solved, and final results.
- **Enhanced Interactive Previews**: Seamless hover filters on project screens.

### Evolving Ideas:
- **Live GitHub Activity Feed**: A clean, modern activity visualizer showing recent coding updates.
- **Ambient sound design**: Toggleable click sounds to enhance the premium dashboard feel.

### Priority order:
1. Interactive Project Blueprints
2. Enhanced Previews
3. GitHub Activity Feed

---

## 4. TECH STACK

### Frontend & Visuals:
- **React**: Modern framework for building fast, responsive user interfaces.
- **Vite**: Ultra-fast build tool ensuring near-instant page load speeds.
- **Tailwind CSS**: styling system supporting perfectly synchronized light and dark themes.
- **Framer Motion**: Premium animation engine for smooth transitions and scroll reveals.
- **Lucide React**: High-quality vector icon set.

### Database & Real-Time Services:
- **Client-Side Storage**: Keeps user preferences (like dark/light theme) saved in the browser.
- **Firebase Database / Auth**: Real-time database snapshot updates used in the basketball league tracker.
- **PeerJS / WebRTC**: Direct connection protocol for real-time multiplayer gaming in Snekylinkk.

---

## 5. SYSTEM ARCHITECTURE

- **Architecture type**: Fast, lightweight Single-Page Application.
- **Core system design**: The website uses a centralized layout coordinator (`MainLayout`). All information regarding projects, education, skills, and bio details is loaded from a single, organized data file (`portfolioData.js`). This ensures updating the portfolio's contents is incredibly fast and error-free.

### Main Modules:
- **Layout Coordinator (`MainLayout`)**: Coordinates viewports, overlay scrollbars, background glow, and sections.
- **Dashboard Header (`Hero`)**: Renders the new premium horizontally split CV details card.
- **Content Panels**:
  - **Projects (`ProjectsTab`)**: Displays project previews, titles, and stacks.
  - **Skills (`SkillsTab`)**: Highlights grouped expertise.
  - **Journeys (`ExperienceSection` / `EducationSection`)**: Provides clean, professional timeline layouts.

---

## 6. LAYOUT, STYLING, & DESIGN SYSTEM

To guarantee a gorgeous, premium feel that instantly impresses hiring managers:

### 6.1 Color Palette (Tailored HSL Variables)
Color tokens are mapped globally in `src/index.css` to keep absolute styling harmony:

| Token | Dark Theme (Default) | Light Theme Override | Purpose |
| :--- | :--- | :--- | :--- |
| Primary BG | Softer Charcoal (`15 15 20`) | Off-white (`248 250 252`) | Main website background |
| Secondary BG | Void dark (`11 11 15`) | Cool slate shadow (`241 245 249`) | Footer and panel boundaries |
| Card BG | Charcoal card (`22 22 30`) | Pure white (`255 255 255`) | Project and CV split cards |
| Borders | Slate border (`38 38 52`) | Slate border shadow (`226 232 240`) | Faint grid lines and borders |
| Signature Accent | Warm copper (`212 165 116`) | Deep terracotta (`196 116 52`) | All active elements, timeline pathways, and badges |
| Neutral Dim | Slate-gray (`136 142 166`) | Muted slate (`140 146 160`) | Inactive selections, subtitles, and secondary indicators |

### 6.2 Typography & Hierarchy
- **Body & Headings**: `'Outfit'`, sans-serif. A premium, modern font that is exceptionally clean and readable. Monospace typography (`JetBrains Mono`) is excluded from all major headers, badges, timeline labels, and project descriptions to ensure an ultra-clean corporate presentation.

### 6.3 Global Creative Styling Classes
- **Cinematic Glow Backdrop**: Soft aura circles that pulse gently beneath the content layers as you navigate.
- **Glassmorphic Panels (`glass` / `glass-card`)**: Glass-like semi-transparent panels with faint borders to create depth.
- **Interactive Border Glow (`border-glow`)**: Cards glow gently when hovered over, inviting clicks.

---

## 7. SCROLL EXPERIENCE & VISUAL ENGAGEMENT

To make recruiters *feel* the experience as they scroll:

- **Soft Background Lights**: Glowing colored aura circles that pulse gently beneath the content layers as you navigate.
- **Coordinated Animations**: Elements slide in smoothly as they enter the screen, keeping the visitor's focus engaged.
- **Synchronized Theme Shifting**: Entire page transitions seamlessly between light and dark modes with no visual flashing.

---

## 8. ENGINEERING RULES

### 8.1 Core Development Principles
- **Accuracy First**: Never compromise on functionality.
- **Clean Modifications**: Write precise edits without disrupting existing structures.
- **Clarity**: Keep functions modular, readable, and simple.
- **Zero Hallucination**: Rely only on real data and confirm before making assumptions.

---

## 9. CHANGE LOG

- **v1.4.0 (Current)**: Harmonized the entire design system and colors into the bespoke "Warm Copper & Minimalist Slate" theme. Eliminated all remaining neon accents (blue, green, purple) from timelines, cards, tags, and navigation icons, standardizing on signature copper accents and clean neutral slate. Verified compiled build via production Vite.
- **v1.3.0**: Overhauled Hero component to a high-fidelity split-screen CV Dashboard layout. Removed the redundant intermediate biography tab. Softened the dark theme background to a soft warm charcoal slate.
- **v1.2.0**: Overhauled the layout to a modern minimalist "Clean Look" showcase. Removed technical IDE tabs, simulated terminal loops, blueprint grids, mock browser frame UI, and monospace typography tags.
- **v1.0.0**: Single-page dashboard with simulated developer consoles.
- **v0.1.0**: Initial boilerplate.

---

## 10. GO-TO-MARKET ROADMAP

1. **Asset Compression**: Optimize all images for ultra-fast loading speeds.
2. **Analytics Tracking**: Add anonymous event tracking on CTA clicks to see recruiter conversion rates.
