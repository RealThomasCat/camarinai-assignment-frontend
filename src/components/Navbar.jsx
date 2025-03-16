import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between w-full">
      <Link to="/" className="text-xl font-bold">
        Home
      </Link>
      <div className="flex items-center justify-center gap-8">
        {user && (
          <Link to="/notifications" className="mr-4">
            Notifications
          </Link>
        )}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
}
