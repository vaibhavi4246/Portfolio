"use client";

import { Home, User, Briefcase, Folder, Star, Mail, Settings } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";
import type { Tab } from "@/types";

const NAV_TABS: Array<Tab & { icon: React.ReactNode }> = [
  { id: "home", name: "home.tsx", section: "home", icon: <Home size={14} /> },
  { id: "about", name: "about.tsx", section: "about", icon: <User size={14} /> },
  { id: "experience", name: "experience.tsx", section: "experience", icon: <Briefcase size={14} /> },
  { id: "projects", name: "projects.tsx", section: "projects", icon: <Folder size={14} /> },
  { id: "skills", name: "skills.tsx", section: "skills", icon: <Star size={14} /> },
  { id: "contact", name: "contact.tsx", section: "contact", icon: <Mail size={14} /> },
];

export default function MobileNav() {
  const { activeSection, openTab, openSettings, isSettingsOpen } = useVSCode();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden border-t border-vscode-border"
      style={{ backgroundColor: "var(--color-vscode-sidebar)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center gap-1 px-2 py-1.5">
        <div className="flex items-center gap-1 overflow-x-auto flex-1">
          {NAV_TABS.map((tab) => {
            const active = activeSection === tab.section;
            return (
              <button
                key={tab.id}
                onClick={() => openTab(tab)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-sm text-[10px] font-mono whitespace-nowrap transition-colors ${
                  active ? "text-vscode-accent" : "text-vscode-muted hover:text-vscode-text"
                }`}
                aria-label={`Go to ${tab.section}`}
              >
                <span className="flex items-center justify-center">{tab.icon}</span>
                <span>{tab.section}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={openSettings}
          className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-sm text-[10px] font-mono transition-colors flex-shrink-0 ${
            isSettingsOpen ? "text-vscode-accent" : "text-vscode-muted hover:text-vscode-text"
          }`}
          aria-label="Open settings"
        >
          <span className="flex items-center justify-center"><Settings size={14} /></span>
          <span>settings</span>
        </button>
      </div>
    </div>
  );
}
