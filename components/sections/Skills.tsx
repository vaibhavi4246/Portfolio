"use client";

import { motion } from "framer-motion";
import { skillLevels } from "@/data/portfolio";

const SKILL_COLORS: Record<string, string> = {
  "Python":             "#f72585",
  "C++":               "#ff6b35",
  "Java":              "#f59e0b",
  "Kotlin":            "#8b5cf6",
  "SQL":               "#06b6d4",
  "C":                 "#3b82f6",
  "Dart":              "#00b4d8",
  "JavaScript":        "#eab308",
  "PyTorch":           "#ee4b2b",
  "TensorFlow":        "#ff6d00",
  "Scikit-learn":      "#22c55e",
  "NLP / Transformers":"#a855f7",
  "RAG Pipelines":     "#06b6d4",
  "OpenCV":            "#4ade80",
  "NumPy / Pandas":    "#60a5fa",
  "MediaPipe":         "#4ade80",
  "Streamlit":         "#ff4b4b",
  "Jetpack Compose":   "#00b4d8",
  "Firebase":          "#ffa000",
  "Flask":             "#6ee7b7",
  "React.js":          "#61dafb",
  "Node.js":           "#84cc16",
  "Git / GitHub":      "#f97316",
  "MySQL":             "#f59e0b",
  "Supabase":          "#3ecf8e",
  "MongoDB":           "#22c55e",
  "Docker":            "#2496ed",
  "AWS":               "#ff9900",
  "Linux":             "#d4d4d4",
  "Figma":             "#f24e1e",
};

const CATEGORY_LABEL_COLORS: Record<string, string> = {
  "Languages":               "#4ec9b0",
  "AI / ML":                 "#4ec9b0",
  "Frameworks & Libraries":  "#4ec9b0",
  "Databases & Tools":       "#4ec9b0",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const color = SKILL_COLORS[name] ?? "#858585";
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-vscode-text text-sm">{name}</span>
        <span className="font-mono text-xs font-semibold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-[3px] bg-vscode-border/60 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.0, delay: index * 0.05, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const categories = Object.entries(skillLevels);

  return (
    <div className="h-full overflow-auto select-text">
      <motion.div variants={container} initial="hidden" animate="show" className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">

        <motion.p variants={item} className="font-mono text-vscode-comment text-sm mb-6">
          {"// skills.ts — tech stack & proficiency"}
        </motion.p>

        <motion.h2
          variants={item}
          className="font-heading font-extrabold text-vscode-text leading-none mb-3"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Skills
        </motion.h2>

        <motion.p variants={item} className="font-mono text-sm mb-10">
          <span className="text-vscode-text">{"{ "}</span>
          <span className="text-vscode-string">&quot;status&quot;</span>
          <span className="text-vscode-text">: </span>
          <span className="text-vscode-string">&quot;always_learning&quot;</span>
          <span className="text-vscode-text">{", "}</span>
          <span className="text-vscode-string">&quot;passion&quot;</span>
          <span className="text-vscode-text">: </span>
          <span className="text-vscode-string">&quot;immeasurable&quot;</span>
          <span className="text-vscode-text">{" }"}</span>
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-10">
          {categories.map(([category, skills]) => {
            const labelColor = CATEGORY_LABEL_COLORS[category] ?? "#4ec9b0";
            return (
              <motion.div key={category} variants={item}>
                {/* Category separator */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-vscode-border" />
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.18em] whitespace-nowrap"
                    style={{ color: labelColor }}
                  >
                    {category.toUpperCase()}
                  </p>
                  <div className="h-px flex-1 bg-vscode-border" />
                </div>

                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
