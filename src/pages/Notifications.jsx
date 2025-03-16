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
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-lg mt-6 px-4 sm:px-0">
        <div className="p-4 mx-auto bg-neutral-100 rounded">
          <h1 className="text-xl sm:text-2xl mb-4 text-neutral-800">
            Flagged Comments:
          </h1>
          <div className="flex flex-col gap-4">
            {flaggedComments.length > 0 ? (
              flaggedComments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-red-100 border-2 border-red-400 p-3 rounded"
                >
                  <p className="text-red-600 mb-1 text-sm sm:text-base">
                    {comment.text}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-800">
                    Flagged on {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No flagged comments.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
