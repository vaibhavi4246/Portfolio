"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Experience() {
  return (
    <div className="h-full overflow-auto select-text">
      <motion.div variants={container} initial="hidden" animate="show" className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-6">
          {"// experience.ts — professional journey"}
        </motion.p>

        <motion.h2
          variants={item}
          className="font-heading font-extrabold text-vscode-text leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Experience
        </motion.h2>

        <motion.p variants={item} className="font-mono text-sm mb-10">
          <span className="text-vscode-keyword">interface </span>
          <span className="text-vscode-type">Career </span>
          <span className="text-vscode-keyword">extends </span>
          <span className="text-vscode-type">Timeline</span>
          <span className="text-vscode-text">{" {}"}</span>
        </motion.p>

        {/* Timeline */}
        <div className="relative md:max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-vscode-border" />

          <div className="space-y-10">
            {experience.map((exp) => (
              <motion.div key={exp.id} variants={item} className="relative pl-10">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-vscode-bg"
                  style={{ backgroundColor: "#f72585" }}
                />

                {/* Period */}
                <p className="font-mono text-xs mb-1.5" style={{ color: "#f72585" }}>
                  {exp.period}
                </p>

                {/* Role + Company */}
                <h3 className="font-heading font-bold text-vscode-text text-xl leading-tight mb-0.5">
                  {exp.role}
                </h3>
                <p className="font-mono text-vscode-type text-sm mb-4">
                  @ {exp.company}
                  <span className="text-vscode-muted"> · {exp.location}</span>
                </p>

                {/* Points */}
                <div className="space-y-2 mb-4">
                  {exp.points.map((pt) => (
                    <div key={pt} className="flex gap-3">
                      <span className="text-vscode-comment font-mono text-sm flex-shrink-0 mt-0.5">+</span>
                      <p className="font-mono text-vscode-text/80 text-sm leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 font-mono text-xs border border-vscode-border text-vscode-type rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Future placeholder */}
            <motion.div variants={item} className="relative pl-10 opacity-40">
              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-dashed border-vscode-border" />
              <p className="font-mono text-vscode-muted text-sm">
                {"// next chapter loading..."}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
