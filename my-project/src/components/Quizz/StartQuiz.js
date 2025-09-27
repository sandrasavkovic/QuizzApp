import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuizById } from "../../services/quizServices"; 
import "./StartQuiz.css";
import ResultInfo from "./ResultInfo";
import { saveQuizResult } from "../../services/userQuizzService";

function StartQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizId = location.state?.quizId;

  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(quizId);
        setQuiz({ ...data, questions: data.questions });
        setTimeLeft(data.timeLimit);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        navigate("/admin");
      }
    };
    fetchQuiz();
  }, [quizId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, answer, isMultiple = false) => {
    setAnswers((prev) => {
      if (!isMultiple) return { ...prev, [questionId]: answer };

      const prevAnswers = prev[questionId] || [];
      const exists = prevAnswers.includes(answer);
      const newAnswers = exists
        ? prevAnswers.filter((a) => a !== answer)
        : [...prevAnswers, answer];

      return { ...prev, [questionId]: newAnswers };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleFinishQuiz = async () => {
  if (!quiz) return;

  let userScore = 0;
  let correctAnswerCount = 0;
  const detailedAnswers = {};
  quiz.questions.forEach((q) => {
    const userAnswer = answers[q.id];
    let isCorrect = false;
    if (q.type === "SingleChoice") {
      const correctOption = q.options.find((o) => o.isCorrect)?.text;
      if (
        userAnswer?.toString().trim().toLowerCase() ===
        correctOption?.toString().trim().toLowerCase()
      ) {
        userScore += q.points || 1;
        correctAnswerCount++;
        isCorrect = true;
      }
    } else if (q.type === "MultipleChoice") {
      const correctOptions = q.options
        .filter((o) => o.isCorrect)
        .map((o) => o.text);
      const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
      const normalize = (s) => s?.toString().trim().toLowerCase();
      const allCorrect =
        correctOptions.length === userAnswers.length &&
        correctOptions.every((ans) =>
          userAnswers.map(normalize).includes(normalize(ans))
        );

      if (allCorrect) {
        userScore += q.points || 1;
        correctAnswerCount++;
        isCorrect = true;
      }
    } else if (q.type === "TrueFalse" || q.type === "FillInTheBlank") {
      if (
        userAnswer?.toString().trim().toLowerCase() ===
        q.correctAnswer?.toString().trim().toLowerCase()
      ) {
        userScore += q.points || 1;
        correctAnswerCount++;
        isCorrect = true;
      }
    }

    detailedAnswers[q.id] = { userAnswer, isCorrect };
  });

  const maxScore = quiz.questions.reduce(
    (acc, q) => acc + (q.points || 1),
    0
  );

  // DTO za backend
  const dto = {
    quizzId: quiz.id,
    userId: localStorage.getItem("userId"),
    attemptDate: new Date().toISOString(),
    score: userScore,
    timeTaken: quiz.timeLimit - timeLeft,
    percentage: ((userScore / maxScore) * 100).toFixed(2),
    totalQuestionsCount: quiz.questions.length,
    correctAnswersCount: correctAnswerCount,
    answers: Object.entries(detailedAnswers).map(
      ([questionId, answer]) => ({
        questionId: Number(questionId),
        answer: Array.isArray(answer.userAnswer)
          ? answer.userAnswer.join(", ")
          : answer.userAnswer,
        isCorrect: answer.isCorrect,
      })
    ),
  };

  try {
     const savedResult = await saveQuizResult(dto); // backend vraća DTO sa Id
    navigate(`/quiz-result/${savedResult.id}`); // koristi ID za GET
  } catch (err) {
    console.error("Error saving quiz result:", err);
  }
// navigate("/quiz-result", {
//   state: {
//     quiz,
//     results: {
//       score: userScore,
//       correctAnswersCount: correctAnswerCount,
//       totalQuestions: quiz.questions.length,
//       maxScore,
//       percentage: ((userScore / maxScore) * 100).toFixed(2),
//       answers: detailedAnswers,
//     },
//   },
// });
//   // Rezultati za prikaz
//   setResults({
//     score: userScore,
//     correctAnswersCount: correctAnswerCount,
//     totalQuestions: quiz.questions.length,
//     maxScore,
//     percentage: ((userScore / maxScore) * 100).toFixed(2),
//     answers: detailedAnswers,
//   });
// };
  };



  if (!quiz) return <p>Loading quiz...</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="start-quiz-container">
      <h1>{quiz.title}</h1>
      <p>Tajmer: {timeLeft} sec</p>

      {currentQuestion && (
        <div className="question-card">
          <p>{currentQuestion.text}</p>

          {/* SingleChoice */}
          {/* SingleChoice */}  
      {currentQuestion.type === "SingleChoice" &&
          currentQuestion.options.map((opt, index) => {
          const isSelected = answers[currentQuestion.id] === opt.text;
          return (
          <button
            key={`${currentQuestion.id}-single-${opt.id || index}`}
            className={`answer-btn ${isSelected ? "selected" : ""}`}
            onClick={() =>
             handleAnswerSelect(currentQuestion.id, opt.text)
         }
        >
         {opt.text}
      </button>
    );
  })}


          {/* MultipleChoice */}
      {currentQuestion.type === "MultipleChoice" &&
          currentQuestion.options.map((opt, index) => {
          const isChecked = answers[currentQuestion.id]?.includes(opt.text) || false;
          return (
          <label
            key={`${currentQuestion.id}-multi-${opt.id || index}`}
            className={`answer-option ${isChecked ? "selected" : ""}`}
          >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() =>
            handleAnswerSelect(currentQuestion.id, opt.text, true)
            }
          />
          {opt.text}
         </label>
          );
      })}

          {/* True/False */}
         {currentQuestion.type === "TrueFalse" && (
        <>
        {["True", "False"].map((val) => {
        const isSelected = answers[currentQuestion.id] === val;
        return (
        <button
            key={`${currentQuestion.id}-${val.toLowerCase()}`}
            className={`answer-btn ${isSelected ? "selected" : ""}`}
            onClick={() => handleAnswerSelect(currentQuestion.id, val)}
          >
              {val}
            </button>
          );
          })}
        </>
        )}


          {/* FillInTheBlank */}
          {currentQuestion.type === "FillInTheBlank" && (
            <input
              key={`${currentQuestion.id}-fill`}
              type="text"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleAnswerSelect(currentQuestion.id, e.target.value)
              }
              placeholder="Unesi odgovor"
            />
          )}

          {currentQuestionIndex < quiz.questions.length - 1 && (
            <button className="btn btn-next"  onClick={handleNextQuestion}>Next</button>
          )}
        </div>
      )}

      <button className="btn btn-red" onClick={handleFinishQuiz}>
        Finish
      </button>
    </div>
  );
}

export default StartQuizPage;
