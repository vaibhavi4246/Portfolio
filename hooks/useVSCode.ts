"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Section, Tab, SidebarPanel } from "@/types";
import { type ThemeId } from "@/data/themes";

interface VSCodeState {
  activeSection: Section;
  openTabs: Tab[];
  activePanel: SidebarPanel;
  isSidebarOpen: boolean;
  isDinoOpen: boolean;
  isSettingsOpen: boolean;
  isTerminalOpen: boolean;
  isPaletteOpen: boolean;
  isSourceControlOpen: boolean;
  isCopilotOpen: boolean;
  themeId: ThemeId;
  setActiveSection: (section: Section) => void;
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
  setActivePanel: (panel: SidebarPanel) => void;
  toggleSidebar: () => void;
  openDino: () => void;
  closeDino: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleTerminal: () => void;
  openPalette: () => void;
  closePalette: () => void;
  setTheme: (id: ThemeId) => void;
  toggleSourceControl: () => void;
  toggleCopilot: () => void;
}

const defaultTab: Tab = { id: "home", name: "home.tsx", section: "home" };

export const VSCodeContext = createContext<VSCodeState>({
  activeSection: "home",
  openTabs: [defaultTab],
  activePanel: "explorer",
  isSidebarOpen: true,
  isDinoOpen: false,
  isSettingsOpen: false,
  isTerminalOpen: false,
  isPaletteOpen: false,
  isSourceControlOpen: false,
  isCopilotOpen: false,
  themeId: "vaibhavi-dark",
  setActiveSection: () => {},
  openTab: () => {},
  closeTab: () => {},
  setActivePanel: () => {},
  toggleSidebar: () => {},
  openDino: () => {},
  closeDino: () => {},
  openSettings: () => {},
  closeSettings: () => {},
  toggleTerminal: () => {},
  openPalette: () => {},
  closePalette: () => {},
  setTheme: () => {},
  toggleSourceControl: () => {},
  toggleCopilot: () => {},
});

export function useVSCodeState(): VSCodeState {
  const [activeSection, setActiveSectionState] = useState<Section>("home");
  const [openTabs, setOpenTabs] = useState<Tab[]>([defaultTab]);
  const [activePanel, setActivePanelState] = useState<SidebarPanel>("explorer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDinoOpen, setIsDinoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSourceControlOpen, setIsSourceControlOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [themeId, setThemeIdState] = useState<ThemeId>("vaibhavi-dark");

  const setActiveSection = useCallback((section: Section) => {
    setActiveSectionState(section);
  }, []);

  const openTab = useCallback((tab: Tab) => {
    setOpenTabs((prev) => {
      if (prev.find((t) => t.id === tab.id)) return prev;
      return [...prev, tab];
    });
    setActiveSectionState(tab.section);
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        if (filtered.length === 0) return [defaultTab];
        return filtered;
      });
      setOpenTabs((prev) => {
        const remaining = prev;
        if (!remaining.find((t) => t.section === activeSection)) {
          setActiveSectionState(remaining[remaining.length - 1].section);
        }
        return remaining;
      });
    },
    [activeSection]
  );

  const setActivePanel = useCallback((panel: SidebarPanel) => {
    setActivePanelState((prev) => {
      if (prev === panel) {
        setIsSidebarOpen(false);
        return null;
      }
      setIsSidebarOpen(true);
      return panel;
    });
  }, []);

  const toggleSidebar = useCallback(() => setIsSidebarOpen((p) => !p), []);
  const openDino = useCallback(() => setIsDinoOpen(true), []);
  const closeDino = useCallback(() => setIsDinoOpen(false), []);
  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);
  const toggleTerminal = useCallback(() => setIsTerminalOpen((p) => !p), []);
  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);
  const setTheme = useCallback((id: ThemeId) => setThemeIdState(id), []);
  const toggleSourceControl = useCallback(() => setIsSourceControlOpen((p) => !p), []);
  const toggleCopilot = useCallback(() => setIsCopilotOpen((p) => !p), []);

  return {
    activeSection,
    openTabs,
    activePanel,
    isSidebarOpen,
    isDinoOpen,
    isSettingsOpen,
    isTerminalOpen,
    isPaletteOpen,
    isSourceControlOpen,
    isCopilotOpen,
    themeId,
    setActiveSection,
    openTab,
    closeTab,
    setActivePanel,
    toggleSidebar,
    openDino,
    closeDino,
    openSettings,
    closeSettings,
    toggleTerminal,
    openPalette,
    closePalette,
    setTheme,
    toggleSourceControl,
    toggleCopilot,
  };
}

export function useVSCode() {
  return useContext(VSCodeContext);
}
