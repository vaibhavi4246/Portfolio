"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  /* Dot follows instantly; ring lags behind */
  const dotX = useSpring(mx, { stiffness: 2000, damping: 50 });
  const dotY = useSpring(my, { stiffness: 2000, damping: 50 });
  const ringX = useSpring(mx, { stiffness: 120, damping: 18 });
  const ringY = useSpring(my, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest("a, button, [data-cursor-hover]"));
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  if (isTouch) return null;

  const pink = "#f72585";
  const accent = "#007acc";

  return (
    <>
      {/* ── Inner dot ── */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: clicked ? 0.4 : hovered ? 0 : 1 }}
        transition={{ duration: 0.1 }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: pink,
            boxShadow: `0 0 8px ${pink}`,
          }}
        />
      </motion.div>

      {/* ── Outer bracket ring ── */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: clicked ? 20 : hovered ? 48 : 32,
          height: clicked ? 20 : hovered ? 48 : 32,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* SVG bracket corners */}
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 48 48"
          fill="none"
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Top-left */}
          <path d="M4 18 L4 4 L18 4" stroke={hovered ? pink : accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Top-right */}
          <path d="M30 4 L44 4 L44 18" stroke={hovered ? pink : accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom-right */}
          <path d="M44 30 L44 44 L30 44" stroke={hovered ? pink : accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom-left */}
          <path d="M18 44 L4 44 L4 30" stroke={hovered ? pink : accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </>
  );
}
