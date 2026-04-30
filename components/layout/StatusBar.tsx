"use client";

import { GitBranch, AlertCircle, CheckCircle2 } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";

export default function StatusBar() {
  const { openDino } = useVSCode();

  return (
    <div className="hidden md:flex items-center justify-between h-[22px] bg-vscode-statusbar text-white text-xs px-2 flex-shrink-0 select-none">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 hover:bg-white/10 px-1 h-full transition-colors">
          <GitBranch size={12} />
          <span>main</span>
        </button>
        <button
          className="flex items-center gap-1 hover:bg-white/10 px-1 h-full transition-colors"
          onClick={openDino}
          title="Click for a surprise..."
        >
          <AlertCircle size={12} />
          <span>0 errors</span>
          <CheckCircle2 size={12} />
          <span>0 warnings</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Prettier</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
