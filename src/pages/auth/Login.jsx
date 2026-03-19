import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/AxiosConfig";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", formData);

      console.log(res.data);

      // navigate after login
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl p-8">
        {/* Title */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Sparkles className="text-indigo-500" size={28} />
          <h1 className="text-2xl font-semibold text-white">AI Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center bg-black border border-zinc-800 px-3 py-3">
              <Mail className="text-zinc-500 mr-3" size={18} />

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-zinc-600"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Password</label>

            <div className="flex items-center bg-black border border-zinc-800 px-3 py-3">
              <Lock className="text-zinc-500 mr-3" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-zinc-600"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
