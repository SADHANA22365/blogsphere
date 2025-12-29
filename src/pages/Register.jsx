import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    try {
      register(name, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* App Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700">
            BlogSphere
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your account
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Input
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-base py-2 rounded-lg transition">
          Register
        </Button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
