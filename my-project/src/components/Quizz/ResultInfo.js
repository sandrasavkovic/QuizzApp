import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizResultById, getQuestionsForQuizz, getQuizzById } from "../../services/userQuizzService";

import "./ResultInfo.css";

function ResultInfo() {
  const { id } = useParams(); // id pokušaja kviza iz URL-a
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizz, setQuizz] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dobavljanje rezultata
        const result = await getQuizResultById(id);
        console.log("Rezultati: ", result);
        setData(result);

        const quizRes = await getQuizzById(result.quizzId);
        setQuizz(quizRes);
        console.log(quizRes);

        // Dobavljanje pitanja kviza
        const questionsList = await getQuestionsForQuizz(result.quizzId);
        console.log("Dobavljena pitanja: ", questionsList);
        setQuestions(questionsList);
      } catch (err) {
        console.error("Greška pri učitavanju rezultata:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!data) return <p>Učitavanje rezultata...</p>;

  // Destrukturiranje iz flat objekta
  const {
    quizzId,
    score,
    percentage,
    answers,
    correctAnswersCount,
    totalQuestionsCount,
  } = data;

  const maxScore = questions.reduce((acc, q) => acc + (q.points || 1), 0);

  return (
    <div className="result-info">
      <h2>Rezultati kviza (ID: {quizz.title})</h2>
      <p>Ukupan broj pitanja: {totalQuestionsCount}</p>
      <p>Tačnih odgovora: {correctAnswersCount}</p>
      <p>Osvojeni bodovi: {score}/{maxScore}</p>
      <p>Procenat uspešnosti: {percentage}%</p>

      <h3>Detalji po pitanjima:</h3>
      <ul>
        {questions.map((q, index) => {
          questions.forEach(q => console.log("q.id:", q.id, "answers IDs:", answers.map(a => a.questionId)));

          const userAnsObj = answers.find(a => Number(a.questionId) === q.id);
          console.log(answers);
          console.log(",,,", userAnsObj);
          const userAns = userAnsObj?.answer;
                    console.log("!,,", userAns);
          const isCorrect = userAnsObj?.isCorrect;

          let correctAns = "";
          if (q.type === "SingleChoice" || q.type === "MultipleChoice") {
            correctAns = q.options
              .filter(o => o.isCorrect)
              .map(o => o.text)
              .join(", ");
          } else if (q.type === "TrueFalse" || q.type === "FillInTheBlank") {
            correctAns = q.correctAnswer;
          }

          return (
            <li key={`${q.id}-${index}`} className={isCorrect ? "correct" : "wrong"}>
              <p><b>{index + 1}. {q.text}</b></p>
              <p>Tvoj odgovor: {userAns || "Nema"}</p>
              <p>Tačan odgovor: {correctAns}</p>
            </li>
          );
        })}
      </ul>

      <button onClick={() => navigate("/main")}>Nazad</button>
    </div>
  );
}

export default ResultInfo;
