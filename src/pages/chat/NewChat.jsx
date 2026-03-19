import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { useAuth } from "../../context/Authcontext";
import axiosInstance from "../../config/AxiosConfig";
import socket from "../../config/socket.config";
import { useNavigate } from "react-router-dom";

export default function NewChat() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getDayName = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const res = await axiosInstance.post("/chat", {
        title: message,
      });

      console.log(res);

      socket.emit("ai-message", {
        chat: res?.data?.chat?._id,
        content: message,
      });

      navigate(`/chat/${res?.data?.chat?._id}`);


      socket.on("ai-response" , async (data) => {
        console.log(data);
      })

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }

    setMessage("");
  };

return (
  <div className="h-screen bg-black text-white flex flex-col items-center justify-center px-4">
    
    {/* Header */}
    <div className="flex flex-col items-center mb-6">
      <div className="w-14 h-14 bg-indigo-600 flex items-center justify-center rounded-xl shadow-lg">
        <Sparkles size={26} />
      </div>

      <h1 className="text-3xl font-semibold mt-4 text-center">
        {getGreeting()}, {user?.fullname || "Guest"} 👋
      </h1>

      <p className="text-zinc-400 mt-2 text-center">
        Analyze your data using natural language
      </p>
    </div>

    {/* Quick Prompts */}
    <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-2xl">
      {[
        "Show sales trend",
        "Compare profit vs sales",
        "Top 5 months by revenue",
        "Create bar chart of sales",
      ].map((q) => (
        <button
          key={q}
          onClick={() => setMessage(q)}
          className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-sm rounded-lg hover:bg-zinc-800 transition"
        >
          {q}
        </button>
      ))}
    </div>

    {/* Input Box */}
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
      <input
        type="text"
        placeholder="Ask about your data... (e.g. 'Show Jan sales')"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 px-5 py-4 pr-14 text-sm outline-none rounded-xl focus:ring-2 focus:ring-indigo-500"
      />

      {/* Send Button */}
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 p-2 rounded-lg hover:bg-indigo-700 transition"
      >
        <Send size={18} />
      </button>
    </form>

    {/* Footer Hint */}
    <p className="text-xs text-zinc-500 mt-4 text-center">
      Supports charts, insights, and data queries
    </p>
  </div>
);
}
