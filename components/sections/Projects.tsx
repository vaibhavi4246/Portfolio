"use client";

import { GitFork, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

interface ProjectMeta {
  emoji: string;
  tags: string[];
  borderColor: string;
  tagColor: string;
}

const PROJECT_META: Record<string, ProjectMeta> = {
  fixmycity: {
    emoji: "🏙️",
    tags: ["AI", "CIVIC TECH", "GEMINI"],
    borderColor: "#3b82f6",
    tagColor: "#3b82f6",
  },
  scholarflow: {
    emoji: "🎓",
    tags: ["AI", "MULTI-AGENT", "NLP"],
    borderColor: "#f72585",
    tagColor: "#f72585",
  },
  "ai-mcp-travel": {
    emoji: "🗺️",
    tags: ["AI", "LLM", "TRAVEL TECH"],
    borderColor: "#f59e0b",
    tagColor: "#f59e0b",
  },
  "sentiment-analysis": {
    emoji: "🧠",
    tags: ["ML", "NLP", "TRANSFORMERS"],
    borderColor: "#a855f7",
    tagColor: "#a855f7",
  },
  "hand-tracking": {
    emoji: "👋",
    tags: ["CV", "REAL-TIME", "GESTURE"],
    borderColor: "#22c55e",
    tagColor: "#22c55e",
  },
  topsis: {
    emoji: "📊",
    tags: ["ALGORITHM", "CLI", "PYPI"],
    borderColor: "#06b6d4",
    tagColor: "#06b6d4",
  },
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="h-full overflow-auto select-text">
      <motion.div variants={container} initial="hidden" animate="show" className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-6">
          {"// projects/index.ts — things I've built"}
        </motion.p>

        <motion.h2
          variants={item}
          className="font-heading font-extrabold text-vscode-text leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Projects
        </motion.h2>

        <motion.p variants={item} className="font-mono text-sm mb-10">
          <span className="text-vscode-keyword">const </span>
          <span className="text-vscode-variable">projects</span>
          <span className="text-vscode-text"> = [ </span>
          <span className="text-vscode-string">...shipped</span>
          <span className="text-vscode-text">, </span>
          <span className="text-vscode-string">...building</span>
          <span className="text-vscode-text"> ]</span>
        </motion.p>

        {/* Featured projects — 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {featured.map((p) => {
            const meta = PROJECT_META[p.id] ?? { emoji: "⚡", tags: [], borderColor: "#007acc", tagColor: "#007acc" };
            return (
              <motion.div
                key={p.id}
                variants={item}
                className="border border-vscode-border bg-vscode-sidebar rounded-sm p-4 sm:p-6 flex flex-col hover:border-vscode-accent/50 transition-colors duration-200"
                style={{ borderTopWidth: "2px", borderTopColor: meta.borderColor }}
              >
                {/* Card header: emoji + tags + link */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <span className="text-2xl mb-2 block">{meta.emoji}</span>
                    <p
                      className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold"
                      style={{ color: meta.tagColor }}
                    >
                      {meta.tags.join(" · ")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-shrink-0 mt-1">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-0.5 border border-vscode-border text-vscode-muted hover:text-vscode-accent text-[11px] font-mono rounded-sm transition-colors"
                      >
                        Live <ExternalLink size={10} />
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 py-0.5 border border-vscode-border text-vscode-muted hover:text-vscode-accent text-[11px] font-mono rounded-sm transition-colors"
                      >
                        GitHub <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project name */}
                <h3
                  className="font-heading font-bold text-vscode-text mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
                >
                  {p.name}
                </h3>

                {/* Description */}
                <p className="font-mono text-vscode-text/65 text-xs leading-relaxed flex-1 mb-4">
                  {p.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono border border-vscode-border text-vscode-muted rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other projects */}
        {rest.length > 0 && (
          <>
            <motion.p variants={item} className="font-mono text-vscode-comment text-xs mb-4">
              {"// other projects"}
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rest.map((p) => {
                const meta = PROJECT_META[p.id] ?? { emoji: "⚡", tags: [], borderColor: "#007acc", tagColor: "#007acc" };
                return (
                  <motion.div
                    key={p.id}
                    variants={item}
                    className="border border-vscode-border bg-vscode-sidebar rounded-sm p-4 hover:border-vscode-accent/40 transition-colors"
                    style={{ borderTopWidth: "2px", borderTopColor: meta.borderColor }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xl mb-1 block">{meta.emoji}</span>
                        <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: meta.tagColor }}>
                          {meta.tags.join(" · ")}
                        </p>
                      </div>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-vscode-muted hover:text-vscode-accent transition-colors mt-1"
                        >
                          <GitFork size={14} />
                        </a>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-vscode-text text-base mb-2">{p.name}</h3>
                    <p className="font-mono text-vscode-text/60 text-xs leading-relaxed mb-3 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 text-[10px] font-mono border border-vscode-border text-vscode-muted rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* GitHub link */}
        <motion.div variants={item} className="mt-8">
          <a
            href="https://github.com/vaibhavi4246"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-vscode-muted hover:text-vscode-accent transition-colors"
          >
            <GitFork size={14} />
            View all repositories on GitHub →
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
