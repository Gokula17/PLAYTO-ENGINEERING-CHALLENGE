export default function CommentCard({ comment }) {
  return (
    <div className="card comment">
     <strong>
  Commented by: {comment.author} (karma 24h: {comment.karma_24h})
</strong>

      <p>{comment.content}</p>
      <div>👍 {comment.likes}</div>

      {comment.children.map(child => (
        <CommentCard key={child.id} comment={child} />
      ))}
    </div>
  );
}