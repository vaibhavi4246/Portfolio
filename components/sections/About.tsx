"use client";

import { motion } from "framer-motion";
import { personalInfo, education, achievements, roles, currentFocus } from "@/data/portfolio";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function About() {
  return (
    <div className="h-full overflow-auto select-text">
      <motion.div variants={container} initial="hidden" animate="show" className="px-10 py-10">

        {/* Comment header */}
        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-6">
          {"<!-- about.tsx - Vaibhavi Jain -->"}
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={item}
          className="font-heading font-extrabold text-vscode-text leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          About Me
        </motion.h2>

        <motion.p variants={item} className="font-mono text-vscode-muted text-sm mb-8">
          {"// who I am · what I build · where I'm headed"}
        </motion.p>

        {/* Bio card */}
        <motion.div
          variants={item}
          className="border border-vscode-border bg-vscode-sidebar rounded-sm p-6 mb-8"
        >
          <p className="font-mono text-vscode-text text-sm leading-relaxed">
            Hi! I&apos;m{" "}
            <span className="text-vscode-function font-semibold">{personalInfo.name}</span>, a passionate{" "}
            <span className="text-vscode-keyword">AI/ML developer</span> and{" "}
            <span className="text-vscode-type">Android engineer</span> at{" "}
            <span className="text-vscode-string">Thapar Institute of Engineering and Technology</span>.{" "}
            I blend creativity and code to build apps that solve real-world problems.
            Currently exploring{" "}
            <span className="text-vscode-comment">advanced GenAI techniques</span>,{" "}
            <span className="text-vscode-variable">LLM fine-tuning</span>, and{" "}
            <span className="text-vscode-type">modern Android architectures</span>.
          </p>
        </motion.div>

        {/* Two column: Current Focus + Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Current Focus */}
          <motion.div variants={item}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vscode-type mb-4">
              Current Focus
            </p>
            <div className="space-y-2">
              {currentFocus.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 px-4 py-3 bg-vscode-sidebar border border-vscode-border rounded-sm hover:border-vscode-accent/40 transition-colors"
                >
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <span className="font-mono text-xs text-vscode-text leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={item}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vscode-type mb-4">
              Achievements
            </p>
            <div className="space-y-2">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="flex gap-3 px-4 py-3 border border-vscode-border bg-vscode-sidebar rounded-sm hover:border-vscode-comment/50 transition-colors"
                >
                  <span className="text-vscode-comment font-mono text-sm flex-shrink-0">✦</span>
                  <div>
                    <p className="font-mono text-vscode-function text-sm font-semibold leading-snug">{a.title}</p>
                    <p className="font-mono text-vscode-muted text-xs mt-0.5">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Education */}
        <motion.div variants={item} className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vscode-type mb-4">
            Education
          </p>
          <div className="space-y-3">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="border border-vscode-border bg-vscode-sidebar rounded-sm p-5 hover:border-vscode-accent/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-heading font-bold text-vscode-text text-base leading-tight mb-1">
                      {edu.institution}
                    </p>
                    <p className="font-mono text-vscode-type text-sm">{edu.degree}</p>
                    <p className="font-mono text-vscode-muted text-xs mt-0.5">{edu.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-vscode-accent text-base font-bold">{edu.score}</p>
                    <p className="font-mono text-vscode-muted text-[10px]">{edu.scoreLabel}</p>
                    <p className="font-mono text-vscode-muted text-[10px] mt-1">{edu.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Extracurricular */}
        <motion.div variants={item}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-vscode-type mb-4">
            Extracurricular
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roles.map((r) => (
              <div
                key={r.title}
                className="border border-vscode-border bg-vscode-sidebar rounded-sm p-4 hover:border-vscode-accent/40 transition-colors"
              >
                <p className="font-heading font-bold text-vscode-text text-sm mb-0.5">{r.title}</p>
                <p className="font-mono text-vscode-type text-xs">{r.org}</p>
                <p className="font-mono text-vscode-muted text-xs mt-0.5">{r.period}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
