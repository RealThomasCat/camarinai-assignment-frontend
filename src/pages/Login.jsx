import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      setUser({ username });
      navigate("/");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-lg flex flex-col items-center justify-center gap-8 bg-neutral-100 p-6 rounded">
        <h2 className="text-2xl font-medium text-neutral-800">Login</h2>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-2 w-full rounded-l bg-neutral-200 text-black placeholder:text-neutral-500 focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 w-full rounded-l bg-neutral-200 text-black placeholder:text-neutral-500 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
        <p className="text-neutral-800">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
