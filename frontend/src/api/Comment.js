import api from "./client";

export default function Comment({ comment }) {
  const likeComment = () => {
    api.post(`comments/${comment.id}/like/`).catch(() => {});
  };

  return (
    <div className="ml-4 border-l pl-4">
      <p className="text-sm">{comment.content}</p>

      <button
        onClick={likeComment}
        className="text-xs text-blue-600"
      >
        Like
      </button>

      {comment.children && comment.children.map(child => (
        <Comment key={child.id} comment={child} />
      ))}
    </div>
  );
}
