import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* App Name */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-indigo-700">
            BlogSphere
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, login to continue
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            className="focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
            className="focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
          Login
        </Button>

        {/* Register */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
