import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({}); // Stores comments for each post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCommentChange = (postId, text) => {
    setCommentText({ ...commentText, [postId]: text });
  };

  const handleAddComment = async (postId) => {
    if (!commentText[postId]) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        { postId, text: commentText[postId] },
        { withCredentials: true }
      );

      // Update the post with the new comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, res.data.comment] }
            : post
        )
      );

      // Clear input field
      setCommentText({ ...commentText, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-md mt-6">
        {posts.map((post) => (
          <div key={post._id} className="mb-6 bg-white p-4 rounded shadow">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-64 object-cover rounded"
            />
            <p className="mt-2 font-bold">{post.caption}</p>

            {/* Display Comments */}
            <div className="mt-3">
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <p key={comment._id} className="text-sm text-gray-700">
                    <span className="font-semibold">{comment.username}:</span>{" "}
                    {comment.text}
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
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post._id, e.target.value)
                  }
                  className="border p-2 w-full rounded-l"
                />
                <button
                  onClick={() => handleAddComment(post._id)}
                  className="bg-blue-500 text-white px-3 py-2 rounded-r"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
