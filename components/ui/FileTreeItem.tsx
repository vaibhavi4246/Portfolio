"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FileTreeNode, Tab } from "@/types";
import { useVSCode } from "@/hooks/useVSCode";

/* ── File-type icon badges ── */
function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";

  if (ext === "tsx" || ext === "jsx") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="3" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="7.5" cy="7.5" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="7.5" cy="7.5" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 7.5 7.5)" />
        <ellipse cx="7.5" cy="7.5" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 7.5 7.5)" />
      </svg>
    );
  }

  if (ext === "html") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#e34c26" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">&lt;/&gt;</text>
      </svg>
    );
  }

  if (ext === "ts") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#3178c6" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">TS</text>
      </svg>
    );
  }

  if (ext === "js") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#f0db4f" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#323330" fontFamily="monospace">JS</text>
      </svg>
    );
  }

  if (ext === "json") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#f59e0b" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">{"{}"}</text>
      </svg>
    );
  }

  if (ext === "css") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#264de4" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white" fontFamily="monospace">CSS</text>
      </svg>
    );
  }

  if (ext === "md") {
    return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#519aba" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="white" fontFamily="monospace">MD</text>
      </svg>
    );
  }

  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="1" width="13" height="13" rx="1" fill="#6e7681" />
    </svg>
  );
}

/* ── Section → tab name mapping (display name in tab bar) ── */
const SECTION_DISPLAY: Record<string, Tab> = {
  home: { id: "home", name: "home.tsx", section: "home" },
  about: { id: "about", name: "about.html", section: "about" },
  experience: { id: "experience", name: "experience.ts", section: "experience" },
  projects: { id: "projects", name: "projects.js", section: "projects" },
  skills: { id: "skills", name: "skills.json", section: "skills" },
  contact: { id: "contact", name: "contact.css", section: "contact" },
};

interface Props {
  node: FileTreeNode;
  depth?: number;
}

export default function FileTreeItem({ node, depth = 0 }: Props) {
  const [expanded, setExpanded] = useState(true);
  const { openTab, activeSection } = useVSCode();

  const pl = depth * 12 + 8;

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center w-full gap-1 py-0.5 px-2 hover:bg-vscode-hover text-vscode-text text-sm select-none"
          style={{ paddingLeft: pl }}
        >
          {expanded ? (
            <ChevronDown size={14} className="text-vscode-muted flex-shrink-0" />
          ) : (
            <ChevronRight size={14} className="text-vscode-muted flex-shrink-0" />
          )}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mr-0.5">
            <path d="M1 4C1 3.45 1.45 3 2 3H5.5L7 4.5H12C12.55 4.5 13 4.95 13 5.5V11C13 11.55 12.55 12 12 12H2C1.45 12 1 11.55 1 11V4Z" fill="#e8b93d" opacity="0.9"/>
          </svg>
          <span className="text-vscode-muted text-xs font-semibold uppercase tracking-wider">
            {node.name}
          </span>
        </button>
        {expanded &&
          node.children?.map((child) => (
            <FileTreeItem key={child.name} node={child} depth={depth + 1} />
          ))}
      </div>
    );
  }

  const sectionKey = node.section ?? "home";
  const tab: Tab = SECTION_DISPLAY[sectionKey] ?? SECTION_DISPLAY["home"];

  const isActive = activeSection === node.section;

  return (
    <button
      onClick={() => openTab(tab)}
      className={`flex items-center w-full gap-1.5 py-0.5 text-sm select-none transition-colors ${
        isActive
          ? "bg-vscode-list-active text-vscode-text"
          : "hover:bg-vscode-hover text-vscode-muted hover:text-vscode-text"
      }`}
      style={{ paddingLeft: pl + 16 }}
    >
      <span className="flex-shrink-0">
        <FileIcon name={node.name} />
      </span>
      <span className={`text-xs ${isActive ? "text-vscode-text" : "text-vscode-muted"}`}>
        {node.name}
      </span>
    </button>
  );
}
