import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts`
        );
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-lg mt-6 px-4 sm:px-0">
        {posts.map((post) => (
          <Post key={post._id} post={post} setPosts={setPosts} />
        ))}
      </div>
    </div>
  );
}
