import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Post({ post, setPosts }) {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    if (!commentText) return;

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/comments`,
        { postId: post._id, text: commentText },
        { withCredentials: true } // **Ensures cookies are sent**
      );

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === post._id
            ? { ...p, comments: [...p.comments, res.data.comment] }
            : p
        )
      );

      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mb-6 bg-neutral-100 p-4 rounded shadow">
      <img
        src={post.image}
        alt="Post"
        className="w-full aspect-square object-cover rounded"
      />
      <p className="mt-3 px-1 font-medium text-lg text-neutral-900 ">
        {post.caption}
      </p>

      {/* Display Comments */}
      <div className="mt-2 px-1 flex flex-col gap-2">
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <p
              key={comment._id}
              className={`text-sm ${
                comment.isFlagged ? "text-red-500" : "text-neutral-700"
              }`}
            >
              <span className="font-semibold">{comment.username}:</span>{" "}
              {comment.text}
              {comment.isFlagged && (
                <span className="ml-2 text-xs bg-red-100 text-red-500 border-2 border-red-400 font-medium px-2 pb-1 pt-0.5 rounded">
                  Flagged
                </span>
              )}
            </p>
          ))
        ) : (
          <p className="text-sm text-neutral-500">No comments yet.</p>
        )}
      </div>

      {/* Add Comment Input */}
      {user && (
        <div className="mt-3 flex">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="p-2 w-full rounded-l bg-neutral-200 text-black placeholder:text-neutral-500 focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-3 py-2 rounded-r"
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
}
