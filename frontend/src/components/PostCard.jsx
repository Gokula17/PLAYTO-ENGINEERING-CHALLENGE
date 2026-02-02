import CommentCard from "./CommentCard";

export default function PostCard({ post }) {
  return (
    <div className="card">
      <h4>{post.community}</h4>
      <p><strong>Posted by:</strong> {post.author}</p>
      <h3>{post.title}</h3>
      <p>{post.content}</p>


      <div>
        👍 {post.likes} &nbsp; 💬 {post.comments.length}
      </div>

      <div>
        <strong>Liked by:</strong> {post.liked_by.join(", ")}
      </div>

      {post.comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}