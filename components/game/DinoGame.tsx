"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useDino } from "@/hooks/useDino";

interface Props {
  onClose: () => void;
}

export default function DinoGame({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { jump } = useDino(canvasRef);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [jump, onClose]);

  return (
    <div className="bg-vscode-bg border border-vscode-border rounded-sm overflow-hidden shadow-2xl">
      {/* Terminal-style header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-vscode-sidebar border-b border-vscode-border">
        <div className="flex items-center gap-2">
          <span className="text-vscode-accent text-xs font-mono">TERMINAL</span>
          <span className="text-vscode-muted text-xs font-mono">— dino.exe</span>
        </div>
        <button
          onClick={onClose}
          className="text-vscode-muted hover:text-vscode-text transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="block cursor-pointer"
        onClick={jump}
      />

      <div className="px-3 py-1.5 bg-vscode-sidebar border-t border-vscode-border">
        <span className="text-vscode-muted text-xs font-mono">
          SPACE / ↑ to jump &nbsp;·&nbsp; ESC to close &nbsp;·&nbsp; Try the Konami code to open this again!
        </span>
      </div>
    </div>
  );
}
