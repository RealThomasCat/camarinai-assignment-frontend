import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        { username, password },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg flex flex-col items-center justify-center gap-8 bg-neutral-100 p-6 rounded">
        <h2 className="text-xl sm:text-2xl font-medium text-neutral-800">
          Register
        </h2>
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
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
            Register
          </button>
        </form>
        <p className="text-neutral-800 text-sm sm:text-base text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
