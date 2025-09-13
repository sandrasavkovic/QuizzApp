import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuizById } from "../../services/quizServices"; // metoda za fetch kviza po id-u
import "./StartQuiz.css";

function StartQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizId = location.state?.quizId;

  const [quiz, setQuiz] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    console.log(quizId)
    if (!quizId) {
    //  navigate("/admin"); // ako nema ID, vrati korisnika
        console.log(quizId)

      return;
    }

    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(quizId); // poziva backend API
        const allQuestions = data.questions;
        console.log("***********");
        console.log(data);
        console.log(allQuestions);
        setQuiz({ ...data, questions: allQuestions });
        //setQuiz(data);
        setTimeLeft(data.timeLimit); // postavi tajmer
      } catch (error) {
        console.error("Error fetching quiz:", error);
        navigate("/admin"); // u slučaju greške
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
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

 const handleAnswerSelect = (questionId, answer, isMultiple = false) => {
  setAnswers(prev => {
    if (!isMultiple) return { ...prev, [questionId]: answer }; // za single odgovore, kopira prethodne el n iza i doda nove

    const prevAnswers = prev[questionId] || [];
    const exists = prevAnswers.includes(answer); // ako vec postoji u nizu taj odgovor, znaci odcekirali smo ga (predomislili se)
    const newAnswers = exists
      ? prevAnswers.filter(a => a !== answer) // ukloni iz niza
      : [...prevAnswers, answer]; // a ako nije postojao, dodaj na kraj niza

    return { ...prev, [questionId]: newAnswers };
  });
};


  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };


  const handleFinishQuiz = () => {
  if (!quiz) return;
  let score = 0;

  quiz.questions.forEach(q => {
    const userAnswer = answers[q.id];

    if (q.type === "SingleChoice") {
      const correctOption = q.options.find(o => o.isCorrect)?.text;
      if (userAnswer === correctOption) score += q.points || 1;
    } 
    else if (q.type === "MultipleChoice") {
      const correctOptions = q.options.filter(o => o.isCorrect).map(o => o.text);
      const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
      
      // proveravamo da li korisnik odgovorio tacno, bez obzira na redosled
      const allCorrect = correctOptions.length === userAnswers.length &&
                         correctOptions.every(ans => userAnswers.includes(ans));
      if (allCorrect) score += q.points || 1;
    } 
    else if (q.type === "TrueFalse" || q.type === "FillInTheBlank") {
      if (userAnswer?.toString().toLowerCase() === q.correctAnswer?.toLowerCase()) {
        score += q.points || 1;
      }
    }
  });

  alert(`Kviz završen! Bodovi: ${score}/${quiz.questions.reduce((acc, q) => acc + (q.points || 1), 0)}`);
  navigate("/admin");
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

    {/* SingleChoice i MultipleChoice */}
    {(currentQuestion.type === "SingleChoice") &&
      currentQuestion.options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleAnswerSelect(currentQuestion.id, opt.text)}
        >
          {opt.text}
        </button>
      ))
    }

       {currentQuestion.type === "MultipleChoice" &&
  currentQuestion.options.map((opt, index) => (
    <label key={`${currentQuestion.id}-${index}`}>
      <input
        type="checkbox"
        checked={answers[currentQuestion.id]?.includes(opt.text) || false}
        onChange={() => handleAnswerSelect(currentQuestion.id, opt.text, true)}
      />
      {opt.text}
    </label>
))}


    {/* True/False */}
    {currentQuestion.type === "TrueFalse" && (
      <>
        <button onClick={() => handleAnswerSelect(currentQuestion.id, "True")}>True</button>
        <button onClick={() => handleAnswerSelect(currentQuestion.id, "False")}>False</button>
      </>
    )}

    {/* FillInTheBlank */}
    {currentQuestion.type === "FillInTheBlank" && (
      <input
        type="text"
        value={answers[currentQuestion.id] || ""}
        onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
        placeholder="Unesi odgovor"
      />
    )}

    {currentQuestionIndex < quiz.questions.length - 1 && (
      <button onClick={handleNextQuestion}>Next</button>
    )}
    </div>
    )}


      <button className="btn btn-red" onClick={handleFinishQuiz}>Završi</button>
    </div>
  );
}

export default StartQuizPage;
