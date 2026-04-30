"use client";

import { GitFork, ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-vscode-border bg-vscode-sidebar rounded-sm p-4 hover:border-vscode-accent/50 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-vscode-function font-mono font-semibold text-sm">
          {project.name}
        </h3>
        <span className="text-vscode-muted font-mono text-xs flex-shrink-0">{project.date}</span>
      </div>

      <p className="text-vscode-text text-xs leading-relaxed mb-3 font-mono">
        <span className="text-vscode-comment">{"// "}</span>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-1.5 py-0.5 text-xs font-mono bg-vscode-bg border border-vscode-border text-vscode-type rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-vscode-muted hover:text-vscode-accent text-xs font-mono transition-colors"
          >
            <GitFork size={12} />
            <span>source</span>
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-vscode-muted hover:text-vscode-accent text-xs font-mono transition-colors"
          >
            <ExternalLink size={12} />
            <span>live</span>
          </a>
        )}
      </div>
    </div>
  );
}
