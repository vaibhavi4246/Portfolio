"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function SourceControlPopover({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Click-outside overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, x: -8, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -8, scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className="fixed left-12 z-50 w-72 rounded-sm border border-vscode-border shadow-2xl"
        style={{
          top: "calc(8px + 32px + 48px + 48px)",
          backgroundColor: "var(--color-vscode-sidebar)",
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-vscode-border">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-vscode-muted font-semibold">
            Source Control
          </p>
        </div>

        {/* Branch row */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-vscode-border">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="6" r="2.5" stroke="#4ec9b0" strokeWidth="1.5" fill="none" />
              <circle cx="6" cy="18" r="2.5" stroke="#4ec9b0" strokeWidth="1.5" fill="none" />
              <circle cx="18" cy="6" r="2.5" stroke="#4ec9b0" strokeWidth="1.5" fill="none" />
              <path d="M6 8.5V15.5" stroke="#4ec9b0" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8.5 6H15.5" stroke="#4ec9b0" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8.5 18L15.5 8.5" stroke="#4ec9b0" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-sm font-semibold text-vscode-type">main</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-vscode-muted">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            1 commit ahead
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-vscode-border border-b border-vscode-border">
          <div className="flex flex-col items-center py-4">
            <span className="font-mono text-xl font-bold" style={{ color: "#f72585" }}>3</span>
            <span className="font-mono text-[10px] text-vscode-muted uppercase tracking-wider mt-0.5">Modified</span>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="font-mono text-xl font-bold" style={{ color: "#22c55e" }}>2</span>
            <span className="font-mono text-[10px] text-vscode-muted uppercase tracking-wider mt-0.5">Added</span>
          </div>
          <div className="flex flex-col items-center py-4">
            <span className="font-mono text-xl font-bold text-vscode-muted">0</span>
            <span className="font-mono text-[10px] text-vscode-muted uppercase tracking-wider mt-0.5">Deleted</span>
          </div>
        </div>

        {/* View on GitHub */}
        <div className="px-4 py-3">
          <a
            href="https://github.com/vaibhavi4246"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs hover:text-vscode-accent transition-colors"
            style={{ color: "#4ec9b0" }}
          >
            View on GitHub <ExternalLink size={11} />
          </a>
        </div>
      </motion.div>
    </>
  );
}
