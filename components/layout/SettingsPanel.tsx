"use client";

import { Check, X, Download, Maximize, Terminal, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES } from "@/data/themes";
import { useVSCode } from "@/hooks/useVSCode";

const SHORTCUTS = [
  { keys: ["Ctrl", "P"], desc: "Command palette" },
  { keys: ["Ctrl", "`"], desc: "Toggle terminal" },
  { keys: ["Ctrl", "B"], desc: "Toggle sidebar" },
  { keys: ["Esc"], desc: "Close overlay" },
  { keys: ["↑↑↓↓←→←→BA"], desc: "Dino game 🦕" },
];

export default function SettingsPanel() {
  const {
    themeId,
    setTheme,
    closeSettings,
    toggleSidebar,
    toggleTerminal,
    openPalette,
    openDino,
  } = useVSCode();

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 md:absolute md:left-12 md:top-0 md:bottom-0 md:w-72 bg-vscode-sidebar md:border-r border-vscode-border z-50 flex flex-col overflow-y-auto shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-vscode-border flex-shrink-0">
        <span className="text-[11px] font-mono uppercase tracking-widest text-vscode-muted">
          Settings
        </span>
        <button
          onClick={closeSettings}
          className="text-vscode-muted hover:text-vscode-text transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* COLOR THEME */}
      <div className="px-4 py-3 border-b border-vscode-border">
        <p className="text-[10px] font-mono uppercase tracking-widest text-vscode-muted mb-3">
          Color Theme
        </p>
        <div className="space-y-0.5">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="flex items-center gap-3 w-full py-2 px-2 rounded-sm hover:bg-vscode-hover transition-colors group"
            >
              <span
                className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-white/10"
                style={{ background: t.swatch }}
              />
              <span className="text-sm font-mono text-vscode-text flex-1 text-left">
                {t.emoji} {t.label}
              </span>
              {themeId === t.id && (
                <Check size={12} className="text-vscode-accent flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-4 py-3 border-b border-vscode-border">
        <p className="text-[10px] font-mono uppercase tracking-widest text-vscode-muted mb-3">
          Quick Actions
        </p>
        <div className="space-y-0.5">
          <ActionBtn
            icon={<Command size={13} />}
            label="Command Palette"
            shortcut="Ctrl P"
            onClick={() => { closeSettings(); openPalette(); }}
          />
          <ActionBtn
            icon={<Terminal size={13} />}
            label="Toggle Terminal"
            shortcut="Ctrl `"
            onClick={() => { closeSettings(); toggleTerminal(); }}
          />
          <a
            href="/resume.pdf"
            download="Vaibhavi_Jain_Resume.pdf"
            className="flex items-center gap-3 w-full py-2 px-2 rounded-sm hover:bg-vscode-hover transition-colors text-vscode-text"
          >
            <Download size={13} className="text-vscode-muted" />
            <span className="text-sm font-mono flex-1">Download Resume</span>
          </a>
          <ActionBtn
            icon={<Maximize size={13} />}
            label="Toggle Fullscreen"
            shortcut="F11"
            onClick={() => {
              if (!document.fullscreenElement) document.documentElement.requestFullscreen();
              else document.exitFullscreen();
            }}
          />
        </div>
      </div>

      {/* KEYBOARD SHORTCUTS */}
      <div className="px-4 py-3 border-b border-vscode-border">
        <p className="text-[10px] font-mono uppercase tracking-widest text-vscode-muted mb-3">
          Keyboard Shortcuts
        </p>
        <div className="space-y-2">
          {SHORTCUTS.map(({ keys, desc }) => (
            <div key={desc} className="flex items-center gap-2">
              <div className="flex gap-1">
                {keys.map((k) => (
                  <kbd
                    key={k}
                    className="px-1.5 py-0.5 text-[10px] font-mono bg-vscode-bg border border-vscode-border rounded-sm text-vscode-muted"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
              <span className="text-xs font-mono text-vscode-muted">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-4 py-4">
        <p className="text-[10px] font-mono text-vscode-muted leading-relaxed">
          Portfolio v1.0 · Next.js + TypeScript + Tailwind
          <br />
          Made with ❤️ by Vaibhavi Jain
        </p>
      </div>
    </motion.div>
  );
}

function ActionBtn({
  icon,
  label,
  shortcut,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full py-2 px-2 rounded-sm hover:bg-vscode-hover transition-colors"
    >
      <span className="text-vscode-muted">{icon}</span>
      <span className="text-sm font-mono text-vscode-text flex-1 text-left">{label}</span>
      {shortcut && (
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-vscode-bg border border-vscode-border rounded-sm text-vscode-muted">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}
