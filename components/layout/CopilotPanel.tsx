"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useVSCode } from "@/hooks/useVSCode";

interface Message {
  role: "user" | "assistant";
  text: string;
}

/* ── Hardcoded Q&A knowledge base ── */
const QA: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["about", "who", "vaibhavi", "yourself", "introduce"],
    answer:
      "Hi! Vaibhavi Jain is a B.Tech Computer Engineering student at Thapar Institute of Engineering & Technology (2023–2027), maintaining a CGPA of 8.58. She's an AI/ML developer and Android engineer who loves building intelligent, impactful systems. She's currently interning at Humble Coders as an App Developer and actively exploring GenAI, LLM fine-tuning, and modern Android architectures.",
  },
  {
    keywords: ["project", "built", "build", "scholarflow", "topsis", "travel", "sentiment", "hand"],
    answer:
      "Vaibhavi has built 5+ projects:\n\n🎓 ScholarFlow — Agentic research summarization with multi-agent NLP pipelines (LED + SciBERT), 95% entity accuracy.\n\n🗺️ AI MCP Travel Planner — Free AI trip planner using Groq Llama 3.3 70B with real-time weather & Airbnb data.\n\n🧠 Sentiment Analysis — DistilBERT classifier fine-tuned on 4.7M tweets, 91.4% accuracy.\n\n👋 Hand Tracking Bridge — Real-time dual-hand detection at 30 FPS via MediaPipe + TouchDesigner.\n\n📊 TOPSIS — Published Python package on PyPI for multi-criteria decision analysis.",
  },
  {
    keywords: ["experience", "work", "intern", "job", "humble", "coders"],
    answer:
      "Vaibhavi is currently an App Developer Intern at Humble Coders (Jul 2025 – Sep 2025) in Patiala. She's building production-grade Android applications using Kotlin, Jetpack Compose, Firebase Authentication, and MVVM architecture — delivering scalable features for real-world clients.",
  },
  {
    keywords: ["tech", "stack", "skill", "language", "framework", "tool", "python", "kotlin", "pytorch"],
    answer:
      "Vaibhavi's tech stack spans:\n\n💻 Languages: Python, C++, Java, Kotlin, SQL, JavaScript\n\n🤖 AI/ML: PyTorch, TensorFlow, Scikit-learn, NLP/Transformers, RAG Pipelines, OpenCV, MediaPipe\n\n📱 Frameworks: Jetpack Compose, Flask, React.js, Streamlit, Firebase\n\n🛠️ Tools: Git, Docker, AWS, MySQL, Supabase, MongoDB, Linux, Figma",
  },
  {
    keywords: ["contact", "reach", "email", "linkedin", "hire", "collaborate", "connect"],
    answer:
      "You can reach Vaibhavi through:\n\n📧 Email: vjain_be23@thapar.edu\n🔗 LinkedIn: linkedin.com/in/vaibhavi-jain-8a674429b\n💻 GitHub: github.com/vaibhavi4246\n⚡ LeetCode: leetcode.com/vaibhavijain\n📸 Instagram: @vaibhavi4246\n\nShe's open to internships, collaborations, and good conversations!",
  },
  {
    keywords: ["achievement", "award", "hackathon", "leetcode", "badge", "win"],
    answer:
      "Vaibhavi's achievements include:\n\n🏆 Winner — Agentic AI Hackathon (Apr 2026): Built an innovative AI-agent using n8n automations.\n\n💡 200+ LeetCode Problems: Covering dynamic programming, graphs, and greedy algorithms.\n\n⭐ Pull Shark & Quickdraw GitHub Badges: Earned for consistent open-source contributions and fast PR merges.",
  },
  {
    keywords: ["education", "college", "thapar", "school", "cgpa", "grade", "study"],
    answer:
      "Vaibhavi is pursuing B.Tech in Computer Engineering at Thapar Institute of Engineering & Technology, Patiala (2023–2027) with a CGPA of 8.58/10.\n\nBefore that, she completed her 12th from St. Patrick's Junior College, Agra with 95.25% in the Science stream (ISC Board, 2023).",
  },
  {
    keywords: ["focus", "current", "working on", "learning", "now", "these days"],
    answer:
      "Right now Vaibhavi is focused on:\n\n🤖 Building Android apps with Kotlin & Jetpack Compose\n🧠 Advanced GenAI techniques & LLM fine-tuning\n👁️ Computer vision & real-time ML applications\n🚀 Full-stack AI-powered platforms",
  },
];

const QUICK_QUESTIONS = [
  "Tell me about Vaibhavi",
  "What projects has she built?",
  "Tell me about her work experience",
  "What's her tech stack?",
  "How can I contact Vaibhavi?",
  "What are her achievements?",
];

function getAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, answer } of QA) {
    if (keywords.some((k) => lower.includes(k))) return answer;
  }
  return "I'm Vaibhavi's Copilot and can answer questions about her projects, skills, experience, and more. Try asking something like 'Tell me about Vaibhavi' or 'What projects has she built?'";
}

export default function CopilotPanel() {
  const { toggleCopilot } = useVSCode();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const answer = getAnswer(text);
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const showWelcome = messages.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="w-80 flex-shrink-0 flex flex-col border-l border-vscode-border h-full"
      style={{ backgroundColor: "var(--color-vscode-sidebar)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-vscode-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">✨</span>
          <span className="font-mono text-sm font-semibold text-vscode-text">Vaibhavi&apos;s Copilot</span>
        </div>
        <button
          onClick={toggleCopilot}
          className="text-vscode-muted hover:text-vscode-text transition-colors p-0.5 rounded"
        >
          <X size={14} />
        </button>
      </div>

      {/* Workspace pill */}
      <div className="px-4 py-2 border-b border-vscode-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-vscode-muted">Workspace</span>
          <span
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[11px]"
            style={{ backgroundColor: "rgba(247,37,133,0.12)", color: "#f72585", border: "1px solid rgba(247,37,133,0.3)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#f72585" }} />
            portfolio · vaibhavi-jain
          </span>
        </div>
      </div>

      {/* Messages / Welcome */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {showWelcome ? (
          <div className="flex flex-col items-center text-center pt-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-3 text-2xl"
              style={{ backgroundColor: "rgba(247,37,133,0.15)", border: "2px solid rgba(247,37,133,0.3)" }}
            >
              ✨
            </div>
            <h3 className="font-heading font-bold text-vscode-text text-base mb-1">
              Hi! I&apos;m Vaibhavi&apos;s Copilot 👋
            </h3>
            <p className="font-mono text-vscode-muted text-xs leading-relaxed mb-6">
              Ask me anything about her projects, skills, experience, or achievements.
            </p>

            {/* Quick questions */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="flex items-start gap-1.5 px-3 py-2.5 border border-vscode-border rounded-sm text-left hover:border-vscode-accent/60 hover:bg-vscode-hover transition-colors"
                >
                  <span style={{ color: "#f72585" }} className="text-xs mt-0.5 flex-shrink-0">✦</span>
                  <span className="font-mono text-[11px] text-vscode-text leading-relaxed">{q}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <span className="text-sm mr-2 mt-0.5 flex-shrink-0">✨</span>
                  )}
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-sm font-mono text-xs leading-relaxed whitespace-pre-line"
                    style={
                      msg.role === "user"
                        ? { backgroundColor: "rgba(247,37,133,0.12)", border: "1px solid rgba(247,37,133,0.25)", color: "var(--color-vscode-text)" }
                        : { backgroundColor: "var(--color-vscode-bg)", border: "1px solid var(--color-vscode-border)", color: "var(--color-vscode-text)" }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm flex-shrink-0">✨</span>
                <div className="flex items-center gap-1 px-3 py-2 border border-vscode-border rounded-sm" style={{ backgroundColor: "var(--color-vscode-bg)" }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{
                        backgroundColor: "#f72585",
                        animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-vscode-border p-3">
        <div className="flex items-end gap-2 border border-vscode-border rounded-sm px-3 py-2 focus-within:border-vscode-accent/60 transition-colors" style={{ backgroundColor: "var(--color-vscode-bg)" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask about Vaibhavi's projects, skills..."
            className="flex-1 bg-transparent font-mono text-xs text-vscode-text placeholder:text-vscode-muted resize-none focus:outline-none leading-relaxed"
            style={{ maxHeight: 80 }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isTyping}
            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-sm transition-colors disabled:opacity-30"
            style={{ backgroundColor: input.trim() ? "#f72585" : "transparent" }}
          >
            <Send size={11} color="white" />
          </button>
        </div>
        <p className="font-mono text-[10px] text-vscode-muted text-center mt-2">
          AI can make mistakes · Contact Vaibhavi directly for important info
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </motion.div>
  );
}
