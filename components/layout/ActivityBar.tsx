"use client";

import { useVSCode } from "@/hooks/useVSCode";

/* ── Inline SVG icons matching VS Code's activity bar ── */
function IconExplorer({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6C3 4.895 3.895 4 5 4H10L12 6H19C20.105 6 21 6.895 21 8V18C21 19.105 20.105 20 19 20H5C3.895 20 3 19.105 3 18V6Z"
        stroke="currentColor"
        strokeWidth={active ? 1.8 : 1.5}
        fill="none"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSourceControl() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M6 8.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 6H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 18L15.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconExtensions() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M13 17H21M17 13V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCopilot() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M19 17L19.8 20L22 20.8L19.8 21.6L19 24L18.2 21.6L16 20.8L18.2 20L19 17Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

export default function ActivityBar() {
  const {
    activePanel, setActivePanel,
    isSettingsOpen, openSettings, closeSettings,
    openPalette,
    isSourceControlOpen, toggleSourceControl,
    isCopilotOpen, toggleCopilot,
  } = useVSCode();

  const btn = (
    label: string,
    icon: React.ReactNode,
    onClick: () => void,
    isActive = false,
  ) => (
    <button
      title={label}
      onClick={onClick}
      className={`relative flex items-center justify-center w-12 h-12 transition-colors ${
        isActive
          ? "text-vscode-text after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[2px] after:bg-vscode-accent"
          : "text-vscode-muted hover:text-vscode-text"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div className="hidden md:flex flex-col items-center w-12 bg-vscode-activitybar flex-shrink-0 border-r border-vscode-border">
      {/* Top group */}
      {btn("Explorer (Ctrl+B)", <IconExplorer active={activePanel === "explorer"} />, () => setActivePanel("explorer"), activePanel === "explorer")}
      {btn("Search", <IconSearch />, openPalette)}
      {btn("Source Control", <IconSourceControl />, toggleSourceControl, isSourceControlOpen)}
      {btn("Extensions", <IconExtensions />, () => {})}
      {btn("Copilot", <IconCopilot />, toggleCopilot, isCopilotOpen)}

      <div className="flex-1" />

      {/* Bottom group */}
      <a
        href="https://github.com/vaibhavi4246"
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        className="flex items-center justify-center w-12 h-12 text-vscode-muted hover:text-vscode-text transition-colors"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      </a>

      <button
        title="Settings"
        onClick={isSettingsOpen ? closeSettings : openSettings}
        className={`flex items-center justify-center w-12 h-12 transition-colors mb-1 ${
          isSettingsOpen ? "text-vscode-accent" : "text-vscode-muted hover:text-vscode-text"
        }`}
      >
        <IconSettings />
      </button>
    </div>
  );
}
