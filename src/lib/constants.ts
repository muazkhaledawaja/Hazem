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
