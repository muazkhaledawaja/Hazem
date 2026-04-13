export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ExperienceRow = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Video = {
  id: string;
  slug: string;
  title: string;
  description: string;
  embed: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SkillTone = "pacific" | "fresh" | "frozen";

export type SkillGroup = {
  id: string;
  title: string;
  tone: SkillTone;
  items: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type AboutContent = {
  bioPrimary: string;
  bioSecondary: string;
  badgeTop: string;
  badgeBottom: string;
  stats: { value: string; label: string }[];
};

export type ContactContent = {
  email: string;
  phone: string;
  linkedin: string;
  blurb: string;
};
