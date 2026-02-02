import { useEffect, useState } from "react";

/* ---------- UI STYLES ---------- */
const pill = {
  display: "inline-block",
  padding: "3px 10px",
  borderRadius: 14,
  background: "#e8f5e9",
  color: "#2e7d32",
  fontSize: 11,
  marginRight: 6,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [dark, setDark] = useState(false);

  const renderLikedBy = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "No likes";

  const theme = {
    bg: dark ? "#0f172a" : "#f3f5f9",
    card: dark ? "#020617" : "#ffffff",
    text: dark ? "#e5e7eb" : "#1f2937",
    heading: dark ? "#f9fafb" : "#111827",
    secondary: dark ? "#9ca3af" : "#374151",
    muted: dark ? "#94a3b8" : "#6b7280",
    border: dark ? "#1e293b" : "#e5e7eb",
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/feed/")
      .then((r) => r.json())
      .then((d) =>
        setPosts(
          d.map((p) => ({
            ...p,
            comments: p.comments || [],
          }))
        )
      );

    fetch("http://127.0.0.1:8000/api/leaderboard/")
      .then((r) => r.json())
      .then((d) =>
        setLeaders(
          d.map((x) => ({
            name: x.user__username || "Unknown",
            score: x.score || 0,
          }))
        )
      );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        padding: 28,
        background: theme.bg,
        fontFamily: "Inter, system-ui, sans-serif",
        color: theme.text,
        minHeight: "100vh",
      }}
    >
      {/* COMMUNITY */}
      <div style={{ flex: 3 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h1
            style={{
              fontWeight: 700,
              fontSize: 24,
              color: theme.heading,
            }}
          >
            🌍 Playto Community
          </h1>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "6px 12px",
              borderRadius: 10,
              fontSize: 15,
              cursor: "pointer",
              background: theme.card,
              color: theme.text,
              border: `1px solid ${theme.border}`,
            }}
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        {posts.map((p) => (
          <div
            key={p.id}
            style={{
              background: theme.card,
              padding: 20,
              marginBottom: 20,
              borderRadius: 16,
              boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: theme.secondary,
                marginBottom: 6,
              }}
            >
              <strong>Posted by {p.user}</strong>
            </div>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 12,
                color: theme.heading,
              }}
            >
              {p.content}
            </p>

            <div style={{ fontSize: 13, color: theme.muted }}>
              <span style={pill}>❤️ Liked by : </span>
              {renderLikedBy(p.liked_by)}
            </div>

            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.secondary,
                  marginBottom: 10,
                }}
              >
                💬 Comments
              </div>

              {p.comments.length === 0 && (
                <div style={{ fontSize: 12, color: theme.muted }}>
                  No comments yet
                </div>
              )}

              {p.comments.map((c) => (
                <div key={c.id} style={{ marginTop: 14 }}>
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: 1.55,
                    }}
                  >
                    <strong>{c.user}</strong>{" "}
                    <span style={{ color: theme.secondary }}>
                      {c.content}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      marginLeft: 12,
                      marginTop: 4,
                      color: theme.muted,
                    }}
                  >
                    <span
                      style={{
                        ...pill,
                        background: dark ? "#1e293b" : "#f1f8e9",
                        color: dark ? "#a7f3d0" : "#2e7d32",
                      }}
                    >
                      👍
                    </span>
                    {renderLikedBy(c.liked_by)}
                  </div>

                  {Array.isArray(c.replies) &&
                    c.replies.length > 0 && (
                      <div
                        style={{
                          marginLeft: 26,
                          marginTop: 10,
                          paddingLeft: 12,
                          borderLeft: `2px solid ${theme.border}`,
                        }}
                      >
                        {c.replies.map((r) => (
                          <div key={r.id} style={{ marginTop: 10 }}>
                            <div
                              style={{
                                fontSize: 13,
                                lineHeight: 1.5,
                              }}
                            >
                              {r.content}
                            </div>

                            <div
                              style={{
                                fontSize: 11,
                                color: theme.muted,
                                marginTop: 2,
                              }}
                            >
                              Replied by <strong>{r.user}</strong>
                            </div>

                            <div
                              style={{
                                fontSize: 10,
                                marginLeft: 12,
                                marginTop: 4,
                                color: theme.muted,
                              }}
                            >
                              <span
                                style={{
                                  ...pill,
                                  background: "#fce4ec",
                                  color: "#ad1457",
                                  fontSize: 10,
                                }}
                              >
                                ❤️
                              </span>
                              {renderLikedBy(r.liked_by)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* LEADERBOARD */}
      <div
        style={{
          flex: 1,
          background: theme.card,
          padding: 20,
          height: "fit-content",
          borderRadius: 16,
          boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: 18,
            marginBottom: 6,
            color: theme.heading,
          }}
        >
          🔥 Daily Karma
        </h2>

        <div
          style={{
            fontWeight: 600,
            fontSize: 18,
            marginBottom: 12,
            color: theme.secondary,
          }}
        >
          🏆 Leaderboard (24h)
        </div>

        {leaders.map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 15,
              fontWeight:"bold",
            }}
          >
            <span>
              {i + 1}. {l.name}
            </span>
            <strong style={{ color: theme.heading }}>
              {l.score}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
