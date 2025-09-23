import { useEffect, useState } from "react";
import { getUserResults } from "../../services/userQuizzService";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import "./UserResults.css";
import { getQuizById } from "../../services/quizServices";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);


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

  // grupisanje rez po kvizu -> za graff
  const resultsByQuiz = results.reduce((acc, r) => {
    if(!acc[r.quizzId]) acc[r.quizzId] = [];
    acc[r.quizzId].push(r);
    return acc;
  }, {})

  return (
    <div className="results-page">
    <div className="results-container">
      <h2>Moji rezultati</h2>
      {results.length === 0 ? (
        <p>Još nemaš rešene kvizove.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th></th>
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
                <td>{r.quizzTitle || `Pokusaj #${r.id}`}</td>
                <td>{new Date(r.attemptDate).toLocaleString()}</td>
                <td>{r.score}</td>
                <td>{r.percentage}%</td>
                <td>{r.timeTaken} sec</td>
                <td>
                  <button
                    className="btn btn-blue"
                    onClick={() =>
                       navigate(`/quiz-result/${r.id}`)
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
      {/* Grafikon napretka po kvizovima */}
      <div className="progress-charts-container">

{Object.entries(resultsByQuiz)
.filter(([quizzId, quizResults]) => quizResults.length > 1)
.map(([quizzId, quizResults]) => {
  const sortedResults = quizResults.sort(
    (a, b) => new Date(a.attemptDate) - new Date(b.attemptDate)
  );

  const data = {
    labels: sortedResults.map((r, idx) => `Pokusaj ${idx + 1}`),
    datasets: [
      {
        label: quizResults[0].quizzName || `Kviz #${quizzId}`,
        data: sortedResults.map(r => r.percentage),
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.3,
      },
    ],
  };

  return (
    <div key={quizzId} className="quiz-progress-chart">
      <h3>{quizResults[0].quizzName || `Kviz #${quizzId}`}</h3>
      <Line data={data} />
    </div>
    );
    })}
  </div>
  </div>
  </div>
  );
}

export default UserResults;
