// ─── Profile ────────────────────────────────────────────────────────────────
export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  resume: string;
  socials: SocialLink[];
}

// ─── Skills ─────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0–100
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'cloud' | 'tools';

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  color: string;
  skills: Skill[];
}

// ─── Experience ──────────────────────────────────────────────────────────────
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'freelance' | 'internship' | 'education';
  location?: string;
  extra?: string;
}

// ─── Projects ────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  technologies: string[];
  logo?: string;
  links: {
    live?: string;
    github?: string;
    android?: string;
    ios?: string;
  };
  featured: boolean;
  gradient: string;
}

// ─── Achievements ────────────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string;
}

// ─── Tech Stack ──────────────────────────────────────────────────────────────
export interface TechItem {
  name: string;
  category: string;
}
