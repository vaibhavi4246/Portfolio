"use client";

import { fileTree } from "@/data/fileTree";
import FileTreeItem from "@/components/ui/FileTreeItem";
import { X } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";

export default function Sidebar() {
  const { toggleSidebar } = useVSCode();

  return (
    <div className="flex flex-col h-full bg-vscode-sidebar overflow-y-auto">
      <div className="md:hidden flex items-center justify-between px-3 py-2 border-b border-vscode-border">
        <span className="text-xs font-semibold text-vscode-muted uppercase tracking-widest select-none">
          Explorer
        </span>
        <button
          onClick={toggleSidebar}
          aria-label="Close sidebar"
          className="text-vscode-muted hover:text-vscode-text transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <div className="px-3 py-2 text-xs font-semibold text-vscode-muted uppercase tracking-widest select-none border-b border-vscode-border">
        Explorer
      </div>
      <div className="flex-1 py-1">
        {fileTree.map((node) => (
          <FileTreeItem key={node.name} node={node} />
        ))}
      </div>
    </div>
  );
}
