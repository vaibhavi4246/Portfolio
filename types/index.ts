export type Section =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "contact";

export type SidebarPanel = "explorer" | null;

export interface Tab {
  id: string;
  name: string;
  section: Section;
}

export interface FileTreeNode {
  type: "file" | "folder";
  name: string;
  section?: Section;
  icon?: string;
  children?: FileTreeNode[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  points: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  location: string;
  score: string;
  scoreLabel: string;
}

export interface Achievement {
  title: string;
  date: string;
  description: string;
}
