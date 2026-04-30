"use client";

import { ChevronRight } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";

const SECTION_FILE: Record<string, string> = {
  home: "home.tsx",
  about: "about.html",
  experience: "experience.ts",
  projects: "projects.js",
  skills: "skills.json",
  contact: "contact.css",
};

export default function BreadcrumbBar() {
  const { activeSection } = useVSCode();
  const file = SECTION_FILE[activeSection] ?? "home.tsx";

  return (
    <div
      className="flex items-center gap-0.5 px-3 h-6 text-xs font-mono flex-shrink-0 border-b border-vscode-border select-none"
      style={{ backgroundColor: "var(--color-vscode-bg)" }}
    >
      <span className="text-vscode-muted hover:text-vscode-text cursor-pointer transition-colors">vaibhavi-jain</span>
      <ChevronRight size={11} className="text-vscode-muted flex-shrink-0" />
      <span className="text-vscode-muted hover:text-vscode-text cursor-pointer transition-colors">src</span>
      <ChevronRight size={11} className="text-vscode-muted flex-shrink-0" />
      <span className="text-vscode-text">{file}</span>
    </div>
  );
}
