import anthropic from "@/lib/anthropic";
import { CHAT_SYSTEM_PROMPT } from "@/data/chatContext";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const stream = anthropic.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: CHAT_SYSTEM_PROMPT,
      messages,
    });

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("[chat/route]", error);
    return new Response("Internal server error", { status: 500 });
  }
}
