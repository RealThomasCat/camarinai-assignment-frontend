import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Notifications() {
  const [flaggedComments, setFlaggedComments] = useState([]);

  useEffect(() => {
    const fetchFlaggedComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/notifications`,
          { withCredentials: true }
        );
        setFlaggedComments(res.data.flaggedComments);
      } catch (error) {
        console.error("Error fetching flagged comments:", error);
      }
    };
    fetchFlaggedComments();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl mb-4">
          Flagged Comments (Will be reviewed further in 24 hours and be removed
        </h1>
        {flaggedComments.length > 0 ? (
          flaggedComments.map((comment, index) => (
            <div key={index} className="bg-red-100 p-3 mb-3 rounded">
              <p className="text-red-700">{comment.text}</p>
              <p className="text-sm text-gray-500">
                Flagged on {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No flagged comments.</p>
        )}
      </div>
    </div>
  );
}
