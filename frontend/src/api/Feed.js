import { useEffect, useState } from "react";
import api from "./client";
import Post from "./Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("feed/").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
