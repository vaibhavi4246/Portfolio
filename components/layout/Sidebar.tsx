"use client";

import { fileTree } from "@/data/fileTree";
import FileTreeItem from "@/components/ui/FileTreeItem";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-vscode-sidebar overflow-y-auto">
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
