import { NavLink } from "react-router-dom";
import { MessageSquare, UserPlus, LogIn } from "lucide-react";

export default function StartPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">

      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 shadow-xl text-center">

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-3">
          AI Assistant
        </h1>

        <p className="text-zinc-400 text-sm mb-8">
          Start chatting with AI or create an account to save your chats.
        </p>

        {/* Buttons */}
        <div className="space-y-4">

          {/* Start Chat */}
          <NavLink
            to="/chat"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-3 w-full transition"
          >
            <MessageSquare size={18} />
            Start Chat
          </NavLink>

          {/* Register */}
          <NavLink
            to="/register"
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-3 w-full transition"
          >
            <UserPlus size={18} />
            Create Account
          </NavLink>

          {/* Login */}
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 border border-zinc-700 hover:bg-zinc-800 py-3 w-full transition"
          >
            <LogIn size={18} />
            Login
          </NavLink>

        </div>

      </div>

    </div>
  );
}