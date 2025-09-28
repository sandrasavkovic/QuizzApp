import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GlobalboardPage.css";
import { getGlobalboard } from "../../../services/userQuizzService";
import { toast } from "react-toastify";

export default function GlobalboardPage() {
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGlobalboard() {
      try {
        const data = await getGlobalboard();
        if (data.success) {
          setResults(data.globalResults);
        } else {
          toast.info(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch globalboard:", err);
      }
    }
    fetchGlobalboard();
  }, []);



  return (
    <div className="globalboard-page">
    <div className="globalboard-container">
      <h2>🌍 Global board</h2>

      

      <table className="globalboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Total Score</th>
            <th>Total time</th>
            <th>Total attempts</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={r.userId}>
              <td>{idx + 1}</td>
              <td>{r.username}</td>
              <td>{r.totalScore}</td>
              <td>{r.totalTime}s</td>
              <td>{r.totalAttempts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <button onClick={() => navigate("/main")}>Home</button>

    </div>
  );
}
