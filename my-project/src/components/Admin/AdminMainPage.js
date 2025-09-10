import {useState, useEffect, use} from "react";
import jwtDecode from "jwt-decode";
import "./AdminMainPage.css";  
function AdminMainPage() {
    const [quizzes, setQuizess] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;


    const fetchQuizzes = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/quizzes`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}` ,   
                    },
                });
            if(!response.ok){
                throw new Error("Failed to fetch quizzes");
            }
            const data = await response.json();
            setQuizess(data);   
        }catch(error){
            console.error("Error fetching quizzes:", error);
        }
    };
        useEffect(() => {
            fetchQuizzes();
        }, [API_URL]);
    const handleOpenQuiz = (quiz) => {
        // detalji kviza
        alert(`Open quiz: ${quiz.title}`);
    }
 return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-buttons">
          <button className="btn btn-blue" onClick={() => alert("Dodaj novi kviz")}>Add Quizz</button>
          <button className="btn btn-green" onClick={() => alert("Dodaj novo pitanje")}>Add Question</button>
        </div>
      </div>

      <div className="quiz-grid">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card" onClick={() => handleOpenQuiz(quiz)}>
              <h2>{quiz.title}</h2>
              <p>Difficulty: <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>{quiz.difficulty}</span></p>
              <p>Time Limit: {quiz.timeLimit} sec</p>
              <p>Max Score: {quiz.maxScore}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">Nema dostupnih kvizova.</p>
        )}
      </div>
    </div>
  );

}
    export default AdminMainPage;