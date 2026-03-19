import { Menu, Plus, MessageSquare, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../config/AxiosConfig";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const [chats, setchats] = useState([]);
  const navigate = useNavigate();

  const getAllChats = async () => {
    try {
      const res = await axiosInstance.get("/chat/chats");

      setchats(res.data?.chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, [chats]);

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div
        className={`bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 ${
          open ? "w-64" : "w-16"
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <button onClick={() => setOpen(!open)}>
            <Menu className="text-white" size={22} />
          </button>

          {open && <h1 className="text-white font-semibold">AI Chat</h1>}
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 text-sm">
            <Plus size={18} />
            {open && "New Chat"}
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-2">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => navigate(`/chat/${chat?._id}`)}
              className="flex items-center gap-3 text-zinc-300 hover:bg-zinc-800 p-3 cursor-pointer text-sm"
            >
              <MessageSquare size={18} />

              {open && <span className="truncate">{chat.title}</span>}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 p-3">
          <button className="flex items-center gap-3 text-zinc-300 hover:bg-zinc-800 w-full p-2">
            <Settings size={18} />
            {open && "Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
