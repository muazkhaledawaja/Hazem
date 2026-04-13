export const palette = {
  bg: "#080E18",
  deep: "#050A12",
  yale: "#1b4965",
  yaleLight: "#2b74a1",
  pacific: "#62b6cb",
  fresh: "#5fa8d3",
  frozen: "#bee9e8",
  pale: "#cae9ff",
  border: "rgba(98,182,203,0.12)",
  borderHover: "rgba(98,182,203,0.3)",
  muted: "rgba(190,233,232,0.35)",
  soft: "rgba(202,233,255,0.55)",
  text: "rgba(202,233,255,0.75)",
} as const;

export type Palette = typeof palette;

export const NAV_LINKS = [
  "About",
  "Skills",
  "Experience",
  "Showreel",
  "Work",
  "Contact",
] as const;

export const EXPERIENCE = [
  {
    role: "Brand & Marketing Communication",
    company: "Etisalat",
    period: "Oct 2025 – Feb 2026",
    description:
      "Events management specialist — organized corporate events, prepared creative briefs and proposals, coordinated with internal teams and external vendors.",
  },
  {
    role: "Media & Communications Intern",
    company: "Sphinx International Airport",
    period: "Sep 2025",
    description:
      "Generated marketing ideas to enhance airport visibility. Contributed to campaign brainstorming and supported digital and on-ground branding.",
  },
  {
    role: "Video Editor",
    company: "PO3 Marketing Agency",
    period: "Aug – Oct 2024",
    description:
      "Edited promotional videos for Vigour Gym and Doctor Ahmed Dentistry. End-to-end editing: transitions, sound design, and visual effects.",
  },
  {
    role: "Documentary Production",
    company: "180 Degree Charity",
    period: "2024",
    description:
      "Led creative direction on a short documentary — planning, shooting, and final edit showcasing volunteer food distribution efforts.",
  },
] as const;

export const PROJECTS = [
  { title: "Vigour Gym Campaign", category: "Advertising", description: "Fitness-focused promotional content for a local gym brand.", accent: "#62b6cb" },
  { title: "Dr. Ahmed Dentistry", category: "Advertising", description: "Educational and marketing videos for dental practice.", accent: "#5fa8d3" },
  { title: "180° Charity Documentary", category: "Filmmaking", description: "Short documentary on volunteer food distribution efforts.", accent: "#bee9e8" },
  { title: "LSBU Summer Programme", category: "University Projects", description: "Academic and cultural engagement project — London, UK.", accent: "#62b6cb" },
  { title: "Brand Identity Concepts", category: "Advertising", description: "Strategic brand development and visual identity work.", accent: "#5fa8d3" },
  { title: "Etisalat Event Campaigns", category: "University Projects", description: "Corporate event planning and creative brief development.", accent: "#bee9e8" },
] as const;

export const VIDEOS = [
  {
    id: "main",
    title: "Showreel 2026",
    description: "A collection of my best work across advertising, filmmaking, and brand campaigns.",
    embed: null as string | null, // Replace with YouTube/Vimeo embed URL
    featured: true,
  },
  {
    id: "v1",
    title: "Vigour Gym — Promo",
    description: "Fitness-focused campaign edit with dynamic transitions and sound design.",
    embed: null as string | null,
    featured: false,
  },
  {
    id: "v2",
    title: "Dr. Ahmed Dentistry — Spot",
    description: "Educational marketing video for dental practice awareness.",
    embed: null as string | null,
    featured: false,
  },
  {
    id: "v3",
    title: "180° Charity Documentary",
    description: "Short documentary on volunteer food distribution efforts.",
    embed: null as string | null,
    featured: false,
  },
] as const;
