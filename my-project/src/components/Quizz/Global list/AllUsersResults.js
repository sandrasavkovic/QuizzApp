import { useEffect, useState } from "react";
import "./GlobalboardPage.css"
import { getUsersResults } from "../../../services/userQuizzService";
import { toast } from "react-toastify";

export default function AllUsersResults() {
  const [results, setResults] = useState([]);

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

  return (
    <div className="globalboard-page">
    <div className="globalboard-container">
      {results.length > 0 && (
    <h2>Users results</h2>
    )}

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
          {results.map((r, idx) => (
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
    </div>
  );
}
