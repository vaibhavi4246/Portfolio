interface Props {
  name: string;
  color?: string;
}

const COLORS: Record<string, string> = {
  Python: "text-vscode-keyword",
  "C++": "text-vscode-keyword",
  C: "text-vscode-keyword",
  Java: "text-vscode-keyword",
  Kotlin: "text-vscode-keyword",
  SQL: "text-vscode-keyword",
  Dart: "text-vscode-keyword",
  "HTML/CSS": "text-vscode-string",
  "React.js": "text-vscode-accent",
  "Node.js": "text-vscode-comment",
  Firebase: "text-vscode-string",
  Flask: "text-vscode-comment",
  Streamlit: "text-vscode-type",
  "Jetpack Compose": "text-vscode-keyword",
  PyTorch: "text-vscode-string",
  TensorFlow: "text-vscode-string",
  OpenCV: "text-vscode-type",
  RAG: "text-vscode-function",
  ViT: "text-vscode-function",
  n8n: "text-vscode-comment",
  Git: "text-vscode-string",
  AWS: "text-vscode-string",
  Linux: "text-vscode-muted",
};

export default function SkillBadge({ name }: Props) {
  const color = COLORS[name] || "text-vscode-text";
  return (
    <span
      className={`inline-block px-2 py-0.5 font-mono text-xs border border-vscode-border bg-vscode-bg rounded-sm hover:border-vscode-accent/60 transition-colors ${color}`}
    >
      {name}
    </span>
  );
}
