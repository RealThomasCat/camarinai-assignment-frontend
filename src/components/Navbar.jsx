import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <nav className="py-4 px-8 bg-neutral-100 text-blue-500 flex justify-between w-full">
      <Link to="/" className="text-xl font-bold">
        Home
      </Link>
      <div className="flex items-center justify-center gap-6">
        {user && (
          <Link to="/notifications">
            <button className="bg-blue-500 text-gray-100 font-medium px-3 py-1 rounded w-32">
              Notifications
            </button>
          </Link>
        )}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-gray-100 font-medium px-3 py-1 rounded w-32"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}
