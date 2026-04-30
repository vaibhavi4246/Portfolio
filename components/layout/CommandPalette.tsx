"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileCode, Download, Gamepad2, X } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";
import type { Tab } from "@/types";

const FILE_TABS: (Tab & { icon: string })[] = [
  { id: "home", name: "Home.tsx", section: "home", icon: "⬡" },
  { id: "about", name: "About.tsx", section: "about", icon: "⬡" },
  { id: "experience", name: "Experience.tsx", section: "experience", icon: "⬡" },
  { id: "projects", name: "Projects.tsx", section: "projects", icon: "⬡" },
  { id: "skills", name: "Skills.tsx", section: "skills", icon: "⬡" },
  { id: "contact", name: "Contact.tsx", section: "contact", icon: "⬡" },
];

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const { closePalette, openTab, toggleTerminal, openDino } = useVSCode();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePalette();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closePalette]);

  const fileCommands: Command[] = FILE_TABS.map((t) => ({
    id: `open-${t.id}`,
    label: t.name,
    description: `Open ${t.name}`,
    icon: <FileCode size={14} className="text-vscode-accent" />,
    action: () => { openTab(t); closePalette(); },
  }));

  const actionCommands: Command[] = [
    {
      id: "download-resume",
      label: "Download Resume",
      description: "Download Vaibhavi's resume as PDF",
      icon: <Download size={14} className="text-vscode-comment" />,
      action: () => { window.open("/resume.pdf"); closePalette(); },
    },
    {
      id: "dino-game",
      label: "Start Dino Game 🦕",
      description: "Launch the hidden easter egg",
      icon: <Gamepad2 size={14} className="text-vscode-string" />,
      action: () => { openDino(); closePalette(); },
    },
    {
      id: "toggle-terminal",
      label: "Toggle Terminal",
      description: "Show or hide the terminal panel",
      icon: <span className="text-vscode-function text-xs font-mono">&gt;_</span>,
      action: () => { toggleTerminal(); closePalette(); },
    },
  ];

  const all = [...fileCommands, ...actionCommands];
  const filtered = query
    ? all.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : all;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm"
      onClick={closePalette}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="w-full max-w-xl bg-vscode-sidebar border border-vscode-border rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-vscode-border">
          <Search size={14} className="text-vscode-muted flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Go to file, run command..."
            className="flex-1 bg-transparent font-mono text-sm text-vscode-text placeholder:text-vscode-muted focus:outline-none"
          />
          <button onClick={closePalette} className="text-vscode-muted hover:text-vscode-text">
            <X size={13} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm font-mono text-vscode-muted">
              No commands found
            </p>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-vscode-list-active transition-colors text-left group"
              >
                <span className="flex-shrink-0">{cmd.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono text-vscode-text truncate">{cmd.label}</p>
                  <p className="text-xs font-mono text-vscode-muted truncate">{cmd.description}</p>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-vscode-border bg-vscode-bg/50">
          <span className="text-[10px] font-mono text-vscode-muted">
            Enter to confirm · Esc to close · ↑↓ to navigate
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
