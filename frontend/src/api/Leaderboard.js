import { useEffect, useState } from "react";
import api from "./client";


export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = () => {
      api.get("leaderboard/").then(res => setUsers(res.data));
    };
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold mb-2">
        Top Users (24h)
      </h2>

      <ul className="text-sm space-y-1">
        {users.map((u, i) => (
          <li key={i}>
            {u.user__username} — {u.total_karma}
          </li>
        ))}
      </ul>
    </div>
  );
}
