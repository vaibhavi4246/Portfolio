import ReactMarkdown from "react-markdown";
import type { ChatMessage as ChatMessageType } from "@/types";

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-0.5 ${
          isUser ? "bg-vscode-accent text-white" : "bg-vscode-comment text-vscode-bg"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`flex-1 text-xs font-mono leading-relaxed rounded-sm px-2 py-1.5 ${
          isUser
            ? "bg-vscode-list-active text-vscode-text"
            : "bg-vscode-bg text-vscode-text border border-vscode-border"
        }`}
      >
        {message.content ? (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
              code: ({ children }) => (
                <code className="text-vscode-string bg-vscode-sidebar px-1 rounded-sm">
                  {children}
                </code>
              ),
              strong: ({ children }) => (
                <strong className="text-vscode-function font-semibold">{children}</strong>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <span className="cursor-blink text-vscode-muted">▌</span>
        )}
      </div>
    </div>
  );
}
