import { useEffect, useState } from "react";
import { getUserResults } from "../../services/userQuizzService";
import { useNavigate } from "react-router-dom";
import "./UserResults.css";
import { getQuizById } from "../../services/quizServices";

function UserResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResults() {
      try {
        const data = await getUserResults(userId);
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [userId]);

 
  if (loading) return <p>Loading...</p>;

  return (
    <div className="results-container">
      <h2>Moji rezultati</h2>
      {results.length === 0 ? (
        <p>Još nemaš rešene kvizove.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Naziv kviza</th>
              <th>Datum</th>
              <th>Poeni</th>
              <th>Procenat</th>
              <th>Trajanje</th>
              <th>Detalji</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.quizzTitle || `Kviz #${r.Title}`}</td>
                <td>{new Date(r.attemptDate).toLocaleString()}</td>
                <td>{r.score}</td>
                <td>{r.percentage}%</td>
                <td>{r.timeTaken} sec</td>
                <td>
                  <button
                    className="btn btn-blue"
                    onClick={() =>
                      navigate("/result-details", { state: { result: r } })
                    }
                  >
                    Pregled
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserResults;
