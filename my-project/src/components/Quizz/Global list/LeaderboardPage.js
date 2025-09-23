import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GlobalboardPage.css"
import { getLeaderboard } from "../../../services/userQuizzService";
import { toast } from "react-toastify";

export default function LeaderboardPage() {
  const { quizzId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        console.log(quizzId);
        const data = await getLeaderboard(quizzId);
        if(data.success){
        console.log(data.globalResults);
        setResults(data.globalResults);
    
      }
      else{
        toast.info(data.message);
      }
      } catch (err) {
        console.error("Failed to fetch globalboard:", err);
      }
    }
    fetchLeaderboard();
  }, [quizzId]);

  return (
    <div className="globalboard-page">
    <div className="globalboard-container">
      {results.length > 0 && (
    <h2>Leader board for Quiz : {results[0].quizzName}</h2>
    )}

      <table className="globalboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Time Taken</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{r.username}</td>
              <td>{r.score}</td>
              <td>{r.timeTaken}s</td>
              <td>{new Date(r.attemptDate + "Z").toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
