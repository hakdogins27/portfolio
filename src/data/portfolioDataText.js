export const portfolioDataText = {
  identity: {
    name: "Anthony S. Mendoza",
    role: "Software Engineer · AI Agentic Specialist",
    location: "Cebu, Philippines",
    age: 22,
    birthdate: "October 27, 2003",
    email: "mendozaony27@gmail.com",
    github: "github.com/hakdogins27?tab=repositories",
    linkedin: "linkedin.com/in/anthony-mendoza-6a4736367",
    availability: "OPEN FOR OPPORTUNITIES",
    phone: "+63 945 123 4567",
    graduation: "May 2025 (Graduated Cum Laude)",
    profile: "Software Engineer maximizing AI-assisted coding and agentic workflows to build high-performance systems. Expert at leveraging advanced LLMs, autonomic reasoning loops, and multi-agent coordination pipelines to design and deploy scalable, production-grade web systems with unmatched speed and reliability.",
    bio: "A highly driven Software Engineer and AI Agentic Specialist based in Cebu, who graduated Cum Laude. I maximize AI-assisted development alongside specialized AI Agentic Engineering—orchestrating complex multi-agent frameworks, background workflow automation, and high-performance Web-scale architectures that translate strategic goals into robust, production-grade solutions."
  },
  experience: [
    {
      company: "Zalio",
      accent: "rgb(var(--color-brand))",
      title: "Junior Developer",
      tag: "Founding Team",
      period: "Jun 2026 – Present",
      current: true,
      points: [
        "Part of Zalio's founding engineering team, building a local-first AI business operating system from the ground up",
        "Core developer on Zalio Marketing — trend engine, AI briefs, video editor and lead-tracked links",
        "Built the CRM's Campaign Tracker and Forms: planner, dashboards, calendar and form builder",
        "Shipped secure signup webhooks and a de-duplicated Meta Lead Ads sync",
        "Built Alex voice agent features: phone-menu navigation, voicemail detection and post-call reviews",
        "Created Zalio UI, the shared component library and style guide Zalio's apps build on"
      ],
      stack: ["TanStack Start", "React", "TypeScript", "Python", "PostgreSQL"]
    },
    {
      company: "Lifewood Data Technology",
      accent: "#10b981",
      role: "Intern",
      title: "AI Assisted Full Stack Web Developer",
      period: "2025 – 2026",
      points: [
        "Developed web projects integrating machine learning, AI features and game development elements",
        "Helped implement AI-driven features to improve user experience and system efficiency"
      ]
    }
  ],
  projects: [
    {
      name: "Zalio Marketing — AI Marketing Studio",
      accent: "#ec4899",
      category: "Company work",
      org: "Zalio · Momentum",
      role: "Founding team · core developer across the web app and engine",
      credit: "Core developer",
      period: "2026",
      outcome: "From a trending video to a finished, tracked campaign in one workspace.",
      summary: "An AI marketing workspace that spots trending content, writes on-brand briefs, edits the video and tracks the leads it brings in.",
      problem: [
        "Gym marketers guess what to post while trends move faster than they can track",
        "Turning a trend into a script, a shoot and an edit took days across many tools",
        "Link-in-bio clicks reached the CRM with no lead source attached"
      ],
      solution: [
        "Trend engine that scrapes TikTok and Instagram and flags breakout videos",
        "Newsroom that clusters industry news and auto-drafts briefs",
        "AI creative briefs grounded in each brand's rules and reference creators",
        "CapCut-style video editor that renders the final cut to MP4 with ffmpeg",
        "Link-in-bio pages that tag every click with its lead source for the CRM",
        "Database-backed Campaign Planner with schedules, drafts and ROI inputs"
      ],
      stack: ["TanStack Start", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Better Auth", "FFmpeg", "OpenRouter"]
    },
    {
      name: "Zalio CRM — Campaign Tracker & Forms",
      accent: "#3b82f6",
      category: "Company work",
      org: "Zalio · Momentum",
      role: "Built the Campaign Tracker and Forms sections",
      credit: "Tracker & Forms",
      period: "2026",
      outcome: "Every campaign sign-up lands in the CRM as a tracked lead.",
      summary: "Campaign planning and lead-capture forms for gyms, wired straight into the CRM so every sign-up becomes a tracked lead.",
      problem: [
        "Campaign sign-ups were scattered across ads, sites and partner pages",
        "Leads couldn't be reliably traced back to their campaign",
        "Expired forms showed “success” but never created a lead"
      ],
      solution: [
        "Campaign planner with dashboards, shared calendar and templates",
        "Drag-and-drop form builder with embeds and share links",
        "Multiple forms per campaign, attributed by form — not by date",
        "Closed forms say so honestly, so no sign-up is silently lost",
        "Secure signup webhooks and de-duplicated Meta Lead Ads sync"
      ],
      stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "TanStack Query", "Tailwind CSS", "Radix UI", "Recharts", "Playwright"]
    },
    {
      name: "Alex — AI Voice Agents",
      accent: "#a855f7",
      category: "Company work",
      org: "Zalio · Momentum",
      role: "Voice agent design across call types",
      credit: "Voice agent features",
      period: "2026",
      outcome: "Answers, calls back and books, so no lead goes unanswered.",
      summary: "Alex is an AI phone agent that answers, calls back and books — one platform, tuned for several real-world call types.",
      problem: [
        "Businesses lose leads when calls go unanswered",
        "Every call type needs different behaviour",
        "Prompts that don't match the backend break live calls"
      ],
      solution: [
        "Inbound receptionist that answers enquiries and books appointments",
        "Callbacks for leads who request a call",
        "Outbound business calls for Hasti, Zalio's speed-to-lead service",
        "Navigates phone menus with real keypad tones",
        "Detects voicemail and follows the voicemail policy for each call",
        "Bulk Alex call queue and prospect call drawer in Zalio's GTM app",
        "Always discloses it's an AI and never fakes a confirmed action"
      ],
      stack: ["OpenAI GPT-Live", "LiveKit", "Twilio", "n8n", "PostgreSQL", "TypeScript"]
    },
    {
      name: "Zalio UI — Design System",
      accent: "rgb(var(--color-brand))",
      category: "Company work",
      org: "Zalio · Momentum",
      role: "Created the repo and built out the component library",
      credit: "Created it",
      period: "2026",
      outcome: "One component library behind every Zalio app.",
      summary: "Zalio's shared component library and living style guide — the source the company's apps pull their UI from.",
      problem: [
        "Each Zalio app rebuilt the same buttons, dialogs and tables slightly differently",
        "There was no single place to see, test or document the brand's components"
      ],
      solution: [
        "Set up the design-system repo on TanStack Start, shadcn/ui and Tailwind",
        "Full component set — from buttons and dialogs to chat, onboarding, date and phone inputs",
        "Branded Zalio pieces: page layouts, headers, chips and decision dialogs",
        "Living docs for combinations, sizing, motion and icon transitions",
        "Type-checked, linted and covered by component tests"
      ],
      stack: ["TanStack Start", "React", "TypeScript", "shadcn/ui", "Tailwind CSS", "Vitest"]
    },
    {
      name: "SAM — Service Automation Manager",
      accent: "#f59e0b",
      category: "AI & Automation",
      role: "Personal project",
      credit: "Solo build",
      period: "2026",
      outcome: "A chat agent that books a court end to end, no human needed.",
      summary: "A chat agent that books service appointments while showing the automation running behind it.",
      problem: [
        "Small businesses handle bookings and alerts by hand",
        "Can an AI agent book end to end, without a person?"
      ],
      solution: [
        "Chat with Sam to book a court",
        "n8n + Groq agent logs to Sheets, Calendar and Telegram",
        "Booking pauses until payment, then resumes automatically",
        "Live trace panel shows the automation as it runs"
      ],
      stack: ["Next.js", "TypeScript", "n8n", "Groq (Llama 3.3)", "Google Sheets", "Google Calendar", "Zod", "Framer Motion"],
      github: "https://github.com/hakdogins27/pickleball-booking"
    },
    {
      name: "BK Basketball League Platform",
      accent: "#f97316",
      category: "Web Application",
      role: "Personal project",
      credit: "Solo build",
      period: "2025 – 2026",
      outcome: "Live standings, stats and news for a whole basketball league.",
      summary: "A real-time league site with standings, schedules, player stats, MVPs and news — plus an admin console.",
      problem: [
        "League stats, schedules and news were tracked by hand",
        "Fans had no single place to follow the season"
      ],
      solution: [
        "Real-time standings, schedules, stats and news",
        "Standings calculated from results, so they're always right",
        "One-form box scores with an automatic MVP pick",
        "Installable app (PWA) with an offline cache"
      ],
      stack: ["React", "Vite", "TypeScript", "Firebase", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/hakdogins27/BK"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["TypeScript", "React", "Next.js", "TanStack Start", "Tailwind CSS", "shadcn/ui"]
    },
    {
      category: "Backend & Data",
      items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Firebase", "Better Auth", "Zod"]
    },
    {
      category: "AI & Automation",
      items: ["n8n", "OpenRouter", "LiveKit", "FFmpeg", "Google Workspace"]
    },
    {
      category: "Tooling & Delivery",
      items: ["Git", "GitHub", "GitHub Actions", "Docker", "Vercel", "Vitest"]
    }
  ],
  education: [
    {
      level: "College",
      institution: "Cebu Eastern College",
      period: "2022 - 2026"
    },
    {
      level: "High School",
      institution: "Toong Integrated School",
      period: "2016 - 2022"
    },
    {
      level: "Elementary",
      institution: "San Pascual Elementary School",
      period: "2010 - 2016"
    }
  ],
  expertise: [
    "Critical Thinking",
    "Problem Solving",
    "Collaboration and Teamwork",
    "Communication Skills",
    "AI Integration",
    "Full Stack Web Development",
    "Git & GitHub Version Control"
  ]
};
