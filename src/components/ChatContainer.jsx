import { useState, useRef, useEffect } from "react";
import { Send, Copy } from "lucide-react";
import socket from "../config/socket.config";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/AxiosConfig";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "model", content: "Hello 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
  const typingRef = useRef(null); // for stopping typing
  const params = useParams();

  /* ---------------------- FETCH OLD MESSAGES ---------------------- */

  const getMessage = async () => {
    try {
      const res = await axiosInstance.get(`/chat/messages/${params.id}`);
      setMessages(res.data?.messages || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessage();
  }, [params.id]);

  /* ---------------------- AUTO SCROLL ---------------------- */

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  /* ---------------------- SOCKET LISTENER (TYPEWRITER) ---------------------- */

  useEffect(() => {
  socket.on("ai-response", (data) => {
    const fullText = data.content;

    let index = 0;
    const length = fullText.length;

    // bigger chunk = faster typing
    const chunkSize = Math.ceil(length / 20); 
    // (response divided into ~20 steps → super fast)

    // add empty message
    setMessages((prev) => [
      ...prev,
      { role: "model", content: "", typing: true },
    ]);

    setLoading(false);

    const interval = setInterval(() => {
      index += chunkSize;

      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        updated[lastIndex] = {
          ...updated[lastIndex],
          content: fullText.slice(0, index),
        };

        return updated;
      });

      if (index >= length) {
        clearInterval(interval);

        // remove typing cursor
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;

          updated[lastIndex] = {
            ...updated[lastIndex],
            typing: false,
          };

          return updated;
        });
      }
    }, 8); // 🔥 VERY FAST (8ms)
  });

  return () => {
    socket.off("ai-response");
  };
}, []);

  /* ---------------------- SEND MESSAGE ---------------------- */

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    socket.emit("ai-message", {
      chat: params.id,
      content: input,
    });

    setInput("");
    setLoading(true);
  };

  /* ---------------------- CODE BLOCK ---------------------- */

  function CodeBlock({ language, value }) {
    const copyCode = () => {
      navigator.clipboard.writeText(value);
    };

    return (
      <div className="relative group">
        <button
          onClick={copyCode}
          className="absolute top-2 right-2 text-xs bg-black px-2 py-1 opacity-0 group-hover:opacity-100 transition"
        >
          Copy
        </button>

        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          PreTag="div"
          customStyle={{
            borderRadius: "6px",
            padding: "16px",
            backgroundColor: "black",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  }

  /* ---------------------- UI ---------------------- */

  return (
    <div className="flex w-full flex-col h-screen bg-black text-white">
      {/* Messages */}

      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 max-w-[70%] text-sm ${
                msg.role === "model" ? "bg-slate-950" : "bg-zinc-800"
              }`}
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children }) {
                      const match = /language-(\w+)/.exec(className || "");

                      return !inline ? (
                        <CodeBlock
                          language={match ? match[1] : ""}
                          value={String(children).replace(/\n$/, "")}
                        />
                      ) : (
                        <code className="bg-zinc-700 px-1 rounded">
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>

                {/* Typing Cursor */}
                {msg.typing && (
                  <span className="animate-pulse ml-1">|</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 px-4 py-3 text-sm flex gap-2 items-center">
              <span className="animate-pulse">AI is typing</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}

      <div className="p-3 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask AI something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3 outline-none text-sm"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 px-4 flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}