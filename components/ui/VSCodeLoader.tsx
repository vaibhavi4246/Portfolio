"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLine {
  text: string;
  color: string;
  indent?: boolean;
}

const FILES = [
  "Home.tsx",
  "About.tsx",
  "Projects.tsx",
  "Skills.tsx",
  "Experience.tsx",
  "Contact.tsx",
];

export default function VSCodeLoader({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [visible, setVisible] = useState(true);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    const BOOT_SEQUENCE: { line: BootLine; delay: number }[] = [
      {
        line: { text: "vaibhavi.dev@portfolio:~$ npm run dev", color: "#9cdcfe" },
        delay: 0,
      },
      {
        line: { text: "", color: "transparent" },
        delay: 150,
      },
      {
        line: { text: "  ▲ Next.js 16.2.4", color: "#d4d4d4", indent: true },
        delay: 300,
      },
      {
        line: { text: "  - Local:   http://localhost:3000", color: "#858585", indent: true },
        delay: 480,
      },
      {
        line: { text: "  - Network: http://192.168.1.100:3000", color: "#858585", indent: true },
        delay: 560,
      },
      {
        line: { text: "", color: "transparent" },
        delay: 700,
      },
      {
        line: { text: "  ✓ Starting...", color: "#6a9955", indent: true },
        delay: 900,
      },
    ];

    FILES.forEach((file, i) => {
      BOOT_SEQUENCE.push({
        line: { text: `  ✓ Compiled ${file}`, color: "#6a9955", indent: true },
        delay: 1050 + i * 130,
      });
    });

    const afterFiles = 1050 + FILES.length * 130;

    BOOT_SEQUENCE.push(
      { line: { text: "", color: "transparent" }, delay: afterFiles + 50 },
      {
        line: { text: "  ✓ Ready in 420ms", color: "#4ec9b0", indent: true },
        delay: afterFiles + 200,
      }
    );

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach(({ line, delay }) => {
      timers.push(setTimeout(() => setLines((p) => [...p, line]), delay));
    });

    // Start progress bar after a short delay
    timers.push(
      setTimeout(() => setShowProgress(true), 600)
    );

    // Animate progress
    let p = 0;
    const progInterval = setInterval(() => {
      p += 1.8;
      setProgress(Math.min(p, 100));
      if (p >= 100) clearInterval(progInterval);
    }, 30); // ~1.7s to reach 100%

    // Exit
    const exitDelay = afterFiles + 600;
    timers.push(
      setTimeout(() => {
        if (doneRef.current) return;
        doneRef.current = true;
        setVisible(false);
        setTimeout(onDone, 450);
      }, exitDelay)
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progInterval);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(4px)", scale: 0.99 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0d0d0d" }}
        >
          {/* Subtle scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
            }}
          />

          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 122, 204, 0.04) 0%, transparent 70%)",
            }}
          />

          <div className="relative w-full max-w-xl px-6 sm:px-8">
            {/* Terminal window chrome */}
            <div
              className="rounded-t-lg overflow-hidden border border-[#3e3e42]"
              style={{ background: "#1e1e1e" }}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-3 px-4 py-2.5 border-b border-[#3e3e42]"
                style={{ background: "#252526" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-xs text-[#858585] flex-1 text-center">
                  TERMINAL — vaibhavi.dev
                </span>
                <span className="font-mono text-[10px] text-[#505050]">bash</span>
              </div>

              {/* Terminal body */}
              <div className="p-5 min-h-[240px] font-mono text-sm leading-relaxed">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    style={{
                      color: line.color,
                      height: line.color === "transparent" ? "12px" : undefined,
                    }}
                  >
                    {line.text}
                    {i === lines.length - 1 && line.color !== "transparent" && (
                      <span
                        className="cursor-blink inline-block ml-0.5 bg-current"
                        style={{ width: "6px", height: "14px", verticalAlign: "text-bottom" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress bar below terminal */}
            <AnimatePresence>
              {showProgress && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-t-0 border-[#3e3e42] rounded-b-lg px-5 py-4"
                  style={{ background: "#1a1a1a" }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[11px] text-[#858585]">
                      Building portfolio bundle...
                    </span>
                    <span className="font-mono text-[11px] text-[#4ec9b0] tabular-nums">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-1 bg-[#2d2d2d] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                      className="h-full rounded-full progress-bar-shine"
                    />
                  </div>
                  {progress >= 100 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-[11px] text-[#6a9955] mt-2"
                    >
                      ✓ Bundle optimized · 0 errors · ready to ship
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brand footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-5"
            >
              <p className="font-mono text-[11px] text-[#3e3e42]">
                vaibhavi.dev · AI/ML Developer & Android Engineer
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
