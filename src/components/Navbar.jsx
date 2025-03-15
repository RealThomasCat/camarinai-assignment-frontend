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
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Comment System
      </Link>
      <div>
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
