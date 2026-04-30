"use client";

import { useState, useRef } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  };

  return (
    <div className="border-t border-vscode-border p-2">
      <div className="flex gap-1 items-end bg-vscode-input border border-vscode-border rounded-sm">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={disabled}
          placeholder="Ask about Vaibhavi..."
          className="flex-1 bg-transparent resize-none px-2 py-1.5 text-xs font-mono text-vscode-text placeholder:text-vscode-muted/60 focus:outline-none min-h-[28px]"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="p-1.5 text-vscode-muted hover:text-vscode-accent disabled:opacity-40 transition-colors flex-shrink-0"
        >
          <Send size={12} />
        </button>
      </div>
      <p className="text-vscode-muted text-[10px] font-mono mt-1 opacity-60">
        Enter to send · Shift+Enter for newline
      </p>
    </div>
  );
}
