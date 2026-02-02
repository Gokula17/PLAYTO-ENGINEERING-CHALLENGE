export default function Leaderboard({ data }) {
  return (
    <div className="card">
      <h3>Leaderboard (Last 24 Hours)</h3>
      {data.map((u, i) => (
        <div key={i}>
          {i + 1}. {u.user__username} — {u.karma}
        </div>
      ))}
    </div>
  );
}