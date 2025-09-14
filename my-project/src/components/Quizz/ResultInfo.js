import "./ResultInfo.css";

function ResultInfo({ quiz, results }) {
    console.log(quiz);
    console.log(results);
  return (
    <div className="result-info">
      <h2>Rezultati kviza</h2>
      <p>Ukupan broj pitanja: {results.totalQuestions}</p>
      <p>Tačnih odgovora: {results.correctAnswersCount}</p>
      <p>Osvojeni bodovi: {results.score}/{results.maxScore}</p>
      <p>Procenat uspešnosti: {results.percentage}%</p>

      <h3>Detalji po pitanjima:</h3>
      <ul>
        {quiz.questions.map((q, index) => {
          const userAns = results.answers[q.id]?.userAnswer;
          const isCorrect = results.answers[q.id]?.isCorrect;

          const correctAns = 
            q.type === "SingleChoice" || q.type === "MultipleChoice"
              ? q.options.filter(o => o.isCorrect).map(o => o.text).join(", ")
              : q.correctAnswer;

          return (
            <li key={`${q.id}-${index}`} className={isCorrect ? "correct" : "wrong"}>
              <p><b>{index + 1}. {q.text}</b></p>
              <p>Tvoj odgovor: {Array.isArray(userAns) ? userAns.join(", ") : userAns || "Nema"}</p>
              <p>Tačan odgovor: {correctAns}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResultInfo;
