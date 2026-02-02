import { useState } from "react";
import api from "./client";
import Comment from "./Comment";

export default function Post({ post }) {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);

  const loadComments = () => {
    api.get(`posts/${post.id}/comments/`)
      .then(res => setComments(res.data));
    setOpen(true);
  };

  const likePost = () => {
    api.post(`posts/${post.id}/like/`).catch(() => {});
  };

  return (
    <div className="border p-4 rounded">
      <p className="mb-2">{post.content}</p>

      <div className="flex gap-4 text-sm">
        <button
          onClick={likePost}
          className="text-blue-600"
        >
          Like
        </button>

        {!open && (
          <button
            onClick={loadComments}
            className="text-gray-600"
          >
            View comments
          </button>
        )}
      </div>

      {open && (
        <div className="mt-4 space-y-2">
          {comments.map(c => (
            <Comment key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}
