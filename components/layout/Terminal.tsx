"use client";

import { useState, useEffect, useRef } from "react";
import { X, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVSCode } from "@/hooks/useVSCode";

const BOOT_LINES = [
  { delay: 0, text: "vaibhavi@portfolio:~$ whoami", type: "cmd" },
  { delay: 300, text: "Vaibhavi Jain — AI/ML Developer & App Engineer", type: "out" },
  { delay: 600, text: "vaibhavi@portfolio:~$ cat skills.txt", type: "cmd" },
  { delay: 900, text: "Languages: Python, C++, Java, Kotlin, SQL, C", type: "out" },
  { delay: 1000, text: "AI/ML: PyTorch, TensorFlow, RAG, NLP/Transformers, MediaPipe", type: "out" },
  { delay: 1100, text: "Tools: Git, Docker, AWS, Linux, Figma", type: "out" },
  { delay: 1400, text: "vaibhavi@portfolio:~$ git log --oneline", type: "cmd" },
  { delay: 1700, text: "a1b2c3f feat: won Agentic AI Hackathon 🏆", type: "out" },
  { delay: 1800, text: "d4e5f6a feat: built ScholarFlow — 91.4% accuracy", type: "out" },
  { delay: 1900, text: "7g8h9i0 feat: built AI MCP Travel Planner", type: "out" },
  { delay: 2000, text: "b1c2d3e feat: published TOPSIS package to PyPI", type: "out" },
  { delay: 2300, text: "vaibhavi@portfolio:~$ echo $CGPA", type: "cmd" },
  { delay: 2600, text: "8.58 / 10.0  (Thapar Institute — B.Tech CSE 2023–2027)", type: "out" },
  { delay: 2900, text: "vaibhavi@portfolio:~$ _", type: "prompt" },
];

export default function Terminal() {
  const { isTerminalOpen, toggleTerminal } = useVSCode();
  const [visibleCount, setVisibleCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState<{ text: string; type: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isTerminalOpen) return;
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount, history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = userInput.trim().toLowerCase();
    const newHistory = [...history, { text: `vaibhavi@portfolio:~$ ${userInput}`, type: "cmd" }];

    if (cmd === "help") {
      newHistory.push({ text: "clear | whoami | contact | projects | skills | easter-egg", type: "out" });
    } else if (cmd === "clear") {
      setHistory([]);
      setUserInput("");
      return;
    } else if (cmd === "contact") {
      newHistory.push({ text: "📧 vjain_be23@thapar.edu", type: "out" });
      newHistory.push({ text: "🔗 linkedin.com/in/vaibhavi-jain-8a674429b", type: "out" });
      newHistory.push({ text: "💻 github.com/vaibhavi4246", type: "out" });
    } else if (cmd === "easter-egg") {
      newHistory.push({ text: "Try: ↑↑↓↓←→←→BA on any page 😉", type: "out" });
    } else if (cmd) {
      newHistory.push({ text: `zsh: command not found: ${cmd} (try 'help')`, type: "err" });
    }

    setHistory(newHistory);
    setUserInput("");
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 220, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 border-t border-vscode-border overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-3 py-1 bg-vscode-sidebar border-b border-vscode-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-vscode-muted uppercase tracking-wider">Terminal</span>
              <span className="text-xs font-mono text-vscode-muted">— zsh</span>
            </div>
            <div className="flex gap-1">
              <button onClick={toggleTerminal} className="text-vscode-muted hover:text-vscode-text p-0.5">
                <Minus size={12} />
              </button>
              <button onClick={toggleTerminal} className="text-vscode-muted hover:text-vscode-error p-0.5">
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Terminal body */}
          <div
            className="h-full overflow-y-auto bg-vscode-bg px-4 py-2 font-mono text-xs"
            style={{ height: "calc(220px - 32px)" }}
            onClick={() => inputRef.current?.focus()}
          >
            {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "cmd"
                    ? "text-vscode-comment"
                    : line.type === "prompt"
                    ? "text-vscode-comment"
                    : "text-vscode-text pl-2"
                }
              >
                {line.text}
                {line.type === "prompt" && visibleCount >= BOOT_LINES.length && (
                  <span className="cursor-blink text-vscode-accent">▌</span>
                )}
              </div>
            ))}

            {history.map((line, i) => (
              <div
                key={`h-${i}`}
                className={
                  line.type === "cmd"
                    ? "text-vscode-comment mt-1"
                    : line.type === "err"
                    ? "text-vscode-error pl-2"
                    : "text-vscode-text pl-2"
                }
              >
                {line.text}
              </div>
            ))}

            {visibleCount >= BOOT_LINES.length && (
              <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
                <span className="text-vscode-comment">vaibhavi@portfolio:~$</span>
                <input
                  ref={inputRef}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-transparent text-vscode-text focus:outline-none ml-1"
                  autoFocus
                  spellCheck={false}
                />
              </form>
            )}
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
