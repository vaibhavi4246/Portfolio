"use client";

import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function CopilotChat() {
  const { messages, isLoading, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-vscode-sidebar">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-vscode-border flex-shrink-0">
        <Bot size={14} className="text-vscode-accent" />
        <span className="text-xs font-mono font-semibold text-vscode-text uppercase tracking-wider">
          Copilot Chat
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-sm flex-shrink-0 flex items-center justify-center text-xs font-mono font-bold mt-0.5 bg-vscode-comment text-vscode-bg">
              AI
            </div>
            <div className="text-xs font-mono text-vscode-muted px-2 py-1.5 border border-vscode-border bg-vscode-bg rounded-sm">
              <span className="cursor-blink">▌</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
