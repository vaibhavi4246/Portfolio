"use client";

import { useVSCode } from "@/hooks/useVSCode";

export default function TitleBar() {
  const { openPalette } = useVSCode();

  return (
    <div
      className="flex items-center h-8 flex-shrink-0 select-none border-b border-vscode-border"
      style={{ backgroundColor: "var(--color-vscode-activitybar)" }}
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5 px-3 flex-shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57] flex-shrink-0 cursor-default" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e] flex-shrink-0 cursor-default" />
        <span className="w-3 h-3 rounded-full bg-[#28c840] flex-shrink-0 cursor-default" />
      </div>

      {/* Spacer left */}
      <div className="flex-1" />

      {/* Center: command palette button */}
      <button
        onClick={openPalette}
        className="flex items-center gap-2 px-3 py-0.5 rounded text-vscode-muted hover:text-vscode-text transition-colors text-xs font-mono"
        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        <span className="flex items-center gap-1">
          {/* VS Code dot icon */}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" fill="#f72585" />
            <circle cx="8" cy="8" r="6" stroke="#f72585" strokeWidth="1.5" fill="none" opacity="0.4" />
          </svg>
          <span className="text-vscode-text font-semibold">vaibhavi-jain</span>
        </span>
        <span className="text-vscode-muted">:</span>
        <span className="text-vscode-muted">portfolio</span>
        <span
          className="ml-1 px-1.5 py-0.5 text-[10px] font-mono rounded"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "var(--color-vscode-muted)" }}
        >
          Ctrl
        </span>
        <span
          className="px-1.5 py-0.5 text-[10px] font-mono rounded"
          style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "var(--color-vscode-muted)" }}
        >
          P
        </span>
      </button>

      {/* Spacer right */}
      <div className="flex-1" />

      {/* Right: empty filler to balance traffic lights */}
      <div className="w-20 flex-shrink-0" />
    </div>
  );
}
