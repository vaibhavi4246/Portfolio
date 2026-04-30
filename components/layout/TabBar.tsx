"use client";

import { X } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";
import type { Tab } from "@/types";

/* ── Inline SVG file-type icons (identical to FileTreeItem) ── */
function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";

  if (ext === "tsx" || ext === "jsx") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="3" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="7.5" cy="7.5" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="7.5" cy="7.5" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 7.5 7.5)" />
        <ellipse cx="7.5" cy="7.5" rx="7" ry="2.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 7.5 7.5)" />
      </svg>
    );
  }
  if (ext === "html") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#e34c26" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">&lt;/&gt;</text>
      </svg>
    );
  }
  if (ext === "ts") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#3178c6" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">TS</text>
      </svg>
    );
  }
  if (ext === "js") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#f0db4f" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#323330" fontFamily="monospace">JS</text>
      </svg>
    );
  }
  if (ext === "json") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#f59e0b" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white" fontFamily="monospace">{"{}"}</text>
      </svg>
    );
  }
  if (ext === "css") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#264de4" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white" fontFamily="monospace">CSS</text>
      </svg>
    );
  }
  if (ext === "md") {
    return (
      <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="13" height="13" rx="1" fill="#519aba" />
        <text x="7.5" y="10.5" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="white" fontFamily="monospace">MD</text>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
      <rect x="1" y="1" width="13" height="13" rx="1" fill="#6e7681" />
    </svg>
  );
}

export default function TabBar() {
  const { openTabs, activeSection, openTab, closeTab } = useVSCode();

  return (
    <div className="flex items-end h-9 bg-vscode-sidebar overflow-x-auto flex-shrink-0 border-b border-vscode-border">
      {openTabs.map((tab: Tab) => {
        const isActive = activeSection === tab.section;
        return (
          <div
            key={tab.id}
            className={`group flex items-center gap-1.5 px-3 h-9 cursor-pointer select-none border-r border-vscode-border flex-shrink-0 transition-colors ${
              isActive
                ? "bg-vscode-bg text-vscode-text border-t-2 border-t-vscode-accent"
                : "bg-vscode-tab-inactive text-vscode-muted hover:text-vscode-text"
            }`}
            onClick={() => openTab({ id: tab.id, name: tab.name, section: tab.section })}
          >
            <span className="flex-shrink-0">
              <FileIcon name={tab.name} />
            </span>
            <span className="text-xs whitespace-nowrap">{tab.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="ml-0.5 opacity-0 group-hover:opacity-100 hover:bg-vscode-hover rounded p-0.5 transition-opacity"
            >
              <X size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
