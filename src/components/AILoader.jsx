export default function AppLoader() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center gap-6">

      {/* AI Logo */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="text-white text-lg font-semibold">
          Initializing AI System
        </h2>

        <p className="text-zinc-500 text-sm mt-2 animate-pulse">
          Preparing intelligence...
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 mt-2">
        <span className="w-2 h-2 bg-indigo-500 animate-bounce"></span>
        <span className="w-2 h-2 bg-indigo-500 animate-bounce delay-100"></span>
        <span className="w-2 h-2 bg-indigo-500 animate-bounce delay-200"></span>
      </div>

    </div>
  );
}