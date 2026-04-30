import type { FileTreeNode } from "@/types";

export const fileTree: FileTreeNode[] = [
  {
    type: "folder",
    name: "vaibhavi-portfolio",
    children: [
      { type: "file", name: "home.tsx", section: "home" },
      { type: "file", name: "about.html", section: "about" },
      { type: "file", name: "experience.ts", section: "experience" },
      { type: "file", name: "projects.js", section: "projects" },
      { type: "file", name: "skills.json", section: "skills" },
      { type: "file", name: "contact.css", section: "contact" },
      { type: "file", name: "README.md", section: "home" },
    ],
  },
];
