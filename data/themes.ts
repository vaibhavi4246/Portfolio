export type ThemeId =
  | "vaibhavi-dark"
  | "rose-pine"
  | "tokyo-night"
  | "catppuccin"
  | "nord"
  | "gruvbox";

export interface ThemePalette {
  bg: string;
  sidebar: string;
  activitybar: string;
  tabActive: string;
  tabInactive: string;
  border: string;
  hover: string;
  listActive: string;
  accent: string;
  statusbar: string;
  text: string;
  muted: string;
  comment: string;
  keyword: string;
  string: string;
  fn: string;
  type: string;
  number: string;
  variable: string;
  input: string;
  button: string;
  buttonHover: string;
  error: string;
  success: string;
}

export interface ThemeDef {
  id: ThemeId;
  label: string;
  emoji: string;
  swatch: string;
  palette: ThemePalette;
}

export const THEMES: ThemeDef[] = [
  {
    id: "vaibhavi-dark",
    label: "Vaibhavi Dark",
    emoji: "⚡",
    swatch: "#007acc",
    palette: {
      bg: "#1e1e1e",
      sidebar: "#252526",
      activitybar: "#333333",
      tabActive: "#1e1e1e",
      tabInactive: "#2d2d2d",
      border: "#3e3e42",
      hover: "#2a2d2e",
      listActive: "#094771",
      accent: "#007acc",
      statusbar: "#007acc",
      text: "#d4d4d4",
      muted: "#858585",
      comment: "#6a9955",
      keyword: "#569cd6",
      string: "#ce9178",
      fn: "#dcdcaa",
      type: "#4ec9b0",
      number: "#b5cea8",
      variable: "#9cdcfe",
      input: "#3c3c3c",
      button: "#0e639c",
      buttonHover: "#1177bb",
      error: "#f44747",
      success: "#89d185",
    },
  },
  {
    id: "rose-pine",
    label: "Rosé Pine",
    emoji: "🌸",
    swatch: "#eb6f92",
    palette: {
      bg: "#191724",
      sidebar: "#1f1d2e",
      activitybar: "#26233a",
      tabActive: "#191724",
      tabInactive: "#1f1d2e",
      border: "#403d52",
      hover: "#2a2739",
      listActive: "#403d52",
      accent: "#eb6f92",
      statusbar: "#eb6f92",
      text: "#e0def4",
      muted: "#6e6a86",
      comment: "#908caa",
      keyword: "#c4a7e7",
      string: "#f6c177",
      fn: "#ebbcba",
      type: "#9ccfd8",
      number: "#f6c177",
      variable: "#e0def4",
      input: "#2a2739",
      button: "#eb6f92",
      buttonHover: "#d15b7f",
      error: "#eb6f92",
      success: "#31748f",
    },
  },
  {
    id: "tokyo-night",
    label: "Tokyo Night",
    emoji: "🌃",
    swatch: "#7aa2f7",
    palette: {
      bg: "#1a1b2e",
      sidebar: "#16213e",
      activitybar: "#0f3460",
      tabActive: "#1a1b2e",
      tabInactive: "#16213e",
      border: "#2f3f6a",
      hover: "#1e2d52",
      listActive: "#1e2d52",
      accent: "#7aa2f7",
      statusbar: "#7aa2f7",
      text: "#c0caf5",
      muted: "#3b4261",
      comment: "#565f89",
      keyword: "#bb9af7",
      string: "#9ece6a",
      fn: "#e0af68",
      type: "#2ac3de",
      number: "#ff9e64",
      variable: "#c0caf5",
      input: "#1e2d52",
      button: "#7aa2f7",
      buttonHover: "#6391e5",
      error: "#f7768e",
      success: "#9ece6a",
    },
  },
  {
    id: "catppuccin",
    label: "Catppuccin",
    emoji: "🐱",
    swatch: "#cba6f7",
    palette: {
      bg: "#1e1e2e",
      sidebar: "#181825",
      activitybar: "#181825",
      tabActive: "#1e1e2e",
      tabInactive: "#181825",
      border: "#313244",
      hover: "#2a2a3f",
      listActive: "#313244",
      accent: "#89b4fa",
      statusbar: "#89b4fa",
      text: "#cdd6f4",
      muted: "#585b70",
      comment: "#6c7086",
      keyword: "#cba6f7",
      string: "#a6e3a1",
      fn: "#89dceb",
      type: "#89b4fa",
      number: "#fab387",
      variable: "#cdd6f4",
      input: "#313244",
      button: "#89b4fa",
      buttonHover: "#74a8e8",
      error: "#f38ba8",
      success: "#a6e3a1",
    },
  },
  {
    id: "nord",
    label: "Nord",
    emoji: "❄️",
    swatch: "#88c0d0",
    palette: {
      bg: "#2e3440",
      sidebar: "#3b4252",
      activitybar: "#2e3440",
      tabActive: "#2e3440",
      tabInactive: "#3b4252",
      border: "#4c566a",
      hover: "#434c5e",
      listActive: "#4c566a",
      accent: "#88c0d0",
      statusbar: "#5e81ac",
      text: "#eceff4",
      muted: "#4c566a",
      comment: "#616e88",
      keyword: "#81a1c1",
      string: "#a3be8c",
      fn: "#88c0d0",
      type: "#8fbcbb",
      number: "#b48ead",
      variable: "#eceff4",
      input: "#434c5e",
      button: "#5e81ac",
      buttonHover: "#4e6f99",
      error: "#bf616a",
      success: "#a3be8c",
    },
  },
  {
    id: "gruvbox",
    label: "Gruvbox",
    emoji: "🔥",
    swatch: "#d79921",
    palette: {
      bg: "#282828",
      sidebar: "#32302f",
      activitybar: "#3c3836",
      tabActive: "#282828",
      tabInactive: "#32302f",
      border: "#504945",
      hover: "#3c3836",
      listActive: "#504945",
      accent: "#d79921",
      statusbar: "#d79921",
      text: "#ebdbb2",
      muted: "#928374",
      comment: "#8ec07c",
      keyword: "#fb4934",
      string: "#b8bb26",
      fn: "#fabd2f",
      type: "#83a598",
      number: "#d3869b",
      variable: "#ebdbb2",
      input: "#3c3836",
      button: "#d79921",
      buttonHover: "#c68c18",
      error: "#cc241d",
      success: "#98971a",
    },
  },
];

export function themeToVars(p: ThemePalette): React.CSSProperties {
  return {
    "--color-vscode-bg": p.bg,
    "--color-vscode-sidebar": p.sidebar,
    "--color-vscode-activitybar": p.activitybar,
    "--color-vscode-tab-active": p.tabActive,
    "--color-vscode-tab-inactive": p.tabInactive,
    "--color-vscode-border": p.border,
    "--color-vscode-hover": p.hover,
    "--color-vscode-list-active": p.listActive,
    "--color-vscode-accent": p.accent,
    "--color-vscode-statusbar": p.statusbar,
    "--color-vscode-text": p.text,
    "--color-vscode-muted": p.muted,
    "--color-vscode-comment": p.comment,
    "--color-vscode-keyword": p.keyword,
    "--color-vscode-string": p.string,
    "--color-vscode-function": p.fn,
    "--color-vscode-type": p.type,
    "--color-vscode-number": p.number,
    "--color-vscode-variable": p.variable,
    "--color-vscode-input": p.input,
    "--color-vscode-button": p.button,
    "--color-vscode-button-hover": p.buttonHover,
    "--color-vscode-error": p.error,
    "--color-vscode-success": p.success,
  } as React.CSSProperties;
}
