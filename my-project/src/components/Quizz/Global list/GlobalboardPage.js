import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GlobalboardPage.css";
import { getGlobalboard } from "../../../services/userQuizzService";
import { toast } from "react-toastify";

export default function GlobalboardPage() {
  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [quizFilter, setQuizFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
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


    useEffect(() => {
    let filteredData = [...results];

    if (quizFilter !== "all") {
      filteredData = filteredData.filter(r => r.quizzName === quizFilter);
    }

    if (timeFilter !== "all") {
      const now = new Date();
      let fromDate = null;

      if (timeFilter === "today") {
    fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  } else if (timeFilter === "weekly") {
        fromDate = new Date();
        fromDate.setDate(now.getDate() - 7);
      } else if (timeFilter === "monthly") {
        fromDate = new Date();
        fromDate.setMonth(now.getMonth() - 1);
      }

      if (fromDate) {
        filteredData = filteredData.filter(r => {
          const attemptDate = new Date(r.attemptDate); 
          return attemptDate >= fromDate;
        });
      }
    }

    setFiltered(filteredData);
  }, [quizFilter, timeFilter, results]);

  const uniqueQuizzes = [...new Set(results.map(r => r.quizzName))];
  return (
    <div className="globalboard-page">
    <div className="globalboard-container">
      <h2>🌍 Global board</h2>

      <div className="filters">
        <label>
          Quiz:
          <select value={quizFilter} onChange={e => setQuizFilter(e.target.value)}>
            <option value="all">All</option>
            {uniqueQuizzes.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </label>

        <label>
          Period:
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}>
            <option value="all">All time</option>
             <option value="today">Today</option>
            <option value="weekly">This week</option>
            <option value="monthly">This month</option>
          </select>
        </label>
      </div>

      <table className="globalboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Quizz</th>
            <th>User</th>
            <th>Best Score</th>
            <th>Attempt date</th>
            <th>Total attempts</th>
            <th>Best Time</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, idx) => (
            <tr key={r.userId}>
              <td>{idx + 1}</td>
              <td>{r.quizzName}</td>
              <td>{r.username}</td>
              <td>{r.bestScore}</td>
              <td>{r.totalAttempts}</td>
              <td>{new Date(r.attemptDate + "Z").toLocaleString()}</td>
              <td>{r.bestTime}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <button onClick={() => navigate("/main")}>Home</button>

    </div>
  );
}
