"use client";

import { GitFork, Link, Code2, Mail, AtSign, Download } from "lucide-react";
import { motion } from "framer-motion";
import TypewriterText from "@/components/ui/TypewriterText";
import { useVSCode } from "@/hooks/useVSCode";
import { personalInfo } from "@/data/portfolio";
import type { Tab } from "@/types";

const ROLES = [
  { label: "AI/ML Developer", color: "#f72585" },
  { label: "Android Engineer", color: "#4ec9b0" },
  { label: "Competitive Coder", color: "#dcdcaa" },
  { label: "Thapar '27", color: "#ce9178" },
];

const SOCIALS = [
  { icon: <GitFork size={13} />, label: "GitHub", href: personalInfo.socials.github },
  { icon: <Link size={13} />, label: "LinkedIn", href: personalInfo.socials.linkedin },
  { icon: <Code2 size={13} />, label: "LeetCode", href: personalInfo.socials.leetcode },
  { icon: <AtSign size={13} />, label: "Instagram", href: personalInfo.socials.instagram },
  { icon: <Mail size={13} />, label: "Email", href: `mailto:${personalInfo.email}` },
];

const NAV: Tab[] = [
  { id: "projects", name: "projects.js", section: "projects" },
  { id: "about", name: "about.html", section: "about" },
  { id: "contact", name: "contact.css", section: "contact" },
];

const STATS = [
  { value: "8.58", label: "CGPA" },
  { value: "200+", label: "LEETCODE" },
  { value: "5+", label: "PROJECTS" },
  { value: "∞", label: "CURIOSITY" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Home() {
  const { openTab } = useVSCode();

  return (
    <div className="h-full overflow-auto select-text">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10"
      >
        {/* Comment header */}
        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-6">
          {"// hello world !! Welcome to my portfolio"}
        </motion.p>

        {/* ── HERO NAME ── */}
        <motion.div variants={item} className="mb-6">
          <h1
            className="font-display leading-[0.88] tracking-wide"
            style={{ fontSize: "clamp(5rem, 12vw, 9.5rem)" }}
          >
            <span className="text-vscode-text block">VAIBHAVI</span>
            <span className="block" style={{ color: "#f72585", letterSpacing: "0.05em" }}>
              JAIN
            </span>
          </h1>
        </motion.div>

        {/* Role chips */}
        <motion.div variants={item} className="flex flex-wrap gap-2 mb-5">
          {ROLES.map(({ label, color }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 px-3 py-1 border text-xs font-mono rounded-full"
              style={{ borderColor: `${color}50`, color, backgroundColor: `${color}0f` }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Typewriter tagline */}
        <motion.p variants={item} className="font-mono text-vscode-muted text-sm mb-4 h-5">
          <TypewriterText text={`"${personalInfo.tagline}"`} speed={38} />
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={item}
          className="font-mono text-vscode-text/80 text-sm leading-relaxed mb-8 max-w-2xl"
        >
          I live at the crossroads of{" "}
          <span className="text-vscode-keyword font-semibold">AI/ML</span>,{" "}
          <span className="text-vscode-type font-semibold">Android development</span>, and{" "}
          <span className="text-vscode-function font-semibold">data science</span>.{" "}
          I build systems that are genuinely{" "}
          <span className="text-vscode-comment font-semibold">intelligent</span> and{" "}
          <span className="text-vscode-string font-semibold">impactful</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-3 mb-10">
          {NAV.map((tab) => (
            <button
              key={tab.id}
              onClick={() => openTab(tab)}
              className={`w-full sm:w-auto px-6 py-2.5 text-sm font-mono rounded-sm transition-colors ${
                tab.id === "projects"
                  ? "text-white"
                  : "border border-vscode-border text-vscode-text hover:border-vscode-accent hover:text-vscode-accent"
              }`}
              style={tab.id === "projects" ? { backgroundColor: "#0e639c" } : undefined}
            >
              {tab.id === "projects" && (
                <span className="mr-1.5">🗂</span>
              )}
              {tab.id === "projects" ? "Projects" : tab.id === "about" ? "About Me" : "Contact"}
            </button>
          ))}
          <a
            href="/resume.pdf"
            download="Vaibhavi_Jain_Resume.pdf"
            className="w-full sm:w-auto flex items-center gap-2 px-6 py-2.5 border border-vscode-border text-vscode-muted hover:border-vscode-accent hover:text-vscode-accent text-sm font-mono rounded-sm transition-colors"
          >
            <Download size={13} /> Resume
          </a>
        </motion.div>

        {/* Stats — full-width bordered box */}
        <motion.div
          variants={item}
          className="border border-vscode-border rounded-sm mb-8"
          style={{ backgroundColor: "var(--color-vscode-sidebar)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y divide-vscode-border sm:divide-y-0 sm:divide-x">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-5 sm:py-6 px-4">
                <span
                  className="font-display leading-none mb-1 text-vscode-text"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {value}
                </span>
                <span className="font-mono text-[10px] text-vscode-muted uppercase tracking-widest text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex flex-wrap gap-2">
          {SOCIALS.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-vscode-border text-vscode-muted hover:text-vscode-accent hover:border-vscode-accent text-xs font-mono rounded-sm transition-colors"
            >
              {icon} {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
