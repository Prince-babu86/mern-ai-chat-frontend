import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../config/AxiosConfig";

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/register" , formData);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }

    // Example API call
    // axios.post("/api/register", formData)

    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 shadow-2xl p-8">
        {/* Title */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Sparkles className="text-indigo-500" size={28} />
          <h1 className="text-2xl font-semibold text-white">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Fullname */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center bg-black border border-zinc-800 px-3 py-3">
              <User className="text-zinc-500 mr-3" size={18} />

              <input
                type="text"
                name="fullname"
                placeholder="Your full name"
                value={formData.fullname}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-white placeholder-zinc-600"
                required
              />
            </div>
          </div>

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
                placeholder="Create password"
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Already have an account?{" "}
          <Link to={`/login`} className="text-indigo-500 cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
