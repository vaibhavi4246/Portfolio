"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VSCodeLoader from "@/components/ui/VSCodeLoader";
import dynamic from "next/dynamic";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import TitleBar from "./TitleBar";
import BreadcrumbBar from "./BreadcrumbBar";
import StatusBar from "./StatusBar";
import SourceControlPopover from "./SourceControlPopover";
import CopilotPanel from "./CopilotPanel";
import SettingsPanel from "./SettingsPanel";
import Terminal from "./Terminal";
import { VSCodeContext, useVSCodeState, useVSCode } from "@/hooks/useVSCode";
import { THEMES, themeToVars } from "@/data/themes";
import CustomCursor from "@/components/ui/CustomCursor";
import Home from "@/components/sections/Home";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import type { Section } from "@/types";

const DinoGame = dynamic(() => import("@/components/game/DinoGame"), { ssr: false });
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a",
];

const SECTIONS: Record<Section, React.ReactNode> = {
  home: <Home />,
  about: <About />,
  experience: <Experience />,
  projects: <Projects />,
  skills: <Skills />,
  contact: <Contact />,
};

function VSCodeContent() {
  const {
    activeSection, isSidebarOpen, activePanel,
    isDinoOpen, openDino, closeDino,
    isSettingsOpen,
    isPaletteOpen, openPalette, closePalette,
    isSourceControlOpen, toggleSourceControl,
    isCopilotOpen,
    toggleTerminal, toggleSidebar,
    themeId,
  } = useVSCode();

  const konamiRef = useRef<string[]>([]);
  const theme = THEMES.find((t) => t.id === themeId)!;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Konami
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length);
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        openDino();
        konamiRef.current = [];
      }
      // Keyboard shortcuts
      if (e.ctrlKey && e.key === "p") { e.preventDefault(); openPalette(); }
      if (e.ctrlKey && e.key === "`") { e.preventDefault(); toggleTerminal(); }
      if (e.ctrlKey && e.key === "b") { e.preventDefault(); toggleSidebar(); }
      if (e.key === "F11") { e.preventDefault();
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openDino, openPalette, toggleTerminal, toggleSidebar]);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={themeToVars(theme.palette)}
    >
      <CustomCursor />
      <TitleBar />

      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar />

        {/* Settings panel overlay */}
        <AnimatePresence>
          {isSettingsOpen && <SettingsPanel />}
        </AnimatePresence>

        {/* Source control popover */}
        <AnimatePresence>
          {isSourceControlOpen && (
            <SourceControlPopover onClose={toggleSourceControl} />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        {isSidebarOpen && activePanel && (
          <div className="w-60 flex-shrink-0 border-r border-vscode-border overflow-hidden">
            <Sidebar />
          </div>
        )}

        {/* Editor + Copilot */}
        <div className="flex flex-1 overflow-hidden">
          {/* Editor area */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <TabBar />
            <BreadcrumbBar />
            <div className="flex-1 overflow-auto" style={{ backgroundColor: "var(--color-vscode-bg)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="h-full"
                >
                  {SECTIONS[activeSection]}
                </motion.div>
              </AnimatePresence>
            </div>
            <Terminal />
          </div>

          {/* Copilot right panel */}
          <AnimatePresence>
            {isCopilotOpen && <CopilotPanel />}
          </AnimatePresence>
        </div>
      </div>

      <StatusBar />

      {/* Dino game modal */}
      <AnimatePresence>
        {isDinoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center pb-[22px] bg-black/60"
            onClick={closeDino}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DinoGame onClose={closeDino} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command palette */}
      <AnimatePresence>
        {isPaletteOpen && <CommandPalette />}
      </AnimatePresence>
    </div>
  );
}

export default function VSCodeLayout() {
  const state = useVSCodeState();
  const [loaded, setLoaded] = useState(false);

  return (
    <VSCodeContext.Provider value={state}>
      <VSCodeLoader onDone={() => setLoaded(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full"
      >
        <VSCodeContent />
      </motion.div>
    </VSCodeContext.Provider>
  );
}
