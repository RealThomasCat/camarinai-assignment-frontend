import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Post({ post, setPosts }) {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    if (!commentText) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments`,
        { postId: post._id, text: commentText },
        { withCredentials: true }
      );

      // Update the post comments list
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
    <div className="mb-6 bg-white p-4 rounded shadow">
      <img
        src={post.image}
        alt="Post"
        className="w-full aspect-square object-cover rounded"
      />
      <p className="mt-2 font-bold text-black">{post.caption}</p>

      {/* Display Comments */}
      <div className="mt-2 flex flex-col gap-1">
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <p
              key={comment._id}
              className={`text-sm ${
                comment.isFlagged ? "text-red-600" : "text-gray-700"
              }`}
            >
              <span className="font-semibold">{comment.username}:</span>{" "}
              {comment.text}
              {comment.isFlagged && (
                <span className="ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded">
                  Flagged
                </span>
              )}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
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
            className="p-2 w-full rounded-l bg-gray-300 text-black focus:outline-none"
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
