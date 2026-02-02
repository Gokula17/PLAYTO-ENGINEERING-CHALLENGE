import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/feed/")
      .then(r => r.json())
      .then(d => setPosts(d.map(p => ({ ...p, comments: p.comments || [] }))));

    fetch("http://127.0.0.1:8000/api/leaderboard/")
      .then(r => r.json())
      .then(d =>
        setLeaders(d.map(x => ({
          name: x.user__username || "Unknown",
          score: x.score || 0
        })))
      );
  }, []);

  return (
    <div style={{ display: "flex", gap: 20, padding: 20, background: "#f5f5f5" }}>
      <div style={{ flex: 3 }}>
        <h1>Community</h1>
        {posts.map(p => (
          <div key={p.id} style={{ background: "#fff", padding: 12, marginBottom: 12 }}>
            <div><strong>{p.user}</strong></div>
            <p>{p.content}</p>
            <div>
              <strong>Comments</strong>
              {p.comments.length === 0 && <div style={{ color: "#777" }}>No comments</div>}
              {p.comments.map(c => (
                <div key={c.id}><b>{c.user}:</b> {c.content}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, background: "#fff", padding: 12, height: "fit-content" }}>
        <h2>Leaderboard (24h)</h2>
        {leaders.map((l, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{i + 1}. {l.name}</span>
            <b>{l.score}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
