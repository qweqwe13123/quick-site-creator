import { useEffect, useRef, useState } from "react";

type Msg = { id: string; from: "user" | "system"; text: string; ts: number };

const AUTO_REPLY =
  "We have received your request. We are now connecting you with the nearest available assistant who will help you shortly.";
const STORAGE_OPEN = "mt-support-open";
const STORAGE_MSGS = "mt-support-messages";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [searching, setSearching] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load persisted state
  useEffect(() => {
    try {
      const o = localStorage.getItem(STORAGE_OPEN);
      if (o === "1") setOpen(true);
      const m = localStorage.getItem(STORAGE_MSGS);
      if (m) {
        const parsed: Msg[] = JSON.parse(m);
        setMessages(parsed);
        if (parsed.some((x) => x.from === "user")) setSearching(true);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_OPEN, open ? "1" : "0");
    } catch {}
  }, [open]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MSGS, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Global trigger: links with [data-open-support] or href="#support"
  useEffect(() => {
    const openFn = () => setOpen(true);
    (window as unknown as { openSupportChat?: () => void }).openSupportChat = openFn;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest<HTMLElement>(
        '[data-open-support], a[href="#support"], a[href$="#support"]',
      );
      if (trigger) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, searching]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Msg = { id: uid(), from: "user", text, ts: Date.now() };
    setInput("");
    const hasReplied = messages.some(
      (m) => m.from === "system" && m.text === AUTO_REPLY,
    );
    if (hasReplied) {
      setMessages((prev) => [...prev, userMsg]);
      setSearching(true);
      return;
    }
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: uid(), from: "system", text: AUTO_REPLY, ts: Date.now() },
      ]);
      setSearching(true);
    }, 600);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label="Open support chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[9998] h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 512 512" className="h-7 w-7" fill="currentColor" aria-hidden="true">
            <path d="M256 32C141.1 32 48 125.1 48 240v40c0 13.3 10.7 24 24 24h24v96c0 26.5 21.5 48 48 48h32V304h-64v-64c0-88.4 71.6-160 160-160s160 71.6 160 160v64h-64v144h48c39.8 0 72-32.2 72-72v-16c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32v-16C464 125.1 370.9 32 256 32z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed z-[9999] bg-white rounded-2xl shadow-2xl ring-1 ring-zinc-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
          bottom-24 right-5 w-[calc(100vw-2.5rem)] max-w-[380px] h-[70vh] max-h-[560px] sm:w-[380px]`}
        role="dialog"
        aria-label="Support chat"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-full bg-white/20 ring-2 ring-white/30 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 512 512" className="h-5 w-5" fill="currentColor">
                <path d="M256 32C141.1 32 48 125.1 48 240v40c0 13.3 10.7 24 24 24h24v96c0 26.5 21.5 48 48 48h32V304h-64v-64c0-88.4 71.6-160 160-160s160 71.6 160 160v64h-64v144h48c39.8 0 72-32.2 72-72v-16c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32v-16C464 125.1 370.9 32 256 32z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">Mytalora Support</div>
              <div className="text-[11px] text-emerald-50/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                Online now
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="h-8 w-8 rounded-full hover:bg-white/15 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={listRef} className="flex-1 overflow-y-auto bg-zinc-50 px-3 py-4 space-y-2">
          {messages.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-8 px-4">
              👋 Hi! How can we help you today? Send us a message and our team will assist you.
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
                  m.from === "user"
                    ? "bg-emerald-500 text-white rounded-br-md"
                    : "bg-white text-zinc-800 ring-1 ring-zinc-200 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {searching && (
            <div className="flex justify-start">
              <div className="bg-white text-zinc-600 ring-1 ring-zinc-200 rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm shadow-sm flex items-center gap-2">
                <span>Searching for available assistant</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-zinc-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type your message…"
              className="flex-1 min-w-0 rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              onClick={send}
              disabled={!input.trim()}
              aria-label="Send message"
              className="h-10 w-10 shrink-0 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </div>
          <div className="text-[10px] text-zinc-400 mt-2 text-center">
            Powered by Mytalora Support
          </div>
        </div>
      </div>
    </>
  );
}
