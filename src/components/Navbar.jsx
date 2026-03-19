import { Menu, Sparkles } from "lucide-react";
import { useAuth } from "../context/Authcontext";

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <div className="fixed top-0 left-0 w-full h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 z-50">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-white"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-semibold">
          <Sparkles size={20} className="text-indigo-500" />
          <span className="text-lg">Aqua AI</span>
        </div>

      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-3 text-white">

        <div className="text-sm opacity-80">
          {user?.fullname || "Guest"}
        </div>

        <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center text-sm font-semibold">
          {user?.fullname?.charAt(0) || "G"}
        </div>

      </div>

    </div>
  );
}