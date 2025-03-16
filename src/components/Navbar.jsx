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
    <nav className="py-3 sm:py-4 px-4 sm:px-8 bg-neutral-100 text-blue-500 flex justify-between w-full">
      <Link to="/" className="text-base sm:text-xl font-bold">
        Home
      </Link>
      <div className="flex items-center justify-center gap-6">
        {user && (
          <Link to="/notifications">
            <button className="bg-blue-500 text-gray-100 font-medium px-2 sm:px-3 py-1 rounded sm:w-32 text-xs sm:text-base">
              Notifications
            </button>
          </Link>
        )}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-gray-100 font-medium px-2 sm:px-3 py-1 rounded sm:w-32 text-xs sm:text-base"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}
