import { useEffect, useState } from "react";
import "./GlobalboardPage.css"
import { getUsersResults } from "../../../services/userQuizzService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AllUsersResults() {
  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [quizFilter, setQuizFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetsUsersResults() {
      try {
        const data = await getUsersResults();
        if(data.success){
        console.log(data.usersResults);
        setResults(data.usersResults);
    
      }
      else{
        toast.info(data.message);
      }
      } catch (err) {
        console.error("Failed to fetch users results:", err);
      }
    }
    fetsUsersResults();
  });

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
      {results.length > 0 && (
    <h2>Users results</h2>
    )}

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
            <th>Score</th>
            <th>Time Taken</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{r.quizzName}</td>
              <td>{r.username}</td>
              <td>{r.score}</td>
              <td>{r.timeTaken}s</td>
              <td>{new Date(r.attemptDate + "Z").toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          <button onClick={() => navigate("/main")}>Home</button>

    </div>
  );
}
